"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Radio, LogIn } from "lucide-react"
import { useAppStore } from "@/lib/store"

export default function Home() {
  const { userRole } = useAppStore()
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (userRole === "admin") {
      router.push("/admin")
    } else if (userRole === "student") {
      router.push("/student")
    }
  }, [userRole, router])

  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Radio className="h-8 w-8 text-primary" />
            </div>
          </div>
          <p className="text-lg font-medium">Loading CampusPulse...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Login Screen */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-8"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary mb-4">
                <Radio className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold">CampusPulse</h1>
              <p className="text-muted-foreground mt-2">
                University Event Management Platform
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => useAppStore.getState().setUserRole("admin")}
                className="group w-full flex items-center justify-between rounded-xl border bg-card p-4 transition-all hover:border-primary hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Radio className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Admin Portal</p>
                    <p className="text-sm text-muted-foreground">
                      Manage events and view analytics
                    </p>
                  </div>
                </div>
                <LogIn className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => useAppStore.getState().setUserRole("student")}
                className="group w-full flex items-center justify-between rounded-xl border bg-card p-4 transition-all hover:border-primary hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-500/10 p-2">
                    <svg
                      className="h-5 w-5 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Student Portal</p>
                    <p className="text-sm text-muted-foreground">
                      Discover events and join teams
                    </p>
                  </div>
                </div>
                <LogIn className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Select a portal to continue (Demo Mode)
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
