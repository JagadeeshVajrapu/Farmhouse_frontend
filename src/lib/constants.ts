export const SITE_NAME = 'Vidhaan Farm House';
export const SITE_TAGLINE = 'Where Luxury Meets Nature';
export const SITE_DESCRIPTION =
  'Experience unparalleled luxury at Vidhaan Farm House — a premium estate retreat offering world-class accommodations, bespoke experiences, and timeless elegance in the heart of nature.';

import { contactConfig } from '@/config/site';
import { getFeaturedMedia, pickImage, pickImages } from '@/lib/media/registry';

export const CONTACT = {
  phone: contactConfig.phone,
  email: contactConfig.email,
  address: contactConfig.address,
  whatsapp: contactConfig.whatsapp,
};

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/vidhaanfarmhouse',
  facebook: 'https://facebook.com/vidhaanfarmhouse',
  twitter: 'https://twitter.com/vidhaanfarmhouse',
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/accommodations', label: 'Accommodations' },
  { href: '/services', label: 'Services' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const EXPERIENCES = [
  {
    slug: 'private-chef-dining',
    title: 'Private Chef Dining',
    description: 'Savour farm-to-table cuisine crafted by our Michelin-trained chefs in an intimate setting.',
    image: pickImage('food'),
    icon: 'UtensilsCrossed',
  },
  {
    slug: 'wellness-spa',
    title: 'Wellness & Spa',
    description: 'Rejuvenate with bespoke spa treatments, yoga sessions, and meditation in nature.',
    image: pickImage('garden'),
    icon: 'Sparkles',
  },
  {
    slug: 'estate-tours',
    title: 'Estate Tours',
    description: 'Explore our 50-acre botanical gardens, organic farms, and heritage architecture.',
    image: pickImage('lawn'),
    icon: 'Trees',
  },
  {
    slug: 'sunset-soirees',
    title: 'Sunset Soirées',
    description: 'Exclusive evening gatherings with live music, fine wines, and panoramic views.',
    image: pickImage('night'),
    icon: 'Wine',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya & Arjun Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'An absolutely magical experience. The attention to detail, the warmth of the staff, and the sheer beauty of the estate exceeded every expectation. This is luxury redefined.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'James Mitchell',
    location: 'London',
    rating: 5,
    text: 'Having stayed at Aman and Four Seasons worldwide, Vidhaan Farm House holds its own. The Grand Villa is a masterpiece — private, serene, and impossibly elegant.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'We celebrated our anniversary here and it was perfection. From the candlelit dinner by the pool to the morning yoga session — every moment was curated with love.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
];

export const GALLERY_IMAGES = getFeaturedMedia(8).map((item) => ({
  src: item.src,
  alt: item.alt,
}));

const propertyImages = pickImages('rooms', 4);

/** Fallback properties when API is unavailable */
export const FALLBACK_PROPERTIES = [
  {
    _id: '1',
    name: 'The Grand Vidhaan Villa',
    slug: 'grand-vidhaan-villa',
    description: 'An opulent private villa nestled within manicured gardens with a private pool and bespoke interiors.',
    shortDescription: 'Opulent private villa with infinity pool',
    type: 'villa' as const,
    pricePerNight: 0,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4,
    size: 6500,
    amenities: ['Private Pool', 'Butler Service', 'Home Theatre'],
    images: [{ url: propertyImages[0] || pickImage('rooms'), alt: 'Grand Villa' }],
    featured: true,
    isAvailable: true,
    location: 'Vidhaan Farm House, Chhatarpur',
  },
  {
    _id: '2',
    name: 'Serenity Cottage',
    slug: 'serenity-cottage',
    description: 'A charming boutique cottage offering intimate luxury with garden views and refined comfort.',
    shortDescription: 'Boutique cottage with jacuzzi',
    type: 'cottage' as const,
    pricePerNight: 0,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    size: 2800,
    amenities: ['Private Jacuzzi', 'Fireplace', 'Garden Terrace'],
    images: [{ url: propertyImages[1] || pickImage('rooms'), alt: 'Serenity Cottage' }],
    featured: true,
    isAvailable: true,
    location: 'Vidhaan Farm House, Chhatarpur',
  },
  {
    _id: '3',
    name: 'Royal Farmhouse Suite',
    slug: 'royal-farmhouse-suite',
    description: 'The crown jewel spanning two levels with heritage architecture and expansive living spaces.',
    shortDescription: 'Heritage suite with lake view',
    type: 'farmhouse' as const,
    pricePerNight: 0,
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    size: 9000,
    amenities: ['Private Spa', 'Lake View', 'Private Chef'],
    images: [{ url: propertyImages[2] || pickImage('hero'), alt: 'Royal Suite' }],
    featured: true,
    isAvailable: true,
    location: 'Vidhaan Farm House, Chhatarpur',
  },
  {
    _id: '4',
    name: 'Garden View Suite',
    slug: 'garden-view-suite',
    description: 'Elegant suite overlooking botanical gardens with refined comfort and natural serenity.',
    shortDescription: 'Botanical garden views',
    type: 'suite' as const,
    pricePerNight: 0,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    size: 4200,
    amenities: ['Garden View', 'Private Terrace', 'Luxury Bath'],
    images: [{ url: propertyImages[3] || pickImage('garden'), alt: 'Garden View Suite' }],
    featured: true,
    isAvailable: true,
    location: 'Vidhaan Farm House, Chhatarpur',
  },
];
