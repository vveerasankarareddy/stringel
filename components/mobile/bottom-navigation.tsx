"use client"
import { useRouter, usePathname } from "next/navigation"
import { Home, Users, MessageSquare, Send, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
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
      name: "Chat",
      path: "/live-chat",
      icon: MessageSquare,
    },
    {
      name: "Broadcast",
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
        "fixed bottom-0 left-0 z-50 w-full border-t md:hidden",
        isDarkMode ? "border-[#2a2a2a] bg-[#121212]" : "border-gray-200 bg-white",
      )}
    >
      <div className="flex h-16 items-center justify-around">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={cn(
              "flex flex-1 flex-col items-center justify-center py-2",
              isActive(item.path) ? "text-green-500" : isDarkMode ? "text-gray-400" : "text-gray-500",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
