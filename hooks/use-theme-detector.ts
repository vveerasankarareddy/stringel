"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useThemeDetector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Detect system theme on mount
  useEffect(() => {
    setMounted(true)

    // Check if user has a preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Otherwise use system preference
      setTheme("system")
    }
  }, [setTheme])

  // Save theme preference when it changes
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  return { theme, mounted }
}
