"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, Share2 } from "lucide-react"
import { useTheme } from "next-themes"

export function TopNavigation() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="h-14 border-b border-[#2a2a2a] flex items-center px-4 justify-between bg-background/90 semi-transparent">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-gray-400">
          <div className="w-5 h-5 rounded-md border border-gray-600 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>
          <span className="text-sm">sankar reddy's Workspace</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <div className="w-5 h-5 rounded-md border border-gray-600 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>
          <span className="text-sm">perfect-opossum</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-purple-700 hover:bg-purple-600 rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
          <span>Upgrade</span>
        </button>
        <button className="border border-[#2a2a2a] bg-[#1e1e1e]/90 rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
          <Share2 className="w-4 h-4 mr-1" />
          <span>Share</span>
        </button>
        <button className="bg-[#0066cc] hover:bg-blue-600 rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
          <span>Publish</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1e1e1e]/90 border border-[#2a2a2a]"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-moon"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
