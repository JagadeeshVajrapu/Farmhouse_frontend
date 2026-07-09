'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { contactConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { pickImage } from '@/lib/media/registry';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl } from '@/lib/cta';

export function ContactFinalCTA() {
  const whatsappHref = buildWhatsAppUrl();

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[520px]">
        <Image
          src={pickImage('night')}
          alt="Evening celebration at Vidhaan Farm House"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0F172A]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/30" />

        <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-[#C9A227]">
              Your Escape Awaits
            </p>
            <h2 className="font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
              Ready to Book
              <br />
              <span className="italic text-[#C9A227]">Your Stay?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base text-white/70">
              Reserve your private paradise or speak with our concierge team — we&apos;re here to
              make every detail perfect.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <LuxuryButton
                href={bookNowWhatsAppUrl()}
                external
                size="lg"
                className="bg-[#C9A227] text-[#0F172A] hover:bg-[#d4ad2f]"
              >
                Book on WhatsApp
              </LuxuryButton>
              <LuxuryButton href={`tel:${contactConfig.phone}`} variant="glass" size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </LuxuryButton>
              <LuxuryButton href={whatsappHref} external variant="glass" size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
