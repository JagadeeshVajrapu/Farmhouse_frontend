'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format, addDays } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  User, CalendarDays, Users, Clock, FileText, CreditCard, ClipboardCheck,
  ChevronLeft, ChevronRight, Loader2, PartyPopper, Minus, Plus,
} from 'lucide-react';
import { bookingApi } from '@/lib/api';
import {
  multiStepBookingSchema,
  STEP_FIELDS,
  BOOKING_STEPS,
  EVENT_TYPES,
  PAYMENT_METHODS,
  type MultiStepBookingValues,
} from '@/lib/booking-schema';
import { calculateNights, calculateTotal, formatPrice, cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/context/AuthContext';
import type { Property, Booking } from '@/types';
import { BookingStepper } from './BookingStepper';
import { BookingSuccess } from './BookingSuccess';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MultiStepBookingFormProps {
  properties: Property[];
  defaultPropertyId?: string;
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  initialGuests?: number;
  initialSpecialRequests?: string;
  initialEventName?: string;
}

export function MultiStepBookingForm({
  properties,
  defaultPropertyId,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialSpecialRequests,
  initialEventName,
}: MultiStepBookingFormProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(0);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  const defaultProperty = properties.find((p) => p._id === defaultPropertyId) || properties[0];
  const adultsDefault = Math.max(initialGuests, 1);

  const form = useForm<MultiStepBookingValues>({
    resolver: zodResolver(multiStepBookingSchema),
    defaultValues: {
      guestName: user?.name || '',
      guestEmail: user?.email || '',
      guestPhone: user?.phone || '',
      guestAddress: '',
      propertyId: defaultProperty?._id || '',
      eventType: 'stay',
      eventName: initialEventName || '',
      adults: adultsDefault,
      children: 0,
      checkIn: initialCheckIn,
      checkOut: initialCheckOut,
      specialRequests: initialSpecialRequests || '',
      cateringRequired: false,
      decorationRequired: false,
      dietaryRequirements: '',
      paymentMethod: 'pay_at_property',
      agreeToTerms: false,
    },
    mode: 'onTouched',
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = form;

  const values = watch();
  const selectedProperty = properties.find((p) => p._id === values.propertyId) || defaultProperty;
  const totalGuests = (values.adults || 0) + (values.children || 0);
  const nights =
    values.checkIn && values.checkOut ? calculateNights(values.checkIn, values.checkOut) : 0;
  const total =
    selectedProperty && values.checkIn && values.checkOut
      ? calculateTotal(selectedProperty.pricePerNight, values.checkIn, values.checkOut)
      : 0;

  const mutation = useMutation({
    mutationFn: (data: MultiStepBookingValues) =>
      bookingApi.create({
        propertyId: data.propertyId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.adults + data.children,
        adults: data.adults,
        children: data.children,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        guestAddress: data.guestAddress,
        eventType: data.eventType,
        eventName: data.eventName,
        specialRequests: data.specialRequests,
        cateringRequired: data.cateringRequired,
        decorationRequired: data.decorationRequired,
        dietaryRequirements: data.dietaryRequirements,
        paymentMethod: data.paymentMethod,
      }),
    onSuccess: (res) => {
      const booking = res.data.data;
      if (booking) {
        setCompletedBooking(booking);
        toast.success('Booking submitted successfully!');
      }
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    },
  });

  const nextStep = async () => {
    const fields = STEP_FIELDS[step];
    if (step === 6) {
      const valid = await trigger(['paymentMethod', 'agreeToTerms']);
      if (!valid) return;
    } else if (fields.length > 0) {
      const valid = await trigger(fields);
      if (!valid) return;
    }

    if (step === 2 && selectedProperty && totalGuests > selectedProperty.maxGuests) {
      toast.error(`Maximum ${selectedProperty.maxGuests} guests allowed for this property`);
      return;
    }

    if (step < BOOKING_STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onSubmit = (data: MultiStepBookingValues) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to complete your booking');
      router.push('/auth/login?redirect=/booking');
      return;
    }
    mutation.mutate(data);
  };

  if (completedBooking) {
    return <BookingSuccess booking={completedBooking} />;
  }

  const stepIcons = [User, PartyPopper, Users, CalendarDays, Clock, FileText, CreditCard, ClipboardCheck];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card luxury-shadow">
      {/* Header */}
      <div className="border-b border-border/50 bg-obsidian-light/50 px-6 py-6 lg:px-8">
        <BookingStepper currentStep={step} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step header */}
            <div className="mb-8 flex items-center gap-4">
              {(() => {
                const Icon = stepIcons[step] || User;
                return (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                );
              })()}
              <div>
                <h3 className="font-heading text-xl font-light text-foreground">
                  {BOOKING_STEPS[step]?.label}
                </h3>
                <p className="text-sm text-muted-foreground">{BOOKING_STEPS[step]?.description}</p>
              </div>
            </div>

            {/* Step 0: Personal Information */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="guestName">Full Name *</Label>
                  <Input id="guestName" {...register('guestName')} className="mt-1.5" />
                  {errors.guestName && (
                    <p className="mt-1 text-xs text-destructive">{errors.guestName.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="guestEmail">Email Address *</Label>
                    <Input id="guestEmail" type="email" {...register('guestEmail')} className="mt-1.5" />
                    {errors.guestEmail && (
                      <p className="mt-1 text-xs text-destructive">{errors.guestEmail.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="guestPhone">Phone Number *</Label>
                    <Input id="guestPhone" {...register('guestPhone')} className="mt-1.5" placeholder="+91 98765 43210" />
                    {errors.guestPhone && (
                      <p className="mt-1 text-xs text-destructive">{errors.guestPhone.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="guestAddress">Address (Optional)</Label>
                  <Input id="guestAddress" {...register('guestAddress')} className="mt-1.5" placeholder="City, State" />
                </div>
              </div>
            )}

            {/* Step 1: Event Details */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label>Accommodation *</Label>
                  <Controller
                    name="propertyId"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-1.5 h-12">
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                          {properties.map((p) => (
                            <SelectItem key={p._id} value={p._id}>
                              {p.name} — {formatPrice(p.pricePerNight)}/night
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.propertyId && (
                    <p className="mt-1 text-xs text-destructive">{errors.propertyId.message}</p>
                  )}
                </div>
                <div>
                  <Label>Event Type *</Label>
                  <Controller
                    name="eventType"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-1.5 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {EVENT_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    {...register('eventName')}
                    className="mt-1.5"
                    placeholder="e.g. Sharma Family Reunion"
                  />
                  {errors.eventName && (
                    <p className="mt-1 text-xs text-destructive">{errors.eventName.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Guests */}
            {step === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  {selectedProperty
                    ? `This property accommodates up to ${selectedProperty.maxGuests} guests.`
                    : 'Select number of guests for your stay.'}
                </p>
                {(['adults', 'children'] as const).map((field) => (
                  <div key={field} className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-5">
                    <div>
                      <p className="font-medium capitalize text-foreground">{field}</p>
                      <p className="text-xs text-muted-foreground">
                        {field === 'adults' ? 'Ages 13+' : 'Ages 0–12'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setValue(field, Math.max(field === 'adults' ? 1 : 0, values[field] - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-gold/40 hover:bg-gold/5"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-lg font-light">{values[field]}</span>
                      <button
                        type="button"
                        onClick={() => setValue(field, values[field] + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-gold/40 hover:bg-gold/5"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl border border-gold/20 bg-gold/5 p-4 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gold">Total Guests</p>
                  <p className="mt-1 font-heading text-3xl font-light text-foreground">{totalGuests}</p>
                </div>
              </div>
            )}

            {/* Step 3: Calendar */}
            {step === 3 && (
              <div className="flex flex-col items-center">
                <Label className="mb-4 self-start">Select Check-in Date *</Label>
                <Controller
                  name="checkIn"
                  control={control}
                  render={({ field }) => (
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        if (date && values.checkOut && date >= values.checkOut) {
                          setValue('checkOut', addDays(date, 1));
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      className="rounded-xl border border-border"
                    />
                  )}
                />
                {errors.checkIn && (
                  <p className="mt-2 text-xs text-destructive">{errors.checkIn.message}</p>
                )}
                {values.checkIn && (
                  <p className="mt-4 text-sm text-gold">
                    Check-in: {format(values.checkIn, 'EEEE, dd MMMM yyyy')}
                  </p>
                )}
              </div>
            )}

            {/* Step 4: Stay Duration */}
            {step === 4 && (
              <div className="space-y-6">
                {values.checkIn && (
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Check-in</p>
                    <p className="mt-1 font-heading text-lg text-foreground">
                      {format(values.checkIn, 'dd MMM yyyy')}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="mb-4 block">Select Check-out Date *</Label>
                  <Controller
                    name="checkOut"
                    control={control}
                    render={({ field }) => (
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= (values.checkIn || new Date())}
                        className="mx-auto rounded-xl border border-border"
                      />
                    )}
                  />
                  {errors.checkOut && (
                    <p className="mt-2 text-xs text-destructive">{errors.checkOut.message}</p>
                  )}
                </div>
                {nights > 0 && selectedProperty && (
                  <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold">Duration</p>
                        <p className="mt-1 font-heading text-2xl font-light text-foreground">
                          {nights} Night{nights > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-gold">Estimated Total</p>
                        <p className="mt-1 font-heading text-2xl font-light text-gold">{formatPrice(total)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Requirements */}
            {step === 5 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    {...register('specialRequests')}
                    className="mt-1.5"
                    rows={4}
                    placeholder="Any special arrangements, accessibility needs, or preferences..."
                  />
                </div>
                <div>
                  <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                  <Input
                    id="dietaryRequirements"
                    {...register('dietaryRequirements')}
                    className="mt-1.5"
                    placeholder="Vegetarian, vegan, allergies, etc."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      { name: 'cateringRequired' as const, label: 'Catering Required' },
                      { name: 'decorationRequired' as const, label: 'Decoration Required' },
                    ] as const
                  ).map(({ name, label }) => (
                    <label
                      key={name}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all',
                        values[name]
                          ? 'border-gold/40 bg-gold/5'
                          : 'border-border hover:border-gold/20'
                      )}
                    >
                      <input
                        type="checkbox"
                        {...register(name)}
                        className="h-4 w-4 rounded border-border accent-gold"
                      />
                      <span className="text-sm text-foreground">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Payment */}
            {step === 6 && (
              <div className="space-y-4">
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => field.onChange(method.value)}
                          className={cn(
                            'rounded-xl border p-5 text-left transition-all',
                            field.value === method.value
                              ? 'border-gold/40 bg-gold/5 ring-1 ring-gold/20'
                              : 'border-border hover:border-gold/20'
                          )}
                        >
                          <p className="font-medium text-foreground">{method.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{method.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                />
                <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4">
                  <input
                    type="checkbox"
                    {...register('agreeToTerms')}
                    className="mt-0.5 h-4 w-4 rounded accent-gold"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <span className="text-gold">terms & conditions</span> and cancellation policy.
                    I understand my booking is subject to availability confirmation.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-xs text-destructive">{errors.agreeToTerms.message}</p>
                )}
              </div>
            )}

            {/* Step 7: Review */}
            {step === 7 && (
              <div className="space-y-4">
                {[
                  { title: 'Personal', items: [
                    ['Name', values.guestName],
                    ['Email', values.guestEmail],
                    ['Phone', values.guestPhone],
                  ]},
                  { title: 'Event', items: [
                    ['Property', selectedProperty?.name],
                    ['Type', EVENT_TYPES.find((t) => t.value === values.eventType)?.label],
                    ['Event', values.eventName],
                  ]},
                  { title: 'Stay', items: [
                    ['Guests', `${totalGuests} (${values.adults} adults, ${values.children} children)`],
                    ['Check-in', values.checkIn ? format(values.checkIn, 'dd MMM yyyy') : '—'],
                    ['Check-out', values.checkOut ? format(values.checkOut, 'dd MMM yyyy') : '—'],
                    ['Nights', nights.toString()],
                  ]},
                  { title: 'Payment', items: [
                    ['Method', PAYMENT_METHODS.find((m) => m.value === values.paymentMethod)?.label],
                    ['Total', formatPrice(total)],
                  ]},
                ].map((section) => (
                  <div key={section.title} className="rounded-xl border border-border bg-background/30 p-5">
                    <p className="mb-3 text-[10px] uppercase tracking-wider text-gold">{section.title}</p>
                    <div className="space-y-2">
                      {section.items.map(([label, val]) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="text-foreground">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {(values.specialRequests || values.cateringRequired || values.decorationRequired) && (
                  <div className="rounded-xl border border-border bg-background/30 p-5">
                    <p className="mb-3 text-[10px] uppercase tracking-wider text-gold">Requirements</p>
                    {values.specialRequests && (
                      <p className="text-sm text-muted-foreground">{values.specialRequests}</p>
                    )}
                    <div className="mt-2 flex gap-2">
                      {values.cateringRequired && (
                        <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs text-gold">Catering</span>
                      )}
                      {values.decorationRequired && (
                        <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs text-gold">Decoration</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-border/50 pt-6">
          <LuxuryButton
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={step === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </LuxuryButton>

          {step < BOOKING_STEPS.length - 1 ? (
            <LuxuryButton type="button" onClick={nextStep} className="gap-2">
              Continue
              <ChevronRight className="h-4 w-4" />
            </LuxuryButton>
          ) : (
            <LuxuryButton type="submit" disabled={mutation.isPending} className="gap-2">
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Confirm Booking'
              )}
            </LuxuryButton>
          )}
        </div>
      </form>
    </div>
  );
}
