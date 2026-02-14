
export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  imageUrl: string;
}

export interface Client {
  name: string;
  category: string;
  description?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  color: 'accent' | 'primary' | 'neutral';
}
