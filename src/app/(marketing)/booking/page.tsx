import { redirect } from 'next/navigation';

/** Public booking flow — enquiries via contact form & WhatsApp */
export default function BookingPage() {
  redirect('/contact#contact-form');
}
