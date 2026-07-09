'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { SERVICES_PAGE } from '@/lib/services-data';

export function ServicesHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-hero-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[65vh] items-end overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={SERVICES_PAGE.banner}
          alt="Vidhaan Farm House services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="gradient-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-8">
        <p className="services-hero-line mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-gold">
          {SERVICES_PAGE.subtitle}
        </p>
        <h1 className="font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
          <span className="services-hero-line block">{SERVICES_PAGE.title}</span>
          <span className="services-hero-line mt-2 block italic text-gold">
            {SERVICES_PAGE.titleAccent}
          </span>
        </h1>
        <p className="services-hero-line mt-6 max-w-xl text-base font-light text-white/70">
          {SERVICES_PAGE.description}
        </p>
      </div>
    </section>
  );
}
