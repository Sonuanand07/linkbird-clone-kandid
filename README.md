# 🚀 Linkbird.ai CRM Platform

A modern, full-featured CRM platform built with Next.js 15, TypeScript, Supabase, and cutting-edge web technologies. This application provides comprehensive lead management and campaign tracking capabilities with a beautiful, responsive interface.

DEPLOY LINK : https://linkbird-ai-platform-ui-replication-neon.vercel.app/
## 📋 Assignment Overview

This project is built for the **Kandid - Full Stack Developer Next.js Intern Assignment**, replicating the Linkbird.ai platform's Leads and Campaigns sections with complete functionality.

## ✨ Features Implemented

### 🔐 **Complete Authentication System**
- ✅ Email/Password Authentication with Supabase Auth
- ✅ Google OAuth Integration (configurable)
- ✅ User Registration with form validation
- ✅ Protected Routes with middleware
- ✅ Session Management with Supabase
- ✅ Automatic redirects and logout functionality

### 📊 **Dashboard Overview**
- ✅ Real-time Statistics Cards (Total Leads, Active Campaigns, etc.)
- ✅ Recent Campaigns with progress indicators
- ✅ Recent Leads with status badges
- ✅ Quick Action Cards for common tasks
- ✅ Responsive design for all screen sizes

### 👥 **Advanced Leads Management**
- ✅ **Comprehensive Leads Table** with sortable columns
- ✅ **Advanced Search & Filtering** across names, emails, companies
- ✅ **Status Filters** (Pending, Contacted, Responded, Converted)
- ✅ **Clickable Lead Rows** opening detailed side sheets
- ✅ **Lead Detail Sheet** with complete information:
  - Contact details (email, phone, company, position)
  - Associated campaign information
  - Timeline and interaction history
  - Status update functionality
  - Action buttons (Email, Call)
- ✅ **Real-time Status Updates** with optimistic UI
- ✅ **Infinite Scrolling** for large datasets
- ✅ **Loading States** with skeleton UI

### 📈 **Campaign Management System**
- ✅ **Campaign Statistics Dashboard** with key metrics
- ✅ **Campaigns Table** with comprehensive information:
  - Campaign name and description
  - Status indicators (Draft, Active, Paused, Completed)
  - Progress bars showing success rates
  - Total leads and successful conversions
  - Response rate percentages
  - Creation dates
- ✅ **Interactive Actions**:
  - Play/Pause campaigns with visual feedback
  - Edit campaign details
  - Delete campaigns with confirmation dialogs
- ✅ **Status Management** with real-time updates
- ✅ **Visual Progress Indicators** and color-coded statuses

### 🎨 **Professional UI/UX**
- ✅ **Collapsible Sidebar** with state persistence
- ✅ **Breadcrumb Navigation** showing current location
- ✅ **Consistent Design System** using shadcn/ui
- ✅ **Responsive Layout** optimized for all devices
- ✅ **Loading States** and error handling
- ✅ **Smooth Animations** and micro-interactions
- ✅ **Professional Color Scheme** matching Linkbird.ai branding

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (100% coverage)
- **Database**: Supabase (PostgreSQL with real-time features)
- **Authentication**: Supabase Auth with Google OAuth
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand + TanStack Query
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier available)
- Git for version control

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd linkbird-crm
npm install
```

### 2. Supabase Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (usually 2-3 minutes)
3. Go to Settings > API to get your keys

#### Database Setup
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `lib/database/schema.sql`
3. Run the SQL to create tables and policies
4. Optionally, run `lib/database/seed.sql` for sample data

#### Authentication Setup
1. Go to Authentication > Settings in Supabase dashboard
2. Configure your site URL: `http://localhost:3000`
3. Add redirect URLs: `http://localhost:3000/auth/callback`
4. For Google OAuth (optional):
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

### 3. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Update .env with your Supabase values:
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application!

## 📁 Project Structure

```
linkbird-crm/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/            # Main dashboard page
│   │   ├── leads/                # Leads management
│   │   ├── campaigns/            # Campaign management
│   │   └── settings/             # User settings
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── campaigns/            # Campaign CRUD operations
│   │   └── leads/                # Lead management APIs
│   ├── auth/                     # Authentication pages
│   └── layout.tsx                # Root layout with providers
├── components/                   # Reusable UI components
│   ├── auth/                     # Authentication forms
│   ├── campaigns/                # Campaign components
│   ├── leads/                    # Lead management components
│   ├── layout/                   # Layout components (sidebar, header)
│   └── ui/                       # shadcn/ui base components
├── lib/                          # Utility libraries
│   ├── supabase/                 # Supabase configuration
│   ├── queries/                  # Database query functions
│   ├── stores/                   # Zustand state management
│   └── database/                 # SQL schema and seed files
├── middleware.ts                 # Route protection middleware
└── README.md                     # This file
```

## 🗃️ Database Schema

### Authentication (Supabase Auth)
- Handled automatically by Supabase
- Users table with profiles
- Session management
- OAuth providers support

### Campaigns Table
```sql
- id (uuid, primary key)
- name (text, required)
- description (text)
- status (enum: draft, active, paused, completed)
- total_leads (integer)
- successful_leads (integer)
- response_rate (decimal)
- created_by (foreign key to auth.users)
- created_at, updated_at (timestamps)
```

