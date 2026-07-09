'use client';

import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

/**
 * Root provider composition — wraps entire application
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
