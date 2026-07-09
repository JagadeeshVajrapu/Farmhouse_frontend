'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Waves, BedDouble, ChefHat, Car, Flower2, Speaker, Tv, Armchair,
  Trees, PartyPopper, Sparkles, Bell, UtensilsCrossed, Wifi, Zap, Check,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { Amenity } from '@/lib/amenities-data';
import { cn } from '@/lib/utils';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Waves, BedDouble, ChefHat, Car, Flower2, Speaker, Tv, Armchair,
  Trees, PartyPopper, Sparkles, Bell, UtensilsCrossed, Wifi, Zap,
};

interface AmenityCardProps {
  amenity: Amenity;
  index: number;
}

export function AmenityCard({ amenity, index }: AmenityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '80px' });
  const Icon = iconMap[amenity.icon] || Sparkles;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/50 bg-card luxury-shadow',
        amenity.featured && 'lg:col-span-2'
      )}
    >
      {/* Large image */}
      <div
        className={cn(
          'relative overflow-hidden',
          amenity.featured ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]'
        )}
      >
        {isInView ? (
          <Image
            src={amenity.image}
            alt={amenity.title}
            fill
            sizes={
              amenity.featured
                ? '(max-width: 1024px) 100vw, 66vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />

        {/* Icon badge */}
        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/50 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold/20">
          <Icon className="h-5 w-5 text-gold" />
        </div>

        {amenity.featured && (
          <span className="absolute right-5 top-5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm">
            Signature
          </span>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80">{amenity.tagline}</p>
          <h3 className="mt-2 font-heading text-2xl font-light text-white transition-colors duration-300 group-hover:text-gold lg:text-3xl">
            {amenity.title}
          </h3>
          <p
            className={cn(
              'mt-3 max-w-xl text-sm leading-relaxed text-white/70',
              'max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100',
              amenity.featured && 'lg:max-h-none lg:opacity-100'
            )}
          >
            {amenity.description}
          </p>

          {/* Features — reveal on hover */}
          <ul
            className={cn(
              'mt-4 grid gap-2',
              amenity.featured ? 'sm:grid-cols-2' : 'grid-cols-1',
              'max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100',
              amenity.featured && 'lg:max-h-none lg:opacity-100 lg:grid-cols-2'
            )}
          >
            {amenity.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-xs text-white/60">
                <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}
