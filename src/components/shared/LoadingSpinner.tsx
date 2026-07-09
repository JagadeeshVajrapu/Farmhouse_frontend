import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-5 w-5 border',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-2',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-gold border-t-transparent',
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
