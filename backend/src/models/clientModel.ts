import { pool } from '../config/database.js';

export const clientModel = {
  async findFeatured() {
    const result = await pool.query(
      'SELECT * FROM clients WHERE is_featured = true ORDER BY sort_order ASC',
    );
    return result.rows;
  },

  async findAll() {
    const result = await pool.query(
      'SELECT * FROM clients ORDER BY sort_order ASC',
    );
    return result.rows;
  },

  async findById(id: string) {
    const result = await pool.query(
      'SELECT * FROM clients WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  },

  async create(data: {
    name: string;
    category: string;
    description?: string;
    logo_url?: string;
    website?: string;
    project_count?: number;
    is_featured: boolean;
    sort_order: number;
  }) {
    const result = await pool.query(
      `INSERT INTO clients (name, category, description, logo_url, website, project_count, is_featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.name, data.category, data.description || null,
        data.logo_url || null, data.website || null, data.project_count || 0,
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
      `UPDATE clients SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await pool.query('DELETE FROM clients WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
