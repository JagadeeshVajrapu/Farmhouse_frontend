'use client';

import { motion } from 'framer-motion';
import { Landmark, Leaf, Sparkles, Lock } from 'lucide-react';
import { ABOUT_WHY_CHOOSE } from '@/lib/about-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

const iconMap = { Landmark, Leaf, Sparkles, Lock };

export function WhyChooseAboutSection() {
  return (
    <section className="bg-[#0c0c0c] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="The Vidhaan Promise"
            title="Why Choose Us"
            description="Four pillars that define every moment of your stay."
            light
          />
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_WHY_CHOOSE.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
            return (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group h-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-gold/20 hover:bg-gold/[0.03]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/5 transition-all group-hover:border-gold/40 group-hover:bg-gold/10">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-light text-foreground group-hover:text-gold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
