# Deployment Guide

This guide provides instructions for deploying MedAI to various platforms.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended for Frontend)](#vercel)
  - [Netlify](#netlify)
  - [Docker](#docker)
  - [Traditional Server](#traditional-server)
- [Database Setup](#database-setup)
- [Backend Deployment](#backend-deployment)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] Supabase project created
- [ ] MongoDB instance (local or cloud)
- [ ] Google Maps API key
- [ ] All environment variables configured
- [ ] Domain name (optional but recommended)
- [ ] SSL certificate (handled by platforms)

---

## Environment Variables

### Production Environment Variables

Create production environment variables in your deployment platform:

**Frontend (Vercel/Netlify):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_GOOGLE_MAPS_API_KEY=your_production_maps_key
VITE_API_BASE_URL=https://api.medai.app
VITE_APP_ENVIRONMENT=production
```

**Backend:**
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://medai.app
```

⚠️ **Never commit production secrets to Git!**

---

## Deployment Platforms

### Vercel

**Best for: Frontend deployment**

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy

```bash
# From project root
vercel

# For production
vercel --prod
```

#### 4. Configure via Dashboard

1. Go to [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Configure environment variables in Settings
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

**vercel.json already configured in project**

---

### Netlify

**Alternative for: Frontend deployment**

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Login to Netlify

```bash
netlify login
```

#### 3. Initialize and Deploy

```bash
# Initialize
netlify init

# Deploy
netlify deploy --prod
```

#### 4. Configure via Dashboard

1. Go to [netlify.com](https://netlify.com/)
2. Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

**netlify.toml already configured in project**

---

### Docker

**Best for: Full-stack deployment**

#### 1. Build Docker Image

```bash
# Build frontend
docker build -t medai-frontend .

# Build backend
cd backend-modules
docker build -t medai-backend .
```

#### 2. Run with Docker Compose

```bash
docker-compose up -d
```

#### 3. Access Application

- Frontend: http://localhost:8080
- Backend: http://localhost:3000

#### 4. Production Docker Setup

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    image: medai-frontend:latest
    ports:
      - "80:80"
      - "443:443"
    env_file:
      - .env.production
    restart: always

  backend:
    image: medai-backend:latest
    ports:
      - "3000:3000"
    env_file:
      - backend-modules/.env.production
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - frontend
      - backend
    restart: always
```

---

### Traditional Server (VPS)

**For: Self-hosted deployment on DigitalOcean, AWS EC2, etc.**

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### 2. Clone and Setup

```bash
# Clone repository
git clone https://github.com/AnshXGrind/Medai-new.git
cd Medai-new

# Install dependencies
npm install

# Build frontend
npm run build

# Setup backend
cd backend-modules
npm install
```

#### 3. Configure Nginx

```nginx
# /etc/nginx/sites-available/medai
server {
    listen 80;
    server_name medai.app www.medai.app;
    
    # Frontend
    location / {
        root /var/www/medai/dist;
        try_files $uri /index.html;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/medai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d medai.app -d www.medai.app
```

#### 5. Start Backend with PM2

```bash
cd backend-modules
pm2 start server.js --name medai-backend
pm2 startup
pm2 save
```

---

## Database Setup

### Supabase

1. **Create Project**
   - Go to [supabase.com](https://supabase.com/)
   - Create new project
   - Wait for provisioning (~2 minutes)

2. **Apply Migrations**
   
   ```bash
   # Using Supabase CLI
   supabase db push
   
   # Or manually
   # Copy SQL from supabase/migrations/*.sql
   # Run in Supabase SQL Editor
   ```

3. **Configure RLS Policies**
   
   Run all migration scripts in `supabase/migrations/`

4. **Get Credentials**
   
   - Project URL
   - Anon/Public Key
   - Service Role Key (keep secret!)

### MongoDB (for Backend Modules)

**Option 1: MongoDB Atlas (Cloud)**

1. Create cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IP addresses
4. Get connection string

**Option 2: Self-Hosted**

```bash
# Install MongoDB
sudo apt install mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Connection string
mongodb://localhost:27017/medai-modules
```

---

## Backend Deployment

### Option 1: Render.com

1. Go to [render.com](https://render.com/)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build command: `cd backend-modules && npm install`
   - Start command: `cd backend-modules && node server.js`
   - Add environment variables

### Option 2: Railway.app

1. Go to [railway.app](https://railway.app/)
2. New Project from GitHub
3. Add variables
4. Deploy automatically

### Option 3: Heroku

```bash
# Login
heroku login

# Create app
heroku create medai-backend

# Add environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_uri

# Deploy
git push heroku main
```

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Check frontend
curl https://medai.app

# Check backend
curl https://api.medai.app/api/health

# Check database connectivity
# Login to app and create test account
```

### 2. Monitor Application

- Set up error tracking (Sentry)
- Configure logging
- Set up uptime monitoring
- Configure alerts

### 3. Performance Optimization

- Enable CDN (Cloudflare)
- Configure caching headers
- Optimize images
- Enable compression

### 4. Security Hardening

- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set security headers
- [ ] Configure CSP (Content Security Policy)
- [ ] Regular security audits

---

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### API Connection Issues

- Check CORS configuration
- Verify environment variables
- Check network/firewall rules
- Verify SSL certificates

### Database Connection Issues

- Check connection string
- Verify IP whitelist
- Check credentials
- Test with MongoDB Compass

---

## Rollback Procedure

### Vercel

```bash
vercel rollback
```

### Docker

```bash
docker-compose down
docker-compose up -d --force-recreate
```

### PM2

```bash
pm2 restart medai-backend
# Or
pm2 reload medai-backend --update-env
```

---

## Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

---

## Support

For deployment issues:
- Check [Documentation](../docs/README.md)
- Create [GitHub Issue](https://github.com/AnshXGrind/Medai-new/issues)
- Email: devops@medai.com

---

**Last Updated:** February 14, 2026
