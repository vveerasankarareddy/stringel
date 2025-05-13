"use client"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Home, Users, GitBranch, MessageSquare, Send, Settings, ChevronLeft, ChevronRight } from "lucide-react"

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  const menuItems = [
    {
      name: "Home",
      path: "/home",
      icon: Home,
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: Users,
    },
    {
      name: "Automation",
      path: "/automations",
      icon: GitBranch,
    },
    {
      name: "Live Chat",
      path: "/live-chat",
      icon: MessageSquare,
    },
    {
      name: "Broadcasting",
      path: "/broadcasting",
      icon: Send,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn(
        "flex h-full flex-col transition-all duration-300 ease-in-out",
        isDarkMode ? "bg-[#121212] border-r border-[#2a2a2a]" : "bg-white border-r border-gray-200",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className={cn("font-semibold text-lg", isDarkMode ? "text-white" : "text-gray-800")}>Dashboard</div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-md",
            isDarkMode
              ? "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
            collapsed ? "mx-auto" : "ml-auto",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="mt-6 flex flex-col space-y-1 px-3">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors group relative",
              isActive(item.path)
                ? isDarkMode
                  ? "bg-[#2a2a2a] text-green-500"
                  : "bg-gray-100 text-green-500"
                : isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            <item.icon
              className={cn("mr-3 h-5 w-5 flex-shrink-0", isActive(item.path) ? "text-green-500" : "text-gray-500")}
            />
            {!collapsed && <span>{item.name}</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 rounded bg-gray-900 px-2 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                {item.name}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
