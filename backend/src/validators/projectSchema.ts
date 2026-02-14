import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
  summary: z.string().min(1).max(1000),
  full_description: z.string().max(10000).optional(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  image_url: z.string().max(500),
  images: z.array(z.string().max(500)).max(20).optional(),
  video_url: z.string().max(500).optional(),
  demo_link: z.string().max(500).optional(),
  tools: z.array(z.string().max(50)).max(30).optional(),
  client: z.string().max(255).optional(),
  outcome: z.string().max(2000).optional(),
  visible: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
});

export const updateProjectSchema = createProjectSchema.partial();
