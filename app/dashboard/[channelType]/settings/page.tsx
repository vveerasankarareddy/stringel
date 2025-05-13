"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { EnhancedDashboardLayout } from "@/components/layouts/enhanced-dashboard-layout"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const params = useParams()
  const channelType = params.channelType as string
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [activeCategory, setActiveCategory] = useState("general")

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
          <h1 className="text-xl font-semibold">Settings</h1>
        </header>

        {/* Main content with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar */}
          <div
            className={cn("w-64 border-r", isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200")}
          >
            <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a]">
              <h2 className="font-medium mb-2 text-white">Main</h2>
              <div className="space-y-1">
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "general" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("general")}
                >
                  <span className="text-sm">General</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "notifications" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("notifications")}
                >
                  <span className="text-sm">Notifications</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "team" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("team")}
                >
                  <span className="text-sm">Team Members</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "logs" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("logs")}
                >
                  <span className="text-sm">Logs</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "billing" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("billing")}
                >
                  <span className="text-sm">Billing</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "display" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("display")}
                >
                  <span className="text-sm">Display</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a]">
              <h2 className="font-medium mb-2 text-white">Inbox</h2>
              <div className="space-y-1">
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "livechat" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("livechat")}
                >
                  <span className="text-sm">Live Chat Behavior</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "assignment" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("assignment")}
                >
                  <span className="text-sm">Auto-Assignment</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-[#2a2a2a]">
              <h2 className="font-medium mb-2 text-white">Channels</h2>
              <div className="space-y-1">
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "instagram" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("instagram")}
                >
                  <div className="h-4 w-4 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">
                    I
                  </div>
                  <span className="text-sm">Instagram</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "tiktok" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("tiktok")}
                >
                  <div className="h-4 w-4 rounded-full bg-black flex items-center justify-center text-white text-xs">
                    T
                  </div>
                  <span className="text-sm">TikTok</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "whatsapp" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("whatsapp")}
                >
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    W
                  </div>
                  <span className="text-sm">WhatsApp</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "messenger" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("messenger")}
                >
                  <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    M
                  </div>
                  <span className="text-sm">Messenger</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "sms" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("sms")}
                >
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    S
                  </div>
                  <span className="text-sm">SMS</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "email" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("email")}
                >
                  <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                    E
                  </div>
                  <span className="text-sm">Email</span>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "telegram" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("telegram")}
                >
                  <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    T
                  </div>
                  <span className="text-sm">Telegram</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-medium mb-2 text-white">Automation</h2>
              <div className="space-y-1">
                <div
                  className={cn(
                    "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                    activeCategory === "fields" ? "text-green-500" : "text-gray-400",
                  )}
                  onClick={() => setActiveCategory("fields")}
                >
                  <span className="text-sm">Fields</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main settings content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#121212]">
            {activeCategory === "general" && (
              <div className="space-y-8">
                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-white">Card URL Shortener</h3>
                      <div
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded inline-block",
                          isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800",
                        )}
                      >
                        PRO
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Input
                      value="My.Manychat.Com"
                      className={cn(isDarkMode ? "bg-[#121212] border-[#2a2a2a]" : "bg-white border-gray-200")}
                    />
                  </div>

                  <p className="text-sm text-gray-400">
                    If you disable link shortening, we won't be able to provide the Click-Through Rate (CTR) data
                  </p>
                </div>

                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
                  )}
                >
                  <h3 className="text-lg font-medium mb-4 text-white">Account Time Zone</h3>

                  <div className="mb-4">
                    <Select defaultValue="asia-calcutta">
                      <SelectTrigger
                        className={cn(isDarkMode ? "bg-[#121212] border-[#2a2a2a]" : "bg-white border-gray-200")}
                      >
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-calcutta">(UTC+05:30) - Asia/Calcutta</SelectItem>
                        <SelectItem value="america-newyork">(UTC-05:00) - America/New_York</SelectItem>
                        <SelectItem value="europe-london">(UTC+00:00) - Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-400">
                      All the data in Manychat will be displayed and exported according to this timezone.
                    </p>
                    <a href="#" className="text-blue-500 hover:underline ml-1">
                      Learn more
                    </a>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
                  )}
                >
                  <h3 className="text-lg font-medium mb-4 text-white">Clone to Another Account</h3>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Copy all content to another account</p>
                    <Button className="bg-blue-500 hover:bg-blue-600">Clone This Account</Button>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
                  )}
                >
                  <h3 className="text-lg font-medium mb-4 text-white">Use as Template</h3>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Create a snapshot of this account and share it via link</p>
                    <Button className="bg-blue-500 hover:bg-blue-600">Create Account Template</Button>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
                  )}
                >
                  <h3 className="text-lg font-medium mb-4 text-white">Leave Account</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        <a href="#" className="text-blue-500 hover:underline">
                          Transfer
                        </a>{" "}
                        your ownership to another team member if you want to leave this account
                      </p>
                    </div>
                    <Button variant="outline" className="text-gray-400">
                      Leave
                    </Button>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-6 rounded-lg border",
                    isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
                  )}
                >
                  <h3 className="text-lg font-medium mb-4 text-white">Delete Account</h3>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Continue to account deletion</p>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  )
}
