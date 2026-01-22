"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, Globe, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatRelativeTime } from "@/lib/utils"

interface RecruitmentCardProps {
  post: {
    id: string
    author: {
      name: string
      avatar: string
      department: string
    }
    title: string
    description: string
    openRoles: Array<{
      name: string
      color: string
    }>
    teamSize: string
    postedAt: string
    isGlobal: boolean
  }
  onJoin?: () => void
}

export function RecruitmentCard({ post, onJoin }: RecruitmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col">
        <CardContent className="p-5 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {post.author.department}
                </p>
              </div>
            </div>
            {post.isGlobal && (
              <Badge className="bg-amber-500 hover:bg-amber-600">
                <Globe className="mr-1 h-3 w-3" />
                Global
              </Badge>
            )}
          </div>

          {/* Title & Description */}
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
            {post.description}
          </p>

          {/* Open Roles */}
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Open Roles
            </p>
            <div className="flex flex-wrap gap-2">
              {post.openRoles.map((role, i) => (
                <Badge key={i} className={role.color}>
                  {role.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {post.teamSize}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatRelativeTime(post.postedAt)}
              </span>
            </div>
            <Button size="sm" onClick={onJoin}>
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

