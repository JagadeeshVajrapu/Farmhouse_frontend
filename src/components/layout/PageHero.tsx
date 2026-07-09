import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Reusable full-width page hero with image overlay
 */
export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  align = 'left',
  className,
  children,
}: PageHeroProps) {
  return (
    <section className={cn('relative flex min-h-[50vh] items-end', className)}>
      <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
      <div className="gradient-overlay absolute inset-0" />
      <div
        className={cn(
          'relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-8',
          align === 'center' && 'text-center'
        )}
      >
        {subtitle && (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">{subtitle}</p>
        )}
        <h1 className="font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
