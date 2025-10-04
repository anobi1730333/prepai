# PrepAI - Complete Setup Instructions

## 🔑 Required API Keys & Configuration

This application requires several API keys and credentials to function fully. Below are detailed instructions for obtaining each one.

---

## 1. OpenAI API Key (REQUIRED)

The OpenAI API is essential for all AI features including Q&A, practice questions, homework help, and speaking evaluation.

### How to Get Your OpenAI API Key:

1. Go to [https://platform.openai.com/signup](https://platform.openai.com/signup)
2. Create an account or sign in
3. Navigate to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key (it starts with `sk-`)
6. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

### Pricing:
- GPT-4o: ~$5 per 1M input tokens, ~$15 per 1M output tokens
- Whisper: ~$0.006 per minute of audio
- Estimated cost: $50-200/month for 2,000 active users

---

## 2. NextAuth Secret (REQUIRED)

Used for securing authentication sessions.

### Generate a Secret:

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add to `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret-here
```

---

## 3. Google OAuth (Optional - for "Sign in with Google")

### Setup Steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - User Type: External
   - App name: PrepAI
   - Support email: your email
   - Authorized domains: your domain
6. Create OAuth Client ID:
   - Application type: Web application
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret

Add to `.env.local`:
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## 4. Facebook OAuth (Optional - for "Sign in with Facebook")

### Setup Steps:

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Configure OAuth redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook` (development)
   - `https://yourdomain.com/api/auth/callback/facebook` (production)
5. Get App ID and App Secret from Settings → Basic

Add to `.env.local`:
```
FACEBOOK_CLIENT_ID=your-app-id
FACEBOOK_CLIENT_SECRET=your-app-secret
```

---

## 5. Stripe (Optional - for Payment Processing)

### Setup Steps:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create an account
3. Get API keys from Developers → API keys
4. For webhooks:
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook signing secret

Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_your-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Create Products in Stripe:

1. Go to Products → Add Product
2. Create "PrepAI Premium" product
3. Set price: $15/month (recurring)
4. Copy Price ID for your code

---

## 6. PostgreSQL Database (REQUIRED)

### Local Setup:

```bash
# Install PostgreSQL (if not installed)
# macOS
brew install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql

# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start   # Linux

# Create database
createdb prepai_db

# Update .env.local
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prepai_db
```

### Production Options:

**Option 1: Supabase (Recommended)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Update `DATABASE_URL` in production environment

**Option 2: AWS RDS**
1. Create PostgreSQL instance in AWS RDS
2. Configure security groups
3. Get connection string
4. Update `DATABASE_URL`

**Option 3: Railway**
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string
4. Update `DATABASE_URL`

---

## 📋 Complete .env.local Template

```env
# ============================================
# DATABASE (REQUIRED)
# ============================================
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prepai_db

# ============================================
# NEXTAUTH (REQUIRED)
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# ============================================
# OPENAI (REQUIRED)
# ============================================
OPENAI_API_KEY=sk-your-openai-api-key-here

# ============================================
# OAUTH PROVIDERS (OPTIONAL)
# ============================================
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret

# ============================================
# STRIPE (OPTIONAL - for payments)
# ============================================
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Quick Start (Minimum Setup)

To get started quickly with just the essential features:

1. **OpenAI API Key** (REQUIRED)
2. **NextAuth Secret** (REQUIRED)
3. **PostgreSQL Database** (REQUIRED)

With just these three, you can:
- ✅ Create accounts with email/password
- ✅ Use AI Q&A tutor
- ✅ Generate practice questions
- ✅ Get homework assistance
- ✅ Track progress

Optional features require:
- Google/Facebook OAuth → Social login
- Stripe → Payment processing

---

## 🔧 Installation Steps

```bash
# 1. Install dependencies
bun install

# 2. Create .env.local file with your keys
cp .env.local.example .env.local
# Edit .env.local with your actual keys

# 3. Setup database
createdb prepai_db
bun run drizzle-kit push

# 4. Run development server
bun run dev

# 5. Open browser
# http://localhost:3000
```

---

## ✅ Verification Checklist

After setup, verify each feature:

- [ ] Landing page loads at http://localhost:3000
- [ ] Sign up with email/password works
- [ ] Sign in with email/password works
- [ ] Dashboard loads after login
- [ ] AI Tutor responds to questions (requires OpenAI key)
- [ ] Practice questions generate (requires OpenAI key)
- [ ] Homework assistance works (requires OpenAI key)
- [ ] Google login works (if configured)
- [ ] Facebook login works (if configured)
- [ ] Payment flow works (if Stripe configured)

---

## 🐛 Troubleshooting

### "OpenAI API key not found"
- Check `.env.local` has `OPENAI_API_KEY=sk-...`
- Restart dev server after adding key

### "Database connection failed"
- Ensure PostgreSQL is running
- Check `DATABASE_URL` is correct
- Run `createdb prepai_db` if database doesn't exist

### "NextAuth error"
- Generate new `NEXTAUTH_SECRET`
- Ensure `NEXTAUTH_URL` matches your domain

### "OAuth redirect mismatch"
- Check redirect URIs in Google/Facebook console
- Must match exactly: `http://localhost:3000/api/auth/callback/google`

---

## 📞 Support

If you encounter issues:
1. Check server logs: `tail -f server.log`
2. Check browser console for errors
3. Verify all required environment variables are set
4. Ensure PostgreSQL is running

---

## 🎯 Production Deployment

When deploying to production:

1. Update environment variables:
   ```
   NEXTAUTH_URL=https://yourdomain.com
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

2. Use production API keys (not test keys)

3. Update OAuth redirect URIs to production domain

4. Configure production database (Supabase/AWS RDS)

5. Set up SSL certificate

6. Enable Stripe webhook in production

---

**You're all set! 🎉**

Start building the future of AI-powered education with PrepAI.
