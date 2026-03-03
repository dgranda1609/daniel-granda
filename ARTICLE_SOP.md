# SOP — Adding New Articles (AI-friendly Markdown → Website-safe rendering)

This project stores articles as **Markdown files** for AI readability and long-term portability.

## Canonical article folder

- ✅ Use: `content/articles/`
- ❌ Do not add new articles to: `content/posts/` (legacy)

---

## 1) Create article file

Create a new `.md` file in `content/articles/`:

`your-article-slug.md`

Use this frontmatter schema:

```md
---
title: "Your Article Title"
slug: "your-article-slug"
excerpt: "1–2 sentence summary for article cards"
author: "Daniel Granda"
category: "AI Workflow"
tags: ["tag-one", "tag-two"]
featuredImage: "/images/articles/your-cover.jpg"
# or for video preview:
# featuredImage: "/videos/your-preview.mp4"
published: true
publishedAt: "2026-03-03"
---

Write the article body here in standard Markdown.
```

---

## 2) Markdown content rules

- Write in standard Markdown (`#`, `##`, `-`, `**bold**`, links).
- Keep links as Markdown links: `[text](https://url)`.
- You may include inline HTML only if absolutely needed.
- Prefer clean Markdown over pasted rich-text HTML.

---

## 3) Media previews in article cards

Set `featuredImage` in frontmatter:

- Image card preview: `"/images/..."`
- Video card preview: `"/videos/...mp4"`

Place media files under `public/images/...` or `public/videos/...`.

---

## 4) Sync Markdown into backend DB

From `backend/` run:

```bash
npm run sync-blog
```

This imports/updates all Markdown articles into `blog_posts`.

---

## 5) Local preview

1. Backend running on `http://localhost:4000`
2. Frontend uses local API in `.env.local`:

```env
VITE_API_URL=http://localhost:4000/api
```

3. Frontend dev server:

```bash
npm run dev -- --port 3002
```

4. Check:
- `/articles` (cards + media preview)
- `/articles/:slug` (full article page)

---

## 6) Final delivery rule (important)

Articles must render as clean content on the website — **no raw HTML tags shown in UI**.

Implementation note:
- Sync stores **raw Markdown** in DB.
- Frontend renders Markdown for display.

If you ever see literal tags like `<p>` on page, re-run sync and verify the source article is Markdown, not pasted HTML.
