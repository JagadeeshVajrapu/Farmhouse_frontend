import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google';

/** Primary heading font — elegant serif */
export const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/** Body font — clean geometric sans */
export const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/** Accent display font — luxury editorial */
export const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const fontVariables = `${playfair.variable} ${dmSans.variable} ${cormorant.variable}`;
