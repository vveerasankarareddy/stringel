"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/shared/sidebar"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

interface MainLayoutProps {
  children: React.ReactNode
  hideSidebar?: boolean
}

export function MainLayout({ children, hideSidebar = false }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Check if we're on a connection page
  const isConnectionPage =
    pathname?.includes("/connect") || pathname?.includes("/create-bot") || pathname?.includes("/connect-existing")

  // Check localStorage for sidebar state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
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
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      {!hideSidebar && !isConnectionPage && !isMobile && (
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      )}
      <div className={`flex-1 overflow-hidden ${hideSidebar || isConnectionPage ? "w-full" : ""} pb-16 md:pb-0`}>
        {children}
      </div>
      {isMobile && <BottomNavigation />}
    </div>
  )
}
