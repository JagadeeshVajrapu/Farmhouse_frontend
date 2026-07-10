'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigation } from '@/config/navigation';
import { NavbarLogo } from './NavbarLogo';
import { NavItem } from './NavItem';
import { MobileNav } from './MobileNav';
import { WhatsAppButton } from './WhatsAppButton';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { useAuth } from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const isHome = pathname === '/';
  const showGlass = isScrolled || !isHome || megaOpen;
  const navGlass = showGlass || isHome;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrolled = latest > 40;
    setIsScrolled(scrolled);

    // Hide on scroll down, reveal on scroll up (after threshold)
    if (latest > lastScrollY && latest > 200 && !megaOpen && !isMobileOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(latest);
  });

  useEffect(() => {
    setIsMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    document.body.classList.toggle('mobile-nav-open', isMobileOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isMobileOpen]);

  const handleMegaOpen = useCallback((open: boolean) => {
    setMegaOpen(open);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 overflow-visible transition-[background,box-shadow,border-color] duration-500',
          navGlass
            ? 'border-b border-gold/10 bg-[#0a0a0a]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        {/* Gold accent line on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: showGlass ? 1 : 0,
            opacity: showGlass ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0.5 }}
        />

        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <NavbarLogo className="min-w-0 shrink-0" />

          {/* Desktop Navigation — Home is the logo; omit here to avoid overlap */}
          <nav className="hidden min-w-0 items-center justify-center gap-2 xl:gap-4 2xl:gap-5 lg:flex">
            {navigation
              .filter((link) => link.href !== '/')
              .map((link) => (
                <NavItem key={link.href} link={link} onMegaOpen={handleMegaOpen} />
              ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex lg:gap-3">
            <WhatsAppButton />

            {isAuthenticated && (user?.role === 'admin' || user?.role === 'staff') ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs uppercase tracking-wider text-foreground/80 transition-all duration-300 hover:border-gold/30 hover:text-gold"
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 border-gold/15 bg-[#141414]/95 backdrop-blur-xl"
                >
                  <DropdownMenuItem
                    onClick={() => (window.location.href = '/admin/dashboard')}
                    className="gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            <LuxuryButton href={ENQUIRY_HREF} variant="outline" size="sm" className="hidden 2xl:inline-flex">
              Enquiry
            </LuxuryButton>

            <LuxuryButton
              href={bookNowWhatsAppUrl()}
              external
              size="sm"
              className="shrink-0 whitespace-nowrap shadow-[0_4px_24px_rgba(184,149,74,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(184,149,74,0.35)]"
            >
              Book Now
            </LuxuryButton>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <WhatsAppButton className="h-11 w-11" />
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:border-gold/30 hover:text-gold"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Full-width mega menu backdrop */}
        <motion.div
          initial={false}
          animate={{ opacity: megaOpen ? 1 : 0, pointerEvents: megaOpen ? 'auto' : 'none' }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 top-full hidden h-screen bg-black/40 backdrop-blur-[2px] lg:block"
          onClick={() => setMegaOpen(false)}
        />
      </motion.header>

      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
