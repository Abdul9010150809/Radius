import { create } from 'zustand'

export type UserRole = 'admin' | 'student'

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
  
  // Actions
  setUserRole: (role: UserRole) => void
  setCurrentUser: (user: User | null) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleDarkMode: () => void
}

// Default users for demo
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

export const useAppStore = create<AppState>((set) => ({
  userRole: 'admin',
  currentUser: DEFAULT_ADMIN,
  sidebarOpen: true,
  darkMode: true,

  setUserRole: (role) => set((state) => ({
    userRole: role,
    currentUser: role === 'admin' ? DEFAULT_ADMIN : DEFAULT_STUDENT
  })),
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}))

