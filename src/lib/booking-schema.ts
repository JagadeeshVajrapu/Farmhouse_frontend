import { z } from 'zod';

export const EVENT_TYPES = [
  { value: 'stay', label: 'Weekend Stay' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'birthday', label: 'Birthday Party' },
  { value: 'party', label: 'Private Party' },
  { value: 'other', label: 'Other Celebration' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'pay_at_property', label: 'Pay at Property', description: 'Pay on arrival — most popular' },
  { value: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
  { value: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay' },
  { value: 'bank_transfer', label: 'Bank Transfer', description: 'NEFT / IMPS / RTGS' },
] as const;

export const BOOKING_STEPS = [
  { id: 'personal', label: 'Personal Info', description: 'Your contact details' },
  { id: 'event', label: 'Event Details', description: 'Occasion & property' },
  { id: 'guests', label: 'Guests', description: 'Party size' },
  { id: 'calendar', label: 'Calendar', description: 'Check-in date' },
  { id: 'duration', label: 'Stay Duration', description: 'Check-out & nights' },
  { id: 'requirements', label: 'Requirements', description: 'Special requests' },
  { id: 'payment', label: 'Payment', description: 'Payment method' },
  { id: 'review', label: 'Review', description: 'Confirm details' },
] as const;

export const multiStepBookingSchema = z
  .object({
    guestName: z.string().min(2, 'Full name is required'),
    guestEmail: z.string().email('Valid email address required'),
    guestPhone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^[+\d\s-]+$/, 'Invalid phone number'),
    guestAddress: z.string().optional(),

    propertyId: z.string().min(1, 'Please select an accommodation'),
    eventType: z.enum(['stay', 'wedding', 'corporate', 'birthday', 'party', 'other']),
    eventName: z.string().min(2, 'Event name is required'),

    adults: z.number().min(1, 'At least 1 adult required'),
    children: z.number().min(0, 'Invalid count'),

    checkIn: z.date({ error: 'Please select a check-in date' }),
    checkOut: z.date({ error: 'Please select a check-out date' }),

    specialRequests: z.string().optional(),
    cateringRequired: z.boolean(),
    decorationRequired: z.boolean(),
    dietaryRequirements: z.string().optional(),

    paymentMethod: z.enum(['card', 'upi', 'bank_transfer', 'pay_at_property']),
    agreeToTerms: z.boolean().refine((v) => v === true, { message: 'You must agree to the terms' }),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  });

export type MultiStepBookingValues = z.infer<typeof multiStepBookingSchema>;

export const STEP_FIELDS: Record<number, (keyof MultiStepBookingValues)[]> = {
  0: ['guestName', 'guestEmail', 'guestPhone', 'guestAddress'],
  1: ['propertyId', 'eventType', 'eventName'],
  2: ['adults', 'children'],
  3: ['checkIn'],
  4: ['checkOut'],
  5: ['specialRequests', 'cateringRequired', 'decorationRequired', 'dietaryRequirements'],
  6: ['paymentMethod', 'agreeToTerms'],
  7: [],
};
