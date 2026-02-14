import { pool } from '../config/database.js';

export const contactModel = {
  async create(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }) {
    const result = await pool.query(
      `INSERT INTO contact_submissions (name, email, company, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.name, data.email, data.company || null, data.message],
    );
    return result.rows[0];
  },

  async findAll(limit: number, offset: number) {
    const countResult = await pool.query('SELECT COUNT(*) FROM contact_submissions');
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset],
    );
    return { rows: result.rows, total };
  },

  async markRead(id: string) {
    const result = await pool.query(
      'UPDATE contact_submissions SET is_read = true WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await pool.query('DELETE FROM contact_submissions WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
