import apiClient from './client';
import type { AuthResponse, User } from '@/types';

export const authApi = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  logout: () => apiClient.post('/auth/logout'),

  getMe: () => apiClient.get<{ success: boolean; user: User }>('/auth/me'),

  updateProfile: (data: { name?: string; phone?: string }) =>
    apiClient.put('/auth/profile', data),
};
