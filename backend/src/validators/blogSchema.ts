import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(500).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(1000).optional(),
  content: z.string().min(1),
  author: z.string().max(255).default('Daniel Granda'),
  category: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  featured_image: z.string().max(500).optional(),
  is_published: z.boolean().default(false),
  published_at: z.string().datetime().optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const createCuratedSchema = z.object({
  title: z.string().min(1).max(500),
  url: z.string().url().max(1000),
  source: z.string().min(1).max(255),
  excerpt: z.string().max(1000).optional(),
  category: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  featured_image: z.string().max(500).optional(),
  is_published: z.boolean().default(true),
});

export const updateCuratedSchema = createCuratedSchema.partial();
