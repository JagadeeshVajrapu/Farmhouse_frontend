'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { CONTACT_PAGE } from '@/lib/contact-data';
import { pickImage } from '@/lib/media/registry';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl } from '@/lib/cta';

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-el', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0F172A]"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={pickImage('hero')}
          alt="Vidhaan Farm House luxury estate"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-[#0F172A]/40 to-[#0F172A]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:px-8">
        <p className="contact-hero-el mb-6 text-[11px] font-medium uppercase tracking-[0.45em] text-[#C9A227]">
          Concierge & Reservations
        </p>
        <h1 className="contact-hero-el font-heading text-4xl font-light leading-tight text-white md:text-5xl lg:text-7xl">
          {CONTACT_PAGE.title}
          <br />
          <span className="italic text-[#C9A227]">{CONTACT_PAGE.titleAccent}</span>
        </h1>
        <p className="contact-hero-el mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-white/75 md:text-lg">
          {CONTACT_PAGE.subtitle}
        </p>

        <div className="contact-hero-el mt-12 flex flex-wrap items-center justify-center gap-4">
          <LuxuryButton
            href={bookNowWhatsAppUrl()}
            external
            size="lg"
            className="bg-[#C9A227] text-[#0F172A] hover:bg-[#d4ad2f]"
          >
            Book on WhatsApp
          </LuxuryButton>
          <LuxuryButton variant="glass" size="lg" onClick={scrollToContent}>
            Get in Touch
          </LuxuryButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-[#C9A227]"
        aria-label="Scroll to contact information"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
