import { getServiceBanner, getServiceGallery, pickImage } from '@/lib/media/registry';

export interface ServicePackage {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  banner: string;
  icon: string;
  features: string[];
  gallery: { src: string; alt: string }[];
  pricing: {
    from: number;
    unit: string;
    note?: string;
  };
  highlights: string[];
}

const serviceUsed: string[] = [];
const serviceBanner = (slug: string) => {
  const src = getServiceBanner(slug, serviceUsed);
  serviceUsed.push(src);
  return src;
};
const serviceGallery = (slug: string) => getServiceGallery(slug, 4);

export const SERVICES_PAGE = {
  subtitle: 'Bespoke Experiences',
  title: 'Curated Services',
  titleAccent: 'For Every Occasion',
  description:
    'From intimate celebrations to grand corporate retreats — discover luxury services crafted around your vision.',
  banner: pickImage('party'),
};

export const SERVICES: ServicePackage[] = [
  {
    slug: 'pool-party',
    title: 'Pool Party',
    tagline: 'Sun, Splash & Celebration',
    description:
      'Transform our infinity pool into your private party paradise with curated music, gourmet bites, and sunset vibes.',
    longDescription:
      'Host an unforgettable poolside celebration at Vidhaan Farm House. Our infinity pool overlooks manicured gardens, offering the perfect backdrop for birthdays, bachelor parties, or simply a day of luxury with friends. Includes dedicated bartender, poolside cabanas, and a chef-curated menu.',
    banner: serviceBanner('pool-party'),
    icon: 'Waves',
    features: [
      'Private infinity pool access',
      'Dedicated bartender & mixologist',
      'Poolside DJ setup',
      'Gourmet canapés & BBQ',
      'Luxury cabanas & loungers',
      'Up to 50 guests',
    ],
    gallery: serviceGallery('pool-party'),
    pricing: { from: 85000, unit: 'per event', note: 'Up to 30 guests included' },
    highlights: ['Sunset timing', 'DJ included', 'Chef menu'],
  },
  {
    slug: 'birthday',
    title: 'Birthday',
    tagline: 'Celebrate in Grand Style',
    description:
      'Milestone birthdays deserve extraordinary settings. We design bespoke celebrations that surprise and delight.',
    longDescription:
      'Whether it\'s a sweet sixteen or a golden jubilee, our event team crafts personalised birthday experiences with themed décor, custom cakes from our pastry chef, live entertainment options, and photography services. Every detail is tailored to honour your special day.',
    banner: serviceBanner('birthday'),
    icon: 'Cake',
    features: [
      'Themed décor & styling',
      'Custom celebration cake',
      'Private dining setup',
      'Photography package',
      'Live music or DJ',
      'Personalised welcome amenities',
    ],
    gallery: serviceGallery('birthday'),
    pricing: { from: 65000, unit: 'per event', note: 'Decor & cake included' },
    highlights: ['Custom themes', 'Pastry chef', 'Photo package'],
  },
  {
    slug: 'weekend-stay',
    title: 'Weekend Stay',
    tagline: 'Your Private Escape',
    description:
      'Disconnect from the city and reconnect with nature in our luxury residences for the perfect weekend retreat.',
    longDescription:
      'Escape Delhi NCR for a rejuvenating weekend at Vidhaan Farm House. Includes two nights in a premium residence, daily breakfast, access to all estate amenities, and a complimentary wellness session. Ideal for couples, friends, or small families seeking tranquility.',
    banner: serviceBanner('weekend-stay'),
    icon: 'Home',
    features: [
      '2 nights luxury accommodation',
      'Daily gourmet breakfast',
      'Estate amenities access',
      'Complimentary spa session',
      'Nature trail & farm tour',
      'Late checkout available',
    ],
    gallery: serviceGallery('weekend-stay'),
    pricing: { from: 45000, unit: 'per couple', note: '2 nights, breakfast included' },
    highlights: ['All-inclusive', 'Spa session', 'Farm tour'],
  },
  {
    slug: 'corporate',
    title: 'Corporate',
    tagline: 'Inspire Beyond the Boardroom',
    description:
      'Elevate team offsites, strategy sessions, and client entertainment in an environment that inspires creativity.',
    longDescription:
      'Our corporate packages include fully-equipped conference facilities, breakout gardens, team-building activities, and executive dining. From intimate board meetings to company-wide retreats for 200+, Vidhaan provides a distinguished alternative to conventional venues.',
    banner: serviceBanner('corporate'),
    icon: 'Briefcase',
    features: [
      'Conference & meeting rooms',
      'AV equipment & high-speed WiFi',
      'Team-building activities',
      'Executive catering packages',
      'Dedicated event coordinator',
      'Capacity up to 200 guests',
    ],
    gallery: serviceGallery('corporate'),
    pricing: { from: 120000, unit: 'per day', note: 'Meeting room & lunch included' },
    highlights: ['Full AV setup', 'Team activities', 'Executive menu'],
  },
  {
    slug: 'family',
    title: 'Family',
    tagline: 'Memories for Generations',
    description:
      'Multi-generational gatherings in spacious residences with activities for every age — from toddlers to grandparents.',
    longDescription:
      'Create lasting family memories at Vidhaan Farm House. Our family packages include interconnecting residences, kids\' activity programs, family-style dining, movie nights under the stars, and safe outdoor play areas across our 50-acre estate.',
    banner: serviceBanner('family'),
    icon: 'Users',
    features: [
      'Family suite accommodations',
      'Kids activity program',
      'Family-style dining',
      'Outdoor games & cycling',
      'Movie night setup',
      'Babysitting on request',
    ],
    gallery: serviceGallery('family'),
    pricing: { from: 55000, unit: 'per night', note: 'Up to 8 family members' },
    highlights: ['Kids program', 'Family dining', 'Safe play areas'],
  },
  {
    slug: 'anniversary',
    title: 'Anniversary',
    tagline: 'Celebrate Love, Lavishly',
    description:
      'Romantic escapes and grand anniversary celebrations designed to honour your journey together.',
    longDescription:
      'Rekindle romance with our anniversary packages featuring candlelit dinners, couples spa treatments, rose petal turndowns, champagne on arrival, and private dining by the lake. For milestone anniversaries, our team creates bespoke celebrations with live musicians and fireworks.',
    banner: serviceBanner('anniversary'),
    icon: 'Heart',
    features: [
      'Romantic suite decoration',
      'Candlelit private dinner',
      'Couples spa treatment',
      'Champagne & cake on arrival',
      'Professional photography',
      'Fireworks (milestone packages)',
    ],
    gallery: serviceGallery('anniversary'),
    pricing: { from: 75000, unit: 'per couple', note: 'Dinner & spa included' },
    highlights: ['Private dinner', 'Couples spa', 'Photography'],
  },
  {
    slug: 'wedding-shoot',
    title: 'Wedding Shoot',
    tagline: 'Picture-Perfect Backdrops',
    description:
      'Cinematic locations across 50 acres — the ultimate destination for pre-wedding and bridal photography.',
    longDescription:
      'Vidhaan Farm House offers diverse shooting locations including heritage architecture, botanical gardens, infinity pool, lake views, and golden-hour terraces. Our wedding shoot packages include location scouting, changing rooms, refreshments, and exclusive area access for uninterrupted sessions.',
    banner: serviceBanner('wedding-shoot'),
    icon: 'Camera',
    features: [
      '10+ scenic shoot locations',
      'Exclusive area access',
      'Bridal changing suite',
      'Refreshment lounge',
      'Golden hour scheduling',
      'Drone photography permitted',
    ],
    gallery: serviceGallery('wedding-shoot'),
    pricing: { from: 45000, unit: 'per day', note: 'Full day location access' },
    highlights: ['10+ locations', 'Bridal suite', 'Drone allowed'],
  },
  {
    slug: 'private-events',
    title: 'Private Events',
    tagline: 'Your Vision, Our Estate',
    description:
      'Fully bespoke events — from product launches to art exhibitions — crafted with white-glove precision.',
    longDescription:
      'No two private events are alike at Vidhaan Farm House. Our events team works with you from concept to execution, handling décor, catering, entertainment, guest logistics, and every detail in between. The entire estate or select venues can be exclusively yours.',
    banner: serviceBanner('private-events'),
    icon: 'Sparkles',
    features: [
      'Full estate buyout available',
      'Bespoke event design',
      'Celebrity chef catering',
      'Live entertainment booking',
      'Valet & guest logistics',
      'Dedicated event director',
    ],
    gallery: serviceGallery('private-events'),
    pricing: { from: 150000, unit: 'per event', note: 'Custom quotes available' },
    highlights: ['Full buyout', 'Bespoke design', 'Event director'],
  },
];

export function getServiceBySlug(slug: string): ServicePackage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
