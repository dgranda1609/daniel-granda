export type TestimonialColor = 'accent' | 'primary' | 'neutral';

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company?: string;
  color: TestimonialColor;
  image_url?: string;
  verified: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface TestimonialSummary {
  text: string;
  author: string;
  role: string;
  color: TestimonialColor;
}
