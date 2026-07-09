'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES } from '@/lib/home-data';

const INTERVAL_MS = 5500;

export function HeroImageCarousel() {
  const [index, setIndex] = useState(0);
  const slides = HERO_SLIDES;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[index]}
          initial={{ opacity: 0, x: '8%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-8%' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 scale-110"
        >
          <Image
            src={slides[index]}
            alt={`Vidhaan Farm House — view ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2818]/70 via-[#0a0a0a]/40 to-[#0a0a0a]/60" />
    </div>
  );
}
