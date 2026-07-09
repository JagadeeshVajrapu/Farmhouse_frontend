import apiClient from './client';
import type { ApiResponse, ContactEnquiryFull, ContactStatus, PaginatedContactsResponse } from '@/types';

export interface ContactListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const contactApi = {
  submit: (data: {
    name: string;
    phone: string;
    email: string;
    eventType: string;
    preferredDate: string;
    guestCount: number;
    message: string;
  }) => apiClient.post<ApiResponse<ContactEnquiryFull>>('/contact', data),

  getAll: (params?: ContactListParams) =>
    apiClient.get<PaginatedContactsResponse>('/contact', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<ContactEnquiryFull>>(`/contact/${id}`),

  updateStatus: (id: string, status: ContactStatus) =>
    apiClient.patch<ApiResponse<ContactEnquiryFull>>(`/contact/${id}/status`, { status }),

  delete: (id: string) => apiClient.delete<ApiResponse<null>>(`/contact/${id}`),

  exportCsv: (params?: Pick<ContactListParams, 'search' | 'status'>) =>
    apiClient.get('/contact/export', {
      params,
      responseType: 'blob',
    }),
};
