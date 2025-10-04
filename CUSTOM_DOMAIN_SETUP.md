# Custom Domain Setup Guide for PrepAI

## Overview
This guide will help you connect your own custom domain to your PrepAI platform.

---

## Option 1: Using Vercel (Recommended)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your repository: `anobi1730333/prepai`
5. Configure environment variables (see below)
6. Click "Deploy"

### Step 2: Add Custom Domain
1. Go to your project settings in Vercel
2. Click on "Domains"
3. Enter your custom domain (e.g., `prepai.com` or `www.prepai.com`)
4. Vercel will provide DNS records

### Step 3: Configure DNS
Add these records to your domain registrar:

**For root domain (prepai.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Wait for DNS Propagation
- Usually takes 5-30 minutes
- Can take up to 48 hours in some cases
- Check status at: https://www.whatsmydns.net/

---

## Option 2: Using Netlify

### Step 1: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
6. Add environment variables
7. Click "Deploy"

### Step 2: Add Custom Domain
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions

---

## Option 3: Using Your Own Server (VPS/Dedicated)

### Requirements
- Ubuntu 20.04+ or similar Linux server
- Node.js 18+ installed
- Nginx installed
- SSL certificate (Let's Encrypt recommended)

### Step 1: Clone Repository
```bash
cd /var/www
git clone https://github.com/anobi1730333/prepai.git
cd prepai
```

### Step 2: Install Dependencies
```bash
bun install
```

### Step 3: Configure Environment Variables
```bash
nano .env.production
```

Add all required environment variables (see below)

### Step 4: Build Application
```bash
bun run build
```

### Step 5: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/prepai
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/prepai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Install SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 7: Start Application with PM2
```bash
npm install -g pm2
pm2 start bun --name prepai -- run start
pm2 save
pm2 startup
```

---

## Required Environment Variables

Create a `.env.production` file with these variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/prepai

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (optional)
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Node Environment
NODE_ENV=production
```

---

## DNS Configuration Examples

### For Namecheap:
1. Login to Namecheap
2. Go to Domain List → Manage
3. Click "Advanced DNS"
4. Add the records provided by your hosting platform

### For GoDaddy:
1. Login to GoDaddy
2. Go to My Products → DNS
3. Add the A and CNAME records

### For Cloudflare:
1. Login to Cloudflare
2. Select your domain
3. Go to DNS settings
4. Add the records
5. Set SSL/TLS to "Full (strict)"

---

## Testing Your Domain

After DNS propagation, test your domain:

1. **Check DNS:**
   ```bash
   nslookup yourdomain.com
   ```

2. **Check SSL:**
   ```bash
   curl -I https://yourdomain.com
   ```

3. **Test in Browser:**
   - Visit https://yourdomain.com
   - Check for SSL padlock
   - Test all features

---

## Troubleshooting

### Domain not resolving
- Wait for DNS propagation (up to 48 hours)
- Clear your DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Check DNS records at whatsmydns.net

### SSL Certificate Issues
- Ensure DNS is properly configured
- Run certbot again: `sudo certbot --nginx`
- Check certificate expiry: `sudo certbot certificates`

### Application not loading
- Check if server is running: `pm2 status`
- Check logs: `pm2 logs prepai`
- Verify environment variables
- Check Nginx configuration: `sudo nginx -t`

---

## Security Checklist

Before going live:

- [ ] SSL certificate installed and working
- [ ] Environment variables secured
- [ ] Database credentials strong and unique
- [ ] Firewall configured (only ports 80, 443, 22 open)
- [ ] Regular backups configured
- [ ] Update crypto wallet addresses in code
- [ ] Test all payment flows
- [ ] Set up monitoring (UptimeRobot, etc.)

---

## Maintenance

### Update Application
```bash
cd /var/www/prepai
git pull origin main
bun install
bun run build
pm2 restart prepai
```

### Backup Database
```bash
pg_dump prepai > backup_$(date +%Y%m%d).sql
```

### Monitor Logs
```bash
pm2 logs prepai
tail -f /var/log/nginx/error.log
```

---

## Support

If you need help:
- Email: samuelmarks222@gmail.com
- GitHub Issues: https://github.com/anobi1730333/prepai/issues

---

**Your PrepAI platform is ready to go live! 🚀**
