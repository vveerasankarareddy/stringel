"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/shared/dashboard-sidebar"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  // Check localStorage for sidebar state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("dashboard-sidebar-collapsed")
    if (savedState) {
      setSidebarCollapsed(savedState === "true")
    }

    // On mobile, always collapse sidebar
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }, [isMobile])

  // Toggle sidebar function
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem("dashboard-sidebar-collapsed", String(newState))
  }

  return (
    <div className={cn("flex h-screen", isDarkMode ? "bg-[#121212]" : "bg-gray-50")}>
      {!isMobile && <DashboardSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />}
      <div className="flex-1 overflow-hidden pb-16 md:pb-0">{children}</div>
      {isMobile && <BottomNavigation />}
    </div>
  )
}
