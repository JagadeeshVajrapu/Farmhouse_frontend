import { contactConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { pickImage } from '@/lib/media/registry';

export const CONTACT_PAGE = {
  title: "Let's Plan Your",
  titleAccent: 'Perfect Getaway',
  subtitle:
    "Whether you're planning a pool party, birthday celebration, family gathering, or weekend stay, our team is here to help.",
  banner: pickImage('hero'),
  workingHours: contactConfig.workingHours,
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d77.1751!3d28.4962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f42b89e5c8b%3A0x1!2sChhatarpur%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000',
};

export const CONTACT_CARDS = [
  {
    id: 'phone',
    label: 'Mobile',
    value: contactConfig.phone,
    href: `tel:${contactConfig.phone.replace(/\s/g, '')}`,
    description: 'Speak with our concierge team',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: contactConfig.phone,
    href: buildWhatsAppUrl(),
    description: 'Quick responses, 7 days a week',
  },
  {
    id: 'email',
    label: 'Email',
    value: contactConfig.email,
    href: `mailto:${contactConfig.email}`,
    description: 'For detailed inquiries & proposals',
  },
  {
    id: 'brand',
    label: 'Brand Name',
    value: contactConfig.brandName,
    description: 'Vidhaan Farm House — luxury estate retreat',
  },
  {
    id: 'hours',
    label: 'Working Hours',
    value: contactConfig.workingHours,
    description: 'We are always delighted to assist',
  },
  {
    id: 'location',
    label: 'Location',
    value: contactConfig.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(contactConfig.address)}`,
    description: 'Chhatarpur, New Delhi',
  },
] as const;

export const CONTACT_ACCOMMODATIONS = [
  { value: 'grand-vidhaan-villa', label: 'The Grand Vidhaan Villa' },
  { value: 'serenity-cottage', label: 'Serenity Cottage' },
  { value: 'royal-farmhouse-suite', label: 'Royal Farmhouse Suite' },
  { value: 'garden-view-suite', label: 'Garden View Suite' },
  { value: 'not-sure', label: 'Not sure yet / General enquiry' },
] as const;

export const CONTACT_EVENT_TYPES = [
  { value: 'weekend-stay', label: 'Weekend Stay' },
  { value: 'pool-party', label: 'Pool Party' },
  { value: 'birthday', label: 'Birthday Celebration' },
  { value: 'wedding', label: 'Wedding / Pre-Wedding' },
  { value: 'corporate', label: 'Corporate Retreat' },
  { value: 'family', label: 'Family Gathering' },
  { value: 'other', label: 'Other Event' },
] as const;

export const CONTACT_FAQ = [
  {
    question: 'How quickly will I receive a response?',
    answer:
      'Our concierge team responds to all inquiries within 2–4 hours during business hours, and within 24 hours on weekends and holidays.',
  },
  {
    question: 'Can I visit the property before booking?',
    answer:
      'Yes. We offer complimentary property tours by appointment. Contact us via phone or WhatsApp to schedule your private visit.',
  },
  {
    question: 'Do you offer custom event packages?',
    answer:
      'Absolutely. From intimate gatherings to grand celebrations, our events team creates bespoke packages tailored to your vision and budget.',
  },
  {
    question: 'What is the best way to reach you urgently?',
    answer:
      'For urgent inquiries, WhatsApp or phone is fastest. Our team is available Mon–Sun, 9:00 AM – 9:00 PM IST.',
  },
] as const;
