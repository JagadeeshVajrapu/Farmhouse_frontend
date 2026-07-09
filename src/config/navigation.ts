import { pickImage, pickImages } from '@/lib/media/registry';

const accommodationImages = pickImages('rooms', 4);

export interface NavMegaItem {
  title: string;
  description: string;
  href: string;
  image: string;
  badge?: string;
}

export interface NavMegaSection {
  title: string;
  items: NavMegaItem[];
}

export interface NavLink {
  href: string;
  label: string;
  megaMenu?: NavMegaSection;
}

export const navigation: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/accommodations',
    label: 'Accommodations',
    megaMenu: {
      title: 'Our Residences',
      items: [
        {
          title: 'The Grand Vidhaan Villa',
          description: 'Private infinity pool & bespoke interiors',
          href: '/accommodations/grand-vidhaan-villa',
          image: accommodationImages[0] ?? pickImage('rooms'),
          badge: 'Signature',
        },
        {
          title: 'Serenity Cottage',
          description: 'Intimate boutique retreat with jacuzzi',
          href: '/accommodations/serenity-cottage',
          image: accommodationImages[1] ?? pickImage('rooms'),
          badge: 'Couples',
        },
        {
          title: 'Royal Farmhouse Suite',
          description: 'Heritage architecture with lake views',
          href: '/accommodations/royal-farmhouse-suite',
          image: accommodationImages[2] ?? pickImage('hero'),
          badge: 'Exclusive',
        },
        {
          title: 'Garden View Suite',
          description: 'Botanical gardens & refined comfort',
          href: '/accommodations/garden-view-suite',
          image: accommodationImages[3] ?? pickImage('garden'),
        },
      ],
    },
  },
  { href: '/services', label: 'Services' },
  { href: '/amenities', label: 'Amenities' },
  {
    href: '/experiences',
    label: 'Experiences',
    megaMenu: {
      title: 'Curated Experiences',
      items: [
        {
          title: 'Private Chef Dining',
          description: 'Farm-to-table Michelin-inspired cuisine',
          href: '/experiences#private-chef-dining',
          image: pickImage('food'),
        },
        {
          title: 'Wellness & Spa',
          description: 'Bespoke treatments in nature',
          href: '/experiences#wellness-spa',
          image: pickImage('garden'),
        },
        {
          title: 'Estate Tours',
          description: '50-acre botanical gardens & farms',
          href: '/experiences#estate-tours',
          image: pickImage('lawn'),
        },
        {
          title: 'Sunset Soirées',
          description: 'Live music & panoramic views',
          href: '/experiences#sunset-soirees',
          image: pickImage('night'),
        },
      ],
    },
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const navQuickLinks = [
  { href: '/contact#contact-form', label: 'Send Enquiry' },
  { href: '/gallery', label: 'Gallery' },
];
