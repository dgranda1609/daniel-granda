import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1).max(255),
  category: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  logo_url: z.string().max(500).optional(),
  website: z.string().max(500).optional(),
  project_count: z.number().int().min(0).optional(),
  is_featured: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
});

export const updateClientSchema = createClientSchema.partial();
