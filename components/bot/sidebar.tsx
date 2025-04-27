"use client"

import { useRouter } from "next/navigation"
import {
  Home,
  Bot,
  BookOpen,
  Settings,
  Search,
  Info,
  BarChart,
  Workflow,
  MessageSquare,
  CreditCard,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Sidebar() {
  const router = useRouter()

  const menuItems = [
    { icon: Home, color: "#3b82f6", label: "Home", path: "/home" },
    { icon: Bot, color: "#8b5cf6", label: "Bots", path: "/bot" },
    { icon: BookOpen, color: "#ec4899", label: "Knowledge", path: "/knowledge" },
    { icon: Workflow, color: "#10b981", label: "Workflows", path: "/workflows" },
    { icon: MessageSquare, color: "#f59e0b", label: "Conversations", path: "/conversations" },
    { icon: BarChart, color: "#ef4444", label: "Analytics", path: "/analytics" },
  ]

  const bottomItems = [
    { icon: CreditCard, color: "#9ca3af", label: "Billing", path: "/billing" },
    { icon: Settings, color: "#9ca3af", label: "Settings", path: "/settings" },
    { icon: Search, color: "#9ca3af", label: "Search", path: "/search" },
    { icon: Info, color: "#9ca3af", label: "Help", path: "/help" },
  ]

  return (
    <div className="w-14 bg-[#18181B] flex flex-col items-center py-4 border-r border-[#2a2a2a]">
      <div className="w-8 h-8 mb-6 rounded-md bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
        <span className="text-white font-bold">L</span>
      </div>
      <div className="flex flex-col items-center gap-5 mt-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-white/10 group relative"
            onClick={() => router.push(item.path)}
          >
            <item.icon className="w-5 h-5" style={{ color: item.color }} />
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-[#18181B] text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 w-full px-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center justify-center p-2 rounded-md hover:bg-white/10 transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-sm font-medium">
                SR
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium">perfect-opossum</div>
            <DropdownMenuItem onClick={() => router.push("/bot")}>
              <Bot className="mr-2 h-4 w-4" />
              <span>Bot Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/bot/analytics")}>
              <BarChart className="mr-2 h-4 w-4" />
              <span>Bot Analytics</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/bot/knowledge")}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Knowledge Base</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-auto flex flex-col items-center gap-5 mb-4">
        {bottomItems.map((item, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-white/10 group relative"
            onClick={() => router.push(item.path)}
          >
            <item.icon className="w-5 h-5" style={{ color: item.color }} />
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-[#18181B] text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
