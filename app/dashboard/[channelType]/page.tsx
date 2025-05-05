"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas"
import { VariablesTab } from "@/components/workflow/variables-tab"
import { SchemasTab } from "@/components/workflow/schemas-tab"
import { MoreVertical, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/shared/sidebar"
import { useTheme } from "next-themes"

export default function ChannelDashboardPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("automation")
  const [channelName, setChannelName] = useState("")
  const [channelType, setChannelType] = useState("")
  const [collapsed, setCollapsed] = useState(true)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  useEffect(() => {
    // In a real app, fetch channel data from API
    // For now, we'll use mock data
    const type = params.channelType as string

    setChannelType(type)

    if (type === "telegram") {
      setChannelName("vasudeva")
    } else if (type === "whatsapp") {
      setChannelName("Business Account")
    } else if (type === "instagram") {
      setChannelName("Brand Profile")
    } else if (type === "facebook") {
      setChannelName("Page Manager")
    } else {
      setChannelName("Unknown Channel")
    }
  }, [params])

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "telegram":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0088cc]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("flex h-screen text-gray-900", isDarkMode ? "bg-[#121212]" : "bg-white")}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header
          className={cn(
            "flex h-14 items-center justify-between border-b px-4",
            isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e] text-white" : "border-gray-200 bg-white",
          )}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSidebar}
              className={cn(
                "rounded-md p-1.5 hover:bg-opacity-80",
                isDarkMode ? "text-gray-300 hover:bg-[#2a2a2a]" : "text-gray-500 hover:bg-gray-100",
              )}
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {getChannelIcon(channelType)}
            <h1 className="text-lg font-medium">{channelName}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm",
                isDarkMode
                  ? "border-[#2a2a2a] bg-[#2a2a2a] text-white hover:bg-[#333333]"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
              )}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
              <span>Set Live</span>
            </button>
          </div>
        </header>

        {/* Tab navigation */}
        <div className={cn("border-b", isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e]" : "border-gray-200 bg-white")}>
          <div className="flex px-6">
            <button
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium",
                activeTab === "automation"
                  ? "border-blue-500 text-blue-600"
                  : isDarkMode
                    ? "border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
              onClick={() => setActiveTab("automation")}
            >
              Automation
            </button>
            <button
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium",
                activeTab === "variables"
                  ? "border-blue-500 text-blue-600"
                  : isDarkMode
                    ? "border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
              onClick={() => setActiveTab("variables")}
            >
              Variables
            </button>
            <button
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium",
                activeTab === "schemas"
                  ? "border-blue-500 text-blue-600"
                  : isDarkMode
                    ? "border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
              onClick={() => setActiveTab("schemas")}
            >
              Schemas
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className={cn("flex-1 overflow-hidden", isDarkMode ? "bg-[#121212]" : "bg-gray-50")}>
          {activeTab === "automation" && <WorkflowCanvas />}

          {activeTab === "variables" && (
            <div className="h-full">
              <VariablesTab />
            </div>
          )}

          {activeTab === "schemas" && (
            <div className="h-full">
              <SchemasTab />
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={cn(
              "relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg p-6 shadow-xl",
              isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-900",
            )}
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              className={cn(
                "absolute right-4 top-4 rounded-full p-1",
                isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="mb-4 text-xl font-bold">
              Preview: {channelName} ({channelType})
            </h2>

            <div className={cn("mb-4 rounded-lg border p-4", isDarkMode ? "border-[#2a2a2a]" : "border-gray-200")}>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-lg bg-blue-100 p-3 text-blue-900">
                    Hello, I'd like to know more about your services.
                  </div>
                </div>

                <div className="flex">
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      isDarkMode ? "bg-yellow-800 text-yellow-100" : "bg-yellow-100 text-yellow-900",
                    )}
                  >
                    Hi there! Thanks for reaching out. We offer a variety of services including web development, mobile
                    app development, and digital marketing.
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-lg bg-blue-100 p-3 text-blue-900">
                    What are your rates for web development?
                  </div>
                </div>

                <div className="flex">
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      isDarkMode ? "bg-yellow-800 text-yellow-100" : "bg-yellow-100 text-yellow-900",
                    )}
                  >
                    Our web development rates start at $50/hour. We also offer fixed-price packages for common website
                    types. Would you like me to send you our full pricing guide?
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className={cn(
                  "rounded-md border px-4 py-2",
                  isDarkMode
                    ? "border-[#2a2a2a] bg-[#2a2a2a] text-white hover:bg-[#333333]"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                )}
              >
                Close
              </button>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Set Live</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
