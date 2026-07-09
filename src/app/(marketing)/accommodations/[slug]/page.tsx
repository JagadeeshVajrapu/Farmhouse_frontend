'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Bed, Bath, Users, MapPin, Check, ArrowLeft, MessageCircle } from 'lucide-react';
import { propertyApi } from '@/lib/api';
import { resolveProperty } from '@/lib/properties';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';

export default function AccommodationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', slug],
    queryFn: async () => {
      try {
        const res = await propertyApi.getBySlug(slug);
        return resolveProperty(res.data.data, slug);
      } catch {
        return resolveProperty(undefined, slug);
      }
    },
    placeholderData: () => resolveProperty(undefined, slug),
  });

  if (isLoading && !property) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-32">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-32">
        <p className="text-muted-foreground">Property not found</p>
        <Link href="/accommodations" className="text-sm text-gold hover:underline">
          View all accommodations
        </Link>
      </div>
    );
  }

  const heroImage = property.images[0]?.url || '/media/images/hero-estate-01.jpeg';

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] max-h-[640px]">
        <Image
          src={heroImage}
          alt={property.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
            <Link
              href="/accommodations"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              All Accommodations
            </Link>
            <span className="mb-3 inline-block rounded-full bg-gold/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-charcoal">
              {property.type}
            </span>
            <h1 className="font-heading text-4xl font-light text-white md:text-6xl">
              {property.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" /> {property.bedrooms} Bedrooms
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" /> {property.bathrooms} Bathrooms
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Up to {property.maxGuests} Guests
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {property.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl text-foreground">About This Residence</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{property.description}</p>

              {/* Image gallery */}
              <h3 className="mt-12 font-heading text-xl text-foreground">Gallery</h3>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {property.images.map((img, i) => (
                  <div
                    key={`${img.url}-${i}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/40"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `${property.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>

              <h3 className="mt-12 font-heading text-xl text-foreground">Amenities</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-2xl border border-gold/15 bg-card p-8 shadow-lg">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Reserve This Stay</p>
                <h3 className="mt-3 font-heading text-2xl font-light text-foreground">{property.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Contact us on WhatsApp for availability or send an enquiry — our team will respond
                  within 2–4 hours.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  <LuxuryButton
                    href={bookNowWhatsAppUrl({ accommodation: property.name })}
                    external
                    className="w-full gap-2"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Book on WhatsApp
                  </LuxuryButton>
                  <LuxuryButton href={ENQUIRY_HREF} variant="outline" className="w-full" size="lg">
                    Send Enquiry
                  </LuxuryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
