export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  full_description?: string;
  tags: string[];
  image_url: string;
  images?: string[];
  video_url?: string;
  demo_link?: string;
  tools?: string[];
  client?: string;
  outcome?: string;
  visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  imageUrl: string;
}
