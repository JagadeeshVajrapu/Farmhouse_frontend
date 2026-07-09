import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {subtitle && (
        <p
          className={cn(
            'mb-4 text-sm font-medium uppercase tracking-[0.25em]',
            light ? 'text-gold-light' : 'text-gold'
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-light leading-tight md:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-6 text-base leading-relaxed md:text-lg',
            light ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          'mt-6 h-px w-16 bg-gradient-to-r from-gold to-gold/0',
          align === 'center' && 'mx-auto'
        )}
      />
    </div>
  );
}
