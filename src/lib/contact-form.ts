import { z } from 'zod';

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

/** Format Indian mobile: +91 XXXXX XXXXX */
export function formatIndianPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  let local = digits;

  if (local.startsWith('91') && local.length > 10) {
    local = local.slice(2);
  } else if (local.startsWith('0')) {
    local = local.slice(1);
  }

  local = local.slice(0, 10);

  if (!local) return '';
  if (local.length <= 5) return `+91 ${local}`;
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

/** Normalize phone for API submission */
export function normalizeIndianPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`;
  return value.trim();
}

const phoneSchema = z
  .string()
  .min(1, 'Mobile number is required')
  .refine((val) => {
    const digits = val.replace(/\D/g, '');
    const local =
      digits.startsWith('91') && digits.length > 10 ? digits.slice(2) : digits.startsWith('0') ? digits.slice(1) : digits;
    return local.length === 10 && /^[6-9]/.test(local);
  }, 'Enter a valid 10-digit Indian mobile number');

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
