import fs from 'fs';
import path from 'path';
import { parseMarkdownFile } from './markdownService.js';
import { blogPostModel } from '../models/blogPostModel.js';
import { curatedLinkModel } from '../models/curatedLinkModel.js';

const CONTENT_DIR = path.resolve(process.cwd(), '..', 'content');

export async function syncBlogPosts(): Promise<{ synced: number; errors: string[] }> {
  const postsDir = path.join(CONTENT_DIR, 'posts');
  const errors: string[] = [];
  let synced = 0;

  if (!fs.existsSync(postsDir)) {
    return { synced: 0, errors: ['Posts directory not found'] };
  }

  const files = fs.readdirSync(postsDir).filter(
    (f) => f.endsWith('.md') && !f.startsWith('_'),
  );

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const parsed = parseMarkdownFile(raw, file);
      await blogPostModel.upsertBySlug({
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        content: parsed.html,
        author: parsed.author,
        category: parsed.category,
        tags: parsed.tags,
        featured_image: parsed.featured_image,
        is_published: parsed.is_published,
        published_at: parsed.published_at,
      });
      synced++;
    } catch (err) {
      errors.push(`${file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { synced, errors };
}

export async function syncCuratedLinks(): Promise<{ synced: number; errors: string[] }> {
  const linksFile = path.join(CONTENT_DIR, 'curated', 'links.json');
  const errors: string[] = [];
  let synced = 0;

  if (!fs.existsSync(linksFile)) {
    return { synced: 0, errors: ['links.json not found'] };
  }

  try {
    const raw = fs.readFileSync(linksFile, 'utf-8');
    const links = JSON.parse(raw) as Array<{
      title: string;
      url: string;
      source: string;
      excerpt?: string;
      category?: string;
      tags?: string[];
      featured_image?: string;
    }>;

    for (const link of links) {
      try {
        await curatedLinkModel.create({
          title: link.title,
          url: link.url,
          source: link.source,
          excerpt: link.excerpt,
          category: link.category,
          tags: link.tags || [],
          featured_image: link.featured_image,
          is_published: true,
        });
        synced++;
      } catch (err) {
        errors.push(`${link.url}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  } catch (err) {
    errors.push(`Parse error: ${err instanceof Error ? err.message : String(err)}`);
  }

  return { synced, errors };
}