### Leads Table
```sql
- id (uuid, primary key)
- name (text, required)
- email (text, required)
- company (text)
- phone (text)
- position (text)
- status (enum: pending, contacted, responded, converted)
- campaign_id (foreign key to campaigns)
- notes (text)
- last_contact_date (timestamp)
- created_at, updated_at (timestamps)
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database Management (via Supabase Dashboard)
# - Use SQL Editor for schema changes
# - Use Table Editor for data management
# - Use API Docs for testing endpoints
```

## 🎯 Key Features Demonstration

### Authentication Flow
1. **Registration**: Users can create accounts with email/password
2. **Login**: Secure login with validation and error handling
3. **Google OAuth**: One-click social authentication (when configured)
4. **Protected Routes**: Automatic redirection for unauthenticated users
5. **Session Management**: Persistent login sessions with Supabase

### Leads Management
1. **Table View**: Comprehensive table with all lead information
2. **Search & Filter**: Real-time search across multiple fields
3. **Detail Sheet**: Click any lead to open detailed side panel
4. **Status Updates**: Change lead status with immediate feedback
5. **Infinite Scroll**: Smooth loading of large lead lists

### Campaign Management
1. **Overview Dashboard**: Campaign statistics and metrics
2. **Interactive Table**: Sortable columns with progress indicators
3. **Status Control**: Play/pause campaigns with visual feedback
4. **Progress Tracking**: Visual progress bars and success rates
5. **CRUD Operations**: Create, edit, and delete campaigns

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - GOOGLE_CLIENT_ID (optional)
# - GOOGLE_CLIENT_SECRET (optional)
```

### Update Supabase Settings for Production
1. Go to Authentication > Settings in Supabase
2. Add your production URL to Site URL
3. Add production callback URL: `https://yourdomain.com/auth/callback`

### Other Platforms
- **Netlify**: Configure build command and environment variables
- **Railway**: Connect GitHub repo and set environment variables
- **Render**: Deploy with environment variables

## 🔐 Security Features

- **Row Level Security**: Implemented on all tables
- **Authentication**: Supabase Auth with secure sessions
- **API Protection**: All API routes check authentication
- **CSRF Protection**: Built-in with Supabase
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: React's built-in protection

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience with touch interactions
- **Desktop**: Full-featured desktop interface
- **Adaptive Navigation**: Collapsible sidebar for all screen sizes

## 🎨 Design System

- **Color Palette**: Professional blue and gray tones
- **Typography**: Consistent font weights and sizes
- **Spacing**: 8px grid system with Tailwind
- **Components**: shadcn/ui for consistent design
- **Animations**: Smooth transitions and micro-interactions

## 🧪 Testing the Application

### Sample Data
After setting up the database with the seed file, you can:
1. **Register**: Create a new account
2. **Login**: Use your credentials
3. **Explore**: Navigate through all features

### Test Features
- Create and manage campaigns
- Add and update leads
- Use search and filtering
- Test responsive design on different devices

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   ```bash
   # Check your environment variables
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Authentication Issues**
   ```bash
   # Ensure your site URL is configured in Supabase
   # Check Authentication > Settings in Supabase dashboard
   ```

3. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Database Issues**
   ```bash
   # Check your SQL schema in Supabase SQL Editor
   # Verify RLS policies are enabled
   # Check table permissions
   ```

## 📞 Support & Questions

For questions about this implementation:
- **Email**: [Your Email]
- **GitHub Issues**: Create an issue in the repository
- **Demo Video**: [Link to your demo video]

## 🎯 Assignment Completion Checklist

### Technical Excellence ✅
- [x] Clean, well-organized TypeScript code
- [x] Proper error handling and loading states
- [x] Performance optimization with React Query
- [x] Security best practices with Supabase RLS
- [x] Comprehensive database schema

### Feature Completeness ✅
- [x] Complete authentication system with Supabase
- [x] Leads management with detail sheets
- [x] Campaign management with statistics
- [x] Real-time data updates
- [x] Search and filtering functionality

### UI/UX Quality ✅
- [x] Professional design matching requirements
- [x] Responsive layout for all devices
- [x] Smooth animations and interactions
- [x] Consistent design system
- [x] Accessibility considerations

### Code Architecture ✅
- [x] Proper separation of concerns
- [x] Reusable component structure
- [x] Scalable patterns and practices
- [x] Type safety throughout
- [x] Clean file organization

---

## 🏆 Demo & Submission

- **Live Demo**: [Your Vercel URL]
- **GitHub Repository**: [Your GitHub URL]
- **Demo Video**: [Your demo video URL]

Built with ❤️ for the Kandid Full Stack Developer Internship Assignment using Supabase for scalable, real-time functionality.

## 🔄 Migration from PostgreSQL to Supabase

This project has been migrated from a local PostgreSQL setup to Supabase for better deployment compatibility and real-time features. Key benefits:

- **No Edge Runtime Issues**: Supabase client works perfectly with Vercel
- **Real-time Updates**: Built-in real-time subscriptions
- **Authentication**: Integrated auth system with social providers
- **Row Level Security**: Database-level security policies
- **Scalability**: Managed PostgreSQL with automatic scaling
- **Dashboard**: Visual database management interface

The migration ensures the application deploys successfully on any platform while maintaining all functionality.
