import type { Metadata } from 'next';
import { AmenitiesHero, AmenitiesHighlights, AmenitiesGrid } from '@/components/amenities';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export const metadata: Metadata = {
  title: 'Amenities',
  description:
    'Explore world-class amenities at Vidhaan Farm House — swimming pool, luxury rooms, gourmet kitchen, party hall, gardens, and more across 50 acres.',
};

export default function AmenitiesPage() {
  return (
    <>
      <AmenitiesHero />
      <AmenitiesHighlights />
      <AmenitiesGrid />
      <FinalCTASection />
    </>
  );
}
