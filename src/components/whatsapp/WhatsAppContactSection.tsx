'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import {
  buildWhatsAppUrl,
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_DISPLAY_NUMBER,
} from '@/lib/whatsapp';
import { pickImage } from '@/lib/media/registry';
import { LuxuryButton } from '@/components/ui/luxury-button';

const PERKS = [
  'Instant replies during business hours',
  'Share photos & event requirements',
  'Get availability & details fast',
];

export function WhatsAppContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A227]/5 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#C9A227]/15 shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              <Image
                src={pickImage('pool')}
                alt="Chat with Vidhaan Farm House on WhatsApp"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

              {/* Mock chat bubble */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-wider text-[#C9A227]">You</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/90 whitespace-pre-line">
                    {WHATSAPP_DEFAULT_MESSAGE}
                  </p>
                </div>
                <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-sm bg-emerald-600/90 p-4 shadow-lg">
                  <p className="text-sm text-white">
                    Namaste! Thank you for reaching out to Vidhaan Farm House. How may we assist you
                    today? 🌿
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-[10px] text-emerald-100/70">
                    <Clock className="h-3 w-3" />
                    Typically replies instantly
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227]">
              Instant Support
            </p>
            <h2 className="mt-4 font-heading text-3xl font-light text-white md:text-4xl lg:text-5xl">
              Prefer WhatsApp?
              <br />
              <span className="italic text-[#C9A227]">We&apos;re One Tap Away</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              Connect directly with our concierge team on WhatsApp. Your message is pre-filled — just
              tap send. Opens WhatsApp Web on desktop and the WhatsApp app on mobile.
            </p>

            <ul className="mt-8 space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C9A227]" />
                  {perk}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-white/40">
              WhatsApp:{' '}
              <span className="font-medium text-white/70">{WHATSAPP_DISPLAY_NUMBER}</span>
            </p>

            <LuxuryButton
              href={buildWhatsAppUrl()}
              external
              size="lg"
              className="mt-8 gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_8px_32px_rgba(16,185,129,0.35)] hover:from-emerald-400 hover:to-emerald-500 hover:shadow-[0_12px_40px_rgba(16,185,129,0.45)]"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </LuxuryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
