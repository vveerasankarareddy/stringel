"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { EnhancedDashboardLayout } from "@/components/layouts/enhanced-dashboard-layout"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Search, Filter, Settings, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LiveChatPage() {
  const params = useParams()
  const channelType = params.channelType as string
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [activeTab, setActiveTab] = useState("all")
  const [activeConversationTab, setActiveConversationTab] = useState("unassigned")

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
          <h1 className="text-xl font-semibold">Live Chat</h1>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search through Live Chat conversations"
              className={cn("pl-10", isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200")}
            />
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        {/* Main content with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar */}
          <div
            className={cn(
              "w-64 border-r flex flex-col",
              isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
            )}
          >
            {/* Conversations header */}
            <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a]">
              <h2 className="font-medium mb-2 text-white">Conversations</h2>
              <div className="flex items-center justify-between">
                <div className="flex">
                  <button
                    className={cn(
                      "px-3 py-1 text-sm border-b-2",
                      activeTab === "all" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400",
                    )}
                    onClick={() => setActiveTab("all")}
                  >
                    All
                  </button>
                  <button
                    className={cn(
                      "px-3 py-1 text-sm border-b-2",
                      activeTab === "open" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400",
                    )}
                    onClick={() => setActiveTab("open")}
                  >
                    Open <span>0</span>
                  </button>
                </div>
                <button className="text-gray-400">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Conversation tabs */}
            <div className="overflow-y-auto flex-1">
              <div className="p-4">
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeConversationTab === "unassigned" ? "bg-[#2a2a2a]" : "",
                  )}
                  onClick={() => setActiveConversationTab("unassigned")}
                >
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-white">Unassigned</span>
                  <span className="ml-auto text-xs text-gray-500">0</span>
                </div>

                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeConversationTab === "you" ? "bg-[#2a2a2a]" : "",
                  )}
                  onClick={() => setActiveConversationTab("you")}
                >
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    Y
                  </div>
                  <span className="text-sm text-white">You</span>
                  <span className="ml-auto text-xs text-gray-500">0</span>
                </div>

                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeConversationTab === "team" ? "bg-[#2a2a2a]" : "",
                  )}
                  onClick={() => setActiveConversationTab("team")}
                >
                  <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                    T
                  </div>
                  <span className="text-sm text-white">Team</span>
                  <span className="ml-auto text-xs text-gray-500">0</span>
                </div>

                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeConversationTab === "all" ? "bg-[#2a2a2a]" : "",
                  )}
                  onClick={() => setActiveConversationTab("all")}
                >
                  <div className="h-4 w-4 flex items-center justify-center text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-white">All</span>
                  <span className="ml-auto text-xs text-gray-500">0</span>
                </div>
              </div>

              {/* Channels section */}
              <div className="p-4 border-t border-gray-200 dark:border-[#2a2a2a]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">Channels</h3>
                  <button className="text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="p-2 rounded-md flex items-center gap-2 cursor-pointer">
                  <div className="h-4 w-4 flex items-center justify-center text-green-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-white">All channels</span>
                </div>

                <div className="p-2 rounded-md flex items-center gap-2 cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    T
                  </div>
                  <span className="text-sm text-white">Telegram</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main chat area */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#121212]">
            <div className="text-center max-w-md">
              <div className="w-40 h-40 mx-auto mb-6">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="#E6F0FF" />
                  <path d="M70 80L130 80" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                  <path d="M70 100L130 100" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                  <path d="M70 120L100 120" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                  <path d="M140 140L160 160" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="60" stroke="#3B82F6" strokeWidth="8" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">
                This is a place to chat to your contacts in all of the connected channels
              </h2>
              <p className="text-gray-400 mb-6">
                Every time somebody sends you a message, it will appear here. You can change this and more in Live Chat
                Settings.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">Go To Live Chat Settings</Button>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  )
}
