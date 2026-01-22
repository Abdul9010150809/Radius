"use client"

import { useMemo } from "react"
import { BillingUsage } from "@/components/billing/BillingUsage"
import { BillingChips } from "@/components/billing/BillingChips"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LockedFeature } from "@/components/common/LockedFeature"
import { UpgradeBanner } from "@/components/common/UpgradeBanner"
import { Dashboard } from "@/components/admin/Dashboard"
import { AttendanceScanner } from "@/components/admin/AttendanceScanner"
import { LiveFeed } from "@/components/admin/LiveFeed"
import { AnalyticsView } from "@/components/admin/Analytics"
import { useAppStore } from "@/lib/store"
import { AppShell } from "@/components/layout/AppShell"

export default function AdminPage() {
  const { tenants, activeTenantId } = useAppStore()
  const activeTenant = useMemo(
    () => tenants.find((t) => t.id === activeTenantId) ?? tenants[0],
    [tenants, activeTenantId]
  )

  const isPremium = activeTenant.plan.name !== "Free"

  return (
    <AppShell title="Dashboard" subtitle="Admin console for events and analytics">
      <div className="mb-3">
        <BillingChips />
      </div>

      {!isPremium && (
        <div className="mb-4">
          <UpgradeBanner currentPlan={activeTenant.plan.name} onUpgrade={() => alert("Upgrade flow would open here")} />
        </div>
      )}

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
            {isPremium ? <AttendanceScanner /> : <LockedFeature featureName="Smart Attendance System" requiredPlan="Team" onUpgrade={() => alert("Upgrade flow")}>
              <AttendanceScanner />
            </LockedFeature>}
          </TabsContent>
          <TabsContent value="live">
            {isPremium ? <LiveFeed /> : <LockedFeature featureName="Live Check-in Feed" requiredPlan="Team" onUpgrade={() => alert("Upgrade flow")}>
              <LiveFeed />
            </LockedFeature>}
          </TabsContent>
          <TabsContent value="analytics">
            {isPremium ? <AnalyticsView /> : <LockedFeature featureName="Advanced Analytics" requiredPlan="Team" onUpgrade={() => alert("Upgrade flow")}>
              <AnalyticsView />
            </LockedFeature>}
          </TabsContent>
          <TabsContent value="settings">
            <SettingsView isPremium={isPremium} />
          </TabsContent>
        </div>
      </Tabs>
    </AppShell>
  )
}

function SettingsView({ isPremium }: { isPremium: boolean }) {
  return (
    <div>
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
            {!isPremium ? (
              <LockedFeature featureName="Single Sign-On (SSO)" requiredPlan="Enterprise" onUpgrade={() => alert("Upgrade to Enterprise")}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">SSO Configuration</h3>
                    <p className="text-sm text-muted-foreground">Configure SAML or OIDC</p>
                  </div>
                </div>
              </LockedFeature>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">SSO Configuration</h3>
                  <p className="text-sm text-slate-400">Configure SAML or OIDC for enterprise authentication</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="org">
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
    </div>
  )
}