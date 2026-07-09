import { getAmenityImage, pickImage } from '@/lib/media/registry';

export interface Amenity {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
  featured?: boolean;
}

const used: string[] = [];
const amenityImg = (slug: string) => {
  const src = getAmenityImage(slug, used);
  used.push(src);
  return src;
};

export const AMENITIES_PAGE = {
  subtitle: 'Estate Amenities',
  title: 'World-Class',
  titleAccent: 'Comforts & Facilities',
  description:
    'Every detail at Vidhaan Farm House is designed for effortless luxury — from the infinity pool to the grand party hall, all set within 50 acres of natural beauty.',
  banner: pickImage('pool'),
};

export const AMENITIES: Amenity[] = [
  {
    slug: 'swimming-pool',
    title: 'Swimming Pool',
    tagline: 'Infinity Edge Luxury',
    description:
      'A stunning infinity pool overlooking manicured gardens — perfect for morning laps, afternoon lounging, or glamorous evening pool parties.',
    image: amenityImg('swimming-pool'),
    icon: 'Waves',
    features: ['Heated infinity pool', 'Poolside cabanas', 'Towel service', 'Evening lighting'],
    featured: true,
  },
  {
    slug: 'rooms',
    title: 'Rooms',
    tagline: 'Boutique Residences',
    description:
      'Thoughtfully designed suites and villas with premium linens, climate control, ensuite bathrooms, and bespoke furnishings throughout.',
    image: amenityImg('rooms'),
    icon: 'BedDouble',
    features: ['King-size beds', 'Blackout curtains', 'Premium toiletries', 'Daily housekeeping'],
    featured: true,
  },
  {
    slug: 'kitchen',
    title: 'Kitchen',
    tagline: 'Chef-Ready Gourmet Space',
    description:
      'A fully equipped professional kitchen with premium appliances — ideal for private chefs, family gatherings, or intimate cooking experiences.',
    image: amenityImg('kitchen'),
    icon: 'ChefHat',
    features: ['Modular setup', 'Premium appliances', 'Cookware & serveware', 'Private chef available'],
  },
  {
    slug: 'parking',
    title: 'Parking',
    tagline: 'Secure & Spacious',
    description:
      'Ample covered and open parking for guests and event attendees, with dedicated valet assistance for premium bookings.',
    image: amenityImg('parking'),
    icon: 'Car',
    features: ['20+ vehicle capacity', 'Covered bays', 'EV charging points', '24/7 security'],
  },
  {
    slug: 'garden',
    title: 'Garden',
    tagline: 'Botanical Paradise',
    description:
      'Lush landscaped gardens with seasonal blooms, walking paths, and secluded corners for meditation, photography, or quiet reflection.',
    image: amenityImg('garden'),
    icon: 'Flower2',
    features: ['50-acre estate', 'Seasonal florals', 'Garden pathways', 'Photo-worthy spots'],
    featured: true,
  },
  {
    slug: 'speaker',
    title: 'Speaker',
    tagline: 'Premium Sound System',
    description:
      'High-fidelity outdoor and indoor audio systems for celebrations, movie nights, yoga sessions, or ambient background music across the estate.',
    image: amenityImg('speaker'),
    icon: 'Speaker',
    features: ['Outdoor PA system', 'Bluetooth connectivity', 'Event DJ setup', 'Multi-zone audio'],
  },
  {
    slug: 'tv',
    title: 'TV',
    tagline: 'Entertainment Hub',
    description:
      'Large-screen smart TVs in living areas and select suites — stream your favourites or enjoy curated resort entertainment.',
    image: amenityImg('tv'),
    icon: 'Tv',
    features: ['Smart TV in suites', 'Streaming apps', 'Home theatre option', 'Sports & movie nights'],
  },
  {
    slug: 'outdoor-seating',
    title: 'Outdoor Seating',
    tagline: 'Al Fresco Living',
    description:
      'Elegant outdoor lounges, dining terraces, and fire pit seating areas designed for sunset cocktails and starlit conversations.',
    image: amenityImg('outdoor-seating'),
    icon: 'Armchair',
    features: ['Terrace dining', 'Fire pit lounge', 'Poolside seating', 'Garden pergolas'],
  },
  {
    slug: 'nature-area',
    title: 'Nature Area',
    tagline: 'Untouched Wilderness',
    description:
      'Explore forest trails, lakeside walks, and open meadows within the estate — a sanctuary where luxury meets the raw beauty of nature.',
    image: amenityImg('nature-area'),
    icon: 'Trees',
    features: ['Forest trails', 'Bird watching', 'Lakeside walks', 'Sunrise viewpoints'],
    featured: true,
  },
  {
    slug: 'party-hall',
    title: 'Party Hall',
    tagline: 'Grand Celebrations',
    description:
      'A spacious, elegantly appointed hall for weddings, corporate events, birthdays, and milestone celebrations — with full event support.',
    image: amenityImg('party-hall'),
    icon: 'PartyPopper',
    features: ['Up to 200 guests', 'Stage & lighting', 'Catering kitchen', 'Event coordination'],
    featured: true,
  },
  {
    slug: 'private-spa',
    title: 'Private Spa',
    tagline: 'Wellness Retreat',
    description:
      'Bespoke spa treatments, steam rooms, and wellness rituals delivered in a tranquil pavilion surrounded by nature.',
    image: amenityImg('rooms'),
    icon: 'Sparkles',
    features: ['In-room treatments', 'Steam & sauna', 'Yoga sessions', 'Ayurvedic therapies'],
  },
  {
    slug: 'butler-service',
    title: 'Butler Service',
    tagline: 'White-Glove Hospitality',
    description:
      'Dedicated butler assistance for premium stays — from unpacking to personalised itineraries and round-the-clock concierge.',
    image: amenityImg('party-hall'),
    icon: 'Bell',
    features: ['Personal butler', 'Unpacking service', 'Itinerary planning', '24/7 assistance'],
  },
  {
    slug: 'fine-dining',
    title: 'Fine Dining',
    tagline: 'Culinary Excellence',
    description:
      'Farm-to-table dining experiences with private chefs, wine pairings, and candlelit meals in stunning settings.',
    image: amenityImg('kitchen'),
    icon: 'UtensilsCrossed',
    features: ['Private chef', 'Wine cellar', 'Custom menus', 'Al fresco dining'],
  },
  {
    slug: 'high-speed-wifi',
    title: 'High-Speed WiFi',
    tagline: 'Stay Connected',
    description:
      'Enterprise-grade WiFi coverage across the entire estate — perfect for remote work retreats and seamless streaming.',
    image: amenityImg('estate'),
    icon: 'Wifi',
    features: ['Full estate coverage', 'High bandwidth', 'Work-from-farmhouse', 'Secure network'],
  },
  {
    slug: 'ev-charging',
    title: 'EV Charging',
    tagline: 'Sustainable Travel',
    description:
      'On-site electric vehicle charging stations for eco-conscious guests arriving in premium electric vehicles.',
    image: amenityImg('parking'),
    icon: 'Zap',
    features: ['Fast charging', 'Multiple bays', 'Tesla compatible', 'Complimentary for guests'],
  },
];

export const AMENITIES_HIGHLIGHTS = [
  { value: '15+', label: 'Premium Amenities' },
  { value: '50', label: 'Acres of Estate' },
  { value: '24/7', label: 'Concierge Support' },
  { value: '100%', label: 'Guest Satisfaction' },
];
