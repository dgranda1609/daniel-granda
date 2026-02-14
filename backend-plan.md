# Portfolio Backend Implementation Plan

## Status: BACKEND CODE COMPLETE

All backend code has been created locally. Next steps: VPS setup, deploy, then frontend integration.

---

## Architecture: Split Deployment

```
daniel-granda.com (Hostinger Business Hosting)
  └── React SPA (static dist/ files, .htaccess SPA routing)

api.daniel-granda.com (KVM 2 VPS @ 31.97.65.93)
  └── Express.js API + PostgreSQL 16
  └── Caddy reverse proxy (auto-SSL)
  └── PM2 process manager
  └── Coexists with existing n8n instance
```

**Why split**: Business Hosting is optimized for static files (LiteSpeed CDN, auto-SSL). PostgreSQL isn't available on shared hosting. The VPS already has 8GB RAM and runs n8n — adding Express + PostgreSQL is trivial. Cost: $0 additional.

---

## Project Structure (Implemented)

```
daniel-granda-portfolio-prefinalversion/
├── shared/                   # Shared TypeScript types
│   ├── types/
│   │   ├── index.ts          # Re-exports all types
│   │   ├── project.ts        # Project + ProjectSummary
│   │   ├── client.ts         # Client + ClientSummary
│   │   ├── testimonial.ts    # Testimonial + TestimonialSummary + TestimonialColor
│   │   ├── blog.ts           # BlogPost, CuratedLink, FeedItem
│   │   ├── contact.ts        # ContactSubmission, ContactFormData
│   │   ├── settings.ts       # SiteSettings, StatItem, ServiceItem
│   │   └── api.ts            # ApiResponse, ApiError, PaginationMeta
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .gitignore
│   ├── src/
│   │   ├── index.ts          # Express bootstrap + graceful shutdown
│   │   ├── app.ts            # Middleware chain + route mounting
│   │   ├── config/
│   │   │   ├── env.ts        # Zod-validated environment variables
│   │   │   ├── database.ts   # pg Pool + connection test
│   │   │   └── cors.ts       # CORS configuration
│   │   ├── middleware/
│   │   │   ├── auth.ts       # API key Bearer token auth
│   │   │   ├── errorHandler.ts  # Global error handler + AppError + asyncHandler
│   │   │   ├── rateLimit.ts  # Contact (3/hr) + global rate limiters
│   │   │   ├── requestLogger.ts # Request logging
│   │   │   └── upload.ts     # Multer config (image uploads)
│   │   ├── routes/
│   │   │   ├── health.ts     # GET /api/health
│   │   │   ├── projects.ts   # CRUD /api/projects
│   │   │   ├── clients.ts    # CRUD /api/clients
│   │   │   ├── testimonials.ts # CRUD /api/testimonials
│   │   │   ├── blog.ts       # CRUD /api/blog (posts + curated + feed)
│   │   │   ├── contact.ts    # POST /api/contact + admin routes
│   │   │   ├── settings.ts   # GET/PUT /api/settings
│   │   │   └── upload.ts     # POST /api/upload
│   │   ├── controllers/
│   │   │   ├── projectController.ts
│   │   │   ├── clientController.ts
│   │   │   ├── testimonialController.ts
│   │   │   ├── blogController.ts
│   │   │   ├── contactController.ts
│   │   │   ├── settingsController.ts
│   │   │   └── uploadController.ts
│   │   ├── models/
│   │   │   ├── projectModel.ts    # Raw SQL for projects table
│   │   │   ├── clientModel.ts
│   │   │   ├── testimonialModel.ts
│   │   │   ├── blogPostModel.ts   # Includes upsertBySlug for sync
│   │   │   ├── curatedLinkModel.ts
│   │   │   ├── contactModel.ts
│   │   │   └── settingsModel.ts   # JSONB key-value store
│   │   ├── services/
│   │   │   ├── emailService.ts    # Resend SDK (optional, graceful skip)
│   │   │   ├── markdownService.ts # gray-matter + markdown-it parsing
│   │   │   └── syncService.ts     # Markdown file → DB sync
│   │   ├── utils/
│   │   │   ├── slugify.ts
│   │   │   ├── sanitize.ts
│   │   │   └── pagination.ts
│   │   └── validators/
│   │       ├── projectSchema.ts   # Zod create/update schemas
│   │       ├── clientSchema.ts
│   │       ├── testimonialSchema.ts
│   │       ├── blogSchema.ts      # Post + Curated schemas
│   │       ├── contactSchema.ts
│   │       └── settingsSchema.ts
│   ├── migrations/
│   │   ├── 001_create_projects.sql
│   │   ├── 002_create_clients.sql
│   │   ├── 003_create_testimonials.sql
│   │   ├── 004_create_blog_posts.sql
│   │   ├── 005_create_curated_links.sql
│   │   ├── 006_create_contact_submissions.sql
│   │   └── 007_create_site_settings.sql
│   ├── seeds/
│   │   ├── 001_seed_projects.sql      # 5 projects from Projects.tsx
│   │   ├── 002_seed_clients.sql       # 9 clients from Clients.tsx
│   │   ├── 003_seed_testimonials.sql  # 6 testimonials from Testimonials.tsx
│   │   └── 004_seed_settings.sql      # Contact, social, hero, stats, services, social_proof
│   └── scripts/
│       ├── migrate.ts           # Run migrations with tracking
│       ├── seed.ts              # Run seed files
│       └── sync-blog.ts         # Sync markdown files to DB
├── content/
│   ├── posts/_template.md       # Blog post template with YAML frontmatter
│   └── curated/links.json       # Empty initial curated links
├── deploy/
│   ├── caddy/Caddyfile          # Reverse proxy for api.daniel-granda.com
│   ├── ecosystem.config.cjs     # PM2 configuration
│   ├── frontend-deploy.sh       # rsync dist/ to Hostinger
│   └── backend-deploy.sh        # rsync + PM2 restart on VPS
└── [existing frontend files untouched]
```

