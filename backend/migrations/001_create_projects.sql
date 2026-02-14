CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  full_description TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image_url VARCHAR(500) NOT NULL,
  images TEXT[] DEFAULT '{}',
  video_url VARCHAR(500),
  demo_link VARCHAR(500),
  tools TEXT[] DEFAULT '{}',
  client VARCHAR(255),
  outcome TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_visible ON projects(visible, sort_order);
CREATE INDEX idx_projects_slug ON projects(slug);
