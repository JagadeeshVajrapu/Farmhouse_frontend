'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Waves, Sparkles, BedDouble, PartyPopper, Flower2, ChefHat, Car, Speaker, Armchair, ArrowRight,
} from 'lucide-react';
import { HOME_AMENITIES } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves, Sparkles, BedDouble, PartyPopper, Flower2, ChefHat, Car, Speaker, Armchair,
};

export function AmenitiesSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-24 lg:py-32">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-forest-light/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="World-Class Amenities"
            title="Every Comfort, Thoughtfully Provided"
            description="From the swimming pool to premium rooms — experience Vidhaan Farm House at its finest."
            light
          />
        </SectionReveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HOME_AMENITIES.map((amenity, i) => {
            const Icon = iconMap[amenity.icon] || Sparkles;
            return (
              <SectionReveal key={amenity.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={amenity.image}
                      alt={amenity.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-black/40 backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground/90 group-hover:text-gold">
                      {amenity.name}
                    </span>
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/amenities"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
            >
              View All Amenities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
