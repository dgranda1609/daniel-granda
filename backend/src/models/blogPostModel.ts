import { pool } from '../config/database.js';

export const blogPostModel = {
  async findPublished(limit: number, offset: number) {
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM blog_posts WHERE is_published = true',
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE is_published = true ORDER BY published_at DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );
    return { rows: result.rows, total };
  },

  async findBySlug(slug: string) {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1',
      [slug],
    );
    return result.rows[0] || null;
  },

  async findById(id: string) {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  },

  async findAll(limit: number, offset: number) {
    const countResult = await pool.query('SELECT COUNT(*) FROM blog_posts');
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );
    return { rows: result.rows, total };
  },

  async create(data: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    author: string;
    category?: string;
    tags: string[];
    featured_image?: string;
    is_published: boolean;
    published_at?: string;
  }) {
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, featured_image, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        data.title, data.slug, data.excerpt || null, data.content,
        data.author, data.category || null, data.tags,
        data.featured_image || null, data.is_published,
        data.published_at || (data.is_published ? new Date().toISOString() : null),
      ],
    );
    return result.rows[0];
  },

  async upsertBySlug(data: {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    author: string;
    category?: string;
    tags: string[];
    featured_image?: string;
    is_published: boolean;
    published_at?: string;
  }) {
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, featured_image, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         excerpt = EXCLUDED.excerpt,
         content = EXCLUDED.content,
         author = EXCLUDED.author,
         category = EXCLUDED.category,
         tags = EXCLUDED.tags,
         featured_image = EXCLUDED.featured_image,
         is_published = EXCLUDED.is_published,
         published_at = EXCLUDED.published_at,
         updated_at = NOW()
       RETURNING *`,
      [
        data.title, data.slug, data.excerpt || null, data.content,
        data.author, data.category || null, data.tags,
        data.featured_image || null, data.is_published,
        data.published_at || null,
      ],
    );
    return result.rows[0];
  },

  async update(id: string, data: Record<string, unknown>) {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClauses = fields.map((f, i) => `"${f}" = $${i + 2}`);
    setClauses.push('updated_at = NOW()');
    const values = fields.map((f) => data[f]);

    const result = await pool.query(
      `UPDATE blog_posts SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
