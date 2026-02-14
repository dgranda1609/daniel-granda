import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  const seedsDir = path.join(__dirname, '..', 'seeds');
  const files = fs.readdirSync(seedsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(seedsDir, file), 'utf-8');
    console.log(`  seed: ${file}`);

    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`  FAILED: ${file}`, err);
      process.exit(1);
    }
  }

  console.log(`\nSeed complete. ${files.length} files applied.`);
  await pool.end();
}

seed();
