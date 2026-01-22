"use client"

import { Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface UpgradeBannerProps {
  currentPlan: 'Free' | 'Team' | 'Enterprise'
  onUpgrade?: () => void
}

export function UpgradeBanner({ currentPlan, onUpgrade }: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || currentPlan === 'Enterprise') return null

  const messages = {
    Free: {
      title: 'Unlock Premium Features',
      description: 'Upgrade to Team plan for Smart Attendance, Analytics, and more',
      cta: 'Upgrade to Team',
    },
    Team: {
      title: 'Scale with Enterprise',
      description: 'Get SSO, dedicated support, and advanced security features',
      cta: 'Upgrade to Enterprise',
    },
  }

  const message = messages[currentPlan as 'Free' | 'Team']

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20">
                <Sparkles className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{message.title}</h4>
                <p className="text-sm text-slate-300">{message.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={onUpgrade}
                className="bg-indigo-500 text-white hover:bg-indigo-600"
              >
                {message.cta}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDismissed(true)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
