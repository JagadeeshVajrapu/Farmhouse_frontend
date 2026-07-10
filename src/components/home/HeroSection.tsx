'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { siteConfig } from '@/config/site';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';
import { HeroImageCarousel } from './HeroImageCarousel';
import { FloatingBookingCardLazy } from './FloatingBookingCardLazy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from(line1Ref.current, { y: 100, opacity: 0, duration: 1.2, ease: 'power4.out' })
        .from(line2Ref.current, { y: 80, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden md:h-screen md:min-h-[700px]"
    >
      <HeroImageCarousel />

      <div className="gradient-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2818]/60 via-transparent to-black/30" />

      <div className="relative z-10 flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center px-4 pb-10 pt-24 text-center sm:px-6 md:h-full md:pb-0 md:pt-20">
        <motion.p className="hero-subtitle mb-4 max-w-xs text-balance text-[11px] font-medium uppercase tracking-[0.18em] text-gold sm:mb-6 sm:max-w-none sm:tracking-[0.35em] md:text-xs md:tracking-[0.45em]">
          Vidhaan Farm House · Chhatarpur
        </motion.p>

        <h1 className="font-heading text-4xl font-light leading-[1.12] text-white sm:text-5xl md:text-7xl lg:text-[5.5rem]">
          <span ref={line1Ref} className="block">
            Where Luxury
          </span>
          <span ref={line2Ref} className="mt-2 block italic text-gold">
            Meets Nature
          </span>
        </h1>

        <p className="hero-subtitle mt-6 max-w-lg px-2 text-sm font-light leading-relaxed text-white/75 sm:mt-8 md:text-base">
          {siteConfig.description.split('.')[0]}.
        </p>

        <div className="hero-cta mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <LuxuryButton href={bookNowWhatsAppUrl()} external size="lg" className="w-full gap-2 sm:w-auto">
            <MessageCircle className="h-4 w-4" />
            Book on WhatsApp
          </LuxuryButton>
          <LuxuryButton href={ENQUIRY_HREF} variant="glass" size="lg" className="w-full sm:w-auto">
            Send Enquiry
          </LuxuryButton>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/40 md:block"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>

      <FloatingBookingCardLazy />
    </section>
  );
}
