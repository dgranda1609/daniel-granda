import { pool } from '../config/database.js';

export const curatedLinkModel = {
  async findPublished(limit: number, offset: number) {
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM curated_links WHERE is_published = true',
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await pool.query(
      'SELECT * FROM curated_links WHERE is_published = true ORDER BY curated_at DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );
    return { rows: result.rows, total };
  },

  async findAll(limit: number, offset: number) {
    const countResult = await pool.query('SELECT COUNT(*) FROM curated_links');
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await pool.query(
      'SELECT * FROM curated_links ORDER BY curated_at DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );
    return { rows: result.rows, total };
  },

  async findById(id: string) {
    const result = await pool.query(
      'SELECT * FROM curated_links WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  },

  async create(data: {
    title: string;
    url: string;
    source: string;
    excerpt?: string;
    category?: string;
    tags: string[];
    featured_image?: string;
    is_published: boolean;
  }) {
    const result = await pool.query(
      `INSERT INTO curated_links (title, url, source, excerpt, category, tags, featured_image, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.title, data.url, data.source, data.excerpt || null,
        data.category || null, data.tags, data.featured_image || null,
        data.is_published,
      ],
    );
    return result.rows[0];
  },

  async upsertByUrl(data: {
    title: string;
    url: string;
    source: string;
    excerpt?: string;
    category?: string;
    tags: string[];
    featured_image?: string;
    is_published: boolean;
  }) {
    const result = await pool.query(
      `WITH existing AS (
         SELECT id FROM curated_links WHERE url = $2 ORDER BY curated_at DESC LIMIT 1
       )
       INSERT INTO curated_links (title, url, source, excerpt, category, tags, featured_image, is_published)
       SELECT $1, $2, $3, $4, $5, $6, $7, $8
       WHERE NOT EXISTS (SELECT 1 FROM existing)
       RETURNING *`,
      [
        data.title,
        data.url,
        data.source,
        data.excerpt || null,
        data.category || null,
        data.tags,
        data.featured_image || null,
        data.is_published,
      ],
    );

    if (result.rows[0]) return result.rows[0];

    const updated = await pool.query(
      `UPDATE curated_links
       SET title = $1,
           source = $3,
           excerpt = $4,
           category = $5,
           tags = $6,
           featured_image = $7,
           is_published = $8,
           curated_at = NOW()
       WHERE id = (
         SELECT id FROM curated_links WHERE url = $2 ORDER BY curated_at DESC LIMIT 1
       )
       RETURNING *`,
      [
        data.title,
        data.url,
        data.source,
        data.excerpt || null,
        data.category || null,
        data.tags,
        data.featured_image || null,
        data.is_published,
      ],
    );

    return updated.rows[0] || null;
  },

  async update(id: string, data: Record<string, unknown>) {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClauses = fields.map((f, i) => `"${f}" = $${i + 2}`);
    const values = fields.map((f) => data[f]);

    const result = await pool.query(
      `UPDATE curated_links SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await pool.query('DELETE FROM curated_links WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
