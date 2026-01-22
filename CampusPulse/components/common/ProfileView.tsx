"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Building2,
  Calendar,
  Award,
  Code,
  ExternalLink,
  Globe,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CERTIFICATIONS, USERS } from "@/lib/constants"

export function ProfileView() {
  const user = USERS[0] // Alex Johnson

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
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header Card */}
      <motion.div variants={item}>
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-indigo-500/20 to-purple-500/20" />
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">
                  {user.department} • {user.year}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
                <Button size="sm">Edit Profile</Button>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-4 text-muted-foreground">{user.bio}</p>

            {/* Quick Info */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                {user.department}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Joined {new Date().getFullYear()}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills & Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div variants={item} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-sm px-3 py-1 cursor-pointer hover:bg-accent">
                  + Add Skill
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Events Attended", value: "12" },
                { label: "Teams Joined", value: "3" },
                { label: "Certifications", value: "4" },
                { label: "Hours Contributed", value: "48h" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Certifications Tabs */}
      <motion.div variants={item}>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Certifications</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="campus">Campus</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2">
              {CERTIFICATIONS.map((cert) => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="global">
            <div className="grid gap-4 md:grid-cols-2">
              {CERTIFICATIONS.filter((c) => c.type === "global").map((cert) => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campus">
            <div className="grid gap-4 md:grid-cols-2">
              {CERTIFICATIONS.filter((c) => c.type === "campus").map((cert) => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

function CertCard({ cert }: { cert: (typeof CERTIFICATIONS)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="overflow-hidden">
        <div className="flex">
          <div
            className={`w-2 ${
              cert.type === "global" ? "bg-amber-500" : "bg-indigo-500"
            }`}
          />
          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-lg p-2 ${
                    cert.type === "global"
                      ? "bg-amber-500/10"
                      : "bg-indigo-500/10"
                  }`}
                >
                  <Award
                    className={`h-5 w-5 ${
                      cert.type === "global"
                        ? "text-amber-500"
                        : "text-indigo-500"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
              {cert.type === "global" && (
                <Badge className="bg-amber-500">
                  <Globe className="mr-1 h-3 w-3" />
                  Global
                </Badge>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Issued {new Date(cert.date).toLocaleDateString()}
              </span>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-success" />
              Verified Credential
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

