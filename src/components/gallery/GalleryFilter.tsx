'use client';

import { motion } from 'framer-motion';
import { Plane, Play, ImageIcon } from 'lucide-react';
import type { GalleryFilterId } from '@/lib/gallery-data';
import { GALLERY_FILTERS } from '@/lib/gallery-data';
import { cn } from '@/lib/utils';

interface GalleryFilterProps {
  active: GalleryFilterId;
  counts: Record<GalleryFilterId, number>;
  onChange: (filter: GalleryFilterId) => void;
  className?: string;
}

const filterIcons: Partial<Record<GalleryFilterId, typeof ImageIcon>> = {
  drone: Plane,
  videos: Play,
};

export function GalleryFilter({ active, counts, onChange, className }: GalleryFilterProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border/60 bg-card/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl',
        className
      )}
    >
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [-webkit-overflow-scrolling:touch]">
        {GALLERY_FILTERS.map((filter) => {
          const Icon = filterIcons[filter.id];
          const isActive = active === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              suppressHydrationWarning
              className={cn(
                'relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300',
                isActive
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-border/60 bg-background/50 text-muted-foreground hover:border-gold/20 hover:text-foreground'
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {filter.label}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] tabular-nums',
                  isActive ? 'bg-gold/20 text-gold' : 'bg-muted text-muted-foreground'
                )}
              >
                {counts[filter.id]}
              </span>
              {isActive && (
                <motion.div
                  layoutId="gallery-filter-active"
                  className="absolute inset-0 -z-10 rounded-full border border-gold/30 bg-gold/5"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
