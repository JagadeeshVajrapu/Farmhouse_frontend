import { contactConfig } from '@/config/site';

export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalPageData {
  title: string;
  lastUpdated?: string;
  intro?: string;
  sections: LegalSection[];
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

const contact = {
  phone: contactConfig.phone,
  email: contactConfig.email,
  address: contactConfig.address,
};

export const PRIVACY_POLICY: LegalPageData = {
  title: 'Privacy Policy',
  lastUpdated: 'June 2026',
  intro:
    'Vidhaan Farm House values your privacy and is committed to protecting your personal information.',
  sections: [
    {
      heading: 'Information We Collect',
      bullets: ['Name', 'Phone Number', 'Email Address', 'Booking Details', 'Event Information'],
    },
    {
      heading: 'How We Use Information',
      paragraphs: ['We use your information to:'],
      bullets: [
        'Process bookings',
        'Respond to inquiries',
        'Provide customer support',
        'Improve our services',
      ],
    },
    {
      heading: 'Data Protection',
      paragraphs: [
        'We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.',
      ],
    },
    {
      heading: 'Third-Party Sharing',
      paragraphs: ['We do not sell, trade, or rent personal information to third parties.'],
    },
    {
      heading: 'Contact',
      paragraphs: ['For privacy-related concerns, contact:'],
    },
  ],
  contact: { email: contact.email },
};

export const DISCLAIMER: LegalPageData = {
  title: 'Disclaimer',
  intro:
    'Vidhaan Farm House makes every effort to ensure the accuracy of information displayed on this website.',
  sections: [
    {
      paragraphs: ['However:'],
      bullets: [
        'Amenities may vary due to maintenance requirements.',
        'Images are for illustrative purposes and may differ slightly from actual appearance.',
        'Availability is subject to prior bookings.',
        'Management reserves the right to modify services, pricing, or policies without prior notice.',
        'Guests are responsible for complying with all applicable laws and venue guidelines.',
      ],
    },
  ],
};

export const REFUND_POLICY: LegalPageData = {
  title: 'Refund Policy',
  sections: [
    {
      heading: 'Cancellation By Guest',
      bullets: [
        'Cancellation 15 days before booking date: 100% refund.',
        'Cancellation 7–14 days before booking date: 50% refund.',
        'Cancellation less than 7 days before booking date: No refund.',
      ],
    },
    {
      heading: 'Refund Processing',
      paragraphs: ['Approved refunds will be processed within 7–10 business days.'],
    },
    {
      heading: 'Cancellation By Management',
      paragraphs: [
        'If Vidhaan Farm House is unable to provide the booked service due to unforeseen circumstances, a full refund will be provided.',
      ],
    },
    {
      heading: 'Force Majeure',
      paragraphs: [
        'No liability shall arise for cancellations caused by natural disasters, government restrictions, or events beyond reasonable control.',
      ],
    },
  ],
};

export const TERMS_CONDITIONS: LegalPageData = {
  title: 'Terms & Conditions',
  intro: 'By booking Vidhaan Farm House, guests agree to the following terms:',
  sections: [
    {
      heading: 'Booking',
      bullets: [
        'Booking is confirmed only after advance payment.',
        'Full payment must be completed before check-in.',
      ],
    },
    {
      heading: 'Guest Responsibility',
      paragraphs: ['Guests shall:'],
      bullets: [
        'Maintain cleanliness.',
        'Respect property and surroundings.',
        'Avoid illegal activities.',
        'Follow safety guidelines.',
      ],
    },
    {
      heading: 'Damages',
      paragraphs: [
        'Any damage to property, furniture, pool equipment, electronics, or fixtures will be charged to the guest.',
      ],
    },
    {
      heading: 'Pool Usage',
      bullets: [
        "Pool usage is at guests' own risk.",
        'Children must be supervised by adults.',
        'Management is not responsible for accidents caused by negligence.',
      ],
    },
    {
      heading: 'Noise Policy',
      paragraphs: [
        'Guests are requested to maintain reasonable noise levels and respect neighboring properties.',
      ],
    },
    {
      heading: 'Prohibited Activities',
      paragraphs: ['The following are strictly prohibited:'],
      bullets: [
        'Illegal substances',
        'Vandalism',
        'Dangerous behavior',
        'Activities causing damage to property',
      ],
    },
    {
      heading: 'Management Rights',
      paragraphs: [
        'Vidhaan Farm House reserves the right to refuse service or terminate bookings for violation of these terms.',
      ],
    },
    {
      heading: 'Contact',
    },
  ],
  contact,
};
