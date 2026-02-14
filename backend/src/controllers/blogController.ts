import type { Request, Response } from 'express';
import { blogPostModel } from '../models/blogPostModel.js';
import { curatedLinkModel } from '../models/curatedLinkModel.js';
import { createPostSchema, updatePostSchema, createCuratedSchema, updateCuratedSchema } from '../validators/blogSchema.js';
import { slugify } from '../utils/slugify.js';
import { parsePagination, paginationMeta } from '../utils/pagination.js';
import { syncBlogPosts, syncCuratedLinks } from '../services/syncService.js';
import { AppError } from '../middleware/errorHandler.js';
import { pool } from '../config/database.js';

export const blogController = {
  // Combined feed (posts + curated)
  async feed(req: Request, res: Response) {
    const { page, limit, offset } = parsePagination(req.query as { page?: string; limit?: string });

    const result = await pool.query(
      `SELECT * FROM (
        SELECT id, title, slug AS slug_or_url, excerpt, NULL AS source, category, tags, featured_image, published_at AS date, 'post' AS type
        FROM blog_posts WHERE is_published = true
        UNION ALL
        SELECT id, title, url AS slug_or_url, excerpt, source, category, tags, featured_image, curated_at AS date, 'curated' AS type
        FROM curated_links WHERE is_published = true
      ) feed ORDER BY date DESC LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const countResult = await pool.query(
      `SELECT
        (SELECT COUNT(*) FROM blog_posts WHERE is_published = true) +
        (SELECT COUNT(*) FROM curated_links WHERE is_published = true) AS total`,
    );
    const total = parseInt(countResult.rows[0].total, 10);

    res.json({
      success: true,
      data: result.rows,
      meta: paginationMeta(total, { page, limit, offset }),
    });
  },

  // Published posts
  async listPosts(req: Request, res: Response) {
    const { page, limit, offset } = parsePagination(req.query as { page?: string; limit?: string });
    const { rows, total } = await blogPostModel.findPublished(limit, offset);
    res.json({
      success: true,
      data: rows,
      meta: paginationMeta(total, { page, limit, offset }),
    });
  },

  // Single post by slug
  async getPost(req: Request, res: Response) {
    const post = await blogPostModel.findBySlug(req.params.slug);
    if (!post || (!post.is_published && !req.headers.authorization)) {
      throw new AppError(404, 'Post not found');
    }
    res.json({ success: true, data: post });
  },

  // Curated links
  async listCurated(req: Request, res: Response) {
    const { page, limit, offset } = parsePagination(req.query as { page?: string; limit?: string });
    const { rows, total } = await curatedLinkModel.findPublished(limit, offset);
    res.json({
      success: true,
      data: rows,
      meta: paginationMeta(total, { page, limit, offset }),
    });
  },

  // Admin: create post
  async createPost(req: Request, res: Response) {
    const data = createPostSchema.parse(req.body);
    const slug = data.slug || slugify(data.title);

    const existing = await blogPostModel.findBySlug(slug);
    if (existing) throw new AppError(409, 'A post with this slug already exists');

    const post = await blogPostModel.create({ ...data, slug });
    res.status(201).json({ success: true, data: post });
  },

  // Admin: update post
  async updatePost(req: Request, res: Response) {
    const data = updatePostSchema.parse(req.body);
    const post = await blogPostModel.update(req.params.id, data);
    if (!post) throw new AppError(404, 'Post not found');
    res.json({ success: true, data: post });
  },

  // Admin: delete post
  async deletePost(req: Request, res: Response) {
    const deleted = await blogPostModel.delete(req.params.id);
    if (!deleted) throw new AppError(404, 'Post not found');
    res.json({ success: true, data: { deleted: true } });
  },

  // Admin: create curated link
  async createCurated(req: Request, res: Response) {
    const data = createCuratedSchema.parse(req.body);
    const link = await curatedLinkModel.create(data);
    res.status(201).json({ success: true, data: link });
  },

  // Admin: update curated link
  async updateCurated(req: Request, res: Response) {
    const data = updateCuratedSchema.parse(req.body);
    const link = await curatedLinkModel.update(req.params.id, data);
    if (!link) throw new AppError(404, 'Curated link not found');
    res.json({ success: true, data: link });
  },

  // Admin: delete curated link
  async deleteCurated(req: Request, res: Response) {
    const deleted = await curatedLinkModel.delete(req.params.id);
    if (!deleted) throw new AppError(404, 'Curated link not found');
    res.json({ success: true, data: { deleted: true } });
  },

  // Admin: sync markdown files to DB
  async syncMarkdown(_req: Request, res: Response) {
    const posts = await syncBlogPosts();
    const curated = await syncCuratedLinks();
    res.json({
      success: true,
      data: { posts, curated },
    });
  },
};
