'use client';

import { STATS } from '@/lib/home-data';
import { SectionReveal, AnimatedCounter } from './SectionReveal';

export function StatsSection() {
  return (
    <section className="relative border-y border-gold/10 bg-[#0c0c0c] py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,98,0.04)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {STATS.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-4xl font-light text-gold md:text-5xl lg:text-6xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimal={stat.decimal}
                  />
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                  {stat.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
