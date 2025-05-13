"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { EnhancedDashboardLayout } from "@/components/layouts/enhanced-dashboard-layout"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Search, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AutomationPage() {
  const params = useParams()
  const channelType = params.channelType as string
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [activeTab, setActiveTab] = useState("my-automations")

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
          <h1 className="text-xl font-semibold">Automation</h1>
        </header>

        {/* Secondary sidebar and content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Secondary sidebar */}
          <div
            className={cn(
              "w-64 border-r overflow-y-auto",
              isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
            )}
          >
            <div className="p-3">
              <div
                className={cn(
                  "p-2 rounded-md mb-2 flex items-center gap-2",
                  activeTab === "my-automations" ? (isDarkMode ? "bg-[#2a2a2a]" : "bg-blue-50") : "",
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium">My Automations</span>
              </div>

              <div className="p-2 rounded-md mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium">Basic</span>
              </div>

              <div className="p-2 rounded-md mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 7L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium">Sequences</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#121212]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Automations</h2>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" /> New Automation
              </Button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search all Automations..."
                  className={cn("pl-10", isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200")}
                />
              </div>
            </div>

            <div className="mb-6">
              <Button variant="outline" className="border-dashed">
                <Plus className="mr-2 h-4 w-4" /> New Folder
              </Button>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-40 h-40 mb-6">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="#E6F0FF" />
                  <path d="M70 80L100 110L130 80" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                  <path d="M70 110L100 140L130 110" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                  <path d="M100 60V140" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Create your first Automation</h3>
              <p className="text-center text-gray-400 mb-6 max-w-md">
                Automations are where you create chat automations in an easy and visual format. Try some automations we
                recommend based on your goals.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" /> New Automation
              </Button>
              <div className="mt-4">
                <a href="#" className="text-blue-500 hover:underline">
                  Learn more
                </a>
              </div>
            </div>

            {/* Trash button */}
            <div className="absolute bottom-6 right-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>Trash</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  )
}
