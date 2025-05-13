"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  Home,
  Users,
  GitBranch,
  MessageSquare,
  Send,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  User,
} from "lucide-react"
import Link from "next/link"

interface EnhancedSidebarProps {
  channelType?: string
}

export function EnhancedSidebar({ channelType }: EnhancedSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [collapsed, setCollapsed] = useState(true)

  // Determine the base path for the current channel
  const basePath = channelType ? `/dashboard/${channelType}` : ""

  // Check if a menu item is active
  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/home") return true
    return pathname === path || pathname === `${path}/`
  }

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  // Initialize sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setCollapsed(savedState === "true")
    }
  }, [])

  const menuItems = [
    {
      name: "Home",
      path: "/home",
      icon: Home,
    },
    {
      name: "Contacts",
      path: `${basePath}/contacts`,
      icon: Users,
    },
    {
      name: "Automation",
      path: `${basePath}/automation`,
      icon: GitBranch,
    },
    {
      name: "Live Chat",
      path: `${basePath}/live-chat`,
      icon: MessageSquare,
    },
    {
      name: "Broadcasting",
      path: `${basePath}/broadcasting`,
      icon: Send,
    },
    {
      name: "Settings",
      path: `${basePath}/settings`,
      icon: Settings,
    },
  ]

  const bottomMenuItems = [
    {
      name: "My Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Help",
      path: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between border-r transition-all duration-300 ease-in-out",
        isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col">
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          {!collapsed && (
            <div className="font-bold text-xl text-white">
              {channelType ? channelType.charAt(0).toUpperCase() + channelType.slice(1) : "Latos"}
            </div>
          )}
          {collapsed && (
            <div className="mx-auto">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
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

        {/* User info */}
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
              WS
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">wallcraftedspace</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    FREE
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main menu */}
        <div className="mt-2 flex flex-col space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors group relative",
                isActive(item.path)
                  ? isDarkMode
                    ? "text-green-500 bg-[#2a2a2a]"
                    : "text-green-500 bg-gray-100"
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
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        {/* Bottom menu items */}
        <div className="px-3 mb-2">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors group relative",
                isActive(item.path)
                  ? isDarkMode
                    ? "text-green-500 bg-[#2a2a2a]"
                    : "text-green-500 bg-gray-100"
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
            </Link>
          ))}
        </div>

        {/* Usage info */}
        <div className="p-4 border-t border-gray-200 dark:border-[#2a2a2a]">
          {!collapsed && (
            <div className="flex flex-col space-y-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">Free contacts limit 0/1000</div>
              <button className="w-full py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors">
                Activate Pro Trial
              </button>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
                0
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
