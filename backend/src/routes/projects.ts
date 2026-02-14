import { Router } from 'express';
import { projectController } from '../controllers/projectController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public
router.get('/', asyncHandler(projectController.list));
router.get('/:slug', asyncHandler(projectController.getBySlug));

// Admin
router.post('/', requireAuth, asyncHandler(projectController.create));
router.put('/:id', requireAuth, asyncHandler(projectController.update));
router.delete('/:id', requireAuth, asyncHandler(projectController.delete));

export default router;
