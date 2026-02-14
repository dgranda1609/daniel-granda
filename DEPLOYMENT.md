# Backend Deployment Guide

Complete guide to set up, test, and deploy the Portfolio Backend API.

---

## Prerequisites

- **Local (Windows):** Node.js 20+, PostgreSQL 16, Git
- **VPS:** Ubuntu 24.04 server with root access (Hostinger VPS: 31.97.65.93)
- **Domain:** daniel-granda.com (configured to point `api.daniel-granda.com` to VPS)

---

## Phase 1: Local Setup & Testing (Windows)

### 1.1 Install PostgreSQL 16

If not already installed:

1. Download PostgreSQL 16 for Windows: https://www.postgresql.org/download/windows/
2. Run installer, use default port `5432`
3. Set a password for the `postgres` user (remember this!)
4. Add PostgreSQL `bin` folder to PATH:
   - Default: `C:\Program Files\PostgreSQL\16\bin`
   - System Properties → Environment Variables → Path → Add

5. Restart PowerShell/Terminal

Verify installation:
```powershell
psql --version
# Should show: psql (PostgreSQL) 16.x
```

### 1.2 Run Setup Script

Open PowerShell **as Administrator** in the backend directory:

```powershell
cd "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion\backend"

# Allow script execution (if needed)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# Run setup
.\setup-windows.ps1
```

This script will:
- ✓ Check prerequisites (Node, PostgreSQL)
- ✓ Create `.env` file with secure API key
- ✓ Create PostgreSQL database `portfolio_db`
- ✓ Install npm dependencies
- ✓ Run migrations (create tables)
- ✓ Seed database with sample data
- ✓ Create uploads directory

### 1.3 Start Development Server

```powershell
npm run dev
```

Server starts at: **http://localhost:4000**

### 1.4 Test API Endpoints

Open a new terminal and test:

```powershell
# Health check
curl http://localhost:4000/api/health

# Get projects
curl http://localhost:4000/api/projects

# Get clients
curl http://localhost:4000/api/clients

# Get testimonials
curl http://localhost:4000/api/testimonials

# Get site settings
curl http://localhost:4000/api/settings

# Test contact form (rate limited: 3/hour per IP)
curl -X POST http://localhost:4000/api/contact `
  -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@example.com","message":"Test message from local"}'
```

Expected responses:
- Health: `{"success":true,"message":"API is running",...}`
- Projects: `{"success":true,"data":[{...}],...}`
- Contact: `{"success":true,"message":"Message received..."}`

If all tests pass, **local setup is complete!** ✅

---

## Phase 2: GitHub Setup

### 2.1 Initialize Git Repository

```powershell
cd "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion"

# Initialize git (if not already)
git init

# Create .gitignore
```

Create `.gitignore` in project root:

```gitignore
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.production
backend/.env
frontend/.env

# Build outputs
dist/
build/
backend/dist/
frontend/dist/

# Uploads
uploads/
backend/uploads/

# Logs
*.log
npm-debug.log*
logs/

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
*.tmp
.cache/
```

### 2.2 Commit and Push

```powershell
git add .
git commit -m "Initial commit: Portfolio backend + frontend

- Express.js + TypeScript backend with PostgreSQL
- React frontend with Tailwind CSS
- Backend: Projects, Clients, Testimonials, Blog, Contact, Settings APIs
- Frontend: Hero, Projects, Clients, Testimonials, Services, Contact Modal
- Deployment configs for Caddy + PM2"

# Create repository on GitHub (go to github.com/new)
# Then push:

git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## Phase 3: VPS Deployment

### 3.1 Connect to VPS

```powershell
ssh root@31.97.65.93
```

### 3.2 Upload Setup Script

From your local machine (PowerShell):

```powershell
scp "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion\deploy\vps-setup.sh" root@31.97.65.93:/root/
```

### 3.3 Run Initial VPS Setup

**⚠️ Run this ONCE only — it installs Node.js, PostgreSQL, Caddy, PM2**

On the VPS (via SSH):

```bash
cd /root
chmod +x vps-setup.sh
sudo bash vps-setup.sh
```

This script will:
- ✓ Install Node.js 20
- ✓ Install PostgreSQL 16
- ✓ Install Caddy (web server with auto-SSL)
- ✓ Install PM2 (process manager)
- ✓ Create database `portfolio_db`
- ✓ Generate secure API key
- ✓ Create `.env` file at `/opt/portfolio-api/.env`
- ✓ Configure Caddy for `api.daniel-granda.com`

**📝 IMPORTANT:** The script will output database credentials and API key. **Save these securely!**

Example output:
```
DATABASE_URL=postgresql://portfolio:RANDOM_PASSWORD@localhost:5432/portfolio_db
API_KEY=RANDOM_KEY_64_CHARS
```

### 3.4 Clone Repository

On the VPS:

```bash
cd /opt/portfolio-api
git clone https://github.com/YOUR_USERNAME/portfolio.git .
```

### 3.5 Build and Deploy

```bash
cd /opt/portfolio-api/backend

# Install dependencies
npm ci --production

# Build TypeScript
npm run build

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start with PM2
pm2 start dist/index.js --name portfolio-api

# Save PM2 process list
pm2 save
```

### 3.6 Verify Backend is Running

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs portfolio-api

