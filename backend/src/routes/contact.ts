import { Router } from 'express';
import { contactController } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';
import { contactRateLimit } from '../middleware/rateLimit.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public (rate limited)
router.post('/', contactRateLimit, asyncHandler(contactController.submit));

// Admin
router.get('/', requireAuth, asyncHandler(contactController.list));
router.put('/:id/read', requireAuth, asyncHandler(contactController.markRead));
router.delete('/:id', requireAuth, asyncHandler(contactController.delete));

export default router;
