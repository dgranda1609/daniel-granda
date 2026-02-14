export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}
