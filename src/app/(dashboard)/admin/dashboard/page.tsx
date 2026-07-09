'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Home, Users, TrendingUp } from 'lucide-react';
import { bookingApi } from '@/lib/api';
import { useAuth } from '@/features/auth';
import { LoadingSpinner } from '@/components/shared';
import { formatDate, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Booking, Property } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  confirmed: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-red-500/10 text-red-400',
  completed: 'bg-blue-500/10 text-blue-400',
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await bookingApi.getAll();
      return res.data.data || [];
    },
    enabled: isAuthenticated && (user?.role === 'admin' || user?.role === 'staff'),
  });

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login?redirect=/admin/dashboard');
      } else if (user?.role !== 'admin' && user?.role !== 'staff') {
        router.push('/');
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const stats = {
    total: bookings?.length || 0,
    pending: bookings?.filter((b: Booking) => b.status === 'pending').length || 0,
    confirmed: bookings?.filter((b: Booking) => b.status === 'confirmed').length || 0,
    revenue:
      bookings
        ?.filter((b: Booking) => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum: number, b: Booking) => sum + b.totalPrice, 0) || 0,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-light text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'text-gold' },
          { label: 'Pending', value: stats.pending, icon: Users, color: 'text-yellow-400' },
          { label: 'Confirmed', value: stats.confirmed, icon: Home, color: 'text-green-400' },
          { label: 'Revenue', value: formatPrice(stats.revenue), icon: TrendingUp, color: 'text-gold' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="luxury-shadow rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-2 font-heading text-2xl text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="luxury-shadow rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-heading text-xl text-foreground">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner />
            </div>
          ) : !bookings?.length ? (
            <div className="p-8 text-center text-muted-foreground">No bookings yet</div>
          ) : (
            bookings.slice(0, 10).map((booking: Booking) => {
              const property = booking.property as Property;
              return (
                <div
                  key={booking._id}
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {typeof property === 'object' ? property.name : 'Property'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.guestName} · {formatDate(booking.checkIn)} —{' '}
                      {formatDate(booking.checkOut)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-gold">{formatPrice(booking.totalPrice)}</span>
                    <Badge className={statusColors[booking.status] || ''}>{booking.status}</Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
