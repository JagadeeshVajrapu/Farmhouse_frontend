'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigation, navQuickLinks } from '@/config/navigation';
import { NavbarLogo } from './NavbarLogo';
import { WhatsAppButton } from './WhatsAppButton';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { useAuth } from '@/features/auth';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [expandedMega, setExpandedMega] = useState<string | null>(null);

  const toggleMega = (label: string) => {
    setExpandedMega((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-gold/10 bg-[#0a0a0a]/98 backdrop-blur-2xl lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/10 px-6 py-5">
              <NavbarLogo compact />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground transition-colors hover:border-gold/30 hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {navigation.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href));

                  if (link.megaMenu) {
                    const isExpanded = expandedMega === link.label;
                    return (
                      <li key={link.href}>
                        <button
                          onClick={() => toggleMega(link.label)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm uppercase tracking-wider transition-colors',
                            isActive
                              ? 'bg-gold/10 text-gold'
                              : 'text-foreground/80 hover:bg-white/5 hover:text-gold'
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-300',
                              isExpanded && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-2 px-2 py-3">
                                {link.megaMenu.items.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                                  >
                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                      <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium text-foreground">
                                        {item.title}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="flex items-center gap-1 px-2 py-2 text-[10px] uppercase tracking-wider text-gold"
                                >
                                  View all <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          'block rounded-xl px-4 py-3.5 text-sm uppercase tracking-wider transition-colors',
                          isActive
                            ? 'bg-gold/10 text-gold'
                            : 'text-foreground/80 hover:bg-white/5 hover:text-gold'
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick links */}
              <div className="mt-6 border-t border-gold/10 pt-6">
                <p className="mb-3 px-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Quick Access
                </p>
                {navQuickLinks.map((ql) => (
                  <Link
                    key={ql.href}
                    href={ql.href}
                    onClick={onClose}
                    className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {ql.label}
                  </Link>
                ))}
              </div>

              {/* User */}
              {isAuthenticated && (user?.role === 'admin' || user?.role === 'staff') && (
                <div className="mt-4 border-t border-gold/10 pt-4">
                  <p className="mb-2 px-4 text-xs text-muted-foreground">
                    Signed in as <span className="text-foreground">{user?.name}</span>
                  </p>
                  <Link
                    href="/admin/dashboard"
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:text-gold"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </nav>

            {/* Footer CTAs */}
            <div className="space-y-3 border-t border-gold/10 p-6">
              <LuxuryButton href={ENQUIRY_HREF} variant="outline" className="w-full" size="md">
                Send Enquiry
              </LuxuryButton>
              <LuxuryButton
                href={bookNowWhatsAppUrl()}
                external
                className="w-full"
                size="md"
              >
                Book Now
              </LuxuryButton>
              <WhatsAppButton variant="full" className="w-full justify-center" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
