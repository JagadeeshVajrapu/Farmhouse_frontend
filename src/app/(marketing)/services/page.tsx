import type { Metadata } from 'next';
import { SERVICES } from '@/lib/services-data';
import {
  ServicesHero,
  ServiceStickyNav,
  ServicesOverview,
  ServiceBlock,
} from '@/components/services';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Luxury services at Vidhaan Farm House — pool parties, birthdays, corporate events, weddings, anniversaries, and bespoke private celebrations.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceStickyNav />
      <ServicesOverview />
      {SERVICES.map((service, index) => (
        <ServiceBlock key={service.slug} service={service} index={index} />
      ))}
      <FinalCTASection />
    </>
  );
}
