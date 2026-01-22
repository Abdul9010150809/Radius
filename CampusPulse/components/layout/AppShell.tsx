"use client"

import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen)
  const offsetClass = sidebarOpen ? "ml-[272px]" : "ml-[76px]"

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className={cn("transition-all duration-300", offsetClass)}>
        <Header />
        <main className="px-6 pb-12 pt-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-white">{title}</h1>
              {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
            </div>
            {actions}
          </div>
          <div className={cn("space-y-6")}>{children}</div>
        </main>
      </div>
    </div>
  )
}