---

## Backend Stack

| Component | Choice | Reason |
|-----------|--------|--------|
| Runtime | Node.js 20 LTS | Matches frontend ecosystem |
| Framework | Express.js | Lightweight, sufficient for portfolio scale |
| Database | PostgreSQL 16 | Native arrays for tags, UUIDs, full-text search for blog |
| DB Client | `pg` (raw SQL) | No ORM overhead, full control, small schema |
| Validation | Zod | TypeScript-native, shared with frontend |
| Email | Resend (free tier) | 100 emails/day, simple SDK, domain verification |
| Process | PM2 | Auto-restart, logging, zero-downtime reload |
| Proxy | Caddy | Auto HTTPS, simpler than Nginx |
| Auth | API key (Bearer token) | Single-user admin, no complex auth needed |
| Dev runner | tsx | TypeScript execution without build step |
| Markdown | gray-matter + markdown-it | Frontmatter parsing + HTML rendering |

---

## API Endpoints

### Public (no auth)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check (status, timestamp, uptime) |
| GET | `/api/projects` | List visible projects (sorted by sort_order) |
| GET | `/api/projects/:slug` | Single project by slug |
| GET | `/api/clients` | List featured clients (sorted) |
| GET | `/api/testimonials` | List featured testimonials (sorted) |
| GET | `/api/blog/feed` | Combined feed (posts + curated, paginated, sorted by date) |
| GET | `/api/blog/posts` | Published posts (paginated) |
| GET | `/api/blog/posts/:slug` | Single post by slug |
| GET | `/api/blog/curated` | Curated links (paginated) |
| POST | `/api/contact` | Submit contact form (rate limited: 3/hr/IP) |
| GET | `/api/settings` | Public site settings (JSONB key-value) |
| GET | `/api/uploads/:filename` | Serve uploaded images (static) |

