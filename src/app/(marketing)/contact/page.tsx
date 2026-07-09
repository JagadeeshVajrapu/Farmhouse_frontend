import type { Metadata } from 'next';
import {
  ContactHero,
  ContactInfoCards,
  ContactFormLazy,
  ContactMap,
  ContactFAQ,
  ContactFinalCTA,
} from '@/components/contact';
import { WhatsAppContactSection } from '@/components/whatsapp';
import { siteConfig, contactConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Vidhaan Farm House for luxury farmhouse bookings, pool parties, weddings, and weekend stays. Call, WhatsApp, or send an inquiry — our concierge team responds within hours.',
  keywords: [
    ...siteConfig.keywords,
    'contact vidhaan farmhouse',
    'farmhouse booking inquiry',
    'Chhatarpur farmhouse contact',
  ],
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: siteConfig.description,
    url: `${siteConfig.url}/contact`,
  },
};

/** JSON-LD structured data for SEO */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: `${siteConfig.url}/contact`,
  telephone: contactConfig.phone,
  email: contactConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contactConfig.address,
    addressLocality: 'Chhatarpur',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 09:00-21:00',
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[#FAFAF8] text-[#0F172A] dark:bg-background dark:text-foreground">
        <ContactHero />
        <ContactInfoCards />
        <ContactFormLazy />
        <WhatsAppContactSection />
        <ContactMap />
        <ContactFAQ />
        <ContactFinalCTA />
      </main>
    </>
  );
}
