'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Sparkles, Trees, Wine } from 'lucide-react';
import { EXPERIENCES } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/section-heading';

const iconMap = {
  UtensilsCrossed,
  Sparkles,
  Trees,
  Wine,
};

export function ExperiencesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Experiences"
          title="Curated Moments of Wonder"
          description="Beyond accommodation, we craft bespoke experiences that transform your stay into an unforgettable journey."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCES.map((exp, index) => {
            const Icon = iconMap[exp.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-light text-white">{exp.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{exp.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/experiences"
            className="text-sm uppercase tracking-wider text-gold transition-colors hover:text-gold-dark"
          >
            Explore All Experiences →
          </Link>
        </div>
      </div>
    </section>
  );
}
