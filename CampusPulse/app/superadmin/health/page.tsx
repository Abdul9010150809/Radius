"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[80px] transition-all duration-300">
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-semibold">Platform Health</h1>
          <p className="mt-2 text-sm text-muted-foreground">System status and health metrics.</p>
        </main>
      </div>
    </div>
  )
}
