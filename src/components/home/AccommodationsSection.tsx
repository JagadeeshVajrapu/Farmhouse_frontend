'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Bed, Bath, Users, ArrowRight } from 'lucide-react';
import { propertyApi } from '@/lib/api';
import { resolveProperties, enrichProperty } from '@/lib/properties';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Property } from '@/types';

function PropertyCard({ property, index }: { property: Property; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <Link href={`/accommodations/${property.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src={property.images[0]?.url || '/media/images/hero-estate-01.jpeg'}
            alt={property.images[0]?.alt || property.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="mb-2 inline-block rounded-full bg-gold/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-charcoal">
              {property.type}
            </span>
            <h3 className="font-heading text-xl font-light text-white md:text-2xl">
              {property.name}
            </h3>
            <div className="mt-3 flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {property.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.bathrooms} Baths
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {property.maxGuests} Guests
              </span>
            </div>
            <p className="mt-4 text-sm text-gold/90 group-hover:text-gold">
              View details →
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function AccommodationsSection() {
  const { data } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: async () => {
      try {
        const res = await propertyApi.getFeatured();
        return resolveProperties(res.data.data);
      } catch {
        return resolveProperties(null);
      }
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: () => resolveProperties(null).map((p) => enrichProperty(p)),
  });

  const properties = resolveProperties(data).map((p) => enrichProperty(p));

  return (
    <section className="bg-cream-dark py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Accommodations"
          title="Sanctuaries of Serenity"
          description="Each residence is a masterpiece of design, offering privacy, comfort, and an intimate connection with nature."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((property, index) => (
            <PropertyCard key={property._id} property={property} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/accommodations"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-gold transition-colors hover:text-gold-dark"
          >
            View All Accommodations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
