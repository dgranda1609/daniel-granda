import type { CorsOptions } from 'cors';
import { env } from './env.js';

const splitOrigins = (value: string): string[] =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const productionOrigins = splitOrigins(env.CORS_ORIGIN);

export const corsConfig: CorsOptions = {
  origin: env.NODE_ENV === 'development'
    ? [...new Set([...productionOrigins, 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:5173'])]
    : productionOrigins.length <= 1
      ? productionOrigins[0] ?? false
      : productionOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
};
