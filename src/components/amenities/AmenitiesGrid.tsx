'use client';

import { AMENITIES } from '@/lib/amenities-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';
import { AmenityCard } from './AmenityCard';

export function AmenitiesGrid() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Complete Facilities"
            title="Every Amenity, Elevated"
            description="From essential comforts to signature experiences — explore everything Vidhaan Farm House has to offer."
          />
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity, index) => (
            <AmenityCard key={amenity.slug} amenity={amenity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
