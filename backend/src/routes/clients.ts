import { Router } from 'express';
import { clientController } from '../controllers/clientController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public
router.get('/', asyncHandler(clientController.list));

// Admin
router.post('/', requireAuth, asyncHandler(clientController.create));
router.put('/:id', requireAuth, asyncHandler(clientController.update));
router.delete('/:id', requireAuth, asyncHandler(clientController.delete));

export default router;
