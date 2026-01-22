"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

export function RoleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { userRole, setUserRole } = useAppStore()

  const handleSwitch = (role: "admin" | "student") => {
    setUserRole(role)
    if (pathname.startsWith("/admin") && role === "student") {
      router.push("/student")
    }
    if (pathname.startsWith("/student") && role === "admin") {
      router.push("/admin")
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 p-1 text-xs text-slate-200 shadow-inner">
      {(["admin", "student"] as const).map((role) => (
        <button
          key={role}
          onClick={() => handleSwitch(role)}
          className={cn(
            "px-3 py-1 rounded-full transition",
            userRole === role
              ? "bg-indigo-500 text-white shadow"
              : "hover:bg-slate-800"
          )}
        >
          {role === "admin" ? "Admin" : "Student"}
        </button>
      ))}
    </div>
  )
}
