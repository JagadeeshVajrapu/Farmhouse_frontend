'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Questions"
            title="Frequently Asked"
            description="Everything you need to know before your extraordinary stay."
          />
        </SectionReveal>

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <SectionReveal key={item.question} delay={i * 0.05}>
                <div
                  className={cn(
                    'overflow-hidden rounded-xl border transition-all duration-300',
                    isOpen ? 'border-gold/25 bg-gold/[0.03]' : 'border-border bg-card'
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    suppressHydrationWarning
                  >
                    <span className="font-heading text-base font-light text-foreground md:text-lg">
                      {item.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 text-gold">
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
                        <p className="border-t border-gold/10 px-6 pb-5 pt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
