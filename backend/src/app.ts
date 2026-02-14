import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { corsConfig } from './config/cors.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { globalRateLimit } from './middleware/rateLimit.js';
import healthRoutes from './routes/health.js';
import projectRoutes from './routes/projects.js';
import clientRoutes from './routes/clients.js';
import testimonialRoutes from './routes/testimonials.js';
import blogRoutes from './routes/blog.js';
import contactRoutes from './routes/contact.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';

const app = express();

// Security
app.use(helmet());
app.use(cors(corsConfig));

// Rate limiting
app.use(globalRateLimit);

// Parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// Logging
app.use(requestLogger);

// Static uploads
app.use('/api/uploads', express.static(env.UPLOAD_DIR));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

// Error handling
app.use(errorHandler);

export default app;
