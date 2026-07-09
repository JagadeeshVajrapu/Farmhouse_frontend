'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ABOUT_BANNER } from '@/lib/about-data';

export function AboutBanner() {
  const bannerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.banner-line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('.banner-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, bannerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative flex min-h-[70vh] items-end overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={ABOUT_BANNER.image}
          alt="Vidhaan Farm House estate"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="gradient-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Decorative gold line */}
      <div className="absolute left-0 top-1/3 h-32 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28">
        <p className="banner-line mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-gold">
          {ABOUT_BANNER.subtitle}
        </p>
        <h1 ref={titleRef} className="font-heading text-5xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
          <span className="banner-line block">{ABOUT_BANNER.title}</span>
          <span className="banner-line mt-2 block italic text-gold">{ABOUT_BANNER.titleAccent}</span>
        </h1>
        <p className="banner-desc mt-6 max-w-lg text-base font-light text-white/70">
          {ABOUT_BANNER.description}
        </p>
      </div>
    </section>
  );
}
