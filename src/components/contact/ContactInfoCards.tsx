'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MessageCircle, Mail, Clock, MapPin } from 'lucide-react';
import { CONTACT_CARDS } from '@/lib/contact-data';
import { cn } from '@/lib/utils';

const iconMap = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  brand: MapPin,
  hours: Clock,
  location: MapPin,
} as const;

export function ContactInfoCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact-info" className="bg-[#FAFAF8] py-20 dark:bg-background lg:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A227]">
            Reach Us
          </p>
          <h2 className="mt-4 font-heading text-3xl font-light text-[#0F172A] dark:text-foreground md:text-4xl lg:text-5xl">
            We&apos;re Here for You
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_CARDS.map((card, index) => {
            const Icon = iconMap[card.id as keyof typeof iconMap];
            const href = 'href' in card ? card.href : undefined;
            const cardClass = cn(
              'group relative flex h-full flex-col rounded-2xl border border-white/60 bg-white/70 p-6 backdrop-blur-xl',
              'shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500',
              'hover:-translate-y-2 hover:border-[#C9A227]/40 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]',
              'dark:border-border dark:bg-card/70 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]',
              'dark:hover:border-gold/40 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]',
              href && 'cursor-pointer'
            );
            const cardContent = (
              <>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/20 bg-[#C9A227]/5 transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A227]/40 group-hover:bg-[#C9A227]/10">
                  <Icon className="h-5 w-5 text-[#C9A227]" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0F172A]/50 dark:text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 font-heading text-base font-light leading-snug text-[#0F172A] transition-colors group-hover:text-[#C9A227] dark:text-foreground dark:group-hover:text-gold">
                  {card.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#0F172A]/55 dark:text-muted-foreground">{card.description}</p>
              </>
            );

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                {href ? (
                  <a
                    href={href}
                    target={card.id === 'location' || card.id === 'whatsapp' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className={cardClass}>{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
