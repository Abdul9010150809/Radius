"use client"

import { motion } from "framer-motion"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Dashboard } from "@/components/admin/Dashboard"
import { AttendanceScanner } from "@/components/admin/AttendanceScanner"
import { LiveFeed } from "@/components/admin/LiveFeed"
import { AnalyticsView } from "@/components/admin/Analytics"
import { BillingUsage } from "@/components/billing/BillingUsage"
import { BillingChips } from "@/components/billing/BillingChips"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"

export default function AdminPage() {
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
            <div className="mb-3">
              <BillingChips />
            </div>
            <div className="mb-6">
              <BillingUsage />
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full max-w-[800px] grid-cols-5">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="live">Live Feed</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="dashboard">
                  <Dashboard />
                </TabsContent>
                <TabsContent value="attendance">
                  <AttendanceScanner />
                </TabsContent>
                <TabsContent value="live">
                  <LiveFeed />
                </TabsContent>
                <TabsContent value="analytics">
                  <AnalyticsView />
                </TabsContent>
                <TabsContent value="settings">
                  <SettingsView />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs defaultValue="sso" className="w-full">
        <TabsList className="grid w-full max-w-[1000px] grid-cols-6">
          <TabsTrigger value="org">Org</TabsTrigger>
          <TabsTrigger value="sso">SSO</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="org">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Organization Hierarchy</h3>
                <p className="text-sm text-muted-foreground">Manage organization structure and workspaces.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sso">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Single Sign-On (SSO)</h3>
                <p className="text-sm text-muted-foreground">Configure SSO with SAML or OIDC providers.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Manage authentication, permissions, and security policies.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">Manage billing information and subscription plans.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="users">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage user accounts, roles, and permissions.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="integrations">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Integrations</h3>
                <p className="text-sm text-muted-foreground">Connect with third-party services and APIs.</p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  )
}