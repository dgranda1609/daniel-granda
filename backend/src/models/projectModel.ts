import { pool } from '../config/database.js';

export const projectModel = {
  async findVisible() {
    const result = await pool.query(
      'SELECT * FROM projects WHERE visible = true ORDER BY sort_order ASC',
    );
    return result.rows;
  },

  async findBySlug(slug: string) {
    const result = await pool.query(
      'SELECT * FROM projects WHERE slug = $1',
      [slug],
    );
    return result.rows[0] || null;
  },

  async findById(id: string) {
    const result = await pool.query(
      'SELECT * FROM projects WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  },

  async findAll() {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY sort_order ASC',
    );
    return result.rows;
  },

  async create(data: {
    title: string;
    slug: string;
    summary: string;
    full_description?: string;
    tags: string[];
    image_url: string;
    images?: string[];
    video_url?: string;
    demo_link?: string;
    tools?: string[];
    client?: string;
    outcome?: string;
    visible: boolean;
    sort_order: number;
  }) {
    const result = await pool.query(
      `INSERT INTO projects (title, slug, summary, full_description, tags, image_url, images, video_url, demo_link, tools, client, outcome, visible, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        data.title, data.slug, data.summary, data.full_description || null,
        data.tags, data.image_url, data.images || [], data.video_url || null,
        data.demo_link || null, data.tools || [], data.client || null,
        data.outcome || null, data.visible, data.sort_order,
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
      `UPDATE projects SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
