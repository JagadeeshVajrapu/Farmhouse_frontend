import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  variant?: 'icon' | 'full';
  className?: string;
}

export function WhatsAppButton({ variant = 'icon', className }: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl();

  if (variant === 'full') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-emerald-400 transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
          className
        )}
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        'group relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
        className
      )}
    >
      <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
