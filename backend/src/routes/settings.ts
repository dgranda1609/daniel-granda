import { Router } from 'express';
import { settingsController } from '../controllers/settingsController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public
router.get('/', asyncHandler(settingsController.getPublic));

// Admin
router.put('/', requireAuth, asyncHandler(settingsController.update));

export default router;
