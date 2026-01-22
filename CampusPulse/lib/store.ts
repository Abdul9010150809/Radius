import { create } from 'zustand'

export type UserRole = 'superadmin' | 'admin' | 'student' | 'public'

export type BillingPlan = {
  id: string
  name: 'Free' | 'Team' | 'Enterprise'
  seats: number
  pricePerSeat: number
  overagePerUnit: number
  features: string[]
}

export type UsageMeter = {
  monthlyActiveUsers: number
  eventsTracked: number
  scans: number
  seatsUsed: number
}

export type Tenant = {
  id: string
  name: string
  slug: string
  plan: BillingPlan
  usage: UsageMeter
  billingEmail: string
  subscriptionStatus: 'active' | 'inactive' | 'trial'
  createdAt: string
  activeUsers: number
}

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  department?: string
  year?: string
  skills?: string[]
  bio?: string
}

interface AppState {
  userRole: UserRole
  currentUser: User | null
  sidebarOpen: boolean
  darkMode: boolean
  tenants: Tenant[]
  activeTenantId: string
  
  // Actions
  setUserRole: (role: UserRole) => void
  setCurrentUser: (user: User | null) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleDarkMode: () => void
  setActiveTenant: (id: string) => void
  toggleTenantSubscription: (tenantId: string) => void
}

// Default users for demo
const DEFAULT_SUPERADMIN: User = {
  id: 'superadmin-1',
  name: 'Jordan Ellis',
  email: 'jordan@campuspulse.io',
  role: 'superadmin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
  department: 'CampusPulse Platform',
  year: 'Platform Owner',
}

const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  name: 'Sarah Chen',
  email: 'admin@university.edu',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  department: 'Administration',
  year: 'Staff',
}

const DEFAULT_STUDENT: User = {
  id: 'student-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  role: 'student',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  department: 'Computer Science',
  year: 'Junior',
  skills: ['React', 'Node.js', 'UI/UX'],
  bio: 'Passionate about building innovative solutions',
}

const BILLING_PLANS: Record<string, BillingPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    seats: 5,
    pricePerSeat: 0,
    overagePerUnit: 0,
    features: ['Basic analytics', 'Community support'],
  },
  team: {
    id: 'team',
    name: 'Team',
    seats: 25,
    pricePerSeat: 19,
    overagePerUnit: 5,
    features: ['Advanced analytics', 'Role-based access', 'Email support'],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    seats: 250,
    pricePerSeat: 49,
    overagePerUnit: 8,
    features: ['SSO (SAML/OIDC)', 'Audit logs', 'Dedicated CSM'],
  },
}

const DEFAULT_TENANTS: Tenant[] = [
  {
    id: 'org-campus',
    name: 'Northstar University',
    slug: 'northstar',
    plan: BILLING_PLANS.team,
    usage: {
      monthlyActiveUsers: 1480,
      eventsTracked: 320,
      scans: 12850,
      seatsUsed: 18,
    },
    billingEmail: 'billing@northstar.edu',
    subscriptionStatus: 'active',
    createdAt: '2023-09-15',
    activeUsers: 1480,
  },
  {
    id: 'org-eduplus',
    name: 'EduPlus Consortium',
    slug: 'eduplus',
    plan: BILLING_PLANS.enterprise,
    usage: {
      monthlyActiveUsers: 4020,
      eventsTracked: 910,
      scans: 45800,
      seatsUsed: 143,
    },
    billingEmail: 'finance@eduplus.org',
    subscriptionStatus: 'active',
    createdAt: '2023-06-22',
    activeUsers: 4020,
  },
  {
    id: 'org-freeuni',
    name: 'Community College East',
    slug: 'cce',
    plan: BILLING_PLANS.free,
    usage: {
      monthlyActiveUsers: 45,
      eventsTracked: 8,
      scans: 150,
      seatsUsed: 3,
    },
    billingEmail: 'admin@cce.edu',
    subscriptionStatus: 'active',
    createdAt: '2024-01-10',
    activeUsers: 45,
  },
]

export const useAppStore = create<AppState>((set) => ({
  userRole: 'admin',
  currentUser: DEFAULT_ADMIN,
  sidebarOpen: true,
  darkMode: true,
  tenants: DEFAULT_TENANTS,
  activeTenantId: DEFAULT_TENANTS[0].id,

  setUserRole: (role) => set((state) => ({
    userRole: role,
    currentUser: role === 'superadmin' ? DEFAULT_SUPERADMIN : role === 'admin' ? DEFAULT_ADMIN : DEFAULT_STUDENT
  })),
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  setActiveTenant: (id) => set({ activeTenantId: id }),

  toggleTenantSubscription: (tenantId) => set((state) => ({
    tenants: state.tenants.map((t) =>
      t.id === tenantId
        ? {
            ...t,
            subscriptionStatus: t.subscriptionStatus === 'active' ? 'inactive' : 'active',
          }
        : t
    ),
  })),
}))

