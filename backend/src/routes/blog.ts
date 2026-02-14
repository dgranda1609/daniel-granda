import { Router } from 'express';
import { blogController } from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Public
router.get('/feed', asyncHandler(blogController.feed));
router.get('/posts', asyncHandler(blogController.listPosts));
router.get('/posts/:slug', asyncHandler(blogController.getPost));
router.get('/curated', asyncHandler(blogController.listCurated));

// Admin
router.post('/posts', requireAuth, asyncHandler(blogController.createPost));
router.put('/posts/:id', requireAuth, asyncHandler(blogController.updatePost));
router.delete('/posts/:id', requireAuth, asyncHandler(blogController.deletePost));
router.post('/curated', requireAuth, asyncHandler(blogController.createCurated));
router.put('/curated/:id', requireAuth, asyncHandler(blogController.updateCurated));
router.delete('/curated/:id', requireAuth, asyncHandler(blogController.deleteCurated));
router.post('/sync', requireAuth, asyncHandler(blogController.syncMarkdown));

export default router;
