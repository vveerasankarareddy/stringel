"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/shared/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
  hideSidebar?: boolean
}

export function MainLayout({ children, hideSidebar = false }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Check localStorage for sidebar state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState) {
      setSidebarCollapsed(savedState === "true")
    }
  }, [])

  return (
    <div className="flex h-screen bg-[#121212]">
      {!hideSidebar && <Sidebar collapsed={sidebarCollapsed} />}
      <div className={`flex-1 overflow-hidden ${hideSidebar ? "w-full" : ""}`}>{children}</div>
    </div>
  )
}
