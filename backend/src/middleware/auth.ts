import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Missing authorization header' });
    return;
  }

  const token = authHeader.slice(7);

  if (token !== env.API_KEY) {
    res.status(403).json({ success: false, error: 'Invalid API key' });
    return;
  }

  next();
}
