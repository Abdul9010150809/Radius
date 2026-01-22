"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore, type UserRole } from "@/lib/store"
import { ShieldCheck, UserCircle, Users, Eye } from "lucide-react"

export function RoleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { userRole, setUserRole } = useAppStore()

  const roles: { value: UserRole; label: string; icon: React.ReactNode }[] = [
    { value: 'superadmin', label: 'Super', icon: <ShieldCheck className="h-3 w-3" /> },
    { value: 'admin', label: 'Admin', icon: <Users className="h-3 w-3" /> },
    { value: 'student', label: 'Student', icon: <UserCircle className="h-3 w-3" /> },
    { value: 'public', label: 'Public', icon: <Eye className="h-3 w-3" /> },
  ]

  const handleSwitch = (role: UserRole) => {
    setUserRole(role)
    // Navigate to appropriate dashboard
    if (role === 'superadmin') router.push('/superadmin')
    else if (role === 'admin') router.push('/admin')
    else if (role === 'student') router.push('/student')
    else if (role === 'public') router.push('/public')
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 p-1 text-xs text-slate-200 shadow-inner">
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => handleSwitch(role.value)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full transition",
            userRole === role.value
              ? "bg-indigo-500 text-white shadow"
              : "hover:bg-slate-800"
          )}
        >
          {role.icon}
          <span>{role.label}</span>
        </button>
      ))}
    </div>
  )
}
