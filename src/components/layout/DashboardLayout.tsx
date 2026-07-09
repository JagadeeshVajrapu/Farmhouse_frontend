'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Home, ArrowLeft, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/enquiries', label: 'Customer Enquiries', icon: Inbox },
  { href: '/accommodations', label: 'Properties', icon: Home },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin dashboard layout — sidebar navigation
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Admin</p>
              <p className="mt-1 font-heading text-lg text-foreground">{siteConfig.name}</p>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors',
                      isActive
                        ? 'bg-gold/10 text-gold'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              className="flex items-center gap-2 px-4 text-xs text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to site
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
