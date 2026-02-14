import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
  API_KEY: z.string().min(32),
  CORS_ORIGIN: z.string().default('https://daniel-granda.com'),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().default('contact@daniel-granda.com'),
  UPLOAD_DIR: z.string().default('./uploads'),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().default(10),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
