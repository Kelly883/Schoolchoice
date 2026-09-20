import { api } from './client';
import type { Payment, Receipt } from '@/types';

export const paymentsService = {
  async initializePaystack(data: {
    email: string;
    amount: number;
    invoice_id?: number;
    metadata?: Record<string, unknown>;
  }): Promise<{ success: boolean; data?: { authorization_url: string; reference: string }; message?: string }> {
    const response = await api.post('/payments/paystack/initialize', data);
    return response.data;
  },

  async initializeFlutterwave(data: {
    email: string;
    amount: number;
    invoice_id?: number;
    metadata?: Record<string, unknown>;
  }): Promise<{ success: boolean; data?: { link: string; reference: string }; message?: string }> {
    const response = await api.post('/payments/flutterwave/initialize', data);
    return response.data;
  },

  async verifyPaystack(reference: string): Promise<{ success: boolean; data?: Payment; message?: string }> {
    const response = await api.post('/payments/paystack/verify', { reference });
    return response.data;
  },

  async verifyFlutterwave(reference: string): Promise<{ success: boolean; data?: Payment; message?: string }> {
    const response = await api.post('/payments/flutterwave/verify', { reference });
    return response.data;
  },

  async getReceipts(): Promise<{ success: boolean; data?: Receipt[] }> {
    const response = await api.get('/parent/receipts');
    return response.data;
  },
};
