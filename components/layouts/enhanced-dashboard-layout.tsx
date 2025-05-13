"use client"

import type { ReactNode } from "react"
import { EnhancedSidebar } from "@/components/shared/enhanced-sidebar"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface EnhancedDashboardLayoutProps {
  children: ReactNode
  channelType?: string
}

export function EnhancedDashboardLayout({ children, channelType }: EnhancedDashboardLayoutProps) {
  const isMobile = useIsMobile()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <div className={cn("flex h-screen", isDarkMode ? "bg-[#18181B]" : "bg-gray-50")}>
      {!isMobile && <EnhancedSidebar channelType={channelType} />}
      <div className="flex-1 overflow-hidden pb-16 md:pb-0">{children}</div>
      {isMobile && <BottomNavigation />}
    </div>
  )
}
