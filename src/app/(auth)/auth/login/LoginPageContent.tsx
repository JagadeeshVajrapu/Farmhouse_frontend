'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LuxuryButton } from '@/components/ui/luxury-button';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      router.push(redirect);
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-light text-foreground">Welcome Back</h2>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to your Vidhaan account</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="luxury-shadow mt-8 rounded-2xl border border-border bg-card p-8"
      >
        <div className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} className="mt-1.5 bg-background" />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="mt-1.5 bg-background"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
        </div>

        <LuxuryButton type="submit" size="lg" className="mt-8 w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </LuxuryButton>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-gold hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
