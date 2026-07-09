'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Waves, Cake, Home, Briefcase, Users, Heart, Camera, Sparkles,
  Check, ArrowRight,
} from 'lucide-react';
import type { ServicePackage } from '@/lib/services-data';
import { SectionReveal } from '@/components/home/SectionReveal';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Waves, Cake, Home, Briefcase, Users, Heart, Camera, Sparkles,
};

interface ServiceBlockProps {
  service: ServicePackage;
  index: number;
}

export function ServiceBlock({ service, index }: ServiceBlockProps) {
  const Icon = iconMap[service.icon] || Sparkles;
  const isEven = index % 2 === 0;

  return (
    <section
      id={`service-${service.slug}`}
      className={`scroll-mt-36 py-24 lg:py-32 ${!isEven ? 'bg-[#0c0c0c]' : ''}`}
    >
      {/* Large Banner */}
      <div className="relative mb-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6 }}
              className="group relative aspect-[21/9] min-h-[280px] overflow-hidden rounded-2xl md:min-h-[360px]"
            >
              <Image
                src={service.banner}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{service.tagline}</p>
                <h2 className="mt-2 font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
                  {service.title}
                </h2>
              </div>

              {/* Highlights pills */}
              <div className="absolute right-8 top-8 hidden gap-2 md:flex">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Description + Features */}
          <div className="lg:col-span-7">
            <SectionReveal>
              <p className="text-lg font-light leading-relaxed text-foreground md:text-xl">
                {service.description}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                {service.longDescription}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <h3 className="mb-6 mt-12 font-heading text-xl font-light text-foreground">
                What&apos;s Included
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 transition-colors hover:border-gold/20"
                  >
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* CTA Card */}
          <div className="lg:col-span-5">
            <SectionReveal delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                className="luxury-shadow sticky top-36 rounded-2xl border border-gold/15 bg-card p-8"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Get Started</p>
                <h3 className="mt-3 font-heading text-2xl font-light text-foreground">
                  Plan Your {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Contact us for availability and a tailored package for your celebration or stay.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <LuxuryButton
                    href={bookNowWhatsAppUrl()}
                    external
                    className="w-full"
                    size="lg"
                  >
                    Book on WhatsApp
                  </LuxuryButton>
                  <LuxuryButton
                    href={ENQUIRY_HREF}
                    variant="outline"
                    className="w-full gap-2"
                    size="lg"
                  >
                    Send Enquiry
                    <ArrowRight className="h-4 w-4" />
                  </LuxuryButton>
                </div>

                <p className="mt-6 text-center text-[10px] text-muted-foreground">
                  Free consultation · Flexible packages · Personalised service
                </p>
              </motion.div>
            </SectionReveal>
          </div>
        </div>

        {/* Gallery */}
        <SectionReveal delay={0.1}>
          <h3 className="mb-8 mt-20 font-heading text-xl font-light text-foreground">Gallery</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {service.gallery.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
