import { snakeToCamel, camelToSnake } from './caseConversion';
import type { BlogPost, CuratedLink } from '../shared/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export class AdminApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(apiKey: string) {
    this.baseUrl = API_URL;
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const json = await response.json();
    const data = json.data !== undefined ? json.data : json;
    return snakeToCamel<T>(data);
  }

  // Posts
  async getAllPosts(): Promise<BlogPost[]> {
    return this.request<BlogPost[]>('/blog/posts');
  }

  async getPost(slug: string): Promise<BlogPost> {
    return this.request<BlogPost>(`/blog/posts/${slug}`);
  }

  async createPost(data: Partial<BlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>('/blog/posts', {
      method: 'POST',
      body: JSON.stringify(camelToSnake(data)),
    });
  }

  async updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>(`/blog/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(camelToSnake(data)),
    });
  }

  async deletePost(id: string): Promise<void> {
    return this.request<void>(`/blog/posts/${id}`, { method: 'DELETE' });
  }

  // Curated links
  async getAllCurated(): Promise<CuratedLink[]> {
    return this.request<CuratedLink[]>('/blog/curated');
  }

  async createCurated(data: Partial<CuratedLink>): Promise<CuratedLink> {
    return this.request<CuratedLink>('/blog/curated', {
      method: 'POST',
      body: JSON.stringify(camelToSnake(data)),
    });
  }

  async updateCurated(id: string, data: Partial<CuratedLink>): Promise<CuratedLink> {
    return this.request<CuratedLink>(`/blog/curated/${id}`, {
      method: 'PUT',
      body: JSON.stringify(camelToSnake(data)),
    });
  }

  async deleteCurated(id: string): Promise<void> {
    return this.request<void>(`/blog/curated/${id}`, { method: 'DELETE' });
  }

  // Sync markdown files → database
  async syncMarkdown(): Promise<{ synced: number; message: string }> {
    return this.request<{ synced: number; message: string }>('/blog/sync', {
      method: 'POST',
    });
  }
}
