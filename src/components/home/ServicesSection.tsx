'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Bespoke Services"
            title="Elevated at Every Touchpoint"
            description="Our dedicated team ensures seamless experiences from arrival to farewell."
          />
        </SectionReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <SectionReveal key={service.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="grid sm:grid-cols-5">
                  <div className="relative aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:min-h-[200px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:col-span-3">
                    <h3 className="font-heading text-xl font-light text-foreground transition-colors group-hover:text-gold">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
