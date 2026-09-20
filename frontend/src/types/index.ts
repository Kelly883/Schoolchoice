// Shared TypeScript types for the School Digital Platform

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'school_admin' | 'admissions_officer' | 'finance_officer' | 'teacher' | 'parent' | 'student';
  email_verified_at?: string;
  last_activity_at?: string;
}

export interface Student {
  id: number;
  user_id?: number;
  admission_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  class_id?: number;
  parent_id?: number;
  admission_date?: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  photo_url?: string;
  academic_session_id?: number;
}

export interface Parent {
  id: number;
  user_id?: number;
  phone?: string;
  address?: string;
  occupation?: string;
  children?: Student[];
}

export interface Teacher {
  id: number;
  user_id?: number;
  phone?: string;
  qualification?: string;
  subject_id?: number;
  employment_date?: string;
  status: 'active' | 'inactive';
}

export interface SchoolClass {
  id: number;
  name: string;
  section?: string;
  teacher_id?: number;
  academic_session_id?: number;
  students?: Student[];
}

export interface Subject {
  id: number;
  name: string;
  code?: string;
  class_id?: number;
  teacher_id?: number;
}

export interface AcademicSession {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  terms?: Term[];
}

export interface Term {
  id: number;
  academic_session_id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface Application {
  id: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  child_name: string;
  child_dob: string;
  child_gender: 'male' | 'female';
  desired_class_id?: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'waitlisted';
  application_number: string;
  submitted_at?: string;
  reviewed_by?: number;
  reviewed_at?: string;
  decision?: string;
  decision_notes?: string;
  documents?: ApplicationDocument[];
}

export interface ApplicationDocument {
  id: number;
  application_id: number;
  document_type: string;
  file_path: string;
  file_name: string;
  file_size?: number;
  mime_type?: string;
  uploaded_at?: string;
  verified_by?: number;
  verified_at?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
}

export interface SchoolTour {
  id: number;
  parent_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface FeeStructure {
  id: number;
  class_id?: number;
  academic_session_id?: number;
  name: string;
  amount: number;
  due_date?: string;
  description?: string;
  is_recurring: boolean;
}

export interface Invoice {
  id: number;
  student_id: number;
  fee_structure_id?: number;
  amount: number;
  due_date?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  generated_at?: string;
  paid_at?: string;
  paid_amount?: number;
}

export interface Payment {
  id: number;
  user_id: number;
  invoice_id?: number;
  amount: number;
  currency: string;
  gateway: 'paystack' | 'flutterwave';
  gateway_reference?: string;
  gateway_response?: Record<string, unknown>;
  status: 'pending' | 'processing' | 'successful' | 'failed' | 'cancelled' | 'refunded';
  paid_at?: string;
  verified_at?: string;
  verified_by?: number;
  metadata?: Record<string, unknown>;
  receipt?: Receipt;
}

export interface Receipt {
  id: number;
  payment_id: number;
  receipt_number: string;
  amount: number;
  issued_at?: string;
  downloaded_at?: string;
  file_path?: string;
}

export interface Attendance {
  id: number;
  student_id: number;
  class_id?: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  recorded_by?: number;
  recorded_at?: string;
  term_id?: number;
}

export interface Result {
  id: number;
  student_id: number;
  subject_id: number;
  term_id?: number;
  score?: number;
  grade?: string;
  remarks?: string;
  published_at?: string;
  published_by?: number;
  academic_session_id?: number;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  audience: string;
  published_by?: number;
  published_at?: string;
  expires_at?: string;
  is_pinned: boolean;
}

export interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  subject?: string;
  body: string;
  read_at?: string;
  parent_id?: number;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  created_by?: number;
  is_public: boolean;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_by?: number;
  published_at?: string;
  is_published: boolean;
  category?: string;
}

export interface Gallery {
  id: number;
  title: string;
  image_url: string;
  caption?: string;
  category?: string;
  uploaded_by?: number;
  uploaded_at?: string;
  is_featured: boolean;
}

export interface Document {
  id: number;
  title: string;
  file_path: string;
  file_name: string;
  category?: string;
  uploaded_by?: number;
  uploaded_at?: string;
  access_level: 'public' | 'parents' | 'staff' | 'admin';
}

export interface AuditLog {
  id: number;
  user_id?: number;
  action: string;
  model_type?: string;
  model_id?: number;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
}

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  read_at?: string;
  action_url?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
