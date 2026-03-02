# CLAUDE.md — Personal Portfolio

> **Project**: Daniel Granda's personal portfolio website
> **Purpose**: Job-seeking portfolio showcasing video production, AI systems, and creative technology
> **Status**: Deployed & live at https://daniel-granda.com — Full-stack (React + Express + PostgreSQL)
> **API**: https://api.daniel-granda.com
> **VPS**: 31.97.65.93 (Hostinger KVM 2, Ubuntu 24.04)
> **GitHub**: https://github.com/dgranda1609/daniel-granda
> **Inherits from**: `D:\Development Tools\CLAUDE.md` (global agents, MCP servers, skills)

---

## Project Overview

This is Daniel Granda's personal portfolio website — the primary tool for landing a job in video production, motion design, AI-integrated creative production, or full-stack development. Every decision made on this project should serve that goal: **get hired**.

The site positions Daniel as a **cinematic video producer and AI-first creative technologist** — someone who bridges editorial storytelling with intelligent automation. The portfolio itself is a portfolio piece: its design quality, performance, and interactivity demonstrate the same craft Daniel brings to client work.

---

## Owner Profile

### Daniel Granda — Full-Stack Video Producer & AI Visual Strategist

**Location**: Pembroke Pines, FL
**Contact**: contact@daniel-granda.com | +1 786 556 7280
**LinkedIn**: in/daniel-granda-video-producer
**Portfolio**: daniel-granda.com / dgrandastudio.com

### Professional Identity
- 15+ years in video production, motion graphics, and editorial storytelling
- Currently Lead Video & Media Producer at **Kreyol Essence** (Shark Tank winner, Black Ambition 2024 & Beauty Matter 2025 Finalist) — producing 100+ assets/month
- Award-winning documentary work: **Cannes World Film Festival finalist**, 10+ festival selections, Impact Doc Awards winner
- Clients include **Microsoft**, **The North Face**, **United Nations/ILO**, **America Television/TELEFE**
- Bilingual: English (Professional Advanced) / Spanish (Native)

### Core Expertise
| Domain | Skills |
|--------|--------|
| **Video Production** | Premiere Pro, DaVinci Resolve, After Effects, Audition, multi-cam, color grading, sound design |
| **Motion Graphics** | After Effects, Fusion, kinetic typography, animated explainers, motion identity |
| **AI Workflows** | Runway Gen-3, Stable Diffusion, Sora, Kling AI, Veo3, ComfyUI, n8n automation |
| **Graphic Design** | Photoshop, Lightroom, brand systems, template creation, A/B test variations |
| **Web Development** | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Node.js |
| **Automation** | n8n pipelines, AI-first post-production workflows, 35% faster rough-cut turnaround |

### Key Achievements (for content reference)
- 100+ monthly assets at Kreyol Essence (brand films, TikTok/Reels, photography)
- AI-first post pipeline cutting rough-cut turnaround by 35%
- Frame.io + n8n automations: on-time approvals from 70% to 96%, deliverables volume +200%
- 3-episode documentary series for ILO across Andes/Amazon/Coast — adopted by 5 NGOs
- Animated explainer reaching 100k+ views on UN channels
- 150+ mid-form videos edited and color-graded at Miguel Angel Productions
- 60k+ photo cataloguing with AI-based culling saving 40% retrieval time
- Led remote team of 4 editors/animators with style guides and LUTs

### Education
- B.A. Communications & Marketing — Universidad de Lima, 2018
- Specialty in Audiovisual Production — Universidad de Lima, 2017
- Adobe After Effects (Advanced) — Area51 Training Center
- Motion Graphics Certificate — LinkedIn Learning (Leftchannel), 2021

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI framework |
| TypeScript | 5.8.2 | Type safety |
| Vite | 6.4.1 | Build tool & dev server |
| React Query | @tanstack/react-query | API data fetching & caching |
| React Router | react-router-dom | SPA routing (Home, CaseStudy, Articles) |
| Framer Motion | 12.33.0 | Animations & transitions |
| Matter.js | 0.20.0 | Physics-based tag animations |
| Lucide React | 0.563.0 | Icons |
| Tailwind CSS | CDN | Utility-first styling |

