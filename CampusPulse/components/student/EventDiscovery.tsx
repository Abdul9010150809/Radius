"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, Search, Globe, Building2, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EventCard } from "./EventCard"
import { EVENTS } from "@/lib/constants"

export function EventDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "global" | "campus">("all")

  const filteredEvents = EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === "all" || event.type === activeFilter
    return matchesSearch && matchesFilter
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Compass className="h-7 w-7 text-primary" />
            Discover Events
          </h2>
          <p className="text-muted-foreground">
            Find and join amazing events at your campus
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* AI Recommendations - Premium Feature */}
      <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <svg className="h-4 w-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-indigo-100">Recommended for You</h3>
            <Badge variant="outline" className="border-indigo-500/50 text-indigo-200 bg-indigo-500/10">AI-Powered</Badge>
          </div>
          <p className="text-sm text-indigo-200 mb-4">Based on your interests in Technology and Entrepreneurship</p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {EVENTS.filter(event => event.category === 'Technology' || event.category === 'Career').slice(0, 3).map((event) => (
              <motion.div key={`rec-${event.id}`} variants={item}>
                <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800/70 transition-colors cursor-pointer">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">{event.category}</Badge>
                      <div className="text-xs text-emerald-400 font-medium">98% match</div>
                    </div>
                    <h4 className="font-semibold text-white mb-1">{event.title}</h4>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </div>
                      <Button size="sm" className="h-7 text-xs">View Details</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
        >
          All Events
        </Button>
        <Button
          variant={activeFilter === "global" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("global")}
        >
          <Globe className="mr-2 h-4 w-4" />
          Global
        </Button>
        <Button
          variant={activeFilter === "campus" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("campus")}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Campus
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="secondary">
            {filteredEvents.length} events found
          </Badge>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div key={event.id} variants={item} layout>
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Compass className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">No events found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div key={event.id} variants={item} layout>
                  <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-40 md:h-auto md:w-48">
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={192}
                          height={160}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge
                            className={
                              event.type === "global"
                                ? "bg-amber-500"
                                : "bg-indigo-500"
                            }
                          >
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {event.organizer}
                            </p>
                          </div>
                          <Button size="sm">Register</Button>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {event.location}
                          </span>
                          <Badge variant="secondary">
                            {event.registered}/{event.maxCapacity} registered
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

