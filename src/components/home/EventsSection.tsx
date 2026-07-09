'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EVENTS } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';

export function EventsSection() {
  return (
    <section className="bg-[#0c0c0c] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Celebrations & Events"
            title="Unforgettable Occasions"
            description="From intimate gatherings to grand celebrations — our estate transforms into your private venue."
            light
          />
        </SectionReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {EVENTS.map((event, i) => (
            <SectionReveal key={event.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm">
                    {event.tag}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-light text-white">{event.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{event.description}</p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
            >
              Plan Your Event <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
