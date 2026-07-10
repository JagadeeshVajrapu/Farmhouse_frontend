/** Homepage content & configuration */

import {
  HERO_MEDIA,
  pickImage,
  pickImages,
  getFeaturedMedia,
} from '@/lib/media/registry';

const used: string[] = [];
const pick = (tag: string) => {
  const img = pickImage(tag, used);
  used.push(img);
  return img;
};

export const HERO_VIDEO = HERO_MEDIA.video ?? '/media/videos/estate-tour-01.mp4';
export const HERO_POSTER = HERO_MEDIA.poster;

/** Homepage virtual tour — primary full-length film */
export const VIDEO_TOUR_URL = '/media/videos/event-highlights-01.mp4';
export const VIDEO_TOUR_POSTER = '/media/images/pool-party-01.jpeg';

/** Preferred order for customer-facing video tours */
export const HOME_VIDEO_ORDER = [
  'event-highlights-01',
  'property-walk-01',
  'pool-tour-01',
  'estate-tour-01',
] as const;

/** Unique hero slideshow images (no video) — entrance first, then estate highlights */
export const HERO_SLIDES = [
  '/media/images/entrance-gate-02.png',
  ...pickImages('hero', 3, used)
    .concat(pickImages('pool', 3, used))
    .concat(pickImages('garden', 2, used))
    .filter((src, i, arr) => arr.indexOf(src) === i),
].slice(0, 7);

export const STATS = [
  { value: 50, suffix: '+', label: 'Acres of Estate' },
  { value: 12, suffix: '', label: 'Luxury Residences' },
  { value: 500, suffix: '+', label: 'Happy Guests' },
  { value: 4.9, suffix: '', label: 'Guest Rating', decimal: true },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Bespoke Hospitality',
    description:
      'Every stay is curated with personalized butler service, anticipating your needs before you express them.',
    icon: 'Concierge',
  },
  {
    title: 'Architectural Excellence',
    description:
      'Heritage craftsmanship meets contemporary design in residences that redefine luxury living.',
    icon: 'Building',
  },
  {
    title: 'Culinary Artistry',
    description:
      'Farm-to-table dining with ingredients harvested from our organic gardens and local artisan producers.',
    icon: 'ChefHat',
  },
  {
    title: 'Absolute Privacy',
    description:
      'Secluded within 50 acres, enjoy complete discretion for celebrations, retreats, and intimate gatherings.',
    icon: 'Shield',
  },
];

export const HOME_AMENITIES = [
  { name: 'Swimming Pool', icon: 'Waves', image: pick('pool'), slug: 'swimming-pool' },
  { name: 'Luxury Rooms', icon: 'BedDouble', image: pick('rooms'), slug: 'rooms' },
  { name: 'Party Hall', icon: 'PartyPopper', image: pick('party-hall'), slug: 'party-hall' },
  { name: 'Garden & Lawn', icon: 'Flower2', image: pick('garden'), slug: 'garden' },
  { name: 'Gourmet Kitchen', icon: 'ChefHat', image: pick('kitchen'), slug: 'kitchen' },
  { name: 'Secure Parking', icon: 'Car', image: pick('parking'), slug: 'parking' },
  { name: 'Premium Sound', icon: 'Speaker', image: pick('speaker'), slug: 'speaker' },
  { name: 'Outdoor Seating', icon: 'Armchair', image: pick('outdoor-seating'), slug: 'outdoor-seating' },
];

/** @deprecated Use HOME_AMENITIES */
export const AMENITIES = HOME_AMENITIES.map(({ name, icon }) => ({ name, icon }));

export const SERVICES = [
  {
    title: 'Pool Party',
    description: 'Private poolside celebrations with premium sound, décor, and gourmet catering.',
    image: pick('party'),
    href: '/services#pool-party',
  },
  {
    title: 'Weekend Stay',
    description: 'Escape the city in our luxury rooms with pool access and full estate amenities.',
    image: pick('rooms'),
    href: '/services#weekend-stay',
  },
  {
    title: 'Corporate Events',
    description: 'Inspire your team in spacious halls and lush lawns designed for offsites.',
    image: pick('corporate'),
    href: '/services#corporate',
  },
  {
    title: 'Family Gatherings',
    description: 'Multi-generational celebrations with rooms, kitchen, and outdoor space for all ages.',
    image: pick('family'),
    href: '/services#family',
  },
];

export const EVENTS = [
  {
    title: 'Night Celebrations',
    description: 'Magical evenings under fairy lights on our expansive lawn.',
    image: pick('night'),
    tag: 'Evenings',
  },
  {
    title: 'Pool Parties',
    description: 'Sun-soaked celebrations at our private swimming pool.',
    image: pick('pool'),
    tag: 'Poolside',
  },
  {
    title: 'Private Events',
    description: 'Bespoke gatherings from birthdays to anniversaries in luxury settings.',
    image: pick('events'),
    tag: 'Celebrations',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What are the check-in and check-out times?',
    answer:
      'Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out may be arranged subject to availability.',
  },
  {
    question: 'Is Vidhaan Farm House suitable for large events?',
    answer:
      'Yes. Our estate accommodates weddings up to 500 guests, corporate events, and private celebrations with dedicated event planning teams.',
  },
  {
    question: 'Do you offer airport transfers?',
    answer:
      'Complimentary luxury transfers from Delhi IGI Airport can be arranged for suite and villa bookings. Please inform us 48 hours in advance.',
  },
  {
    question: 'Are children welcome?',
    answer:
      'Absolutely. We offer family-friendly accommodations, kids\' activities, and customized dining options for younger guests.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Free cancellation up to 7 days before arrival. Cancellations within 7 days are subject to a one-night charge. Peak season policies may vary.',
  },
  {
    question: 'Is the estate pet-friendly?',
    answer:
      'Selected residences welcome pets with prior approval. A pet concierge service including grooming and walking is available on request.',
  },
];

/** Homepage featured slider — images only (videos share poster URLs) */
const seenFeaturedSrc = new Set<string>();
export const FEATURED_GALLERY = getFeaturedMedia(20)
  .filter((item) => item.type === 'image')
  .filter((item) => {
    if (seenFeaturedSrc.has(item.src)) return false;
    seenFeaturedSrc.add(item.src);
    return true;
  })
  .slice(0, 10)
  .map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    title: item.title,
    type: item.type as 'image' | 'video',
    videoSrc: item.videoSrc,
  }));

export const TESTIMONIALS_BG = pick('night');

export const CTA_BACKGROUND = pickImage('garden', used);

export const LOCATION = {
  lat: 28.4962,
  lng: 77.1751,
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.1751!3d28.4962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDI5JzQ2LjMiTiA3N8KwMTAnMzAuNCJF!5e0!3m2!1sen!2sin!4v1234567890',
};

export const GALLERY_PREVIEW_IMAGES = pickImages('estate', 8, used).map((src, i) => ({
  src,
  alt: `Vidhaan Farm House — estate view ${i + 1}`,
}));
