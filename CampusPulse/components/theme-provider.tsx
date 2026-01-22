"use client"

import { createContext, useContext, useEffect } from "react"
import { useAppStore } from "@/lib/store"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggle: () => void
  setTheme: (value: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const { darkMode, toggleDarkMode } = useAppStore()

  const theme: Theme = darkMode ? "dark" : "light"

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("light", theme === "light")
    root.classList.toggle("dark", theme === "dark")
    root.dataset.theme = theme
  }, [theme])

  const value: ThemeContextValue = {
    theme,
    toggle: toggleDarkMode,
    setTheme: (value: Theme) => {
      // This could be extended if needed, but for now we use the store
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
