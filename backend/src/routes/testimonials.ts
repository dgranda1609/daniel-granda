import { Router } from 'express';
import { testimonialController } from '../controllers/testimonialController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public
router.get('/', asyncHandler(testimonialController.list));

// Admin
router.post('/', requireAuth, asyncHandler(testimonialController.create));
router.put('/:id', requireAuth, asyncHandler(testimonialController.update));
router.delete('/:id', requireAuth, asyncHandler(testimonialController.delete));

export default router;
