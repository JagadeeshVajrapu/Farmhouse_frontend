'use client';

import { AMENITIES_HIGHLIGHTS } from '@/lib/amenities-data';
import { SectionReveal } from '@/components/home/SectionReveal';

export function AmenitiesHighlights() {
  return (
    <section className="border-b border-border/50 bg-card/30 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {AMENITIES_HIGHLIGHTS.map((item, i) => (
            <SectionReveal key={item.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-heading text-3xl font-light text-gold md:text-4xl">{item.value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
