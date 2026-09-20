import { api } from './client';
import type { Application, SchoolTour } from '@/types';

export const admissionsService = {
  async submitApplication(data: {
    applicant_name: string;
    applicant_email: string;
    applicant_phone: string;
    child_name: string;
    child_dob: string;
    child_gender: 'male' | 'female';
    desired_class_id?: number;
  }): Promise<{ success: boolean; data?: Application; message?: string }> {
    const response = await api.post('/admissions/applications', data);
    return response.data;
  },

  async trackApplication(applicationNumber: string): Promise<{ success: boolean; data?: Application; message?: string }> {
    const response = await api.get('/admissions/applications/track', {
      params: { application_number: applicationNumber },
    });
    return response.data;
  },

  async bookTour(data: {
    parent_name: string;
    email: string;
    phone: string;
    preferred_date: string;
    preferred_time?: string;
    notes?: string;
  }): Promise<{ success: boolean; data?: SchoolTour; message?: string }> {
    const response = await api.post('/admissions/tours', data);
    return response.data;
  },
};
