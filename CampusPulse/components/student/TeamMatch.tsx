"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Users, Search, Briefcase, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecruitmentCard } from "./RecruitmentCard"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RECRUITMENT_POSTS } from "@/lib/constants"

export function TeamMatch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<(typeof RECRUITMENT_POSTS)[0] | null>(null)
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)
  const [pitch, setPitch] = useState("")
  const [portfolioLink, setPortfolioLink] = useState("")

  const filteredPosts = RECRUITMENT_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const globalPosts = RECRUITMENT_POSTS.filter((p) => p.isGlobal)
  const campusPosts = RECRUITMENT_POSTS.filter((p) => !p.isGlobal)

  const handleJoin = (post: (typeof RECRUITMENT_POSTS)[0]) => {
    setSelectedPost(post)
    setJoinDialogOpen(true)
  }

  const handleSubmitJoin = () => {
    // Handle join submission
    console.log("Joining team:", { postId: selectedPost?.id, pitch, portfolioLink })
    setJoinDialogOpen(false)
    setPitch("")
    setPortfolioLink("")
  }

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
            <Users className="h-7 w-7 text-primary" />
            Team Match
          </h2>
          <p className="text-muted-foreground">
            Find your perfect team and collaborate on exciting projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div variants={item}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{RECRUITMENT_POSTS.length}</p>
<p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2">
                <Globe className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{globalPosts.length}</p>
                <p className="text-sm text-muted-foreground">Global Challenges</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Open Positions</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="global">Global Challenges</TabsTrigger>
          <TabsTrigger value="campus">Campus Teams</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <RecruitmentCard post={post} onJoin={() => handleJoin(post)} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="global" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2"
          >
            {globalPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <RecruitmentCard post={post} onJoin={() => handleJoin(post)} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="campus" className="mt-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2"
          >
            {campusPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <RecruitmentCard post={post} onJoin={() => handleJoin(post)} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Join Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request to Join</DialogTitle>
            <DialogDescription>
              Send your request to join {selectedPost?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Why do you want to join this team?
              </label>
              <Textarea
                placeholder="Tell them about your skills and motivation..."
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Portfolio Link (optional)
              </label>
              <Input
                placeholder="https://yourportfolio.com"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitJoin}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

