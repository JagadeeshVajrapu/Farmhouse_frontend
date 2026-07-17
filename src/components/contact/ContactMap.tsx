'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Navigation } from 'lucide-react';
import Link from 'next/link';
import { contactConfig } from '@/config/site';
import { LuxuryButton } from '@/components/ui/luxury-button';

export function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-20 dark:bg-card/30 lg:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227]">
              Find Us
            </p>
            <h2 className="mt-4 font-heading text-3xl font-light text-[#0F172A] dark:text-foreground md:text-4xl">
              Visit Vidhaan Farm House
            </h2>
            <p className="mt-3 max-w-md text-sm text-[#0F172A]/60 dark:text-muted-foreground">
              {contactConfig.address}
            </p>
          </div>
          <Link
            href={`https://maps.google.com/?q=${encodeURIComponent(contactConfig.address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuxuryButton variant="outline" className="gap-2 border-[#C9A227]/40 text-[#0F172A] dark:text-foreground">
              <Navigation className="h-4 w-4 text-[#C9A227]" />
              Get Directions
            </LuxuryButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
