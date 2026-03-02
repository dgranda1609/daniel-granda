# Deployment Guide — Daniel Granda Portfolio

Complete guide for deploying and maintaining the portfolio at https://daniel-granda.com

---

## Architecture Overview

Everything runs on a **single Hostinger VPS** (KVM 2):

```
                         ┌─────────────────────────────────────────┐
                         │     Hostinger VPS (31.97.65.93)         │
                         │     Ubuntu 24.04 / KVM 2                │
                         │     Node.js v24.13 / PostgreSQL 16      │
                         │                                         │
  daniel-granda.com ────►│  Caddy 2.10.2 (auto-SSL via Let's Encrypt)
  www.daniel-granda.com  │    ├── / → file_server                  │
                         │    │   /var/www/daniel-granda.com/      │
                         │    │   SPA fallback: try_files → /index.html
                         │    │                                     │
  api.daniel-granda.com ►│    └── reverse_proxy → localhost:4000   │
                         │         PM2 5.4.3 → portfolio-api       │
                         │         PostgreSQL 16 (portfolio_db)    │
                         └─────────────────────────────────────────┘
```

---

## Quick Reference

### SSH Access
```bash
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93
```

### Deploy Frontend (one command)
```bash
cd "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion"
npm run build && scp -i ~/.ssh/hostinger_vps -r dist/* root@31.97.65.93:/var/www/daniel-granda.com/
```

### Deploy Backend
```bash
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 \
  "cd ~/daniel-granda/backend && git pull && npm ci --production && npm run build && pm2 restart portfolio-api --update-env"
```

### View Logs
```bash
# Backend API logs
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "pm2 logs portfolio-api --lines 50"

# Caddy (web server) logs
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "tail -50 /var/log/caddy/frontend.log"
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "tail -50 /var/log/caddy/api.log"
```

---

## VPS File Layout

```
/var/www/daniel-granda.com/       # Frontend static files (Caddy serves these)
├── index.html                     # SPA entry point
├── assets/
│   └── index-*.js                 # Vite-bundled JS (filename changes per build)
└── images/                        # Project images, portraits, etc.

~/daniel-granda/                   # Project working directory
├── backend/
│   ├── src/                       # TypeScript source
│   ├── dist/                      # Compiled JS (PM2 runs dist/index.js)
│   ├── migrations/                # SQL migrations
│   ├── seeds/                     # Database seed files
│   ├── .env                       # Production environment variables
│   └── node_modules/
└── frontend/                      # Staging area (SCP lands here first)

/etc/caddy/Caddyfile               # Web server configuration
```

---

## Backend Environment Variables

Located at `~/daniel-granda/backend/.env` on the VPS:

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://portfolio:PASSWORD@localhost:5432/portfolio_db
API_KEY=f364dc0aa90e14c90ec2e221413ba77ee0bf8229600299f8c404e886a399d013
CORS_ORIGIN=https://daniel-granda.com,http://localhost:3002
RESEND_API_KEY=                    # Optional — enables contact form email delivery
CONTACT_EMAIL=contact@daniel-granda.com
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=10
```

**Important:** CORS_ORIGIN is comma-separated. The backend `cors.ts` splits this into an array.

---

## Frontend Environment

Located at `.env.local` in the project root (local dev):

```env
VITE_API_URL=https://api.daniel-granda.com/api
```

This is baked into the build at compile time via Vite's `import.meta.env.VITE_API_URL`.

---

## DNS Configuration (Hostinger DNS)

| Name | Type | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| `@` | A | `31.97.65.93` | 300 | Root domain → VPS |
| `@` | AAAA | `2a02:4780:2d:180f::1` | 300 | IPv6 → VPS |
| `www` | CNAME | `daniel-granda.com` | 300 | www → root |
| `api` | A | `31.97.65.93` | 3600 | API subdomain → VPS |
| `@` | MX | `mx1.hostinger.com (5)`, `mx2.hostinger.com (10)` | 14400 | Email |
| `@` | TXT | `v=spf1 include:_spf.mail.hostinger.com ~all` | 3600 | SPF |
| `_dmarc` | TXT | `v=DMARC1; p=none` | 3600 | DMARC |
| `hostingermail-*._domainkey` | CNAME | `hostingermail-*.dkim.mail.hostinger.com` | 300 | DKIM |

**CDN is DISABLED.** Do not re-enable — it routes traffic to shared hosting instead of VPS.

---

## Caddy Configuration

Located at `/etc/caddy/Caddyfile`:

```caddyfile
# Frontend - Static files
daniel-granda.com, www.daniel-granda.com {
    root * /var/www/daniel-granda.com
    encode gzip
    file_server
    try_files {path} /index.html

    header {
        -Server
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
    }

    log {
        output file /var/log/caddy/frontend.log
    }
}

