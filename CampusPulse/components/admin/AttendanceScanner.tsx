"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, RefreshCw, Clock, CheckCircle, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function AttendanceScanner() {
  const [qrCode, setQrCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null)

  // Generate dynamic QR code data
  const generateQRCode = () => {
    const code = `CP-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`
    setQrCode(code)
    setTimeLeft(30)
    setScanResult(null)
  }

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      generateQRCode()
    }
  }, [timeLeft])

  // Auto-generate on mount
  useEffect(() => {
    generateQRCode()
  }, [])

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false)
      setScanResult("success")
    }, 2000)
  }

  const progress = (timeLeft / 30) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Smart Attendance</h2>
          <p className="text-muted-foreground">
            Generate dynamic QR codes for event check-ins
          </p>
        </div>
        <Badge variant="success" className="text-sm">
          Live Mode
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Dynamic QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Display */}
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-2xl bg-white p-4">
              <AnimatePresence mode="wait">
                {scanResult ? (
                  <motion.div
                    key="result"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                  >
                    {scanResult === "success" ? (
                      <CheckCircle className="h-16 w-16 text-success mx-auto" />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto">
                        ✕
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    {/* QR Code Placeholder */}
                    <div className="grid grid-cols-5 gap-1">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 w-4 rounded-sm ${
                            Math.random() > 0.5 ? "bg-black" : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-black font-mono">{qrCode}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Timer Overlay */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-background px-4 py-1.5 shadow-lg border">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono font-medium">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "100%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>

            {/* Code Display */}
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Current Code
              </p>
              <p className="font-mono text-lg font-bold tracking-wider">
                {qrCode}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={generateQRCode}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button onClick={handleScan} className="flex-1">
                <Camera className="mr-2 h-4 w-4" />
                Test Scan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scanner View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Scanner View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50">
              {/* Camera Viewfinder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-48">
                  {/* Corner markers */}
                  <div className="absolute -top-2 -left-2 h-8 w-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
                  <div className="absolute -top-2 -right-2 h-8 w-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
                  <div className="absolute -bottom-2 -left-2 h-8 w-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 border-r-4 border-b-4 border-primary rounded-br-lg" />
                  {/* Scanning line */}
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-primary"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-lg bg-background/90 p-4 text-center backdrop-blur">
                  <p className="text-sm text-muted-foreground">
                    Position QR code within the frame
                  </p>
                </div>
              </div>

              {/* Simulated Scan Button */}
              <Button
                size="lg"
                className="absolute bottom-20 left-1/2 -translate-x-1/2"
                onClick={handleScan}
              >
                <Camera className="mr-2 h-4 w-4" />
                Scan Now
              </Button>
            </div>

            {/* Recent Scans */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Recent Scans</h4>
              <div className="space-y-2">
                {[
                  { name: "Alex Johnson", time: "2 min ago", status: "success" },
                  { name: "Sarah Chen", time: "5 min ago", status: "success" },
                  { name: "Mike Park", time: "8 min ago", status: "error" },
                ].map((scan, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          scan.status === "success"
                            ? "bg-success"
                            : "bg-destructive"
                        }`}
                      />
                      <span className="text-sm font-medium">{scan.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {scan.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

