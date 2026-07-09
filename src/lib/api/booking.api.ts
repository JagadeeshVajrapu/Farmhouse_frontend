import apiClient from './client';
import type { ApiResponse, Booking, BookingFormData } from '@/types';

export const bookingApi = {
  create: (data: BookingFormData) => apiClient.post<ApiResponse<Booking>>('/bookings', data),

  getMyBookings: () => apiClient.get<ApiResponse<Booking[]>>('/bookings/my'),

  getAll: () => apiClient.get<ApiResponse<Booking[]>>('/bookings'),

  checkAvailability: (propertyId: string, checkIn: string, checkOut: string) =>
    apiClient.get<{ success: boolean; available: boolean }>('/bookings/availability', {
      params: { propertyId, checkIn, checkOut },
    }),

  updateStatus: (id: string, data: { status?: string; paymentStatus?: string }) =>
    apiClient.patch(`/bookings/${id}/status`, data),

  cancel: (id: string) => apiClient.patch(`/bookings/${id}/cancel`),
};
