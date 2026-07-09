'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Calendar, Users, Loader2 } from 'lucide-react';
import { bookingApi } from '@/lib/api';
import { calculateNights, calculateTotal, formatPrice, cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/context/AuthContext';
import type { Property } from '@/types';
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

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Name is required'),
  guestEmail: z.string().email('Valid email required'),
  guestPhone: z.string().min(10, 'Valid phone required'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  property: Property;
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  initialGuests?: number;
  initialSpecialRequests?: string;
}

export function BookingForm({
  property,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialSpecialRequests,
}: BookingFormProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [checkIn, setCheckIn] = useState<Date | undefined>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(initialCheckOut);
  const [guests, setGuests] = useState(String(initialGuests));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: user?.name || '',
      guestEmail: user?.email || '',
      guestPhone: user?.phone || '',
      specialRequests: initialSpecialRequests || '',
    },
  });

  const nights =
    checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const total =
    checkIn && checkOut
      ? calculateTotal(property.pricePerNight, checkIn, checkOut)
      : 0;

  const mutation = useMutation({
    mutationFn: (data: BookingFormValues) =>
      bookingApi.create({
        propertyId: property._id,
        checkIn: checkIn!,
        checkOut: checkOut!,
        guests: Number(guests),
        ...data,
      }),
    onSuccess: () => {
      toast.success('Booking request submitted successfully!');
      router.push('/my-bookings');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to complete your booking');
      router.push('/auth/login?redirect=/booking');
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Check In
          </Label>
          <Popover>
            <PopoverTrigger
              type="button"
              className={cn(
                'flex h-11 w-full items-center rounded-lg border border-border bg-white px-4 text-sm',
                !checkIn && 'text-muted-foreground'
              )}
            >
              {checkIn ? format(checkIn, 'dd MMM yyyy') : 'Select date'}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Check Out
          </Label>
          <Popover>
            <PopoverTrigger
              type="button"
              className={cn(
                'flex h-11 w-full items-center rounded-lg border border-border bg-white px-4 text-sm',
                !checkOut && 'text-muted-foreground'
              )}
            >
              {checkOut ? format(checkOut, 'dd MMM yyyy') : 'Select date'}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date <= (checkIn || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Guests */}
      <div>
        <Label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          Guests
        </Label>
        <Select value={guests} onValueChange={(value) => value && setGuests(value)}>
          <SelectTrigger className="h-11 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} Guest{n > 1 ? 's' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Guest Details */}
      <div className="space-y-4 border-t border-border pt-6">
        <h4 className="font-heading text-lg">Guest Details</h4>
        <div>
          <Label htmlFor="guestName">Full Name</Label>
          <Input id="guestName" {...register('guestName')} className="mt-1.5 bg-white" />
          {errors.guestName && (
            <p className="mt-1 text-xs text-destructive">{errors.guestName.message}</p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="guestEmail">Email</Label>
            <Input
              id="guestEmail"
              type="email"
              {...register('guestEmail')}
              className="mt-1.5 bg-white"
            />
            {errors.guestEmail && (
              <p className="mt-1 text-xs text-destructive">{errors.guestEmail.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="guestPhone">Phone</Label>
            <Input id="guestPhone" {...register('guestPhone')} className="mt-1.5 bg-white" />
            {errors.guestPhone && (
              <p className="mt-1 text-xs text-destructive">{errors.guestPhone.message}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <Textarea
            id="specialRequests"
            {...register('specialRequests')}
            className="mt-1.5 bg-white"
            rows={3}
          />
        </div>
      </div>

      {/* Price Summary */}
      {nights > 0 && (
        <div className="rounded-xl bg-cream-dark p-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {formatPrice(property.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}
            </span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3">
            <span className="font-medium">Total</span>
            <span className="font-heading text-xl text-gold">{formatPrice(total)}</span>
          </div>
        </div>
      )}

      <LuxuryButton
        type="submit"
        size="lg"
        className="w-full"
        disabled={mutation.isPending || !checkIn || !checkOut}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Confirm Reservation'
        )}
      </LuxuryButton>

      <p className="text-center text-xs text-muted-foreground">
        You won&apos;t be charged yet. Our team will confirm availability within 24 hours.
      </p>
    </form>
  );
}
