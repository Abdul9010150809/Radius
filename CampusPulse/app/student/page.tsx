"use client"

import { motion } from "framer-motion"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { EventDiscovery } from "@/components/student/EventDiscovery"
import { TeamMatch } from "@/components/student/TeamMatch"
import { ProfileView } from "@/components/common/ProfileView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"

export default function StudentPage() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-[280px]" : "ml-[80px]"
        }`}
      >
        <Header />
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="grid w-full max-w-[600px] grid-cols-3">
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="teams">Team Match</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="discover">
                  <EventDiscovery />
                </TabsContent>
                <TabsContent value="teams">
                  <TeamMatch />
                </TabsContent>
                <TabsContent value="profile">
                  <ProfileView />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}