# CampusPulse - B2B SaaS Platform

Enterprise-grade event management and student engagement platform for universities.

## 🎯 Features

### Multi-Role Access Control
- **Super Admin** - Platform owner managing all university subscriptions
- **University Admin** - Access to premium features (Team/Enterprise plans)
- **Student** - Event discovery, team recruitment, digital portfolio
- **Public** - Browse-only mode for visitors

### Subscription-Based Features

#### Free Plan
- Basic event discovery
- Up to 5 users
- Community support
- Basic analytics

#### Team Plan ($19/user/month)
- Smart QR Attendance System
- Team Recruitment Board
- Advanced Analytics
- Live Check-in Feed
- Email support
- Up to 25 users

#### Enterprise Plan ($49/user/month)
- Everything in Team
- SSO (SAML/OIDC)
- Audit logs
- Dedicated CSM
- Custom integrations
- Up to 250 users

## 🚀 Getting Started

```bash
cd CampusPulse
npm install
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
CampusPulse/
├── app/
│   ├── superadmin/        # Super Admin dashboard
│   ├── admin/             # University Admin dashboard
│   ├── student/           # Student portal
│   ├── public/            # Public browse mode
│   └── landing/           # Marketing landing page
├── components/
│   ├── superadmin/        # Platform management components
│   ├── admin/             # Admin features (attendance, analytics)
│   ├── student/           # Student features (events, teams)
│   ├── common/            # Shared components (LockedFeature, PlanBadge)
│   ├── layout/            # Sidebar, Header, RoleSwitcher
│   └── ui/                # shadcn/ui components
└── lib/
    ├── store.ts           # Zustand state management
    └── constants.ts       # Mock data and configuration
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v3
- **State**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **QR Scanning**: html5-qrcode

## 🔐 Role Switching

Use the role switcher in the header to preview different user experiences:
- Switch between Super Admin, Admin, Student, and Public roles
- Each role has different permissions and feature access
- Subscription status affects available features

## 💳 Subscription Enforcement

Features are locked based on the university's subscription plan:
- Lock icons and upgrade prompts for restricted features
- Visual badges showing plan requirements
- Disabled state overlays for free tier users
- Inline banners encouraging upgrades

## 🏢 Multi-Tenant Architecture

- Organization switcher in header
- Separate usage tracking per university
- Subscription management for Super Admin
- Toggle university access on/off

## 🎯 Key Dashboards

### Super Admin Dashboard (`/superadmin`)
- Platform-wide metrics (MRR, users, universities)
- University subscription management table
- Revenue growth charts
- Platform health monitoring
- Toggle university subscriptions

### University Admin Dashboard (`/admin`)
- KPI cards (events, attendance, engagement)
- Smart QR Attendance System (Team+)
- Live check-in feed (Team+)
- Advanced analytics charts (Team+)
- SSO configuration (Enterprise)

### Student Portal (`/student`)
- Event discovery (all users)
- Team recruitment board (Team+)
- Digital portfolio (Team+)
- Certifications and skills

### Public Mode (`/public`)
- Browse events only
- Limited access indicators
- Prompts to sign in

## 📊 Mock Data

The app includes comprehensive mock data in `lib/constants.ts`:
- 3 sample universities (Free, Team, Enterprise)
- 6 events across categories
- 4 team recruitment posts
- Analytics data by department
- Live check-in feed
- User profiles and certifications

## 🎨 Design System

- **Primary**: Indigo-500 (#6366f1)
- **Success**: Emerald-500 (#10b981)
- **Warning**: Amber-500 (#f59e0b)
- **Background**: Slate-950 (#0f172a)
- **Surface**: Slate-900 (#1e293b)
- **Theme**: Dark mode first, enterprise-grade aesthetic

## 🚧 Future Enhancements

- Real backend integration
- Payment processing (Stripe)
- Email notifications
- Advanced team matching algorithms
- Mobile app (React Native)
- Analytics export
- Custom branding per university

## 📝 License

Proprietary - CampusPulse Platform
