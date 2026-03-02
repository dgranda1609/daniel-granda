import { QueryClient } from '@tanstack/react-query';
import { snakeToCamel, camelToSnake } from './caseConversion';
import type {
  Project,
  Client,
  Testimonial,
  BlogPost,
  CuratedLink,
  FeedItem,
  ContactFormData,
  SiteSettings,
  ApiError
} from '../shared/types';

// Create query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// API URL from environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const API_KEY = import.meta.env.VITE_API_KEY;

// API client with error handling and case conversion
class ApiClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add API key for admin routes
    if (this.apiKey && endpoint.includes('/admin')) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'API request failed');
      }

      const response_data = await response.json();
      // Extract data from API response format: { success: true, data: [...] }
      const data = response_data.data !== undefined ? response_data.data : response_data;
      // Convert snake_case to camelCase for frontend
      return snakeToCamel<T>(data);
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    return this.request<Project>(`/projects/${slug}`);
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return this.request<Client[]>('/clients');
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return this.request<Testimonial[]>('/testimonials');
  }

  // Blog
  async getFeed(): Promise<FeedItem[]> {
    return this.request<FeedItem[]>('/blog/feed');
  }

  async getPosts(): Promise<BlogPost[]> {
    return this.request<BlogPost[]>('/blog/posts');
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    return this.request<BlogPost>(`/blog/posts/${slug}`);
  }

  async getCuratedLinks(): Promise<CuratedLink[]> {
    return this.request<CuratedLink[]>('/blog/curated');
  }

  // Contact
  async submitContact(data: ContactFormData): Promise<{ message: string }> {
    // Convert camelCase to snake_case for backend
    const snakeData = camelToSnake(data);
    return this.request<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(snakeData),
    });
  }

  // Settings
  async getSettings(): Promise<SiteSettings> {
    return this.request<SiteSettings>('/settings');
  }

  // Health check
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

// Export singleton instance
export const api = new ApiClient(API_URL, API_KEY);

// Export fallback data for development (kept from original)
export const FALLBACK_PROJECTS: Record<string, any> = {
  'ilo-documentary-series': {
    title: 'ILO Documentary Series',
    fullDescription: "A comprehensive documentary series highlighting the impact of ILO initiatives across the Andes, Amazon, and Coastal regions. We traveled to remote locations to capture authentic stories of change, resulting in a campaign adopted by 5 international NGOs.",
    images: [
      '/images/ILO-hero.gif',
      'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1518182170546-0766aa6f5d56?auto=format&fit=crop&q=80&w=1000'
    ],
    imageUrl: '/images/ILO-hero.gif',
    client: 'United Nations / ILO',
    outcome: '100k+ Views',
    tags: ['Documentary', 'UN/ILO', 'Cannes']
  },
  'dinamo-zagreb': {
    title: 'Dinamo Zagreb',
    fullDescription: 'Reimagining the visual identity for a legendary European football club. The motion graphics package brings dynamic energy to stadium screens and broadcast overlays, reflecting the team\'s aggressive playstyle.',
    images: [
      '/images/dinamo-hero.gif',
      'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1000'
    ],
    imageUrl: '/images/dinamo-hero.gif',
    client: 'Dinamo Zagreb',
    outcome: 'Brand Refresh',
    tags: ['Motion', 'Brand Identity', 'Sports']
  },
  'default': {
    title: 'Project Case Study',
    fullDescription: 'This is a detailed case study of the project. It showcases the creative process, technical challenges, and the final impact delivered to the client.',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000',
    client: 'Client Name',
    outcome: 'Successful Launch',
    tags: ['Strategy', 'Design', 'Development']
  }
};
