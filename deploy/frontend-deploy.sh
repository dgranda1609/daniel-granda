#!/bin/bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "Building frontend..."
npm run build

echo "Deploying to Hostinger..."
rsync -avz --delete \
  --exclude='.htaccess' \
  dist/ \
  u123456789@daniel-granda.com:~/public_html/

echo "Frontend deployed successfully."
