import { pool } from '../config/database.js';

export const testimonialModel = {
  async findFeatured() {
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE is_featured = true ORDER BY sort_order ASC',
    );
    return result.rows;
  },

  async findAll() {
    const result = await pool.query(
      'SELECT * FROM testimonials ORDER BY sort_order ASC',
    );
    return result.rows;
  },

  async findById(id: string) {
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  },

  async create(data: {
    text: string;
    author: string;
    role: string;
    company?: string;
    color: string;
    image_url?: string;
    verified: boolean;
    is_featured: boolean;
    sort_order: number;
  }) {
    const result = await pool.query(
      `INSERT INTO testimonials (text, author, role, company, color, image_url, verified, is_featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        data.text, data.author, data.role, data.company || null,
        data.color, data.image_url || null, data.verified,
        data.is_featured, data.sort_order,
      ],
    );
    return result.rows[0];
  },

  async update(id: string, data: Record<string, unknown>) {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClauses = fields.map((f, i) => `"${f}" = $${i + 2}`);
    const values = fields.map((f) => data[f]);

    const result = await pool.query(
      `UPDATE testimonials SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
