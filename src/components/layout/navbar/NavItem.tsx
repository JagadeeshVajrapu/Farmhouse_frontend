'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/config/navigation';
import { MegaMenuPanel } from './MegaMenuPanel';

interface NavItemProps {
  link: NavLink;
  onMegaOpen: (open: boolean) => void;
}

export function NavItem({ link, onMegaOpen }: NavItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive =
    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (link.megaMenu) {
      setIsOpen(true);
      onMegaOpen(true);
    }
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      onMegaOpen(false);
    }, 120);
  };

  const closeMega = () => {
    setIsOpen(false);
    onMegaOpen(false);
  };

  if (!link.megaMenu) {
    return (
      <Link
        href={link.href}
        className={cn(
          'group relative shrink-0 whitespace-nowrap px-1.5 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 xl:text-[11px] xl:tracking-[0.16em]',
          isActive ? 'text-gold' : 'text-foreground/80 hover:text-gold'
        )}
      >
        {link.label}
        <span
          className={cn(
            'absolute -bottom-0.5 left-1.5 right-1.5 h-px bg-gold transition-all duration-500 ease-out',
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        />
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={link.href}
        className={cn(
          'group relative flex shrink-0 items-center gap-1 whitespace-nowrap px-1.5 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 xl:text-[11px] xl:tracking-[0.16em]',
          isActive || isOpen ? 'text-gold' : 'text-foreground/80 hover:text-gold'
        )}
      >
        {link.label}
        <ChevronDown
          className={cn(
            'h-3 w-3 shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
        <span
          className={cn(
            'absolute -bottom-0.5 left-1.5 right-1.5 h-px bg-gold transition-all duration-500',
            isActive || isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-4 w-[720px] -translate-x-1/2"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="rounded-2xl border border-gold/15 bg-[#0c0c0c]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <MegaMenuPanel
                section={link.megaMenu}
                parentHref={link.href}
                onClose={closeMega}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
