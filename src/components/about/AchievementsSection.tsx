'use client';

import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '@/lib/about-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

export function AchievementsSection() {
  return (
    <section className="relative border-y border-gold/10 py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,98,0.05)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Milestones"
            title="Our Achievements"
            description="Numbers that reflect our commitment to excellence."
          />
        </SectionReveal>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {ACHIEVEMENTS.map((item, i) => (
            <SectionReveal key={item.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group text-center"
              >
                <p className="font-heading text-3xl font-light text-gold transition-colors group-hover:text-gold-light md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
