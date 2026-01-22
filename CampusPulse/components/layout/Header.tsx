"use client"

import React from "react"
import { motion } from "framer-motion"
import { Bell, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { RoleSwitcher } from "./RoleSwitcher"
import { ThemeToggle } from "./ThemeToggle"
import { OrgSwitcher } from "./OrgSwitcher"

export function Header() {
  const { currentUser } = useAppStore()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6"
    >
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search events, students, teams..."
            className="w-80 rounded-xl border-slate-800 bg-slate-900/70 pl-10 text-slate-100 placeholder:text-slate-500"
          />
        </div>
        <Button variant="outline" className="hidden border-indigo-500/40 bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/20 md:flex">
          <Sparkles className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <OrgSwitcher />
        <RoleSwitcher />

        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-10 w-10 text-slate-200">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
            3
          </span>
        </Button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>
              {currentUser?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">{currentUser?.name}</p>
            <p className="text-xs text-slate-400">{currentUser?.department}</p>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

