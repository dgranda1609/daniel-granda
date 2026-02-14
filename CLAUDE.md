# CLAUDE.md — Personal Portfolio

> **Project**: Daniel Granda's personal portfolio website
> **Purpose**: Job-seeking portfolio showcasing video production, AI systems, and creative technology
> **Status**: Active development — React/Vite SPA with cinematic animations
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
- 10+ years in video production, motion graphics, and editorial storytelling
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

### Frontend (Current)
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI framework |
| TypeScript | 5.8.2 | Type safety |
| Vite | 6.2.0 | Build tool & dev server |
| Framer Motion | 12.33.0 | Animations & transitions |
| Matter.js | 0.20.0 | Physics-based tag animations |
| Lucide React | 0.563.0 | Icons |
| Tailwind CSS | CDN | Utility-first styling |

### Backend (Planned)
- No backend currently — static SPA
- Future: Node.js/Express or serverless functions for:
  - Blog/article RSS feed aggregation
  - Contact form processing
  - Analytics dashboard
  - CMS-lite for project data

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
personal-portfolio/
├── CLAUDE.md                              # THIS FILE
├── daniel-rodrigo-portfolio/              # Main React application
│   ├── public/images/                     # Optimized project imagery
│   ├── components/                        # React components (11 files)
│   │   ├── Navbar.tsx                     # Fixed glassmorphism nav with scroll effects
│   │   ├── Hero.tsx                       # 300vh sticky scroll with expanding video
│   │   ├── About.tsx                      # Portrait + skill ticker + bio
│   │   ├── Projects.tsx                   # 5-card grid with 3D tilt hover
│   │   ├── Services.tsx                   # Motion/AI/Branding with physics tags
│   │   ├── Clients.tsx                    # 9-item grid with hover cards
│   │   ├── Testimonials.tsx               # Infinite ticker carousel
│   │   ├── SocialProof.tsx                # 5 expanding bubbles
│   │   ├── Footer.tsx                     # Animated gradient + CTA
│   │   ├── PhysicsTags.tsx                # Matter.js physics simulation
│   │   └── AnimatedGradientBackground.tsx # Breathing radial gradient
│   ├── App.tsx                            # Root component + IntersectionObserver
│   ├── index.tsx                          # React entry point
│   ├── types.ts                           # Project, Client, Testimonial interfaces
│   ├── index.html                         # HTML template + Tailwind config + custom CSS
│   ├── vite.config.ts                     # Vite config (port 3000)
│   ├── tsconfig.json                      # TypeScript config
│   └── package.json                       # Dependencies
│
├── Assets for the portfolio/              # Raw design assets library
│   ├── *.gif, *.jpg                       # Project hero images
│   ├── kreyolessence-*.jpg                # 16+ KreyolEssence variations
│   ├── me-portrait-red.png                # High-res portrait (11MB)
│   ├── me-redbg-v*.webp                   # Optimized portrait variants
│   └── *.mp4                              # Documentary/brand films (~600MB total)
│
├── Fonts/                                 # Custom font files
│   └── tan-memories/                      # OTF + TTF formats
│
├── design-inspo/                          # Design reference screenshots (12 files)
│   ├── hero-section-*.png                 # Hero scroll interaction references
│   ├── branding-inspo.png                 # Color/type system reference (Griflan)
│   ├── skills-section-*.png               # Service hover interaction reference
│   ├── my-work-section-inspo.png          # Project grid reference
│   └── final-section-CTA-inspo.png        # Footer CTA reference
│
└── pdf-resumes/                           # Resume & application materials
    ├── 2026_Daniel Granda_*.pdf           # Current resume versions (2 variants)
    ├── Cover Letter_*.pdf                 # Cover letter template
    ├── 2025-*/                            # Dated application folders
    │   ├── resume_tailored.md             # Tailored resume markdown
    │   ├── coverletter_tailored.md        # Tailored cover letter
    │   └── job-description.md             # Source job description
    ├── archived-applications/             # Older applications (8 PDFs)
    └── Original ressume and cover letter/ # Base templates
```

---

## Component Architecture

### Section Order (App.tsx)
1. `<Navbar />` — Fixed, glassmorphism, scroll-reactive
2. `<Hero />` — Sticky 300vh with expanding YouTube video
3. `<About />` — Portrait with rotating skill ticker
4. `<Projects />` — Grid with 3D tilt hover
5. `<Services />` — Three categories with Matter.js physics tags
6. `<Clients />` — Hover-reveal card grid
7. `<Testimonials />` — Infinite horizontal ticker
8. `<SocialProof />` — Expanding differentiator bubbles
9. `<Footer />` — Breathing gradient + contact CTA

### Animation System
| Technique | Implementation | Used In |
|-----------|---------------|---------|
| Scroll reveal | IntersectionObserver + CSS `.reveal` class | All sections |
| Sticky scroll | CSS `position: sticky` with scroll progress | Hero |
| Physics simulation | Matter.js engine (gravity, friction, bouncing) | Services tags |
| 3D tilt on hover | Mouse-tracking `rotateX/Y` transforms | Project cards |
| Infinite ticker | CSS `translateX` animation (200s loop) | Testimonials |
| Breathing gradient | Framer Motion opacity animation | Footer |
| Glassmorphism | `backdrop-filter: blur(10px)` | Navbar |
| Staggered entrance | Framer Motion `animate` with delays | SocialProof |

---

## Development Commands

```bash
# From daniel-rodrigo-portfolio/ directory:
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Production build → dist/
npm run preview      # Preview production build
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

## Roadmap & Development Areas

### Current State
- Single-page React SPA with all major sections built
- Animations and interactions working (scroll reveals, physics tags, 3D tilt, tickers)
- Project data and testimonials are hardcoded with some placeholder content
- No backend, no routing, no blog/article feed
- No deployment pipeline configured
- Services section uses placeholder images (picsum.photos)

### Priority Improvements
1. **Replace placeholder content** — Real client names, testimonial quotes, service images
2. **Optimize assets** — The 11MB portrait PNG needs optimization; consolidate GIF/JPG duplicates
3. **SEO & Meta** — OG tags, structured data, sitemap, proper meta descriptions
4. **Performance** — Move Tailwind from CDN to build-time; tree-shake unused CSS
5. **Deployment** — Set up CI/CD (Vercel, Netlify, or Hostinger VPS)
6. **Contact form** — Functional email integration (Resend, EmailJS, or serverless function)
7. **Analytics** — Privacy-respecting analytics (Plausible, Umami, or simple custom)

### Future Features
- **Blog/Article Feed** — CSS grid card layout, curated web articles + original writing
- **Backend API** — Project data CMS, article aggregation, contact form processing
- **Case Study Pages** — Deep-dive project pages with scroll-driven storytelling
- **Video Showreel** — Self-hosted or Vimeo-embedded, not YouTube
- **Resume Download** — Direct PDF download from the site
- **Dark/Light Mode** — Toggle (though dark-first is the brand)
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