# Test locally
curl http://localhost:4000/api/health
```

---

## Phase 4: DNS & HTTPS Configuration

### 4.1 Configure DNS A Record

Point `api.daniel-granda.com` to your VPS IP: `31.97.65.93`

**Option A: Via Hostinger API (I can do this for you)**

**Option B: Via Hostinger Control Panel**
1. Log in to Hostinger hPanel
2. Go to Domains → daniel-granda.com → DNS Zone
3. Add A record:
   - **Name:** `api`
   - **Type:** `A`
   - **Points to:** `31.97.65.93`
   - **TTL:** 3600

### 4.2 Wait for DNS Propagation

Check DNS propagation (takes 5-30 minutes):

```powershell
nslookup api.daniel-granda.com
# Should return: 31.97.65.93
```

Or use: https://dnschecker.org/#A/api.daniel-granda.com

### 4.3 Test HTTPS Endpoint

Once DNS propagates, Caddy will automatically obtain SSL certificate:

```powershell
curl https://api.daniel-granda.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-02-13T..."
}
```

**✅ Deployment Complete!**

---

## Phase 5: Frontend Integration

### 5.1 Update Frontend Environment

In `frontend/.env`:

```env
VITE_API_URL=https://api.daniel-granda.com
```

### 5.2 Test Contact Form

1. Start frontend dev server:
   ```powershell
   cd frontend
   npm run dev
   ```

2. Open browser: http://localhost:5173
3. Click "Let's Connect" → Fill form → Submit
4. Check email (if RESEND_API_KEY configured) or check backend logs:
   ```bash
   ssh root@31.97.65.93
   pm2 logs portfolio-api
   ```

---

## Ongoing Maintenance

### Deploy Updates

After making code changes:

**Option 1: Automated (from local machine)**

```powershell
# From project root
.\deploy\backend-deploy.sh
```

**Option 2: Manual (on VPS)**

```bash
ssh root@31.97.65.93
cd /opt/portfolio-api
git pull
cd backend
npm ci --production
npm run build
npm run migrate  # If schema changed
pm2 restart portfolio-api
```

### View Logs

```bash
# PM2 logs
pm2 logs portfolio-api

# Caddy logs
sudo tail -f /var/log/caddy/api-access.log
```

### Database Backup

```bash
# On VPS
pg_dump -U portfolio portfolio_db > /root/backups/portfolio_$(date +%Y%m%d).sql
```

### Monitor API

```bash
pm2 monit
```

---

## Troubleshooting

### Backend won't start

```bash
pm2 logs portfolio-api --lines 50
# Check for:
# - Database connection errors → verify DATABASE_URL in .env
# - Port conflicts → ensure port 4000 is free
# - Missing dependencies → run npm ci --production
```

### Database connection failed

```bash
# Test PostgreSQL
sudo -u postgres psql -c "SELECT version();"

# Test connection
psql "postgresql://portfolio:PASSWORD@localhost:5432/portfolio_db" -c "SELECT NOW();"
```

### SSL certificate not issued

```bash
# Check Caddy status
sudo systemctl status caddy

# Check Caddy logs
sudo journalctl -u caddy -n 50

# Reload Caddy
sudo systemctl reload caddy
```

### Contact form not sending emails

1. Check if `RESEND_API_KEY` is set in `/opt/portfolio-api/.env`
2. If not configured, emails are skipped (check logs: "Resend API key not configured")
3. To enable: Sign up at https://resend.com, get API key, add to `.env`

---

## API Endpoints Reference

### Public Endpoints (No Authentication)

```
GET    /api/health              # Health check
GET    /api/projects            # List all projects
GET    /api/projects/:id        # Get single project
GET    /api/clients             # List all clients
GET    /api/testimonials        # List all testimonials
GET    /api/blog                # List blog posts + curated links (paginated)
GET    /api/settings            # Get site settings
POST   /api/contact             # Submit contact form (rate limited: 3/hr per IP)
```

### Admin Endpoints (Require `Authorization: Bearer YOUR_API_KEY`)

```
POST   /api/projects            # Create project
PUT    /api/projects/:id        # Update project
DELETE /api/projects/:id        # Delete project

POST   /api/clients             # Create client
PUT    /api/clients/:id         # Update client
DELETE /api/clients/:id         # Delete client

POST   /api/testimonials        # Create testimonial
PUT    /api/testimonials/:id    # Update testimonial
DELETE /api/testimonials/:id    # Delete testimonial

POST   /api/blog                # Create blog post
PUT    /api/blog/:slug          # Update blog post
DELETE /api/blog/:slug          # Delete blog post

POST   /api/blog/sync           # Sync markdown files from content/posts/
POST   /api/blog/curated        # Add curated link
PUT    /api/blog/curated/:id    # Update curated link
DELETE /api/blog/curated/:id    # Delete curated link

PUT    /api/settings            # Update site settings
POST   /api/upload              # Upload image (returns URL)
```

### Admin Request Example

```bash
curl -X POST https://api.daniel-granda.com/api/projects \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Project","description":"Project description",...}'
```

---

## Stack Summary

**Backend:**
- Express.js + TypeScript
- PostgreSQL 16 (raw `pg`, no ORM)
- Zod validation
- Resend (email, optional)
- Caddy (reverse proxy + auto-SSL)
- PM2 (process manager)

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

**Infrastructure:**
- VPS: Hostinger KVM 2 (31.97.65.93)
- Domain: api.daniel-granda.com
- Database: PostgreSQL 16 on VPS
- SSL: Auto-issued by Caddy (Let's Encrypt)

---

## Security Notes

1. **API Key:** 64-character random string for admin authentication
2. **Database:** Credentials auto-generated during setup
3. **CORS:** Locked to `https://daniel-granda.com` in production
4. **Rate Limiting:** Contact form limited to 3 submissions/hour per IP
5. **HTTPS:** Enforced via Caddy with HSTS header
6. **Secrets:** Never commit `.env` files to Git

---

**Questions or issues?** Check logs first:
- Backend: `pm2 logs portfolio-api`
- Caddy: `sudo journalctl -u caddy`
- PostgreSQL: `sudo journalctl -u postgresql`
