"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, MessageSquare, Plus, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[#2a2a2a] bg-[#121212] md:hidden">
      <div className="flex h-16 items-center justify-around">
        <button
          onClick={() => router.push("/home")}
          className={cn(
            "flex flex-1 flex-col items-center justify-center py-2",
            isActive("/home") ? "text-white" : "text-gray-400",
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => router.push("/live-chat")}
          className={cn(
            "flex flex-1 flex-col items-center justify-center py-2",
            isActive("/live-chat") ? "text-white" : "text-gray-400",
          )}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">Chat</span>
        </button>

        <button
          onClick={() => router.push("/channels/connect")}
          className="flex flex-1 flex-col items-center justify-center py-2 text-blue-500"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
            <Plus className="h-6 w-6 text-white" />
          </div>
        </button>

        <button
          onClick={() => router.push("/bot")}
          className={cn(
            "flex flex-1 flex-col items-center justify-center py-2",
            isActive("/bot") ? "text-white" : "text-gray-400",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-xs">Bot</span>
        </button>

        <button
          onClick={() => router.push("/settings")}
          className={cn(
            "flex flex-1 flex-col items-center justify-center py-2",
            isActive("/settings") ? "text-white" : "text-gray-400",
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  )
}
