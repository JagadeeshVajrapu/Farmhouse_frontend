'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { GalleryFilterId, GalleryItem } from '@/lib/gallery-data';
import { GALLERY_ITEMS, GALLERY_PAGE_SIZE, GALLERY_FILTERS } from '@/lib/gallery-data';
import { GalleryFilter } from './GalleryFilter';
import { GalleryCard } from './GalleryCard';
import { GalleryLightbox } from './GalleryLightbox';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

export function GalleryMasonry() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>('all');
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const result = Object.fromEntries(
      GALLERY_FILTERS.map((f) => [f.id, 0])
    ) as Record<GalleryFilterId, number>;
    result.all = GALLERY_ITEMS.length;
    for (const item of GALLERY_ITEMS) {
      if (result[item.category] !== undefined) {
        result[item.category] += 1;
      }
    }
    return result;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const hasMore = visibleCount < filteredItems.length;

  const handleFilterChange = useCallback((filter: GalleryFilterId) => {
    setActiveFilter(filter);
    setVisibleCount(GALLERY_PAGE_SIZE);
    setLightboxIndex(null);
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + GALLERY_PAGE_SIZE, filteredItems.length));
  }, [filteredItems.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, visibleItems.length]);

  const openLightbox = (item: GalleryItem) => {
    const index = filteredItems.findIndex((i) => i.id === item.id);
    if (index !== -1) setLightboxIndex(index);
  };

  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Curated Collection"
            title="Moments of Beauty"
            description="Filter by category, explore at your pace, and immerse yourself in the Vidhaan experience."
          />
        </SectionReveal>

        <GalleryFilter
          active={activeFilter}
          counts={counts}
          onChange={handleFilterChange}
          className="mb-10 mt-12"
        />

        <div
          id="gallery-grid"
          ref={gridRef}
          className="scroll-mt-32"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={() => openLightbox(item)}
              />
            ))}
          </div>

          <div ref={sentinelRef} className="flex justify-center py-12">
            {hasMore && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                Loading more...
              </div>
            )}
            {!hasMore && filteredItems.length > GALLERY_PAGE_SIZE && (
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                All {filteredItems.length} items loaded
              </p>
            )}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">No items in this category.</p>
            </div>
          )}
        </div>
      </div>

      <GalleryLightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
