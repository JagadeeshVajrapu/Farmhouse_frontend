'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_PAGE } from '@/lib/contact-data';
import { contactConfig } from '@/config/site';
import { LuxuryButton } from '@/components/ui/luxury-button';

export function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-14 dark:bg-card/30 lg:py-16">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227]">
              Find Us
            </p>
            <h2 className="mt-3 font-heading text-3xl font-light text-[#0F172A] dark:text-foreground md:text-4xl">
              Visit Vidhaan Farm House
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#0F172A]/60 dark:text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C9A227]" />
              {contactConfig.address}
            </p>
          </div>
          <Link href={contactConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
            <LuxuryButton
              variant="outline"
              className="gap-2 border-[#C9A227]/40 text-[#0F172A] dark:text-foreground"
            >
              <Navigation className="h-4 w-4 text-[#C9A227]" />
              Get Directions
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </LuxuryButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="grid overflow-hidden rounded-2xl border border-[#0F172A]/8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-5 lg:min-h-[300px]"
        >
          <div className="relative h-52 lg:col-span-2 lg:h-auto">
            <Image
              src={CONTACT_PAGE.directionsImage}
              alt="Vidhaan Farm House main entrance"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/85 to-transparent p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A227]">
                Entrance
              </p>
              <p className="mt-1 text-sm text-white">Noida Sector-135</p>
            </div>
          </div>

          <div className="relative h-64 border-t border-[#0F172A]/8 lg:col-span-3 lg:h-auto lg:border-t-0 lg:border-l">
            <iframe
              title="Vidhaan Farm House location on Google Maps"
              src={CONTACT_PAGE.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
