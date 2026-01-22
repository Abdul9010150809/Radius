"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ExternalLink, Globe, Building2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlanBadge } from "@/components/common/PlanBadge"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    type: "global" | "campus"
    category: string
    registered: number
    maxCapacity: number
    image: string
    organizer: string
  }
  onRegister?: () => void
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const capacityPercentage = (event.registered / event.maxCapacity) * 100
  const isAlmostFull = capacityPercentage >= 80

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "overflow-hidden h-full flex flex-col border-slate-800",
          event.type === "global" && "ring-2 ring-amber-400/60"
        )}
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              className={cn(
                event.type === "global"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              )}
            >
              {event.type === "global" ? (
                <Globe className="mr-1 h-3 w-3" />
              ) : (
                <Building2 className="mr-1 h-3 w-3" />
              )}
              {event.type === "global" ? "Global" : "Campus"}
            </Badge>
            <Badge variant="secondary">{event.category}</Badge>
          </div>
          {/* Almost Full indicator */}
          {isAlmostFull && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive">Almost Full</Badge>
            </div>
          )}
        </div>

        <CardContent className="flex-1 p-5">
          <h3 className="font-semibold text-lg line-clamp-1 mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {event.description}
          </p>

          {/* Meta Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                at {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium">
                {event.registered}/{event.maxCapacity}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${capacityPercentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "h-full rounded-full",
                  capacityPercentage >= 90
                    ? "bg-destructive"
                    : capacityPercentage >= 70
                    ? "bg-orange-500"
                    : "bg-success"
                )}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            by {event.organizer}
          </span>
          <Button size="sm" onClick={onRegister}>
            Register
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

