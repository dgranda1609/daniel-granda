import { z } from 'zod';

export const contactSubmitSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address').max(255),
  company: z.string().max(255).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});
