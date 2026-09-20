import { api } from './client';
import type { User } from '@/types';

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(data: { name: string; email: string; password: string; password_confirmation: string }): Promise<RegisterResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async me(): Promise<{ success: boolean; user: User }> {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
