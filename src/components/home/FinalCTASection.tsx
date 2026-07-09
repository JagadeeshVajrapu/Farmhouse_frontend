'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { CTA_BACKGROUND } from '@/lib/home-data';
import { SectionReveal } from './SectionReveal';
import { WhatsAppButton } from '@/components/layout/navbar/WhatsAppButton';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[560px]">
        <Image
          src={CTA_BACKGROUND}
          alt="Vidhaan Farm House estate at golden hour"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gold/[0.03]" />

        <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center px-6 text-center">
          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-gold">
                Begin Your Journey
              </p>
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
                Your Private Paradise
                <br />
                <span className="italic text-gold">Awaits You</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base text-white/70">
                Escape the ordinary. Reserve your exclusive retreat and experience hospitality
                redefined at Vidhaan Farm House.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <LuxuryButton href={bookNowWhatsAppUrl()} external size="lg">
                  Book on WhatsApp
                </LuxuryButton>
                <LuxuryButton href={ENQUIRY_HREF} variant="glass" size="lg">
                  Send Enquiry
                </LuxuryButton>
                <WhatsAppButton variant="full" />
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
