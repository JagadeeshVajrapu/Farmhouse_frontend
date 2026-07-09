'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, ChefHat, Shield, Gem } from 'lucide-react';
import { WHY_CHOOSE_US } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';

const iconMap = {
  Concierge: Gem,
  Building: Building2,
  ChefHat: ChefHat,
  Shield: Shield,
};

export function WhyChooseUsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="The Vidhaan Difference"
            title="Why Discerning Travellers Choose Us"
            description="We don't simply offer accommodation — we craft experiences that linger in memory long after departure."
          />
        </SectionReveal>

        <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
          <SectionReveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Luxury estate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Est. 2018</p>
                <p className="mt-2 font-heading text-2xl font-light text-white">
                  A Legacy of Refined Living
                </p>
              </div>
            </div>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Gem;
              return (
                <SectionReveal key={item.title} delay={0.15 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-gold/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-light text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}