import { z } from 'zod';

export const createTestimonialSchema = z.object({
  text: z.string().min(1).max(2000),
  author: z.string().min(1).max(255),
  role: z.string().min(1).max(255),
  company: z.string().max(255).optional(),
  color: z.enum(['accent', 'primary', 'neutral']).default('accent'),
  image_url: z.string().max(500).optional(),
  verified: z.boolean().default(false),
  is_featured: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
