'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingApi } from '@/lib/api';
import { useAuth } from '@/features/auth/context/AuthContext';
import { formatDate, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Booking, Property } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

export default function AdminBookingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await bookingApi.getAll();
      return res.data.data || [];
    },
    enabled: isAuthenticated && (user?.role === 'admin' || user?.role === 'staff'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      bookingApi.updateStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast.success('Booking status updated');
    },
    onError: () => toast.error('Failed to update status'),
  });

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login?redirect=/admin/bookings');
      } else if (user?.role !== 'admin' && user?.role !== 'staff') {
        router.push('/');
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <h1 className="font-heading text-3xl font-light text-charcoal">Manage Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage all reservation requests
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : !bookings?.length ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking: Booking) => {
                    const property = booking.property as Property;
                    return (
                      <tr key={booking._id} className="hover:bg-cream/50">
                        <td className="px-6 py-4">
                          <p className="font-medium">{booking.guestName}</p>
                          <p className="text-xs text-muted-foreground">{booking.guestEmail}</p>
                        </td>
                        <td className="px-6 py-4">
                          {typeof property === 'object' ? property.name : '—'}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                        </td>
                        <td className="px-6 py-4">{booking.guests}</td>
                        <td className="px-6 py-4 font-medium text-gold">
                          {formatPrice(booking.totalPrice)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[booking.status] || ''}>
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Select
                            value={booking.status}
                            onValueChange={(status) => {
                              if (status) {
                                updateMutation.mutate({ id: booking._id, status });
                              }
                            }}
                          >
                            <SelectTrigger className="h-8 w-32 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
