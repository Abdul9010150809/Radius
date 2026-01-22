"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { RevenueChart } from "@/components/superadmin/RevenueChart"

export default function RevenuePage() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[80px] transition-all duration-300">
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-semibold">Revenue</h1>
          <div className="mt-4">
            <RevenueChart />
          </div>
        </main>
      </div>
    </div>
  )
}
