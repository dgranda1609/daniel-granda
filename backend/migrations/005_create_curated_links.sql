CREATE TABLE curated_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  source VARCHAR(255) NOT NULL,
  excerpt TEXT,
  category VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  featured_image VARCHAR(500),
  is_published BOOLEAN NOT NULL DEFAULT true,
  curated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_curated_links_published ON curated_links(is_published, curated_at DESC);
