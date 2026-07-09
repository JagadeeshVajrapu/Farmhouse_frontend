'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { PHONE_TEL } from '@/lib/whatsapp';
import { useScrollRevealFab } from '@/hooks/useScrollRevealFab';
import { cn } from '@/lib/utils';

interface FabTooltipProps {
  show: boolean;
  label: string;
  accent: string;
}

function FabTooltip({ show, label, accent }: FabTooltipProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'pointer-events-none absolute whitespace-nowrap rounded-full',
            'border border-white/20 bg-[#0F172A]/80 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-xl',
            'bottom-full right-0 mb-2.5 sm:bottom-auto sm:right-full sm:top-1/2 sm:mb-0 sm:mr-3 sm:-translate-y-1/2'
          )}
        >
          <span style={{ color: accent }}>{label}</span>
          <span
            className={cn(
              'absolute hidden h-2 w-2 rotate-45 border-b border-r border-white/20 bg-[#0F172A]/80 sm:block',
              '-right-1 top-1/2 -translate-y-1/2'
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingContactBar() {
  const visible = useScrollRevealFab();
  const [hovered, setHovered] = useState<'call' | 'whatsapp' | null>(null);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-5 right-5 z-[150] flex items-center gap-3 sm:bottom-8 sm:right-8 sm:gap-4"
        >
          {/* Call */}
          <div
            className="relative"
            onMouseEnter={() => setHovered('call')}
            onMouseLeave={() => setHovered(null)}
          >
            <FabTooltip show={hovered === 'call'} label="Call Now" accent="#C9A227" />

            <motion.a
              href={PHONE_TEL}
              aria-label="Call Vidhaan Farm House — +91 84477 90095"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative flex h-14 w-14 items-center justify-center rounded-full',
                'border border-white/25 bg-white/10 backdrop-blur-xl',
                'text-[#C9A227] transition-shadow duration-300',
                'shadow-[0_8px_32px_rgba(15,23,42,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]',
                'hover:border-[#C9A227]/40 hover:bg-white/15 hover:shadow-[0_8px_32px_rgba(201,162,39,0.25)]'
              )}
            >
              <span className="absolute inset-0 animate-pulse rounded-full bg-[#C9A227]/10" />
              <Phone className="relative h-6 w-6 sm:h-6 sm:w-6" strokeWidth={1.75} />
            </motion.a>
          </div>

          {/* WhatsApp */}
          <div
            className="relative"
            onMouseEnter={() => setHovered('whatsapp')}
            onMouseLeave={() => setHovered(null)}
          >
            <FabTooltip show={hovered === 'whatsapp'} label="Need Help?" accent="#34d399" />

            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <span className="pointer-events-none absolute inset-[-3px] animate-pulse rounded-full bg-[#C9A227]/10" />

            <motion.a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16',
                'border border-emerald-400/35 bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 backdrop-blur-sm',
                'text-white shadow-[0_8px_32px_rgba(16,185,129,0.35)]',
                'hover:shadow-[0_12px_40px_rgba(16,185,129,0.45)]'
              )}
            >
              <MessageCircle className="h-7 w-7 fill-white/15 sm:h-8 sm:w-8" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** @deprecated Use FloatingContactBar */
export function FloatingWhatsAppButton() {
  return <FloatingContactBar />;
}
