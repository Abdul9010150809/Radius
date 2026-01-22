"use client"

import { useMemo } from "react"
import { EventDiscovery } from "@/components/student/EventDiscovery"
import { TeamMatch } from "@/components/student/TeamMatch"
import { ProfileView } from "@/components/common/ProfileView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LockedFeature, LockedFeatureInline } from "@/components/common/LockedFeature"
import { useAppStore } from "@/lib/store"
import { AppShell } from "@/components/layout/AppShell"

export default function StudentPage() {
  const { tenants, activeTenantId } = useAppStore()
  const activeTenant = useMemo(
    () => tenants.find((t) => t.id === activeTenantId) ?? tenants[0],
    [tenants, activeTenantId]
  )

  const isPremium = activeTenant.plan.name !== "Free"

  return (
    <AppShell title="Discover" subtitle="Find events and teams on your campus">
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
            {isPremium ? (
              <TeamMatch />
            ) : (
              <div className="space-y-4">
                <LockedFeatureInline featureName="Team Recruitment" requiredPlan="Team" />
                <LockedFeature featureName="Team Recruitment Board" requiredPlan="Team" onUpgrade={() => alert("Contact your university admin to upgrade")}>
                  <TeamMatch />
                </LockedFeature>
              </div>
            )}
          </TabsContent>
          <TabsContent value="profile">
            {isPremium ? (
              <ProfileView />
            ) : (
              <div className="space-y-4">
                <LockedFeatureInline featureName="Digital Portfolio" requiredPlan="Team" />
                <LockedFeature featureName="Student Digital Portfolio" requiredPlan="Team" onUpgrade={() => alert("Contact your university admin to upgrade")}>
                  <ProfileView />
                </LockedFeature>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </AppShell>
  )
}