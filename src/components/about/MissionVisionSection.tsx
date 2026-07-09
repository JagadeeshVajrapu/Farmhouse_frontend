'use client';

import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { MISSION, VISION } from '@/lib/about-data';
import { SectionReveal } from '@/components/home/SectionReveal';

const cards = [
  { ...MISSION, icon: Target, accent: 'from-gold/10 to-transparent' },
  { ...VISION, icon: Eye, accent: 'from-forest-light/30 to-transparent' },
];

export function MissionVisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-white/[0.02] p-10 md:p-12"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                    <card.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-heading text-2xl font-light text-foreground md:text-3xl">
                    {card.title}
                  </h3>
                  <div className="mt-4 h-px w-12 bg-gold/40" />
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {card.statement}
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
