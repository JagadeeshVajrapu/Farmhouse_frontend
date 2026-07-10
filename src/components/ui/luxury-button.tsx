import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

export const luxuryButtonVariants = cva(
  'inline-flex max-w-full items-center justify-center gap-2 whitespace-normal text-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50 sm:whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-gold text-charcoal hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30',
        outline:
          'border border-gold/40 text-gold bg-transparent hover:bg-gold/10 hover:border-gold',
        ghost: 'text-gold hover:bg-gold/10',
        dark: 'bg-charcoal text-cream hover:bg-charcoal-light',
        glass:
          'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
      },
      size: {
        sm: 'h-9 px-4 text-xs tracking-wider uppercase rounded-full',
        md: 'h-11 px-6 text-sm tracking-wider uppercase rounded-full',
        lg: 'h-14 px-8 text-sm tracking-widest uppercase rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type LuxuryButtonBaseProps = VariantProps<typeof luxuryButtonVariants> & {
  className?: string;
  children?: React.ReactNode;
};

type LuxuryButtonAsButton = LuxuryButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LuxuryButtonAsLink = LuxuryButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export type LuxuryButtonProps = LuxuryButtonAsButton | LuxuryButtonAsLink;

export const LuxuryButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, LuxuryButtonProps>(
  (props, ref) => {
    const { className, variant, size, children, ...rest } = props;
    const classes = cn(luxuryButtonVariants({ variant, size, className }));

    if ('href' in props && props.href) {
      const { href, external, ...anchorProps } = rest as LuxuryButtonAsLink;
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          suppressHydrationWarning
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        suppressHydrationWarning
        type={buttonProps.type ?? 'button'}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

LuxuryButton.displayName = 'LuxuryButton';
