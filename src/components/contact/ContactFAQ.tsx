'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_FAQ } from '@/lib/contact-data';
import { cn } from '@/lib/utils';

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#FAFAF8] px-4 py-16 dark:bg-background sm:px-0 sm:py-20 lg:py-28" aria-labelledby="contact-faq-heading">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227]">
            Questions
          </p>
          <h2
            id="contact-faq-heading"
            className="mt-4 font-heading text-3xl font-light text-[#0F172A] dark:text-foreground md:text-4xl"
          >
            Frequently Asked
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {CONTACT_FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm transition-all duration-300',
                  'dark:bg-card/70',
                  isOpen
                    ? 'border-[#C9A227]/30 shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:border-gold/30'
                    : 'border-[#0F172A]/8 shadow-sm hover:border-[#C9A227]/20 dark:border-border dark:hover:border-gold/20'
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  suppressHydrationWarning
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base font-light text-[#0F172A] dark:text-foreground md:text-lg">
                    {item.question}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/25 text-[#C9A227]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="border-t border-[#C9A227]/10 px-6 pb-5 pt-3 text-sm leading-relaxed text-[#0F172A]/60 dark:border-gold/10 dark:text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-[#0F172A]/50 dark:text-muted-foreground">
          Have more questions?{' '}
          <Link href="/contact#contact-form" className="text-[#C9A227] underline-offset-4 hover:underline">
            Send us an enquiry
          </Link>
        </p>
      </div>
    </section>
  );
}
