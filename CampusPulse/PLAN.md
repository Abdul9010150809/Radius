# CampusPulse SaaS Platform Implementation Plan

## Project Overview

A responsive, multi-role B2B SaaS platform for university event attendance and student team-building built with Next.js 14, Tailwind CSS, and Shadcn/UI.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide-React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Charts**: Recharts
- **QR Code**: html5-qrcode

## Design System

- **Theme**: Dark/Light mode (default: Dark)
- **Palette**:
  - Background: Slate-900
  - Primary: Indigo-500
  - Success: Emerald-500

## File Structure

```
campus-pulse/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Login page)
│   ├── globals.css
│   ├── admin/
│   │   └── page.tsx (Dashboard)
│   └── student/
│       └── page.tsx (Growth Portal)
├── components/
│   ├── ui/ (Shadcn components)
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── RoleSwitcher.tsx
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── KPICard.tsx
│   │   ├── AttendanceScanner.tsx
│   │   ├── LiveFeed.tsx
│   │   └── Analytics.tsx
│   ├── student/
│   │   ├── EventDiscovery.tsx
│   │   ├── EventCard.tsx
│   │   ├── TeamMatch.tsx
│   │   ├── RecruitmentCard.tsx
│   │   └── JoinModal.tsx
│   ├── common/
│   │   ├── ProfileView.tsx
│   │   └── Certifications.tsx
├── lib/
│   ├── store.ts (Zustand)
│   ├── utils.ts
│   └── constants.ts
├── public/
└── package.json
```

## Implementation Steps

### Step 1: Project Setup

- Initialize Next.js 14 project
- Install and configure Tailwind CSS
- Install Shadcn/UI CLI
- Install dependencies (lucide-react, framer-motion, recharts, zustand, html5-qrcode)

### Step 2: Core Components

- Create layout with Sidebar and Header
- Implement RoleSwitcher with Zustand
- Setup theme provider with dark mode default

### Step 3: Admin Module

- Build KPI cards with trend charts
- Create QR code generator with countdown
- Implement live check-in feed
- Add analytics dashboard with Recharts

### Step 4: Student Module

- Build event discovery grid
- Create team recruitment board
- Implement join request modal
- Add profile portfolio view

### Step 5: Authentication

- Create SSO login page
- Add university email validation

### Step 6: Polish & Animations

- Add Framer Motion transitions
- Ensure responsive design
- Add sorting and pagination

## Color Palette Reference

- Background: bg-slate-950
- Surface: bg-slate-900
- Primary: bg-indigo-500
- Success: text-emerald-500
- Accent: Indigo-400
