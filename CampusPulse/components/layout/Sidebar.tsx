"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  QrCode,
  Radio,
  BarChart3,
  Users,
  Settings,
  MessageSquare,
  Compass,
  Calendar,
  Award,
  User,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { SIDEBAR_ITEMS } from "@/lib/constants"

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
  QrCode: <QrCode className="h-5 w-5" />,
  Radio: <Radio className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  Compass: <Compass className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  Award: <Award className="h-5 w-5" />,
  User: <User className="h-5 w-5" />,
}

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, userRole, toggleSidebar, tenants, activeTenantId } = useAppStore()
  const items = SIDEBAR_ITEMS[userRole]
  const activeTenant = tenants.find((t) => t.id === activeTenantId) ?? tenants[0]

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 272 : 76 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-slate-800/70 bg-slate-950/85 backdrop-blur-xl"
    >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-slate-800/70 px-4">
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200 shadow-inner">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">CampusPulse</p>
                    <p className="text-[11px] text-slate-400">RBAC Enabled</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {sidebarOpen && activeTenant && (
              <div className="mr-3 flex flex-col text-[11px] text-slate-300">
                <span className="font-semibold text-white">{activeTenant.name}</span>
                <span className="text-slate-400">{activeTenant.plan.name} · {activeTenant.usage.seatsUsed}/{activeTenant.plan.seats} seats</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-indigo-400 hover:text-white"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href} className="group relative">
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-indigo-500/15 text-indigo-100 ring-1 ring-indigo-500/40"
                        : "text-slate-300 hover:bg-slate-900/70 hover:text-white"
                    )}
                  >
                    {iconMap[item.icon]}
                    {sidebarOpen ? (
                      <span>{item.label}</span>
                    ) : (
                      <span className="pointer-events-none absolute left-12 top-2 rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-slate-800/70 px-4 py-3 text-xs text-slate-400">
            {sidebarOpen ? (
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="h-4 w-4 text-indigo-300" />
                <span className="capitalize">{userRole} access</span>
              </div>
            ) : (
              <ShieldCheck className="mx-auto h-4 w-4 text-indigo-300" />
            )}
          </div>
        </div>
      </motion.aside>
  )
}

