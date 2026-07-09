'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOSPITALITY } from '@/lib/about-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';
import { LuxuryButton } from '@/components/ui/luxury-button';

export function HospitalitySection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] py-24 lg:py-32">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SectionReveal>
            <div>
              <SectionHeading
                subtitle={HOSPITALITY.subtitle}
                title={HOSPITALITY.title}
                description={HOSPITALITY.description}
                align="left"
                light
              />

              <div className="mt-10 space-y-6">
                {HOSPITALITY.highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ x: 6 }}
                    className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-gold/15"
                  >
                    <h4 className="font-heading text-lg font-light text-foreground group-hover:text-gold">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <Link href="/contact" className="mt-10 inline-block">
                <LuxuryButton variant="outline">Meet Our Team</LuxuryButton>
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={HOSPITALITY.image}
                alt="Hospitality at Vidhaan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  Atithi Devo Bhava
                </p>
                <p className="mt-2 font-heading text-xl font-light italic text-white">
                  &ldquo;The guest is God&rdquo;
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
