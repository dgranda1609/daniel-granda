export interface Client {
  id: string;
  name: string;
  category: string;
  description?: string;
  logo_url?: string;
  website?: string;
  project_count?: number;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ClientSummary {
  name: string;
  category: string;
  description?: string;
}
