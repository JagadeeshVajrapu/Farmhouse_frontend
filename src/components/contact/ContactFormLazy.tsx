'use client';

import dynamic from 'next/dynamic';
import { ContactFormSkeleton } from './ContactFormSkeleton';

export const ContactFormLazy = dynamic(
  () => import('./ContactForm').then((m) => ({ default: m.ContactForm })),
  {
    loading: () => <ContactFormSkeleton />,
    ssr: false,
  }
);
