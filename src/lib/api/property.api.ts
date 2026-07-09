import apiClient from './client';
import type { ApiResponse, Property } from '@/types';

export const propertyApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Property[]>>('/properties', { params }),

  getFeatured: () => apiClient.get<ApiResponse<Property[]>>('/properties/featured'),

  getBySlug: (slug: string) => apiClient.get<ApiResponse<Property>>(`/properties/${slug}`),
};
