---
name: deploy
description: Deploy the portfolio frontend and/or backend to the VPS at daniel-granda.com. Use when user says "deploy", "push to production", "update the site", or similar.
argument-hint: "[frontend|backend|all]"
user-invocable: true
allowed-tools: Bash, Read, Write, Edit
---

# Deploy Portfolio to Production

Deploy the Daniel Granda portfolio to the Hostinger VPS at 31.97.65.93.

## Context
- **VPS:** 31.97.65.93 (Ubuntu 24.04)
- **SSH Key:** `~/.ssh/hostinger_vps`
- **Frontend domain:** daniel-granda.com
- **API domain:** api.daniel-granda.com
- **Frontend web root:** `/var/www/daniel-granda.com/`
- **Backend location:** `~/daniel-granda/backend/`
- **Project root:** `d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion\`

## Instructions

Parse `$ARGUMENTS` to determine what to deploy:
- `frontend` or no argument → deploy frontend only
- `backend` → deploy backend only
- `all` → deploy both

### Deploy Frontend

1. Build the frontend:
   ```bash
   cd "d:\Development Tools\Gemini-antigravity\personal-portfolio\daniel-granda-portfolio-prefinalversion"
   npm run build
   ```

2. Upload to VPS:
   ```bash
   scp -i ~/.ssh/hostinger_vps -o StrictHostKeyChecking=no -r dist/* root@31.97.65.93:/var/www/daniel-granda.com/
   ```

3. Verify:
   ```bash
   ssh -i ~/.ssh/hostinger_vps -o StrictHostKeyChecking=no root@31.97.65.93 "ls -la /var/www/daniel-granda.com/assets/"
   ```

### Deploy Backend

1. SSH into VPS and pull + rebuild:
   ```bash
   ssh -i ~/.ssh/hostinger_vps -o StrictHostKeyChecking=no root@31.97.65.93 \
     "cd ~/daniel-granda/backend && git pull && npm ci --production && npm run build && pm2 restart portfolio-api --update-env"
   ```

2. Check status:
   ```bash
   ssh -i ~/.ssh/hostinger_vps -o StrictHostKeyChecking=no root@31.97.65.93 "pm2 status && pm2 logs portfolio-api --lines 5 --nostream"
   ```

### After Deploy

Report what was deployed and verify the site is accessible. Remind the user to hard-refresh (`Ctrl+Shift+R`) their browser to see changes.
