# Deployment v2 — Daniel Granda Portfolio (Sanitized)

> Updated: 2026-03-03  
> Scope: current repo layout + safe deploy/runbook (no secrets)

---

## 1) What changed vs old DEPLOYMENT.md

### Still valid
- VPS + Caddy + PM2 architecture is still a solid fit.
- Frontend static deployment to `/var/www/daniel-granda.com` is valid.
- API reverse proxy on `api.daniel-granda.com -> localhost:4000` is valid.
- PM2 + Caddy log/debug workflow is still useful.

### Outdated / risky
- Local frontend path examples were old (`...prefinalversion`).
- Old doc included sensitive values (API key/token/IP details) inline.
- CORS guidance implied comma-separated origin string; current backend code **does not split in production**.
- Old bootstrap snippets were tied to historical package/runtime assumptions.

---

## 2) Current project paths (local)

```text
D:\Development Tools\Gemini-antigravity\daniel-granda-brand-projects\personal-portfolio\daniel-granda-portfolio-with-works
├── package.json                # frontend (Vite)
├── dist/                       # frontend build output
└── backend/
    ├── package.json            # API (Express + TS)
    ├── src/
    ├── migrations/
    ├── seeds/
    └── uploads/
```

Frontend scripts:
- `npm run dev`
- `npm run build`

Backend scripts:
- `npm run dev`
- `npm run build`
- `npm run migrate`
- `npm run seed`
- `npm run start` (runs `dist/index.js`)

---

## 3) Environment variables (no secrets)

### Frontend `.env.local`
```env
VITE_API_URL=https://api.daniel-granda.com/api
# Optional admin usage:
VITE_API_KEY=YOUR_ADMIN_API_KEY
```

### Backend `.env` (production)
```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/portfolio_db
API_KEY=GENERATE_LONG_RANDOM_SECRET
CORS_ORIGIN=https://daniel-granda.com
RESEND_API_KEY=OPTIONAL
CONTACT_EMAIL=contact@daniel-granda.com
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=10
```

### CORS critical note
Current backend (`backend/src/config/cors.ts`) uses:
- dev: array of origins
- production: single `env.CORS_ORIGIN` string

So in production set **one origin only** (no comma list), or refactor backend to parse/split.

---

## 4) Standard deploy (Git + SSH)

## 4.1 Frontend deploy
From local machine:

```bash
cd "D:\Development Tools\Gemini-antigravity\daniel-granda-brand-projects\personal-portfolio\daniel-granda-portfolio-with-works"
npm ci
npm run build
scp -r dist/* root@YOUR_VPS_IP:/var/www/daniel-granda.com/
```

## 4.2 Backend deploy
On VPS:

```bash
cd ~/daniel-granda
git pull
cd backend
npm ci --production
npm run build
npm run migrate
pm2 restart portfolio-api --update-env
```

---

## 5) MCP-first deploy workflow (recommended)

You now have `hostinger-api` + `github` MCP available via `mcp-worker`.

### 5.1 Release order
1. Commit + push to GitHub
2. Build frontend locally (`npm run build`)
3. Deploy to Hostinger via MCP:
   - Static site: `hosting_deployStaticWebsite`
   - JS app: `hosting_deployJsApplication`
4. Verify deployment status / logs via MCP
5. Smoke test routes (`/`, `/articles`, one `/work/:slug`)

### 5.2 Suggested OpenClaw command pattern
```powershell
openclaw agent --agent mcp-worker --message "Use hostinger-api MCP to deploy this project to <domain> as a static site from <archive/path>, then confirm deployment status and summarize result."
```

---

## 6) Runtime ops checklist

### Health checks
```bash
pm2 list
pm2 logs portfolio-api --lines 100
curl -I https://daniel-granda.com
curl -s https://api.daniel-granda.com/api/health
```

### Caddy
```bash
systemctl status caddy
journalctl -u caddy -n 100
```

### PM2
```bash
pm2 restart portfolio-api --update-env
pm2 save
```

---

## 7) Troubleshooting quick map

- **Frontend stale**: confirm new `dist/assets/*` reached `/var/www/daniel-granda.com/`.
- **Articles/projects not loading**: check API health + CORS origin value.
- **Blank route (`/work`)**: frontend route mismatch; add redirect or route handler.
- **Contact form fails**: verify `API_KEY`, `RESEND_API_KEY`, and server logs.

---

## 8) Security hygiene

- Keep tokens/keys out of markdown docs.
- Use env vars or secret manager only.
- Rotate any token that was ever pasted in chat or committed.
- Prefer expiring GitHub PATs (30–90 days).

---

## 9) Next docs task (recommended)

Create `RUNBOOK.md` with:
- One-click deploy commands
- Rollback procedure (previous build restore)
- Incident playbook (API down, CORS break, TLS break)
- Owner/contact escalation
