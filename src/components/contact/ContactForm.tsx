'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Loader2, Send, Check, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { FieldErrors } from 'react-hook-form';
import { contactApi } from '@/lib/api';
import { CONTACT_EVENT_TYPES, CONTACT_ACCOMMODATIONS } from '@/lib/contact-data';
import {
  contactFormSchema,
  formatIndianMobileInput,
  normalizeIndianPhone,
  MESSAGE_MAX_LENGTH,
  type ContactFormValues,
} from '@/lib/contact-form';
import { FloatingInput, FloatingTextarea, FloatingSelect } from './FloatingField';
import { ContactSuccessModal } from './ContactSuccessModal';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      eventType: '',
      accommodation: '',
      guests: 2,
      message: '',
    },
  });

  const messageValue = watch('message') || '';
  const messageCount = messageValue.length;

  useEffect(() => {
    const timer = requestAnimationFrame(() => setFocus('fullName'));
    return () => cancelAnimationFrame(timer);
  }, [setFocus]);

  const scrollToField = (fieldId: string) => {
    const el = document.getElementById(fieldId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const onInvalid = (fieldErrors: FieldErrors<ContactFormValues>) => {
    const firstKey = (Object.keys(fieldErrors)[0] || 'fullName') as keyof ContactFormValues;
    const fieldId = firstKey === 'preferredDate' ? 'preferredDate' : String(firstKey);
    scrollToField(fieldId);
    setFocus(firstKey);
    toast.error('Please fix the highlighted fields before submitting.');
  };

  const isFieldValid = (name: keyof ContactFormValues) =>
    !!(touchedFields[name] || dirtyFields[name]) && !errors[name];

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await contactApi.submit({
        name: data.fullName,
        phone: normalizeIndianPhone(data.mobile),
        email: data.email,
        eventType: data.eventType,
        preferredDate: data.preferredDate.toISOString(),
        guestCount: data.guests,
        message: data.accommodation
          ? `Preferred accommodation: ${CONTACT_ACCOMMODATIONS.find((a) => a.value === data.accommodation)?.label || data.accommodation}\n\n${data.message}`
          : data.message,
      });
      reset();
      setShowSuccessModal(true);
      if (res.data.emailSent === false) {
        toast.message('Enquiry received', {
          description:
            'Your details were saved. If you do not hear back within 24 hours, please call or WhatsApp us.',
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string; errors?: { msg: string }[] } };
      };
      const validationMsg = err.response?.data?.errors?.[0]?.msg;
      toast.error(
        validationMsg || err.response?.data?.message || 'Failed to send message. Please try again.'
      );
    }
  };

  return (
    <>
      <ContactSuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

      <section
        id="contact-form"
        className="scroll-mt-28 bg-[#FAFAF8] py-16 dark:bg-background sm:py-20 lg:py-28"
        aria-labelledby="contact-form-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227] dark:text-gold">
                Send an Inquiry
              </p>
              <h2
                id="contact-form-heading"
                className="mt-4 font-heading text-3xl font-light text-[#0F172A] dark:text-foreground md:text-4xl lg:text-5xl"
              >
                Tell Us About
                <br />
                <span className="italic text-[#C9A227] dark:text-gold">Your Celebration</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#0F172A]/60 dark:text-muted-foreground">
                Share your vision and our dedicated events team will craft a bespoke proposal —
                whether it&apos;s an intimate weekend escape or a grand celebration.
              </p>
              <ul className="mt-10 space-y-4" aria-label="Benefits">
                {['Personalized event proposals', 'Complimentary property tours', 'Flexible packages'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A227]/10 dark:bg-gold/10">
                        <Check className="h-3 w-3 text-[#C9A227] dark:text-gold" aria-hidden />
                      </span>
                      <span className="text-sm text-[#0F172A]/70 dark:text-muted-foreground">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn(
                'relative rounded-3xl border p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-500',
                'border-white/80 bg-white/60 hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)]',
                'dark:border-border dark:bg-card/70 dark:hover:border-gold/20 dark:hover:shadow-[0_28px_90px_rgba(0,0,0,0.35)]',
                'sm:p-8 lg:p-10',
                isSubmitting && 'pointer-events-none opacity-80'
              )}
            >
              {isSubmitting && (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-background/40 backdrop-blur-[2px] dark:bg-background/60"
                  aria-hidden
                >
                  <Loader2 className="h-8 w-8 animate-spin text-[#C9A227] dark:text-gold" />
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="space-y-5"
                noValidate
                aria-label="Contact enquiry form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingInput
                    id="fullName"
                    label="Full Name *"
                    autoComplete="name"
                    isValid={isFieldValid('fullName')}
                    error={errors.fullName?.message}
                    {...register('fullName')}
                  />
                  <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-4 top-[2.35rem] z-10 text-sm font-medium text-[#0F172A]/60 dark:text-muted-foreground"
                        >
                          +91
                        </span>
                        <FloatingInput
                          id="mobile"
                          label="Mobile Number *"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          maxLength={11}
                          className="pl-12 tracking-wide"
                          value={field.value}
                          onChange={(e) => field.onChange(formatIndianMobileInput(e.target.value))}
                          onBlur={field.onBlur}
                          isValid={isFieldValid('mobile')}
                          error={errors.mobile?.message}
                          hint="10-digit number (e.g. 84477 90095)"
                        />
                      </div>
                    )}
                  />
                </div>

                <FloatingInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  isValid={isFieldValid('email')}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    name="eventType"
                    control={control}
                    render={({ field }) => (
                      <FloatingSelect
                        id="eventType"
                        label="Event Type *"
                        value={field.value}
                        onChange={field.onChange}
                        isValid={isFieldValid('eventType')}
                        error={errors.eventType?.message}
                        options={CONTACT_EVENT_TYPES.map((t) => ({
                          value: t.value,
                          label: t.label,
                        }))}
                      />
                    )}
                  />

                  <Controller
                    name="accommodation"
                    control={control}
                    render={({ field }) => (
                      <FloatingSelect
                        id="accommodation"
                        label="Accommodation"
                        value={field.value}
                        onChange={field.onChange}
                        isValid={isFieldValid('accommodation')}
                        error={errors.accommodation?.message}
                        placeholder="Choose a stay"
                        options={CONTACT_ACCOMMODATIONS.map((a) => ({
                          value: a.value,
                          label: a.label,
                        }))}
                      />
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    name="preferredDate"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger
                            id="preferredDate"
                            type="button"
                            aria-invalid={!!errors.preferredDate}
                            aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                            className={cn(
                              fieldBase,
                              'flex w-full min-h-[52px] items-center pb-3 pt-6 text-left text-sm',
                              'text-[#0F172A] dark:text-foreground',
                              errors.preferredDate && fieldErrorStyles,
                              field.value && fieldValidStyles
                            )}
                          >
                            {field.value ? format(field.value, 'dd MMM yyyy') : '\u00A0'}
                            <CalendarIcon className="ml-auto h-4 w-4 text-[#C9A227] dark:text-gold" aria-hidden />
                          </PopoverTrigger>
                          <span className="pointer-events-none absolute left-4 top-2 text-[11px] uppercase tracking-wider text-[#C9A227] dark:text-gold">
                            Preferred Date *
                          </span>
                          <PopoverContent className="w-auto max-w-[calc(100vw-2rem)] p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const check = new Date(date);
                                check.setHours(0, 0, 0, 0);
                                return check < today;
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.preferredDate && (
                          <p
                            id="preferredDate-error"
                            role="alert"
                            className="mt-2 flex items-start gap-1.5 text-xs text-red-500 dark:text-red-400"
                          >
                            {errors.preferredDate.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <FloatingInput
                    id="guests"
                    label="Number of Guests *"
                    type="number"
                    min={1}
                    max={500}
                    inputMode="numeric"
                    isValid={isFieldValid('guests')}
                    error={errors.guests?.message}
                    {...register('guests', { valueAsNumber: true })}
                  />
                </div>

                <FloatingTextarea
                  id="message"
                  label="Your Message *"
                  maxLength={MESSAGE_MAX_LENGTH}
                  charCount={messageCount}
                  isValid={isFieldValid('message')}
                  error={errors.message?.message}
                  {...register('message')}
                />

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[10px] text-muted-foreground" id="form-required-note">
                    Fields marked * are required
                  </p>
                  <LuxuryButton
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#0F172A] text-white hover:bg-[#1e293b] dark:bg-gold dark:text-obsidian dark:hover:bg-gold-light sm:w-auto"
                    aria-describedby="form-required-note"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Send Inquiry
                      </>
                    )}
                  </LuxuryButton>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// Shared field styles for date picker (matches FloatingField)
const fieldBase = cn(
  'w-full rounded-xl border px-4 outline-none transition-all duration-300',
  'bg-white/80 border-[#0F172A]/10 dark:border-border dark:bg-card/80',
  'hover:border-[#C9A227]/30 dark:hover:border-gold/30',
  'focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 dark:focus:border-gold dark:focus:ring-gold/20'
);
const fieldErrorStyles = 'border-red-400 focus:border-red-400 focus:ring-red-400/20';
const fieldValidStyles = 'border-emerald-500/40';
