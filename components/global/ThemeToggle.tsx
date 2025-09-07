"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import * as React from "react"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (resolvedTheme ?? theme) === "dark"

  function toggle() {
    // Add a temporary transition class to html for smooth cross-fade
    const root = document.documentElement
    root.classList.add("theme-transition")
    window.setTimeout(() => {
      root.classList.remove("theme-transition")
    }, 240)

    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}


