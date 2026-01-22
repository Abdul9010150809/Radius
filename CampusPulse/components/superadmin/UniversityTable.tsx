"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Search, ArrowUpDown } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { PlanBadge } from "@/components/common/PlanBadge"
import { cn } from "@/lib/utils"

export function UniversityTable() {
  const { tenants, toggleTenantSubscription } = useAppStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<'name' | 'users' | 'created'>('name')

  const filteredTenants = tenants
    .filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'users') return b.activeUsers - a.activeUsers
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search universities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl border-slate-800 bg-slate-900/70 pl-10 text-slate-100"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-slate-800 bg-slate-900/70">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort: {sortBy}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
            <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('users')}>Users</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('created')}>Created Date</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">University</TableHead>
              <TableHead className="text-slate-300">Plan</TableHead>
              <TableHead className="text-slate-300">Active Users</TableHead>
              <TableHead className="text-slate-300">Seats Used</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Subscription</TableHead>
              <TableHead className="text-slate-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id} className="border-slate-800 hover:bg-slate-800/30">
                <TableCell>
                  <div>
                    <div className="font-medium text-white">{tenant.name}</div>
                    <div className="text-xs text-slate-400">{tenant.slug}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <PlanBadge plan={tenant.plan.name} size="sm" />
                </TableCell>
                <TableCell className="text-slate-200">
                  {tenant.activeUsers.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200">
                      {tenant.usage.seatsUsed}/{tenant.plan.seats}
                    </span>
                    <div className={cn(
                      "h-2 w-20 rounded-full bg-slate-800",
                      "overflow-hidden"
                    )}>
                      <div
                        className={cn(
                          "h-full transition-all",
                          tenant.usage.seatsUsed / tenant.plan.seats > 0.8
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        )}
                        style={{
                          width: `${Math.min(100, (tenant.usage.seatsUsed / tenant.plan.seats) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      tenant.subscriptionStatus === 'active'
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                        : tenant.subscriptionStatus === 'trial'
                        ? 'border-amber-500/60 bg-amber-500/10 text-amber-200'
                        : 'border-slate-500/60 bg-slate-500/10 text-slate-200'
                    )}
                  >
                    {tenant.subscriptionStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={tenant.subscriptionStatus === 'active'}
                      onCheckedChange={() => toggleTenantSubscription(tenant.id)}
                    />
                    <span className="text-xs text-slate-400">
                      {tenant.subscriptionStatus === 'active' ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                      <DropdownMenuItem>Billing History</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400">Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
