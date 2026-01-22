"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Building2, Users, DollarSign, Activity } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useMemo } from "react"

export function PlatformMetrics() {
  const { tenants } = useAppStore()

  const metrics = useMemo(() => {
    const totalUniversities = tenants.length
    const activeSubscriptions = tenants.filter(t => t.subscriptionStatus === 'active').length
    const totalUsers = tenants.reduce((sum, t) => sum + t.activeUsers, 0)
    const mrr = tenants
      .filter(t => t.subscriptionStatus === 'active')
      .reduce((sum, t) => sum + (t.plan.pricePerSeat * t.plan.seats), 0)

    return {
      totalUniversities,
      activeSubscriptions,
      totalUsers,
      mrr,
      growth: 12.5, // Mock growth percentage
    }
  }, [tenants])

  const kpis = [
    {
      label: 'Total Universities',
      value: metrics.totalUniversities,
      change: '+3',
      trend: 'up' as const,
      icon: Building2,
      color: 'text-indigo-400',
    },
    {
      label: 'Active Subscriptions',
      value: metrics.activeSubscriptions,
      change: `${metrics.activeSubscriptions}/${metrics.totalUniversities}`,
      trend: 'up' as const,
      icon: Activity,
      color: 'text-emerald-400',
    },
    {
      label: 'Total Users',
      value: metrics.totalUsers.toLocaleString(),
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-400',
    },
    {
      label: 'Monthly Revenue',
      value: `$${metrics.mrr.toLocaleString()}`,
      change: `+${metrics.growth}%`,
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-amber-400',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="border-slate-800 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              {kpi.label}
            </CardTitle>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
                {kpi.change}
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
