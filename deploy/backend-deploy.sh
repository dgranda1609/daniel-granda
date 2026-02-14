#!/bin/bash
set -euo pipefail

VPS_HOST="root@31.97.65.93"
REMOTE_DIR="/opt/portfolio-api"

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR/backend"

echo "Building backend..."
npm run build

echo "Syncing to VPS..."
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='uploads' \
  dist/ package.json package-lock.json migrations/ seeds/ \
  "$VPS_HOST:$REMOTE_DIR/"

echo "Installing dependencies and restarting..."
ssh "$VPS_HOST" "cd $REMOTE_DIR && npm ci --production && pm2 restart portfolio-api"

echo "Backend deployed successfully."
