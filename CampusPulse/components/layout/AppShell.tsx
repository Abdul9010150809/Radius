"use client"

import React, { useId } from "react"
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
  const titleId = useId()

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <a
        href={`#${titleId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-background focus:text-foreground rounded-md"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div className={cn("transition-all duration-300", offsetClass)}>
        <Header />
        <main id={titleId} aria-labelledby={titleId} role="main" className="px-6 pb-12 pt-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 id={titleId} className="text-2xl font-semibold text-white">
                {title}
              </h1>
              {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
            </div>
            {actions}
          </div>
          <div className={cn("space-y-6")}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
