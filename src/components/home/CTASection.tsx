'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { pickImage } from '@/lib/media/registry';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[500px]">
        <Image
          src={pickImage('garden')}
          alt="Sunset at Vidhaan Farm House"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="gradient-overlay absolute inset-0" />

        <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Begin Your Journey
            </p>
            <h2 className="font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
              Your Private Paradise
              <br />
              <span className="italic text-gold">Awaits</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base text-white/70">
              Escape the ordinary. Reserve your exclusive retreat at Vidhaan Farm House and
              experience luxury redefined.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <LuxuryButton href={bookNowWhatsAppUrl()} external size="lg">
                Book on WhatsApp
              </LuxuryButton>
              <LuxuryButton href={ENQUIRY_HREF} variant="glass" size="lg">
                Send Enquiry
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
