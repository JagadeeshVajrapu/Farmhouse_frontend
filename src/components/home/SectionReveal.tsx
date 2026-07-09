'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function SectionReveal({ children, className, delay = 0, id }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCounter({
  value,
  suffix = '',
  decimal = false,
}: {
  value: number;
  suffix?: string;
  decimal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const el = ref.current;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      const display = decimal ? current.toFixed(1) : Math.floor(current).toString();
      el.textContent = `${display}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, suffix, decimal]);

  return <span ref={ref}>0{suffix}</span>;
}
