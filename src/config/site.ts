export const siteConfig = {
  name: 'Vidhaan Farm House',
  tagline: 'Where Luxury Meets Nature',
  description:
    'Experience unparalleled luxury at Vidhaan Farm House — a premium estate retreat offering world-class accommodations, bespoke experiences, and timeless elegance.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  ogImage: '/og-image.jpg',
  creator: 'Vidhaan Farm House',
  keywords: [
    'luxury farmhouse',
    'premium resort',
    'Delhi NCR retreat',
    'boutique hotel',
    'farmhouse booking',
    'Vidhaan Farm House',
  ],
} as const;

export const contactConfig = {
  phone: '+91 84477 90095',
  email: 'vidhaanfarms@gmail.com',
  address: 'Noida Sector-134, Uttar Pradesh-201304',
  whatsapp: '+918447790095',
  brandName: 'Vidhaan Farm House',
  workingHours: '9:00 AM – 9:00 PM',
} as const;

export const socialConfig = {
  instagram: 'https://instagram.com/vidhaanfarmhouse',
  facebook: 'https://facebook.com/vidhaanfarmhouse',
  twitter: 'https://twitter.com/vidhaanfarmhouse',
} as const;

export const navConfig = {
  main: [
    { href: '/', label: 'Home' },
    { href: '/accommodations', label: 'Accommodations' },
    { href: '/services', label: 'Services' },
    { href: '/amenities', label: 'Amenities' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;
