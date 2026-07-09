'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Play, Plane, ZoomIn } from 'lucide-react';
import type { GalleryItem } from '@/lib/gallery-data';
import { cn } from '@/lib/utils';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="mb-0 break-inside-avoid"
    >
      <button
        type="button"
        onClick={onOpen}
        suppressHydrationWarning
        className="group relative block w-full overflow-hidden rounded-xl border border-border/40 bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label={`View ${item.title}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {isInView ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading={index < 4 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm">
              {item.type === 'video' ? (
                <Play className="h-5 w-5 fill-white text-white" />
              ) : (
                <ZoomIn className="h-5 w-5 text-white" />
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {item.category === 'drone' && (
              <span className="flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                <Plane className="h-3 w-3" />
                Drone
              </span>
            )}
            {item.type === 'video' && (
              <span className="flex items-center gap-1 rounded-full border border-gold/30 bg-gold/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm">
                <Play className="h-3 w-3" />
                Video
              </span>
            )}
            {item.featured && (
              <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p
              className={cn(
                'text-[10px] uppercase tracking-[0.2em] text-gold/80',
                'translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'
              )}
            >
              {item.category}
            </p>
            <h3 className="mt-1 font-heading text-lg font-light text-white transition-transform duration-500 group-hover:translate-y-0">
              {item.title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
