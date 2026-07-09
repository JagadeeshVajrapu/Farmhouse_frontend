import apiClient from './client';
import type { ApiResponse, Review } from '@/types';

export const reviewApi = {
  getByProperty: (propertyId: string) =>
    apiClient.get<ApiResponse<Review[]> & { avgRating: number }>(
      `/reviews/property/${propertyId}`
    ),

  create: (data: { propertyId: string; rating: number; comment: string }) =>
    apiClient.post('/reviews', data),
};
