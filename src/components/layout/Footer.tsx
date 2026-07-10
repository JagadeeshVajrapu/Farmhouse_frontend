import Link from 'next/link';
import Image from 'next/image';
import { Share2, Globe, MessageCircle, Mail, Phone, MapPin, ArrowUp, Clock } from 'lucide-react';
import { siteConfig, contactConfig, socialConfig, navConfig } from '@/config';
import { NavbarLogo } from './navbar/NavbarLogo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/10 bg-[#080808]">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <NavbarLogo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A sanctuary of refined luxury where timeless elegance meets the tranquility of
              nature. Experience hospitality reimagined at Vidhaan Farm House.
            </p>
            <div className="mt-8 flex gap-3">
              {[
                { href: socialConfig.instagram, icon: Share2, label: 'Instagram' },
                { href: socialConfig.facebook, icon: Globe, label: 'Facebook' },
                { href: socialConfig.twitter, icon: MessageCircle, label: 'Twitter' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-gold/40 hover:text-gold"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
              Explore
            </h4>
            <ul className="space-y-3">
              {navConfig.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {contactConfig.address}
              </li>
              <li>
                <a
                  href={`tel:${contactConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {contactConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  {contactConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {contactConfig.workingHours}
              </li>
            </ul>
          </div>

          {/* Stay Connected + Payment QR */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
              Stay Connected
            </h4>
            <p className="mb-5 text-sm text-muted-foreground">
              Exclusive offers and seasonal experiences, delivered with care.
            </p>
            <form className="flex flex-col gap-3" action="#" method="post">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
                aria-label="Email for newsletter"
                suppressHydrationWarning
              />
              <button
                type="submit"
                className="rounded-xl bg-gold px-4 py-3.5 text-xs font-medium uppercase tracking-wider text-[#0a0a0a] transition-colors hover:bg-gold-light"
                suppressHydrationWarning
              >
                Subscribe
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-gold/15 bg-white/[0.02] p-5">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
                Pay via UPI
              </p>
              <p className="mb-4 text-xs text-muted-foreground">
                Scan the QR code below to pay for bookings and events.
              </p>
              <div className="flex justify-center">
                <div className="shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <Image
                    src="/payment-qr.png"
                    alt="UPI payment QR code for Vidhaan Farm House"
                    width={140}
                    height={140}
                    className="h-[140px] w-[140px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
            <p className="text-center text-xs text-muted-foreground md:text-left">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>

            <p className="text-center text-[11px] text-muted-foreground/80">
              Developed by{' '}
              <a
                href="https://webfasttech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold transition-colors hover:text-gold-light"
              >
                Web Fast Technology
              </a>
            </p>

            <div className="flex items-center justify-center gap-6 md:justify-end">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-gold">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-gold">
                Terms
              </Link>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
                aria-label="Back to top"
              >
                <ArrowUp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
