# Backend Local Setup Script for Windows
# Requires: PostgreSQL 18+ installed and running

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Portfolio Backend - Windows Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = & psql --version 2>&1
    Write-Host "OK PostgreSQL found: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR PostgreSQL not found!" -ForegroundColor Red
    Write-Host "Please install PostgreSQL 18: https://www.postgresql.org/download/windows/" -ForegroundColor Red
    Write-Host "After installation, add bin folder to PATH and restart PowerShell" -ForegroundColor Yellow
    exit 1
}

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "OK Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js 20+ from: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"

    # Generate a random API key
    $apiKey = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})

    # Update .env with generated key
    (Get-Content ".env") -replace 'API_KEY=.*', "API_KEY=$apiKey" | Set-Content ".env"

    Write-Host "OK .env file created" -ForegroundColor Green
    Write-Host "WARNING Review database credentials in .env if needed" -ForegroundColor Yellow
} else {
    Write-Host "OK .env file already exists" -ForegroundColor Green
}

# Load environment variables from .env
Get-Content ".env" | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}

$dbName = "portfolio_db"
$dbUser = "portfolio"
$dbPassword = "password"

# Parse DATABASE_URL if it exists
$dbUrl = $env:DATABASE_URL
if ($dbUrl -match 'postgresql://([^:]+):([^@]+)@[^/]+/(.+)') {
    $dbUser = $matches[1]
    $dbPassword = $matches[2]
    $dbName = $matches[3]
}

Write-Host ""
Write-Host "Creating PostgreSQL database..." -ForegroundColor Yellow
Write-Host "Database: $dbName" -ForegroundColor Gray
Write-Host "User: $dbUser" -ForegroundColor Gray

# Set PGPASSWORD for psql commands
$env:PGPASSWORD = "Julieta192416-"

# Create database user
$createUserSql = "DO `$`$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = '$dbUser') THEN CREATE USER $dbUser WITH PASSWORD '$dbPassword'; END IF; END `$`$;"

Write-Host "Creating user $dbUser..." -ForegroundColor Gray
echo $createUserSql | & psql -U postgres -h localhost -q 2>&1 | Out-Null

# Create database
$createDbSql = "SELECT 'CREATE DATABASE $dbName OWNER $dbUser' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$dbName')\gexec"
Write-Host "Creating database $dbName..." -ForegroundColor Gray
echo $createDbSql | & psql -U postgres -h localhost -q 2>&1 | Out-Null

Write-Host "OK Database setup complete" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "OK Dependencies installed" -ForegroundColor Green

# Run migrations
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Yellow
npm run migrate
Write-Host "OK Migrations complete" -ForegroundColor Green

# Seed database
Write-Host ""
Write-Host "Seeding database with initial data..." -ForegroundColor Yellow
npm run seed
Write-Host "OK Database seeded" -ForegroundColor Green

# Create uploads directory
if (-not (Test-Path "uploads")) {
    New-Item -ItemType Directory -Path "uploads" | Out-Null
    Write-Host "OK Uploads directory created" -ForegroundColor Green
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "OK Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Start the development server with:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "API will be available at:" -ForegroundColor Yellow
Write-Host "  http://localhost:4000" -ForegroundColor White
Write-Host ""
Write-Host "Test the API:" -ForegroundColor Yellow
Write-Host "  curl http://localhost:4000/api/health" -ForegroundColor White
Write-Host ""
