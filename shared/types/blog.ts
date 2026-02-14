export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category?: string;
  tags: string[];
  featured_image?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CuratedLink {
  id: string;
  title: string;
  url: string;
  source: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  featured_image?: string;
  is_published: boolean;
  curated_at: string;
}

export type FeedItemType = 'post' | 'curated';

export interface FeedItem {
  type: FeedItemType;
  id: string;
  title: string;
  slug_or_url: string;
  excerpt?: string;
  source?: string;
  category?: string;
  tags: string[];
  featured_image?: string;
  date: string;
}