# Backend API
api.daniel-granda.com {
    reverse_proxy localhost:4000
    encode gzip

    header {
        -Server
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
    }

    log {
        output file /var/log/caddy/api.log
    }
}
```

After editing: `systemctl reload caddy`

---

## PM2 Process Management

```bash
pm2 list                           # Show running processes
pm2 logs portfolio-api             # Stream logs
pm2 restart portfolio-api          # Restart (use --update-env if .env changed)
pm2 stop portfolio-api             # Stop
pm2 delete portfolio-api           # Remove
pm2 save                           # Save process list for auto-restart on reboot
pm2 startup                        # Enable auto-start on system boot
pm2 monit                          # Real-time monitoring dashboard
```

---

## API Endpoints

### Public (No Auth)
```
GET    /api/health              Health check
GET    /api/projects            List projects
GET    /api/projects/:id        Single project
GET    /api/clients             List clients
GET    /api/testimonials        List testimonials
GET    /api/blog                Blog posts (paginated)
GET    /api/settings            Site settings
POST   /api/contact             Contact form (rate limited: 3/hr per IP)
```

### Admin (Require `Authorization: Bearer API_KEY`)
```
POST/PUT/DELETE  /api/projects/:id
POST/PUT/DELETE  /api/clients/:id
POST/PUT/DELETE  /api/testimonials/:id
POST/PUT/DELETE  /api/blog/:slug
POST             /api/blog/sync         Sync markdown from content/posts/
POST/PUT/DELETE  /api/blog/curated/:id
PUT              /api/settings
POST             /api/upload            Image upload
```

### Response Format
All endpoints return: `{ "success": true, "data": [...] }` or `{ "success": false, "error": "message" }`

---

## Step-by-Step: Full Deployment from Scratch

If you need to redeploy everything from zero:

### 1. VPS Initial Setup
```bash
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL 16
apt install -y postgresql postgresql-contrib

# Install Caddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy

# Install PM2
npm install -g pm2
```

### 2. Database Setup
```bash
sudo -u postgres psql <<EOF
CREATE USER portfolio WITH PASSWORD 'YOUR_SECURE_PASSWORD';
CREATE DATABASE portfolio_db OWNER portfolio;
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio;
EOF
```

### 3. Clone & Build Backend
```bash
mkdir -p ~/daniel-granda
cd ~/daniel-granda
git clone https://github.com/dgranda1609/daniel-granda.git .
cd backend
npm ci --production
npm run build
npm run migrate
npm run seed
```

### 4. Configure Backend Environment
```bash
cat > ~/daniel-granda/backend/.env << 'EOF'
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://portfolio:YOUR_SECURE_PASSWORD@localhost:5432/portfolio_db
API_KEY=YOUR_64_CHAR_API_KEY
CORS_ORIGIN=https://daniel-granda.com,http://localhost:3002
CONTACT_EMAIL=contact@daniel-granda.com
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=10
EOF
```

### 5. Start Backend with PM2
```bash
cd ~/daniel-granda/backend
pm2 start dist/index.js --name portfolio-api
pm2 save
pm2 startup
```

### 6. Configure Caddy
Write the Caddyfile (see "Caddy Configuration" section above), then:
```bash
systemctl reload caddy
```

### 7. Deploy Frontend
From local machine:
```bash
cd "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion"
npm run build
scp -i ~/.ssh/hostinger_vps -r dist/* root@31.97.65.93:/var/www/daniel-granda.com/
```

### 8. Configure DNS
Set the DNS records listed in the "DNS Configuration" section above via Hostinger panel or API.

---

## Troubleshooting

### Frontend shows old version
```bash
# Check what's deployed
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "ls -la /var/www/daniel-granda.com/assets/"
# Re-deploy
npm run build && scp -i ~/.ssh/hostinger_vps -r dist/* root@31.97.65.93:/var/www/daniel-granda.com/
```

### Backend won't start
```bash
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "pm2 logs portfolio-api --lines 50"
# Common issues:
# - DATABASE_URL wrong → check .env
# - Port 4000 in use → pm2 delete portfolio-api && pm2 start dist/index.js --name portfolio-api
# - Missing deps → npm ci --production
```

### CORS errors in browser
```bash
# Check current CORS_ORIGIN in .env
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "grep CORS ~/daniel-granda/backend/.env"
# Must include the frontend domain. After editing .env:
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "pm2 restart portfolio-api --update-env"
```

### SSL certificate issues
```bash
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 "systemctl status caddy && journalctl -u caddy -n 50"
# Caddy auto-provisions SSL. If it fails, check DNS resolves to VPS:
nslookup daniel-granda.com
```

### Images not loading
- Verify images exist: `ssh ... "ls /var/www/daniel-granda.com/images/"`
- Check API image_url paths: `curl https://api.daniel-granda.com/api/projects | jq '.[].image_url'`
- Paths should be `/images/filename.ext` (relative, served by Caddy)

### .reveal elements invisible after API load
The `Home.tsx` uses a `MutationObserver` to detect dynamically-added `.reveal` elements. If new components are added with the `.reveal` class, they'll be automatically observed. If reveals break, check that:
1. The MutationObserver in `Home.tsx` is still present
2. New elements have `className="reveal"` (not a typo)
3. The CSS in `index.html` has both `.reveal` (opacity: 0) and `.reveal.active` (opacity: 1)

---

## Database Backup & Restore

```bash
# Backup
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 \
  "pg_dump -U portfolio portfolio_db > ~/backups/portfolio_$(date +%Y%m%d).sql"

# Restore
ssh -i ~/.ssh/hostinger_vps root@31.97.65.93 \
  "psql -U portfolio portfolio_db < ~/backups/portfolio_YYYYMMDD.sql"
```

---

## Security Notes

1. **API Key:** 64-char random string — used for all admin endpoints (`Authorization: Bearer KEY`)
2. **SSH Key:** ed25519 at `~/.ssh/hostinger_vps` — only auth method for VPS
3. **Database:** Credentials in `.env` only, never committed to git
4. **CORS:** Locked to `https://daniel-granda.com` + dev origins
5. **Rate Limiting:** Contact form = 3 submissions/hour per IP
6. **HTTPS:** Enforced by Caddy with auto-redirect HTTP → HTTPS
7. **CDN:** Disabled — traffic goes direct to VPS
8. **Headers:** Security headers set by Caddy (X-Frame-Options, X-Content-Type-Options, etc.)
