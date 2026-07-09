'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Bed, Bath, Users, ArrowRight } from 'lucide-react';
import { propertyApi } from '@/lib/api';
import { resolveProperties, enrichProperty } from '@/lib/properties';
import { SectionHeading } from '@/components/ui/section-heading';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';
import type { Property } from '@/types';

function AccommodationCard({ property }: { property: Property }) {
  const imageUrl = property.images[0]?.url || '/media/images/hero-estate-01.jpeg';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl">
      <Link href={`/accommodations/${property.slug}`} className="group block flex-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-charcoal">
            {property.type}
          </span>
        </div>
        <div className="p-6">
          <h2 className="font-heading text-2xl font-light text-foreground transition-colors group-hover:text-gold">
            {property.name}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {property.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Bed className="h-3.5 w-3.5 text-gold" /> {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-gold" /> {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-gold" /> {property.maxGuests} Guests
            </span>
          </div>
          <p className="mt-4 flex items-center gap-1 text-sm text-gold">
            View details
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </p>
        </div>
      </Link>

      <div className="flex flex-col gap-3 border-t border-border/60 p-6 pt-4 sm:flex-row">
        <LuxuryButton
          href={bookNowWhatsAppUrl({ accommodation: property.name })}
          external
          size="sm"
          className="flex-1"
        >
          Book on WhatsApp
        </LuxuryButton>
        <LuxuryButton href={ENQUIRY_HREF} variant="outline" size="sm" className="flex-1">
          Send Enquiry
        </LuxuryButton>
      </div>
    </article>
  );
}

export default function AccommodationsPage() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      try {
        const res = await propertyApi.getAll();
        return resolveProperties(res.data.data);
      } catch {
        return resolveProperties(null);
      }
    },
    placeholderData: () => resolveProperties(null).map((p) => enrichProperty(p)),
  });

  const list = resolveProperties(properties).map((p) => enrichProperty(p));

  return (
    <>
      <section className="bg-charcoal pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            subtitle="Accommodations"
            title="Choose Your Sanctuary"
            description="Each residence offers a unique expression of luxury — thoughtfully designed for your comfort and privacy."
            light
          />
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {isLoading && list.length === 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {list.map((property) => (
                <AccommodationCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
