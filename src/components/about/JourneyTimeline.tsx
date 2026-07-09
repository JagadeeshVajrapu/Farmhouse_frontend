'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '@/lib/about-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: item.classList.contains('timeline-right') ? 40 : -40,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Our Journey"
            title="A Timeline of Excellence"
            description="From a family dream to India's premier luxury estate — every milestone marks our commitment to perfection."
          />
        </SectionReveal>

        <div className="relative mt-20">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-gold via-gold/50 to-transparent md:left-1/2 md:block md:-translate-x-px"
          />

          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((item, i) => {
              const isRight = i % 2 === 1;
              return (
                <div
                  key={item.year}
                  className={`timeline-item relative grid items-center gap-8 md:grid-cols-2 ${
                    isRight ? 'timeline-right' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`${isRight ? 'md:order-2 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="luxury-shadow rounded-2xl border border-border bg-card p-8"
                    >
                      <span className="font-heading text-3xl font-light text-gold">{item.year}</span>
                      <h3 className="mt-2 font-heading text-xl font-light text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Image */}
                  <div className={`${isRight ? 'md:order-1' : ''}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Dot on timeline */}
                  <div className="absolute left-4 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-background md:left-1/2 md:block">
                    <div className="absolute inset-1 rounded-full bg-gold" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
