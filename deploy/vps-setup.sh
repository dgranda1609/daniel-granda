#!/bin/bash
# VPS Initial Setup Script - Run ONCE on fresh Ubuntu 24.04 VPS
# This installs Node.js 20, PostgreSQL 16, Caddy, PM2, and configures the environment

set -euo pipefail

echo "========================================="
echo "Portfolio Backend - VPS Initial Setup"
echo "========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run as root (use 'sudo bash vps-setup.sh')"
  exit 1
fi

echo "📦 Updating system packages..."
apt-get update -qq
apt-get upgrade -y -qq

echo ""
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
echo "✓ Node.js $(node --version) installed"

echo ""
echo "📦 Installing PostgreSQL 16..."
apt-get install -y postgresql-16 postgresql-contrib-16
systemctl enable postgresql
systemctl start postgresql
echo "✓ PostgreSQL 16 installed"

echo ""
echo "📦 Installing PM2 (process manager)..."
npm install -g pm2
pm2 startup systemd -u root --hp /root
echo "✓ PM2 installed"

echo ""
echo "📦 Installing Caddy (web server)..."
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -qq
apt-get install -y caddy
systemctl enable caddy
echo "✓ Caddy installed"

echo ""
echo "🗄️  Setting up PostgreSQL database..."
DB_NAME="portfolio_db"
DB_USER="portfolio"
DB_PASSWORD=$(openssl rand -base64 32)

# Create database user and database
sudo -u postgres psql << EOF
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = '$DB_USER') THEN
    CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
  END IF;
END
\$\$;

SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USER' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

echo "✓ Database $DB_NAME created"
echo ""
echo "📝 Database credentials:"
echo "  DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
echo ""
echo "⚠️  SAVE THESE CREDENTIALS - You'll need them for .env configuration"

echo ""
echo "📁 Creating application directory..."
mkdir -p /opt/portfolio-api
cd /opt/portfolio-api

echo ""
echo "🔐 Generating API key..."
API_KEY=$(openssl rand -base64 48)
echo "  API_KEY=$API_KEY"
echo ""
echo "⚠️  SAVE THIS API KEY - You'll need it for admin authentication"

echo ""
echo "📝 Creating .env file template..."
cat > .env << EOF
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME
API_KEY=$API_KEY
CORS_ORIGIN=https://daniel-granda.com
CONTACT_EMAIL=contact@daniel-granda.com
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE_MB=10
EOF

echo "✓ .env file created at /opt/portfolio-api/.env"

echo ""
echo "📁 Creating uploads directory..."
mkdir -p /opt/portfolio-api/uploads
chmod 755 /opt/portfolio-api/uploads

echo ""
echo "🌐 Configuring Caddy..."
cat > /etc/caddy/Caddyfile << 'EOF'
api.daniel-granda.com {
    reverse_proxy localhost:4000
    encode gzip

    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
        -Server
    }

    # Logging
    log {
        output file /var/log/caddy/api-access.log
        format json
    }
}
EOF

systemctl reload caddy
echo "✓ Caddy configured for api.daniel-granda.com"

echo ""
echo "========================================="
echo "✓ VPS Setup Complete!"
echo "========================================="
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Configure DNS (A record):"
echo "   api.daniel-granda.com → $(curl -s ifconfig.me)"
echo ""
echo "2. Clone your repository:"
echo "   cd /opt/portfolio-api"
echo "   git clone YOUR_REPO_URL ."
echo ""
echo "3. Install dependencies:"
echo "   npm ci --production"
echo ""
echo "4. Run migrations:"
echo "   npm run migrate"
echo ""
echo "5. Seed database:"
echo "   npm run seed"
echo ""
echo "6. Start application:"
echo "   pm2 start dist/index.js --name portfolio-api"
echo "   pm2 save"
echo ""
echo "7. Test deployment:"
echo "   curl https://api.daniel-granda.com/api/health"
echo ""
echo "🔐 Save these credentials securely:"
echo "  DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
echo "  API_KEY=$API_KEY"
echo ""
