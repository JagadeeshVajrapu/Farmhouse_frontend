import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface NavbarLogoProps {
  compact?: boolean;
  className?: string;
  showText?: boolean;
}

export function NavbarLogo({ compact = false, className, showText = true }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className={cn('group relative flex items-center gap-3', className)}
      aria-label={siteConfig.name}
    >
      <div
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full transition-all duration-500',
          'border border-gold/30 bg-[#faf8f5] shadow-[0_2px_12px_rgba(0,0,0,0.12)]',
          'group-hover:border-gold/50 group-hover:shadow-[0_4px_16px_rgba(184,149,74,0.22)]',
          compact
            ? 'h-9 w-9'
            : 'h-11 w-11 sm:h-12 sm:w-12'
        )}
      >
        <Image
          src="/logo.png"
          alt={siteConfig.name}
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className="h-[82%] w-[82%] object-contain"
          priority
        />
      </div>
      {showText && !compact && (
        <div className="hidden min-w-[7.5rem] flex-col leading-tight 2xl:flex">
          <span className="font-heading text-sm font-light uppercase tracking-[0.12em] text-foreground transition-colors group-hover:text-gold">
            VIDHAAN
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-gold/90">
            FARM HOUSE
          </span>
        </div>
      )}
    </Link>
  );
}