### Admin (Bearer token: `Authorization: Bearer <API_KEY>`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/clients` | Create client |
| PUT | `/api/clients/:id` | Update client |
| DELETE | `/api/clients/:id` | Delete client |
| POST | `/api/testimonials` | Create testimonial |
| PUT | `/api/testimonials/:id` | Update testimonial |
| DELETE | `/api/testimonials/:id` | Delete testimonial |
| POST | `/api/blog/posts` | Create blog post |
| PUT | `/api/blog/posts/:id` | Update blog post |
| DELETE | `/api/blog/posts/:id` | Delete blog post |
| POST | `/api/blog/curated` | Create curated link |
| PUT | `/api/blog/curated/:id` | Update curated link |
| DELETE | `/api/blog/curated/:id` | Delete curated link |
| POST | `/api/blog/sync` | Sync markdown files → DB |
| GET | `/api/contact` | List contact submissions (paginated) |
| PUT | `/api/contact/:id/read` | Mark submission as read |
| DELETE | `/api/contact/:id` | Delete submission |
| PUT | `/api/settings` | Update site settings |
| POST | `/api/upload` | Upload image file |

---

## Database Schema (7 tables + 1 tracking)

1. **projects** — id (UUID), title, slug (UNIQUE), summary, full_description, tags (TEXT[]), image_url, images (TEXT[]), video_url, demo_link, tools (TEXT[]), client, outcome, visible, sort_order, created_at, updated_at
2. **clients** — id (UUID), name, category, description, logo_url, website, project_count, is_featured, sort_order, created_at
3. **testimonials** — id (UUID), text, author, role, company, color (CHECK: accent/primary/neutral), image_url, verified, is_featured, sort_order, created_at
4. **blog_posts** — id (UUID), title, slug (UNIQUE), excerpt, content, author, category, tags (TEXT[]), featured_image, is_published, published_at, created_at, updated_at
5. **curated_links** — id (UUID), title, url, source, excerpt, category, tags (TEXT[]), featured_image, is_published, curated_at
6. **contact_submissions** — id (UUID), name, email, company, message, is_read, created_at
7. **site_settings** — key (VARCHAR PK), value (JSONB), updated_at
8. **_migrations** — id (SERIAL), filename (UNIQUE), applied_at

### Seed Data (exact values from current frontend)
- **5 projects**: ILO Documentary Series, Dinamo Zagreb, Miami Weddings, Alternative Audiovisual, Kreyol Essence
- **9 clients**: United Nations / ILO, Microsoft, The North Face, Kreyol Essence, America Television, TELEFE, Dinamo Zagreb, Miguel Angel Productions, Impact Doc Awards
- **6 testimonials**: Marketing Director/DTC Beauty Brand, Production Manager/International NGO, Creative Director/Sports Brand, Head of Content/E-commerce Platform, CEO/Creative Agency, VP Marketing/Consumer Brand
- **Site settings**: contact info, social links, hero video ID (2lVc9S2FZ6E), stats (4 metrics), services (3 categories with tags), social proof (5 bubbles)

---

## Environment Variables

```env
NODE_ENV=development|production|test
PORT=4000
DATABASE_URL=postgresql://portfolio:password@localhost:5432/portfolio_db
API_KEY=<min-32-char-secure-string>
CORS_ORIGIN=https://daniel-granda.com  # or http://localhost:3002 for dev
RESEND_API_KEY=re_xxxxxxxxxx           # optional
CONTACT_EMAIL=contact@daniel-granda.com
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE_MB=10
```

---

## Frontend Changes (Phase 2 — NOT YET IMPLEMENTED)

### New dependencies needed
- `react-router-dom` — Client-side routing for blog/project pages
- `@tanstack/react-query` — Data fetching with cache, stale-while-revalidate
- `react-markdown` + `remark-gfm` — Render markdown blog content

