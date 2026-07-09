'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { NATURE_EXPERIENCE } from '@/lib/about-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

export function NatureExperienceSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SectionReveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={NATURE_EXPERIENCE.images[0]}
                    alt="Estate gardens"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={NATURE_EXPERIENCE.images[1]}
                    alt="Lake view"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div>
              <SectionHeading
                subtitle={NATURE_EXPERIENCE.subtitle}
                title={NATURE_EXPERIENCE.title}
                description={NATURE_EXPERIENCE.description}
                align="left"
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {NATURE_EXPERIENCE.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
