"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (term: string) => void
  onClear: () => void
  onFocusNext: () => void
  className?: string
}

export function SearchBar({ onSearch, onClear, onFocusNext, className }: SearchBarProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchTerm("")
    onClear()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      onFocusNext()
    } else if (e.key === "Escape") {
      handleClear()
    }
  }

  return (
    <div
      className={cn(
        "flex h-10 items-center rounded-md border shadow-sm transition-all duration-200",
        isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e]" : "border-gray-300 bg-white",
        className,
      )}
    >
      <div className="px-3">
        <Search className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
      </div>
      <input
        type="text"
        placeholder="Search nodes..."
        className={cn(
          "h-full flex-1 bg-transparent px-1 outline-none",
          isDarkMode ? "text-white placeholder:text-gray-400" : "text-gray-900 placeholder:text-gray-500",
        )}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className={cn(
            "flex h-full items-center px-3 transition-colors",
            isDarkMode ? "text-gray-300 hover:bg-[#2a2a2a]" : "text-gray-700 hover:bg-gray-50",
          )}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
