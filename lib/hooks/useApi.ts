import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from '../api';
import type {
  Project,
  Client,
  Testimonial,
  BlogPost,
  CuratedLink,
  FeedItem,
  ContactFormData,
  SiteSettings
} from '../../shared/types';

// Query keys
export const queryKeys = {
  projects: ['projects'] as const,
  projectBySlug: (slug: string) => ['projects', slug] as const,
  clients: ['clients'] as const,
  testimonials: ['testimonials'] as const,
  feed: ['blog', 'feed'] as const,
  posts: ['blog', 'posts'] as const,
  postBySlug: (slug: string) => ['blog', 'posts', slug] as const,
  curatedLinks: ['blog', 'curated'] as const,
  settings: ['settings'] as const,
  health: ['health'] as const,
};

// Projects
export function useProjects(options?: UseQueryOptions<Project[], Error>) {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => api.getProjects(),
    ...options,
  });
}

export function useProjectBySlug(
  slug: string,
  options?: UseQueryOptions<Project, Error>
) {
  return useQuery({
    queryKey: queryKeys.projectBySlug(slug),
    queryFn: () => api.getProjectBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

// Clients
export function useClients(options?: UseQueryOptions<Client[], Error>) {
  return useQuery({
    queryKey: queryKeys.clients,
    queryFn: () => api.getClients(),
    ...options,
  });
}

// Testimonials
export function useTestimonials(options?: UseQueryOptions<Testimonial[], Error>) {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: () => api.getTestimonials(),
    ...options,
  });
}

// Blog
export function useFeed(options?: UseQueryOptions<FeedItem[], Error>) {
  return useQuery({
    queryKey: queryKeys.feed,
    queryFn: () => api.getFeed(),
    ...options,
  });
}

export function usePosts(options?: UseQueryOptions<BlogPost[], Error>) {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => api.getPosts(),
    ...options,
  });
}

export function usePostBySlug(
  slug: string,
  options?: UseQueryOptions<BlogPost, Error>
) {
  return useQuery({
    queryKey: queryKeys.postBySlug(slug),
    queryFn: () => api.getPostBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

export function useCuratedLinks(options?: UseQueryOptions<CuratedLink[], Error>) {
  return useQuery({
    queryKey: queryKeys.curatedLinks,
    queryFn: () => api.getCuratedLinks(),
    ...options,
  });
}

// Contact form
export function useSubmitContact(
  options?: UseMutationOptions<{ message: string }, Error, ContactFormData>
) {
  return useMutation({
    mutationFn: (data: ContactFormData) => api.submitContact(data),
    ...options,
  });
}

// Settings
export function useSettings(options?: UseQueryOptions<SiteSettings, Error>) {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => api.getSettings(),
    ...options,
  });
}

// Health check
export function useHealth(options?: UseQueryOptions<{ status: string; timestamp: string }, Error>) {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => api.checkHealth(),
    ...options,
  });
}
