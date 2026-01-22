"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PlanBadgeProps {
  plan: 'Free' | 'Team' | 'Enterprise'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PlanBadge({ plan, size = 'md', className }: PlanBadgeProps) {
  const variants = {
    Free: {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/60',
      text: 'text-slate-200',
    },
    Team: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/60',
      text: 'text-indigo-200',
    },
    Enterprise: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/60',
      text: 'text-purple-200',
    },
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  }

  const variant = variants[plan]

  return (
    <Badge
      variant="outline"
      className={cn(
        variant.bg,
        variant.border,
        variant.text,
        sizes[size],
        className
      )}
    >
      {plan}
    </Badge>
  )
}
