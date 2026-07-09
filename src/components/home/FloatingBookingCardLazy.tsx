'use client';

import dynamic from 'next/dynamic';

export const FloatingBookingCardLazy = dynamic(
  () => import('./FloatingBookingCard').then((m) => ({ default: m.FloatingBookingCard })),
  { ssr: false }
);
