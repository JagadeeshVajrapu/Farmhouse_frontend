import Link from 'next/link';
import { siteConfig } from '@/config/site';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Minimal auth layout — centered form, no header/footer
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-background to-background" />
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-forest/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-10 block text-center">
          <h1 className="font-heading text-2xl font-light tracking-wider text-foreground">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Luxury Estate
          </p>
        </Link>
        {children}
      </div>
    </div>
  );
}




