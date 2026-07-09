/** About page content */

import { pickImage, pickImages } from '@/lib/media/registry';

const used: string[] = [];
const pick = (tag: string) => {
  const img = pickImage(tag, used);
  used.push(img);
  return img;
};

export const ABOUT_BANNER = {
  subtitle: 'Our Heritage',
  title: 'A Legacy of',
  titleAccent: 'Timeless Elegance',
  description:
    'Where heritage meets hospitality — discover the soul of Vidhaan Farm House.',
  image: pick('hero'),
};

export const OUR_STORY = {
  subtitle: 'Est. 2018',
  title: 'Where Dreams Take Root',
  paragraphs: [
    'Vidhaan Farm House was born from a vision to create a sanctuary where the rush of modern life gives way to moments of pure serenity. What began as a cherished family estate has evolved into one of India\'s most sought-after luxury retreats.',
    'Nestled across 50 acres of pristine landscape on the outskirts of New Delhi, every corner of our estate tells a story — of thoughtful design, sustainable luxury, and heartfelt hospitality passed down through generations.',
    'Today, Vidhaan Farm House stands as a testament to the belief that true luxury is not opulence for its own sake, but the art of making every guest feel genuinely cared for.',
  ],
  image: pick('rooms'),
  imageAlt: 'Luxury interior at Vidhaan Farm House',
};

export const MISSION = {
  title: 'Our Mission',
  statement:
    'To craft extraordinary experiences that harmonize luxury with nature, delivering bespoke hospitality that exceeds the expectations of the world\'s most discerning travellers.',
  icon: 'Target',
};

export const VISION = {
  title: 'Our Vision',
  statement:
    'To be recognised as India\'s premier luxury estate retreat — a destination where heritage, sustainability, and unparalleled service converge to redefine farmhouse hospitality.',
  icon: 'Eye',
};

export const TIMELINE = [
  {
    year: '2010',
    title: 'The Beginning',
    description: 'The Sharma family acquires 50 acres of pristine land in Chhatarpur, envisioning a private family retreat.',
    image: pick('garden'),
  },
  {
    year: '2015',
    title: 'Estate Development',
    description: 'Heritage architecture blends with modern luxury as the first residences and botanical gardens take shape.',
    image: pick('entrance'),
  },
  {
    year: '2018',
    title: 'Vidhaan Farm House Opens',
    description: 'The estate welcomes its first guests, earning acclaim for bespoke service and architectural excellence.',
    image: pick('pool'),
  },
  {
    year: '2021',
    title: 'Award Recognition',
    description: 'Honoured with the Luxury Hospitality Award for Best Boutique Estate in North India.',
    image: pick('night'),
  },
  {
    year: '2024',
    title: 'Expanded Experiences',
    description: 'New pool villas, premium event spaces, and curated wellness programs elevate the guest experience.',
    image: pick('lawn'),
  },
];

export const NATURE_COLLAGE = pickImages('garden', 6, used);

export const HOSPITALITY_IMAGE = pick('party-hall');

export const ACHIEVEMENTS_BG = pick('hero');

export const ACHIEVEMENTS = [
  { value: '50+', label: 'Acres of Estate' },
  { value: '500+', label: 'Events Hosted' },
  { value: '12', label: 'Luxury Rooms' },
  { value: '4.9', label: 'Guest Rating' },
  { value: '8+', label: 'Years of Excellence' },
  { value: '100%', label: 'Guest Satisfaction' },
];

export const ABOUT_WHY_CHOOSE = [
  {
    title: 'Heritage Architecture',
    description: 'Modern villas and classic farmhouses blend seamlessly with the natural landscape.',
    icon: 'Landmark',
  },
  {
    title: 'Nature Immersion',
    description: '50 acres of gardens, lawns, and forest trails offer complete serenity.',
    icon: 'Leaf',
  },
  {
    title: 'Bespoke Service',
    description: 'Every celebration and stay is curated with white-glove attention to detail.',
    icon: 'Sparkles',
  },
  {
    title: 'Absolute Privacy',
    description: 'Gated estate with exclusive access for your family, friends, or corporate group.',
    icon: 'Lock',
  },
];

export const NATURE_EXPERIENCE = {
  subtitle: 'Nature & Serenity',
  title: 'Immersed in Green',
  description:
    'Wake to birdsong, stroll through manicured lawns, and unwind by the pool surrounded by lush trees — Vidhaan is nature\'s embrace with luxury at every turn.',
  images: NATURE_COLLAGE.length >= 2 ? NATURE_COLLAGE.slice(0, 2) : [pick('garden'), pick('lawn')],
  features: [
    '50-acre private estate',
    'Manicured lawns & gardens',
    'Pool surrounded by greenery',
    'Outdoor event spaces',
    'Fresh air & open skies',
    'Photo-worthy landscapes',
  ],
};

export const HOSPITALITY = {
  subtitle: 'Our Philosophy',
  title: 'Hospitality from the Heart',
  description:
    'Rooted in the Indian tradition of Atithi Devo Bhava — the guest is God — our team delivers warmth, discretion, and excellence at every interaction.',
  image: HOSPITALITY_IMAGE,
  highlights: [
    {
      title: 'Personal Concierge',
      description: 'Dedicated support from inquiry to farewell, anticipating every need.',
    },
    {
      title: 'Event Excellence',
      description: 'Expert planners for weddings, corporate retreats, and private celebrations.',
    },
    {
      title: 'Culinary Care',
      description: 'Gourmet kitchens and dining spaces for memorable meals with loved ones.',
    },
  ],
};
