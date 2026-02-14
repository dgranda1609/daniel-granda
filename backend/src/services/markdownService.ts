import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

export interface ParsedMarkdown {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  html: string;
  author: string;
  category?: string;
  tags: string[];
  featured_image?: string;
  is_published: boolean;
  published_at?: string;
}

export function parseMarkdownFile(raw: string, filename: string): ParsedMarkdown {
  const { data: frontmatter, content } = matter(raw);

  const slug = frontmatter.slug || filename.replace(/\.md$/, '');
  const html = md.render(content);

  return {
    title: frontmatter.title || slug,
    slug,
    excerpt: frontmatter.excerpt || content.slice(0, 200).replace(/\n/g, ' ').trim(),
    content,
    html,
    author: frontmatter.author || 'Daniel Granda',
    category: frontmatter.category,
    tags: frontmatter.tags || [],
    featured_image: frontmatter.featuredImage || frontmatter.featured_image,
    is_published: frontmatter.published !== false,
    published_at: frontmatter.publishedAt || frontmatter.published_at || frontmatter.date,
  };
}
