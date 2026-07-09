/** WhatsApp business number (no + prefix for wa.me links) */
export const WHATSAPP_NUMBER = '918447790095';

export const WHATSAPP_DEFAULT_MESSAGE = `Hello Vidhaan Farm House,

I would like to know more about your farmhouse, availability, and booking process.

Please assist me.`;

/** Builds a wa.me link — opens WhatsApp app on mobile, WhatsApp Web on desktop */
export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DISPLAY_NUMBER = '+91 84477 90095';

/** Click-to-call link */
export const PHONE_TEL = 'tel:+918447790095';
export const PHONE_DISPLAY = WHATSAPP_DISPLAY_NUMBER;
