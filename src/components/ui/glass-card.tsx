import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, padding = 'md', children, ...props }, ref) => {
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
          hover && 'transition-all duration-500 hover:bg-white/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1',
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
