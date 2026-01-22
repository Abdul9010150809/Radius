"use client"

import { useEffect, useRef, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CameraScanner() {
  const [active, setActive] = useState(false)
  const [lastScan, setLastScan] = useState<string | null>(null)
  const containerId = useRef(`qr-reader-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (!active) return
    const scanner = new Html5QrcodeScanner(containerId.current, {
      fps: 10,
      qrbox: 240,
      disableFlip: false,
    }, false)

    scanner.render(
      (decoded) => {
        setLastScan(decoded)
      },
      () => {}
    )

    return () => {
      scanner.clear().catch(() => null)
    }
  }, [active])

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Scan Now</p>
          <p className="text-xs text-slate-400">Use your device camera to scan event QR codes</p>
        </div>
        <Button variant="outline" onClick={() => setActive((v) => !v)}>
          <Camera className="mr-2 h-4 w-4" /> {active ? "Stop" : "Start"}
        </Button>
      </div>
      {active && <div id={containerId.current} className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-black/60" />}
      {lastScan && (
        <div className="mt-3 rounded-lg bg-slate-950 px-3 py-2 text-xs text-emerald-200">
          Last scan: {lastScan}
        </div>
      )}
    </div>
  )
}
