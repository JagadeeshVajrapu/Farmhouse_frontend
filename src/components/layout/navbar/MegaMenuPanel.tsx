'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { NavMegaSection } from '@/config/navigation';

interface MegaMenuPanelProps {
  section: NavMegaSection;
  parentHref: string;
  onClose: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export function MegaMenuPanel({ section, parentHref, onClose }: MegaMenuPanelProps) {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between border-b border-gold/10 pb-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">Discover</p>
          <h3 className="mt-1 font-heading text-xl font-light text-foreground">{section.title}</h3>
        </div>
        <Link
          href={parentHref}
          onClick={onClose}
          className="group flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-gold"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {section.items.map((megaItem) => (
          <motion.div key={megaItem.href} variants={item}>
            <Link
              href={megaItem.href}
              onClick={onClose}
              className="group relative flex gap-4 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-500 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={megaItem.image}
                  alt={megaItem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="80px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              </div>
              <div className="min-w-0 flex-1 py-0.5">
                {megaItem.badge && (
                  <span className="mb-1 inline-block rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-gold">
                    {megaItem.badge}
                  </span>
                )}
                <p className="truncate font-heading text-sm font-light text-foreground transition-colors group-hover:text-gold">
                  {megaItem.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                  {megaItem.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