### Key changes needed
- **App.tsx** → React Router + QueryClientProvider wrapper
- **HomePage.tsx** ← Extract current single-page layout (no visual changes)
- **Projects.tsx, Clients.tsx, Testimonials.tsx** → Fetch from API with hardcoded fallback
- **Footer.tsx** → Add ContactForm component
- **Navbar.tsx** → Add "Blog" link
- **Tailwind** → Move from CDN to build-time (PostCSS plugin)

### Data mapping note
API returns snake_case (`image_url`). Frontend uses camelCase (`imageUrl`). The frontend API client layer will map between conventions. Existing component interfaces remain unchanged.

### Fallback pattern (critical)
Every data-consuming component keeps its hardcoded array as fallback. If the API is unreachable, the site renders exactly as it does today.

---

## Blog/Article Feed (Hybrid)

### Own articles
- Written as `.md` files in `content/posts/` with YAML frontmatter (title, excerpt, tags, category, featuredImage, publishedAt)
- Sync script reads markdown → parses with `gray-matter` → upserts into `blog_posts` table via `POST /api/blog/sync`

### Curated external articles
- Metadata stored in `content/curated/links.json`
- Sync script reads JSON → inserts into `curated_links` table

### Combined feed
- `GET /api/blog/feed` returns UNION of blog_posts + curated_links sorted by date
- Frontend renders both with visual badge: "Article" (own) vs "Curated" (external, opens in new tab)

---

## Deployment

### Frontend → Hostinger Business Hosting
```bash
bash deploy/frontend-deploy.sh
```

### Backend → VPS (31.97.65.93)
```bash
bash deploy/backend-deploy.sh
```

### DNS
- Add A record: `api.daniel-granda.com` → `31.97.65.93`

### One-time VPS setup
1. Install PostgreSQL 16: `sudo apt install postgresql-16`
2. Create DB + user: `createdb portfolio_db && createuser portfolio`
3. Install Node.js 20 LTS via nvm
4. Install PM2: `npm i -g pm2`
5. Install Caddy: follow official docs
6. Copy `deploy/caddy/Caddyfile` to `/etc/caddy/`
7. Copy `deploy/ecosystem.config.cjs` to `/opt/portfolio-api/`
8. Create `.env` from `.env.example` with production values
9. Run migrations: `cd /opt/portfolio-api && npm run migrate`
10. Run seeds: `npm run seed`
11. Start: `pm2 start ecosystem.config.cjs --env production`

---

## NPM Scripts

```bash
npm run dev          # Start dev server with hot reload (tsx watch)
npm run build        # Compile TypeScript to dist/
npm run start        # Run compiled production build
npm run migrate      # Apply pending database migrations
npm run seed         # Insert seed data
npm run sync-blog    # Sync markdown posts + curated links to DB
npm run typecheck    # Verify TypeScript without building
```

---

## Verification Checklist

- [ ] `cd backend && npm install` — Dependencies install
- [ ] `npm run typecheck` — TypeScript compiles clean
- [ ] PostgreSQL running → `npm run migrate` → Tables created
- [ ] `npm run seed` → Data inserted
- [ ] `npm run dev` → Server starts on port 4000
- [ ] `curl http://localhost:4000/api/health` → 200 OK
- [ ] `curl http://localhost:4000/api/projects` → 5 projects
- [ ] `curl http://localhost:4000/api/clients` → 9 clients
- [ ] `curl http://localhost:4000/api/testimonials` → 6 testimonials
- [ ] `curl http://localhost:4000/api/settings` → All settings keys
- [ ] Admin auth: `curl -H "Authorization: Bearer <key>" http://localhost:4000/api/contact`
- [ ] Contact rate limit: 4th POST to /api/contact within 1hr → 429
- [ ] VPS deploy → `curl https://api.daniel-granda.com/api/health` → 200 OK
