'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/services-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

/** Quick overview grid at top of services page */
export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Eight Distinct Experiences"
            title="Find Your Perfect Service"
            description="Select a service below to explore packages, galleries, and what's included."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <SectionReveal key={service.slug} delay={i * 0.05}>
              <Link href={`#service-${service.slug}`}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={service.banner}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading text-lg font-light text-white group-hover:text-gold">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/60 line-clamp-2">{service.tagline}</p>
                  </div>
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </div>
                </motion.article>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
