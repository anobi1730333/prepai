# PrepAI - AI-Powered Exam Preparation Platform

PrepAI is a comprehensive AI-powered tutoring platform designed to help students prepare for IELTS, SAT, and other standardized exams. It combines intelligent tutoring, practice questions, mock exams, speaking evaluation, and homework assistance in one unified platform.

## 🚀 Features

### Core Features

1. **AI Q&A Tutor**
   - Ask any question about Math, Reading, Writing, or Speaking
   - Get detailed, step-by-step explanations powered by GPT-4o
   - 24/7 availability with instant responses
   - Question history tracking

2. **Practice Question Generator**
   - Generate unlimited multiple-choice questions
   - Choose difficulty levels (Easy, Medium, Hard)
   - Select specific categories and exam types
   - Detailed explanations for each answer

3. **Mock Exam Simulator**
   - Timed practice tests matching real exam formats
   - SAT Math, SAT Reading, IELTS Speaking modules
   - Auto-scoring with performance breakdown
   - Review mode to analyze mistakes

4. **AI Speaking Tutor (IELTS)**
   - Record audio responses to speaking prompts
   - AI evaluation using Whisper + GPT-4o
   - Band score prediction (1-9 scale)
   - Detailed feedback on pronunciation, grammar, fluency, vocabulary, and coherence

5. **Homework Assistance** 🆕
   - Submit essays, dissertations, research papers, problem sets
   - Three assistance types:
     - **Full Completion**: AI writes the complete assignment
     - **Guidance & Outline**: Get structure and key points
     - **Review & Feedback**: Submit draft for improvement suggestions
   - Upload documents or paste text
   - Credit-based system for premium users

6. **Personalized Study Plans**
   - Input exam date, target score, and available study hours
   - AI generates week-by-week study schedule
   - Adaptive recommendations based on performance
   - Daily/weekly topic breakdown

7. **Performance Dashboard**
   - Visual progress tracking with charts
   - Identify weak areas automatically
   - Score history and trends
   - Study streak counter

## 💰 Pricing & Monetization

### Free Plan
- 5 AI questions per day
- 1 mock test per week
- Basic progress tracking
- Practice questions (unlimited)

### Premium Plan ($15/month)
- Unlimited AI questions
- 10 mock tests per month
- Full speaking evaluation with feedback
- **10 homework credits per month**
- Advanced analytics & insights
- Personalized study plans
- Priority support

### Payment Integration
- Stripe (primary payment processor)
- PayPal (alternative option)
- Automatic subscription management
- 7-day free trial for premium

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (React)
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js (Email, Google, Facebook)
- **File Storage**: Local (can be upgraded to AWS S3/Cloudflare R2)

### AI Integration
- **Primary Model**: OpenAI GPT-4o
- **Speech-to-Text**: OpenAI Whisper
- **Use Cases**: 
  - Question answering
  - Practice question generation
  - Mock exam creation
  - Speaking evaluation
  - Homework assistance

### Infrastructure
- **Hosting**: Vercel (recommended) or AWS
- **Database**: PostgreSQL (local or Supabase/AWS RDS)
- **CDN**: Cloudflare

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL database
- OpenAI API key
- (Optional) Google OAuth credentials
- (Optional) Facebook OAuth credentials
- (Optional) Stripe API keys

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prepai_db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Stripe (Optional)
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation Steps

1. **Clone and Install Dependencies**
```bash
cd prepai
bun install
```

2. **Setup Database**
```bash
# Create database
createdb -h localhost prepai_db

# Push schema to database
bun run drizzle-kit push
```

3. **Run Development Server**
```bash
bun run dev
```

4. **Access Application**
- Open http://localhost:3000
- Landing page with features and pricing
- Sign up to create an account
- Access dashboard at /dashboard

## 📱 Mobile Support

The application is fully responsive and mobile-first:
- Optimized layouts for phones and tablets
- Touch-friendly interface
- Progressive Web App (PWA) ready
- Can be wrapped with React Native for native apps

## 🗄️ Database Schema

### Key Tables
- **users**: User accounts and subscription status
- **question_history**: AI Q&A conversation history
- **practice_questions**: Generated practice questions
- **mock_exams**: Mock test sessions and results
- **speaking_evaluations**: IELTS speaking assessments
- **homework_submissions**: Homework assistance requests 🆕
- **study_plans**: Personalized study schedules
- **progress_tracking**: Performance metrics
- **subscription_credits**: Homework credit management 🆕

## 🔐 Authentication

Supports multiple authentication methods:
- Email/Password (with bcrypt hashing)
- Google OAuth
- Facebook OAuth
- Session management with JWT

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB) - Trust, learning
- **Secondary**: Green (#10B981) - Success, progress
- **Accent**: White (#FFFFFF) - Clean, modern
- **Background**: Light gray (#F9FAFB)

### Typography
- **Font**: Inter (Google Fonts)
- **Letter Spacing**: -0.01em (tight)
- **Responsive**: Scales from mobile to desktop

### Components
- Clean, minimal design inspired by Apple/Linear
- Card-based layouts
- Smooth animations and transitions
- Accessible (WCAG compliant)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables in Production
- Add all `.env.local` variables to Vercel dashboard
- Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to production domain
- Configure PostgreSQL connection string

## 📊 Scalability

The architecture supports:
- **2,000+ concurrent users** (MVP target)
- Horizontal scaling with load balancers
- Database read replicas for performance
- CDN for static assets
- Rate limiting for API protection

## 🔮 Future Expansion

Easy to add:
- GMAT, GRE, ACT exam modules
- Additional languages (i18n ready)
- Group study features
- Live tutor marketplace
- Mobile apps (iOS/Android)
- Offline mode
- Video lessons

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Core Features
- `POST /api/questions` - Ask AI tutor
- `GET /api/questions` - Get question history
- `POST /api/practice` - Generate practice question
- `GET /api/practice` - Get practice history
- `POST /api/homework` - Submit homework 🆕
- `GET /api/homework` - Get homework submissions 🆕

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT session tokens
- CSRF protection
- Rate limiting on API routes
- SQL injection prevention (Drizzle ORM)
- XSS protection
- Environment variable encryption

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Support

For support, email: support@prepai.com

## 🎯 MVP Timeline

- **Week 1-2**: Foundation (Database, Auth, API setup) ✅
- **Week 3-4**: Core Features (AI Tutor, Practice, Mock Exams) ✅
- **Week 5**: Advanced Features (Speaking, Homework, Study Plans) ✅
- **Week 6**: Polish & Launch (Testing, Deployment) ✅

## 🔧 Development Commands

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Generate database migrations
bun run drizzle-kit generate

# Push schema to database
bun run drizzle-kit push

# Open Drizzle Studio (database GUI)
bun run drizzle-kit studio
```

## 📞 Contact

For inquiries about PrepAI, please contact:
- Email: samuelmarks222@gmail.com
- Website: https://prepai.lindy.site

---

**Built with ❤️ for students worldwide**
