import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const BOOK_NOW_MESSAGE =
  'Hello Vidhaan Farm House,\n\nI would like to book your farmhouse. Please share availability and details.\n\nThank you!';

export const ENQUIRY_HREF = '/contact#contact-form';

export interface BookNowOptions {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  accommodation?: string;
}

export const bookNowWhatsAppUrl = (opts?: BookNowOptions) => {
  let message = BOOK_NOW_MESSAGE;
  if (opts?.checkIn || opts?.checkOut || opts?.guests || opts?.accommodation) {
    message += '\n\n';
    if (opts.accommodation) message += `Accommodation: ${opts.accommodation}\n`;
    if (opts.checkIn) message += `Arrival: ${opts.checkIn}\n`;
    if (opts.checkOut) message += `Departure: ${opts.checkOut}\n`;
    if (opts.guests) message += `Guests: ${opts.guests}\n`;
  }
  return buildWhatsAppUrl(message);
};
