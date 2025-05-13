"use client"

import { useParams } from "next/navigation"
import { EnhancedDashboardLayout } from "@/components/layouts/enhanced-dashboard-layout"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function BroadcastingPage() {
  const params = useParams()
  const channelType = params.channelType as string
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <EnhancedDashboardLayout channelType={channelType}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <header
          className={cn(
            "flex items-center justify-between p-4 border-b",
            isDarkMode ? "bg-[#18181B] border-[#2a2a2a] text-white" : "bg-white border-gray-200",
          )}
        >
          <h1 className="text-xl font-semibold">Broadcasts</h1>
          <div className="flex gap-2">
            <Button variant="outline">Broadcast From Automation</Button>
            <Button className="bg-blue-500 hover:bg-blue-600">New Broadcast</Button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 p-6 bg-[#121212]">
          <div
            className={cn(
              "h-full rounded-lg border flex flex-col items-center justify-center p-12",
              isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
            )}
          >
            <div className="w-40 h-40 mb-6">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#E6F0FF" />
                <path d="M100 60V140" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                <path d="M70 80L130 80" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                <path d="M60 100L140 100" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                <path d="M70 120L130 120" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Create your first Broadcast</h2>
            <p className="text-center text-gray-400 mb-6 max-w-md">
              Engage your contacts by sending your Broadcasts immediately or scheduling it on a particular date and
              time.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 mb-4">New Broadcast</Button>
            <a href="#" className="text-blue-500 hover:underline">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  )
}
