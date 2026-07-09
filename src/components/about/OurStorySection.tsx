'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { OUR_STORY } from '@/lib/about-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

export function OurStorySection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SectionReveal>
            <div>
              <SectionHeading
                subtitle={OUR_STORY.subtitle}
                title={OUR_STORY.title}
                align="left"
              />
              <div className="mt-8 space-y-5">
                {OUR_STORY.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className="text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={OUR_STORY.image}
                  alt={OUR_STORY.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="luxury-shadow absolute -bottom-6 -left-6 rounded-xl border border-gold/20 bg-card p-6 md:-left-10"
              >
                <p className="font-heading text-3xl font-light text-gold">50+</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Acres of Paradise
                </p>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
