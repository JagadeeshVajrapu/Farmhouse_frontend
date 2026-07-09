'use client';

import { forwardRef, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-xs text-red-500 dark:text-red-400"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

const fieldBase = cn(
  'w-full rounded-xl border px-4 outline-none transition-all duration-300',
  'bg-white/80 text-[#0F172A] placeholder-transparent',
  'border-[#0F172A]/10 dark:border-border dark:bg-card/80 dark:text-foreground',
  'hover:border-[#C9A227]/30 dark:hover:border-gold/30',
  'focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20',
  'dark:focus:border-gold dark:focus:ring-gold/20'
);

const fieldErrorStyles = 'border-red-400 focus:border-red-400 focus:ring-red-400/20 dark:border-red-500/60';
const fieldValidStyles = 'border-emerald-500/40 focus:border-emerald-500/50 dark:border-emerald-500/30';

interface FloatingFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  hint?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ label, error, isValid, hint, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const errorId = id ? `${id}-error` : undefined;
    const hintId = id ? `${id}-hint` : undefined;

    return (
      <div className="group relative">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            fieldBase,
            'peer pb-3 pt-6',
            error && fieldErrorStyles,
            isValid && !error && fieldValidStyles,
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-4 transition-all duration-300',
            'text-[#0F172A]/50 dark:text-muted-foreground',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm',
            'top-2 text-[10px] uppercase tracking-wider',
            (focused || props.value) && 'top-2 text-[10px] text-[#C9A227] dark:text-gold',
            'peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#C9A227] peer-focus:uppercase peer-focus:tracking-wider dark:peer-focus:text-gold'
          )}
        >
          {label}
        </label>
        {isValid && !error && !focused && (
          <CheckCircle2
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        )}
        {error && errorId && <FieldError id={errorId} message={error} />}
        {hint && !error && hintId && (
          <p id={hintId} className="mt-1.5 text-[10px] text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
FloatingInput.displayName = 'FloatingInput';

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  charCount?: number;
  maxLength?: number;
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, isValid, charCount, maxLength, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const errorId = id ? `${id}-error` : undefined;
    const counterId = id ? `${id}-counter` : undefined;
    const nearLimit = maxLength && charCount !== undefined && charCount > maxLength * 0.9;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          placeholder=" "
          rows={4}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={[errorId, counterId].filter(Boolean).join(' ') || undefined}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            fieldBase,
            'peer resize-none pb-8 pt-7',
            error && fieldErrorStyles,
            isValid && !error && fieldValidStyles,
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-4 transition-all duration-300',
            'text-[#0F172A]/50 dark:text-muted-foreground',
            focused || (charCount !== undefined && charCount > 0)
              ? 'top-2 text-[10px] uppercase tracking-wider text-[#C9A227] dark:text-gold'
              : 'top-5 text-sm',
            'peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#C9A227] peer-focus:uppercase peer-focus:tracking-wider dark:peer-focus:text-gold'
          )}
        >
          {label}
        </label>
        {maxLength !== undefined && charCount !== undefined && counterId && (
          <p
            id={counterId}
            className={cn(
              'pointer-events-none absolute bottom-3 right-3 text-[10px] tabular-nums',
              nearLimit ? 'text-amber-500' : 'text-muted-foreground',
              charCount >= maxLength && 'text-red-500'
            )}
            aria-live="polite"
          >
            {charCount}/{maxLength}
          </p>
        )}
        {error && errorId && <FieldError id={errorId} message={error} />}
      </div>
    );
  }
);
FloatingTextarea.displayName = 'FloatingTextarea';

interface FloatingSelectProps {
  label: string;
  error?: string;
  isValid?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
}

export function FloatingSelect({
  label,
  error,
  isValid,
  value,
  onChange,
  options,
  id,
}: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = !!value;
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={cn(
          fieldBase,
          'appearance-none pb-3 pt-6',
          !hasValue && 'text-transparent',
          error && fieldErrorStyles,
          isValid && !error && hasValue && fieldValidStyles
        )}
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-4 transition-all duration-300',
          'text-[#0F172A]/50 dark:text-muted-foreground',
          focused || hasValue
            ? 'top-2 text-[10px] uppercase tracking-wider text-[#C9A227] dark:text-gold'
            : 'top-1/2 -translate-y-1/2 text-sm'
        )}
      >
        {label}
      </label>
      {error && errorId && <FieldError id={errorId} message={error} />}
    </div>
  );
}
