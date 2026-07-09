'use client';

import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, MessageCircle } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl } from '@/lib/cta';

interface ContactSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const CONFETTI_COLORS = ['#C9A227', '#0F172A', '#e8dcc8', '#d4ad2f', '#f5f0e8'];

function ConfettiPiece({ index }: { index: number }) {
  const config = useMemo(() => {
    const angle = (index / 40) * Math.PI * 2;
    const velocity = 80 + Math.random() * 120;
    return {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity - 40,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 0.15,
      rotate: Math.random() * 720 - 360,
      isRect: index % 3 === 0,
    };
  }, [index]);

  return (
    <motion.span
      initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
      animate={{
        x: config.x,
        y: config.y,
        opacity: [1, 1, 0],
        scale: [0, 1, 0.5],
        rotate: config.rotate,
      }}
      transition={{ duration: 1.2, delay: config.delay, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute left-1/2 top-1/3"
      style={{
        width: config.size,
        height: config.isRect ? config.size * 0.4 : config.size,
        backgroundColor: config.color,
        borderRadius: config.isRect ? '1px' : '50%',
      }}
    />
  );
}

function AnimatedCheckmark() {
  return (
    <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
        className="absolute inset-0 rounded-full bg-[#C9A227]/15"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[#C9A227] bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 shadow-[0_0_40px_rgba(201,162,39,0.25)]"
      >
        <svg viewBox="0 0 52 52" className="h-9 w-9" aria-hidden>
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="#C9A227"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />
          <motion.path
            fill="none"
            stroke="#C9A227"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l8 8 16-18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function ContactSuccessModal({ open, onClose }: ContactSuccessModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
          aria-describedby="contact-success-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/75 backdrop-blur-md"
          />

          {/* Confetti */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <ConfettiPiece key={i} index={i} />
            ))}
          </div>

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.05 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#C9A227]/20 bg-[#FAFAF8] shadow-[0_32px_100px_rgba(15,23,42,0.35)] dark:border-gold/20 dark:bg-card"
          >
            {/* Gold header strip */}
            <div className="h-1.5 bg-gradient-to-r from-[#C9A227] via-[#d4ad2f] to-[#C9A227]" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#0F172A]/10 text-[#0F172A]/50 transition-colors hover:border-[#C9A227]/30 hover:bg-[#C9A227]/5 hover:text-[#0F172A]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-8 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-12">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-[#C9A227]">
                Vidhaan Farm House
              </p>

              <AnimatedCheckmark />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                <h2
                  id="contact-success-title"
                  className="font-heading text-3xl font-light text-[#0F172A] dark:text-foreground sm:text-4xl"
                >
                  Thank You!
                </h2>
                <p
                  id="contact-success-desc"
                  className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-[#0F172A]/60 dark:text-muted-foreground sm:text-base"
                >
                  Our team has received your enquiry.
                  <br />
                  We&apos;ll contact you shortly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <Link href="/" onClick={onClose} className="w-full sm:w-auto">
                  <LuxuryButton
                    variant="outline"
                    size="lg"
                    className="w-full gap-2 border-[#0F172A]/15 text-[#0F172A] hover:border-[#C9A227]/40 hover:bg-[#C9A227]/5"
                  >
                    <Home className="h-4 w-4" />
                    Return Home
                  </LuxuryButton>
                </Link>
                <LuxuryButton
                  href={bookNowWhatsAppUrl()}
                  external
                  onClick={onClose}
                  size="lg"
                  className="w-full gap-2 bg-[#0F172A] text-white hover:bg-[#1e293b] sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book on WhatsApp
                </LuxuryButton>
              </motion.div>

              <motion.button
                type="button"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-xs uppercase tracking-wider text-[#0F172A]/40 transition-colors hover:text-[#C9A227]"
              >
                Close
              </motion.button>
            </div>

            {/* Dark footer accent */}
            <div className="border-t border-[#0F172A]/5 bg-[#0F172A] px-8 py-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A227]/80">
                Where Luxury Meets Nature
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
