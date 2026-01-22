"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface LockedFeatureProps {
  featureName: string
  requiredPlan: 'Team' | 'Enterprise'
  children: React.ReactNode
  className?: string
  onUpgrade?: () => void
}

export function LockedFeature({ 
  featureName, 
  requiredPlan, 
  children, 
  className,
  onUpgrade 
}: LockedFeatureProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Blurred content */}
      <div className="pointer-events-none select-none opacity-40 blur-sm">
        {children}
      </div>
      
      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-indigo-500/30 bg-slate-950/90 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 ring-2 ring-indigo-500/30">
            <Lock className="h-8 w-8 text-indigo-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="border-indigo-500/60 bg-indigo-500/10 text-indigo-200">
                {requiredPlan}
              </Badge>
              <span className="text-sm text-slate-400">Required</span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {featureName}
            </h3>
            <p className="text-sm text-slate-400">
              Available for Subscribed Universities only
            </p>
          </div>
          <Button 
            onClick={onUpgrade}
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Unlock Premium Features
          </Button>
        </div>
      </div>
    </div>
  )
}

export function LockedFeatureInline({ 
  featureName, 
  requiredPlan 
}: { 
  featureName: string
  requiredPlan: 'Team' | 'Enterprise' 
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm">
      <Lock className="h-4 w-4 text-amber-400" />
      <span className="text-slate-200">
        <strong>{featureName}</strong> requires{' '}
        <Badge variant="outline" className="border-amber-500/60 bg-amber-500/10 text-amber-200">
          {requiredPlan}
        </Badge>
      </span>
    </div>
  )
}