### Backend (Deployed)
| Technology | Version | Purpose |
|------------|---------|---------|
| Express.js | — | HTTP server & REST API |
| TypeScript | — | Type safety |
| PostgreSQL | 16 | Database (raw `pg` driver, no ORM) |
| Zod | — | Request validation |
| Resend | — | Transactional email (contact form) |
| PM2 | 5.4.3 | Process manager with auto-restart |
| Caddy | 2.10.2 | Reverse proxy + auto-SSL (Let's Encrypt) |

### Frontend → Backend Integration
| Layer | File | Purpose |
|-------|------|---------|
| API Client | `lib/api.ts` | Fetch wrapper with error handling, extracts `data` from `{success, data}` response format |
| Case Conversion | `lib/caseConversion.ts` | Recursive `snakeToCamel()` / `camelToSnake()` — API returns snake_case, frontend uses camelCase |
| React Query Hooks | `lib/hooks/useApi.ts` | `useProjects()`, `useClients()`, `useTestimonials()` hooks with cache keys |
| Environment | `.env.local` | `VITE_API_URL=https://api.daniel-granda.com/api` |

**Key pattern:** API responses are `{ success: true, data: [...] }`. The API client extracts `data` before passing to components. All snake_case keys are converted to camelCase automatically.

### Fonts
| Font | Role | Weights |
|------|------|---------|
| Archivo | Headings (`font-heading`) | 400, 600, 800 |
| Fraunces | Serif display (`font-serif`) | Variable |
| Space Grotesk | Body text (`font-body`) | 300, 400, 500, 700 |
| Tan Memories | Custom accent (local files in `Fonts/`) | Regular, Italic |

### Brand Colors (Tailwind Config)
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-primary` | `#FFFDDB` | Text, light elements (warm cream) |
| `brand-accent` | `#FF3831` | CTAs, highlights, interactive (bold red) |
| `brand-bg` | `#0F0F0F` | Page background (near-black) |
| `brand-secondary` | `#3F3F46` | Subtle text, borders (neutral gray) |

### Brand Personality
| Attribute | Value |
|-----------|-------|
| Tone | Bold, confident, cinematic |
| Energy | High |
| Typography style | Serif headlines + grotesque body = editorial authority |
| Visual style | Dark mode, film-grade color, red accent energy |
| Border Radius | 0px (sharp, editorial) |
| Base spacing unit | 4px |

---

## Project Structure

```
daniel-granda-portfolio-prefinalversion/   # Project root
├── CLAUDE.md                              # THIS FILE
├── DEPLOYMENT.md                          # Full deployment guide
├── package.json                           # Dependencies
├── vite.config.ts                         # Vite config
├── tsconfig.json                          # TypeScript config
├── index.html                             # HTML template + Tailwind config + CSS
├── index.tsx                              # React entry point
├── App.tsx                                # Root component with React Router
├── types.ts                               # Project, Client, Testimonial interfaces
├── .env.local                             # VITE_API_URL (gitignored)
│
├── components/                            # React components (13 files)
│   ├── Navbar.tsx                         # Fixed glassmorphism nav with scroll effects
│   ├── Hero.tsx                           # 300vh sticky scroll with expanding video
│   ├── About.tsx                          # Portrait + skill ticker + bio
│   ├── Projects.tsx                       # 5-card grid with 3D tilt + API fetch
│   ├── Services.tsx                       # Motion/AI/Branding with physics tags
│   ├── Clients.tsx                        # 9-item grid with hover cards + API fetch
│   ├── Testimonials.tsx                   # Infinite ticker carousel + API fetch
│   ├── SocialProof.tsx                    # 5 expanding bubbles
│   ├── Manifesto.tsx                      # Brand manifesto with scroll phases
│   ├── Footer.tsx                         # Animated gradient + CTA
│   ├── ContactModal.tsx                   # Contact form modal
│   ├── PhysicsTags.tsx                    # Matter.js physics simulation
│   └── AnimatedGradientBackground.tsx     # Breathing radial gradient
│
├── pages/                                 # Route pages
│   ├── Home.tsx                           # Main page (all sections + MutationObserver for reveals)
│   ├── CaseStudy.tsx                      # Individual project detail page (/work/:slug)
│   └── Articles.tsx                       # Blog/articles feed page
│
├── lib/                                   # Utilities & API layer
│   ├── api.ts                             # ApiClient class — fetch, error handling, response extraction
│   ├── caseConversion.ts                  # snake_case ↔ camelCase recursive converters
│   └── hooks/
│       └── useApi.ts                      # React Query hooks (useProjects, useClients, etc.)
│
├── src/                                   # Alternate source (legacy, may have duplicates)
│   ├── pages/Home.tsx
│   └── vite-env.d.ts                      # Vite env type declarations
│
├── public/images/                         # Static images (copied to dist/ on build)
│   ├── ILO-hero.gif                       # ILO Documentary project hero
│   ├── dinamo-hero.gif                    # Dinamo Zagreb project hero
│   ├── miami-weddings-hero.gif            # Miami Weddings project hero
│   ├── alternative-audiovisual-hero.jpg   # Alt Audiovisual project hero
│   ├── kreyolessence-3x4-img-1.jpg       # Kreyol Essence project hero
│   ├── me-portrait-red.png                # Portrait for About section
│   ├── me-redbg-v*.webp                   # Optimized portrait variants
│   └── *-hero.webp                        # Service section heroes
│
├── backend/                               # Express.js + TypeScript API
│   ├── src/
│   │   ├── index.ts                       # Server entry point (port 4000)
│   │   ├── config/
│   │   │   ├── cors.ts                    # CORS config (splits comma-separated origins)
│   │   │   └── database.ts               # PostgreSQL connection pool
│   │   ├── routes/                        # API route handlers
│   │   ├── middleware/                     # Auth, rate limiting, validation
│   │   └── schemas/                       # Zod validation schemas
│   ├── migrations/                        # SQL migration files
│   ├── seeds/                             # Database seed data
│   ├── .env                               # Backend env (gitignored)
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                                # Shared types between frontend & backend
├── content/                               # Blog/article content (markdown)
├── deploy/                                # Deployment scripts
│   └── vps-setup.sh                       # Initial VPS setup script
│
├── dist/                                  # Production build output (gitignored)
│   ├── index.html
│   ├── assets/index-*.js                  # Bundled JS
│   └── images/                            # Copied from public/images/
│
├── Assets for the portfolio/              # Raw design assets library
├── Fonts/                                 # Custom font files (Tan Memories)
├── design-inspo/                          # Design reference screenshots
└── pdf-resumes/                           # Resume & application materials
```

---

## Component Architecture

### Routes (App.tsx → React Router)
| Path | Page | Description |
|------|------|-------------|
| `/` | `Home.tsx` | Main portfolio page (all sections below) |
| `/work/:slug` | `CaseStudy.tsx` | Individual project detail page |
| `/articles` | `Articles.tsx` | Blog/articles feed |

### Section Order (Home.tsx)
1. `<Navbar />` — Fixed, glassmorphism, scroll-reactive, contact button
2. `<Hero />` — Sticky 300vh with expanding YouTube video
3. `<Manifesto />` — Brand manifesto with scroll-driven word reveal
4. `<About />` — Portrait with rotating skill ticker
5. `<Projects />` — Grid with 3D tilt hover (**fetches from API**)
6. `<Services />` — Three categories with Matter.js physics tags
7. `<Clients />` — Hover-reveal card grid (**fetches from API**)
8. `<Testimonials />` — Infinite horizontal ticker (**fetches from API**)
9. `<SocialProof />` — Expanding differentiator bubbles
10. `<Footer />` — Breathing gradient + contact CTA
11. `<ContactModal />` — Contact form overlay

### Animation System
| Technique | Implementation | Used In |
|-----------|---------------|---------|
| Scroll reveal | IntersectionObserver + MutationObserver + CSS `.reveal`/`.active` | All sections |
| Sticky scroll | CSS `position: sticky` with scroll progress | Hero |
| Physics simulation | Matter.js engine (gravity, friction, bouncing) | Services tags |
| 3D tilt on hover | Mouse-tracking `rotateX/Y` transforms | Project cards |
| Infinite ticker | CSS `translateX` animation (200s loop) | Testimonials |
| Breathing gradient | Framer Motion opacity animation | Footer |
| Glassmorphism | `backdrop-filter: blur(10px)` | Navbar |
| Staggered entrance | Framer Motion `animate` with delays | SocialProof |
| Scroll word reveal | Scroll progress phases (0-0.35, etc.) | Manifesto |

**Important:** The `.reveal` system uses a MutationObserver (in `Home.tsx`) to detect dynamically-added elements (e.g., after API data loads). This ensures elements that render after initial page load still get observed and animated. Without the MutationObserver, API-fetched content stays invisible (`opacity: 0`).

---

## Development Commands

```bash
# Frontend (from project root: daniel-granda-portfolio-prefinalversion/)
npm install          # Install dependencies
npm run dev          # Start dev server (port 3002)
npm run build        # Production build → dist/
npm run preview      # Preview production build

# Backend (from backend/ subdirectory)
cd backend
npm install          # Install dependencies
npm run dev          # Start dev server with hot reload (port 4000)
npm run build        # Compile TypeScript → dist/
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data

# Deploy frontend to production (from project root)
npm run build && scp -i ~/.ssh/hostinger_vps -r dist/* root@31.97.65.93:/var/www/daniel-granda.com/

# Deploy backend to production (via SSH)
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "cd ~/daniel-granda/backend && git pull && npm ci --production && npm run build && pm2 restart portfolio-api --update-env"
```

---

## Agent Role & Capabilities

This Claude instance operates as a **creative director + full-stack developer** for the portfolio project. It combines:

### 1. UX/UI Design & Brand Direction
- Make all design decisions aligned with the brand system (dark mode, red accent, editorial typography)
- Evaluate visual hierarchy, spacing, composition, and interaction design
- Reference `design-inspo/` screenshots for approved aesthetic direction
- Maintain consistency with the Griflan-inspired design language: bold serif headlines, sharp edges (0px radius), high energy, cinematic confidence

### 2. Frontend Development
- React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion
- Follow existing component patterns (functional components, hooks)
- Maintain the animation system (IntersectionObserver reveals, Framer Motion, Matter.js physics)
- Performance-first: lazy loading, optimized images, minimal bundle

### 3. Content Strategy
- All content serves the job-search goal
- Project descriptions should emphasize measurable outcomes
- Testimonials, social proof, and client lists should build credibility
- Copy tone: confident, concise, results-oriented, cinematic vocabulary

### 4. Creative Direction for AI Image Generation
- Generate prompts for brand imagery (Midjourney, Flux, Stable Diffusion, ComfyUI)
- Maintain visual consistency using a prompt style guide:
  - **Lighting**: dramatic side lighting, cinema-grade, chiaroscuro, neon rim light
  - **Color palette**: `#0F0F0F` deep blacks, `#FF3831` accent red, `#FFFDDB` warm cream highlights
  - **Mood**: cinematic, bold, futuristic-editorial, high-contrast
  - **Framing**: editorial photography, widescreen compositions, shallow depth of field
  - **Texture**: film grain, analog-digital hybrid, chrome/metallic accents
- Compare and evaluate generated images against brand standards
- Look for inspiration from award-winning portfolio sites, film titles, and motion design

### 5. Motion Design Direction
- Direct kinetic typography, scroll-triggered sequences, and micro-interactions
- Current trends to apply: 3D/2D hybrid animation, retro futurism, generative motion, scroll-driven cinematic
- Implementation via: Framer Motion, CSS `animation-timeline: scroll()`, GSAP (if needed), Lottie
- Every interaction should feel intentional and demonstrate craft

### 6. Article/Blog Feed (Planned)
- CSS Grid (`auto-fit` + `minmax()`) for responsive card layouts
- Card anatomy: featured image + title + source/date + excerpt + link
- Content sources: curated web articles (cited), Daniel's own writing, project case studies
- Subgrid for internal card alignment, container queries for adaptive cards

---

## Brand Guidelines for Creative Work

### Visual Identity System
```
PRIMARY PALETTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Background     #0F0F0F    Near-black, cinematic depth
  Text/Primary   #FFFDDB    Warm cream, editorial warmth
  Accent         #FF3831    Bold red, energy & action
  Secondary      #3F3F46    Neutral gray, supporting elements

TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Headlines      Archivo (800)       Sans-serif, bold authority
  Display        Fraunces (variable) Serif, editorial elegance
  Body           Space Grotesk       Grotesque, clean readability
  Accent         Tan Memories        Custom serif, personality

DESIGN PRINCIPLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Corners        Sharp (0px radius)   Editorial, confident
  Motion         Purposeful, cinematic Every animation tells a story
  Contrast       High                 Dark bg + light text + red pops
  Density        Generous whitespace   Let content breathe
  Photography    Cinematic, contrasty  Red-tinted portraits, moody project shots
```

### AI Image Prompt Style Guide
When generating images for this brand, use these consistent modifiers:

```
UNIVERSAL MODIFIERS (append to all prompts):
  --style: cinematic editorial photography
  --lighting: dramatic chiaroscuro, deep shadows, warm highlights
  --palette: deep black (#0F0F0F), bold red (#FF3831), warm cream (#FFFDDB)
  --mood: confident, bold, futuristic, editorial
  --texture: subtle film grain, high contrast
  --framing: editorial composition, rule of thirds, negative space

FOR PORTRAITS:
  Add: shallow depth of field, red-tinted rim light, dark moody background,
       studio quality, professional headshot, looking at camera

FOR PROJECT THUMBNAILS:
  Add: widescreen 16:9, product photography meets film still,
       dramatic lighting on subject, dark environment, accent color highlight

FOR ABSTRACT/BRAND TEXTURES:
  Add: generative art, organic flow, dark base with red energy accents,
       minimal, geometric-organic hybrid, data visualization aesthetic
```

### Inspiration References
The `design-inspo/` folder contains approved reference screenshots from the **Griflan** creative studio site, which established the visual direction:
- Dark mode with warm cream text and red accent buttons
- Serif + sans-serif type pairing for editorial authority
- Project grids with hover-reveal interactions
- Physics-based interactive tags for skill/service sections
- Scroll-driven hero with expanding media content
- Breathing gradient footer with bold CTA

---

## Infrastructure & Deployment

### Production Architecture
```
                         ┌─────────────────────────────────────────┐
                         │     Hostinger VPS (31.97.65.93)         │
                         │     Ubuntu 24.04 / KVM 2                │
                         │                                         │
  daniel-granda.com ────►│  Caddy (auto-SSL, gzip)                │
  www.daniel-granda.com  │    ├── / → file_server                  │
                         │    │   /var/www/daniel-granda.com/      │
                         │    │   (index.html + assets/ + images/) │
                         │    │   try_files → /index.html (SPA)    │
                         │    │                                     │
  api.daniel-granda.com ►│    └── reverse_proxy → localhost:4000   │
                         │         PM2 → portfolio-api (Node.js)   │
                         │         PostgreSQL 16 (portfolio_db)    │
                         └─────────────────────────────────────────┘
```

### DNS Records (Hostinger DNS)
| Name | Type | Value | Purpose |
|------|------|-------|---------|
| `@` | A | `31.97.65.93` | Root domain → VPS |
| `@` | AAAA | `2a02:4780:2d:180f::1` | IPv6 → VPS |
| `www` | CNAME | `daniel-granda.com` | www redirect |
| `api` | A | `31.97.65.93` | API subdomain → VPS |
| `@` | MX | `mx1/mx2.hostinger.com` | Email (Hostinger) |
| Various | CNAME/TXT | — | DKIM, SPF, DMARC for email |

### VPS File Layout
```
/var/www/daniel-granda.com/    # Frontend static files (served by Caddy)
├── index.html
├── assets/index-*.js
└── images/

~/daniel-granda/               # Project repo + working directory
├── backend/                   # Backend source + dist
│   ├── src/                   # TypeScript source
│   ├── dist/                  # Compiled JS (PM2 runs this)
│   ├── .env                   # Production env vars
│   └── node_modules/
└── frontend/                  # Staging area for frontend builds

/etc/caddy/Caddyfile           # Caddy config (both sites)
```

### Backend Environment Variables (VPS: ~/daniel-granda/backend/.env)
```
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://portfolio:PASSWORD@localhost:5432/portfolio_db
API_KEY=f364dc0aa90e14c90ec2e221413ba77ee0bf8229600299f8c404e886a399d013
CORS_ORIGIN=https://daniel-granda.com,http://localhost:3002
RESEND_API_KEY=                # Optional — enables contact form emails
CONTACT_EMAIL=contact@daniel-granda.com
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=10
```

### SSH Access
```bash
# SSH key at ~/.ssh/hostinger_vps (ed25519)
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93
```

### Deploy Frontend (from local machine)
```bash
cd "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion"
npm run build
scp -i ~/.ssh/hostinger_vps -r dist/* root@31.97.65.93:/var/www/daniel-granda.com/
```

### Deploy Backend (on VPS)
```bash
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93
cd ~/daniel-granda/backend
git pull
npm ci --production
npm run build
npm run migrate          # If schema changed
pm2 restart portfolio-api --update-env
```

### Key Services on VPS
| Service | Manager | Command |
|---------|---------|---------|
| Caddy | systemd | `systemctl reload caddy` / `systemctl status caddy` |
| Backend API | PM2 | `pm2 restart portfolio-api` / `pm2 logs portfolio-api` |
| PostgreSQL | systemd | `systemctl status postgresql` |

---

## Roadmap & Development Areas

### Current State (February 2026)
- Full-stack deployed: React SPA + Express API + PostgreSQL
- Frontend served from VPS via Caddy with auto-SSL
- Backend API live at api.daniel-granda.com
- Projects, Clients, Testimonials fetched from API (with fallback to hardcoded data)
- SPA routing: Home (`/`), Case Study (`/work/:slug`), Articles (`/articles`)
- All animations working (scroll reveals via IntersectionObserver + MutationObserver, physics tags, 3D tilt, tickers)
- Contact form backend ready (needs RESEND_API_KEY for email delivery)
- Admin API endpoints available for content management via API key

### Priority Improvements
1. **SEO & Meta** — OG tags, structured data, sitemap, proper meta descriptions
2. **Performance** — Move Tailwind from CDN to build-time; tree-shake unused CSS
3. **Contact form email** — Configure RESEND_API_KEY for actual email delivery
4. **Analytics** — Privacy-respecting analytics (Plausible, Umami, or simple custom)
5. **Case Study pages** — Deep-dive content for each project (currently route exists but needs content)

### Future Features
- **Blog/Article Feed** — Content already supported by backend API + content/ directory
- **Video Showreel** — Self-hosted or Vimeo-embedded
- **Resume Download** — Direct PDF download from the site
- **Internationalization** — EN/ES bilingual support

---

## Working Instructions

### When Editing Code
- Work inside `daniel-rodrigo-portfolio/` for all React code
- Follow existing patterns: functional components, hooks, TypeScript interfaces in `types.ts`
- Use Tailwind utility classes with the existing `brand-*` color tokens
- Animations: prefer Framer Motion for React components, CSS for simple transitions
- Run `npm run build` to verify production builds after significant changes

### When Making Design Decisions
- Reference `design-inspo/` screenshots for approved aesthetic direction
- Stay within the brand color palette — no new colors without explicit approval
- Typography hierarchy: Archivo for bold headlines, Fraunces for editorial display, Space Grotesk for body
- Sharp corners (0px radius) — this is an editorial brand, not a friendly SaaS
- Every interaction should feel cinematic and intentional

### When Creating Content
- Write in Daniel's voice: confident, concise, results-oriented
- Always include measurable outcomes (percentages, numbers, client names)
- Frame skills as intersections, not lists: "AI-accelerated editorial production" not "Video editing, AI tools"
- The unifying brand narrative: "Cinematic craft meets intelligent systems"

### When Generating Image Prompts
- Use the AI Image Prompt Style Guide above
- Always specify the brand color palette in prompts
- Compare outputs against existing portfolio imagery for consistency
- Iterate prompts — never ship first-generation outputs
- Document successful prompts for reuse

### When Reviewing/Improving
- Compare against award-winning portfolio sites for quality benchmarks
- Check mobile responsiveness at every change
- Verify animation performance (no janky scroll, no layout shifts)
- Test with real content, not lorem ipsum

---

## Global Skill & Agent Access

This project inherits all agents and skills from `D:\Development Tools\`:

### Available Agents
| Agent | Use For |
|-------|---------|
| `art-director` | Visual analysis, creative direction, image prompt generation, brand consistency review |
| `code-master` | Complex frontend implementations, architecture decisions, performance optimization |
| `agent-architect` | Designing new specialized agents if needed |
| `comfyui-expert` | ComfyUI workflow creation for brand imagery generation |

### Available Skills
| Skill | Use For |
|-------|---------|
| `/frontend-design` | Building new components with high design quality |
| `/canvas-design` | Creating static visual assets (posters, social cards) |
| `/brand-guidelines` | Applying brand system to any artifact |
| `/theme-factory` | Generating themed variations of components |
| `/webapp-testing` | Testing the portfolio with Playwright |
| `/pdf` | Processing resume PDFs |
| `/algorithmic-art` | Generative art for brand textures or backgrounds |

### Available MCP Servers
| Server | Use For |
|--------|---------|
| Context7 | Looking up React, Framer Motion, Vite, Tailwind documentation |
| Claude in Chrome | Viewing the live portfolio, testing interactions, taking screenshots |
| Hostinger API | Domain/DNS/VPS management for deployment |
| Shopify | Not relevant to this project |

---

## Resume & Application Materials

The `pdf-resumes/` directory contains Daniel's complete job application history:

### Current Resume Variants (2026)
- `2026_Daniel Granda_Video&Multimedia Editor.pdf` — Multimedia editor focus
- `2026_Daniel Granda_Video&Graphic_editor.pdf` — Graphic + video dual focus

### Application Archive Structure
Each dated folder (e.g., `2025-08-15-au-vodka-social-content-creator/`) contains:
- `resume_tailored.md` — Position-specific resume
- `coverletter_tailored.md` — Position-specific cover letter
- `job-description.md` — Source job posting

### Roles Applied For (for positioning context)
- Senior Videographer / Brand Content Producer
- Video Editor / Social Content Creator
- Multimedia Editor (Newsweek)
- Senior Graphic Designer (Jazwares)
- Long-Form Documentary Editor (American Alchemy)
- Video Production Specialist

This history reveals Daniel's positioning range: from DTC social content to documentary filmmaking to graphic design — always with an AI-first production angle.

---

## Critical Rules

- Every change must serve the job-search goal
- Never break existing animations or interactions without explicit approval
- Never commit or push unless asked
- Never expose personal contact info in code comments or logs
- Keep the site fast — performance IS the portfolio
- The brand is cinematic, bold, and editorial — never cutesy, rounded, or pastel
- When in doubt about design direction, reference `design-inspo/` screenshots
- Always delegate complex creative direction to the `art-director` agent
- Always delegate complex code implementations to the `code-master` agent
