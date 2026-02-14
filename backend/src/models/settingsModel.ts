import { pool } from '../config/database.js';

export const settingsModel = {
  async getAll() {
    const result = await pool.query('SELECT * FROM site_settings ORDER BY key');
    const settings: Record<string, unknown> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    return settings;
  },

  async get(key: string) {
    const result = await pool.query(
      'SELECT value FROM site_settings WHERE key = $1',
      [key],
    );
    return result.rows[0]?.value ?? null;
  },

  async set(key: string, value: unknown) {
    const result = await pool.query(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
       RETURNING *`,
      [key, JSON.stringify(value)],
    );
    return result.rows[0];
  },

  async updateMany(settings: Record<string, unknown>) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const [key, value] of Object.entries(settings)) {
        await client.query(
          `INSERT INTO site_settings (key, value, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
          [key, JSON.stringify(value)],
        );
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};
