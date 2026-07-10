import { z } from 'zod';

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

/** Keep only local 10-digit part and format as XXXXX XXXXX */
export function formatIndianMobileInput(value: string): string {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('91') && digits.length > 10) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length > 10) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits) return '';
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/** Normalize for API: +91XXXXXXXXXX */
export function normalizeIndianPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(-10);
  return `+91${digits}`;
}

const phoneSchema = z
  .string()
  .min(1, 'Mobile number is required')
  .refine((val) => {
    const digits = val.replace(/\D/g, '');
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  }, 'Enter a valid 10-digit Indian mobile number (starts with 6–9)');

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),
  mobile: phoneSchema,
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  eventType: z.string().min(1, 'Please select an event type'),
  accommodation: z.string().optional(),
  preferredDate: z.date({ error: 'Please select your preferred date' }),
  guests: z
    .number({ error: 'Number of guests is required' })
    .min(1, 'At least 1 guest is required')
    .max(500, 'For groups over 500, please call us directly'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(MESSAGE_MIN_LENGTH, `Message must be at least ${MESSAGE_MIN_LENGTH} characters`)
    .max(MESSAGE_MAX_LENGTH, `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters`),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** @deprecated Use formatIndianMobileInput */
export function formatIndianPhone(value: string): string {
  const local = formatIndianMobileInput(value);
  if (!local) return '';
  return `+91 ${local}`;
}
