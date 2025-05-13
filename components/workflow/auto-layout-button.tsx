"use client"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Grid } from "lucide-react"

interface AutoLayoutButtonProps {
  onClick: () => void
  className?: string
}

export function AutoLayoutButton({ onClick, className }: AutoLayoutButtonProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors",
        isDarkMode
          ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
        className,
      )}
      title="Auto-arrange nodes"
    >
      <Grid className="h-4 w-4" />
      <span>Auto Layout</span>
    </button>
  )
}
