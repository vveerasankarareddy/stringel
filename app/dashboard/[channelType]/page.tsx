"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas"
import { Emulator } from "@/components/workflow/emulator"
import { VariablesTab } from "@/components/workflow/variables-tab"
import { SchemasTab } from "@/components/workflow/schemas-tab"
import { Menu, Plus, Share2 } from "lucide-react"

export default function ChannelDashboardPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("workflows")
  const [channelName, setChannelName] = useState("")
  const [channelType, setChannelType] = useState("")

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
      case "whatsapp":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        )
      case "instagram":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E1306C]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
        )
      case "facebook":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#121212] text-white">
      <header className="flex items-center justify-between border-b border-[#2a2a2a] p-4">
        <div className="flex items-center gap-3">
          <button className="rounded p-1 text-gray-400 hover:bg-[#2a2a2a] hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
          {getChannelIcon(channelType)}
          <h1 className="text-xl font-medium">{channelName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
            <Share2 className="h-4 w-4" />
            <span>Share Workflow</span>
          </button>
        </div>
      </header>

      <div className="flex border-b border-[#2a2a2a]">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "workflows" ? "border-b-2 border-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("workflows")}
        >
          Workflows
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "variables" ? "border-b-2 border-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("variables")}
        >
          Variables
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "schemas" ? "border-b-2 border-blue-500 text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("schemas")}
        >
          Schemas
        </button>
      </div>

      {activeTab === "workflows" && (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex w-64 flex-col border-r border-[#2a2a2a] bg-[#121212]">
            <div className="flex items-center justify-between border-b border-[#2a2a2a] p-3">
              <h2 className="text-sm font-medium">Workflows</h2>
              <button className="rounded p-1 text-gray-400 hover:bg-[#2a2a2a] hover:text-white">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <button className="mb-1 w-full rounded-md bg-[#2a2a2a] p-2 text-left text-sm font-medium text-white">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Main</span>
                </div>
              </button>
              <button className="mb-1 w-full rounded-md p-2 text-left text-sm text-gray-400 hover:bg-[#2a2a2a] hover:text-white">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Error</span>
                </div>
              </button>
              <button className="mb-1 w-full rounded-md p-2 text-left text-sm text-gray-400 hover:bg-[#2a2a2a] hover:text-white">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span>Timeout</span>
                </div>
              </button>
              <button className="mb-1 w-full rounded-md p-2 text-left text-sm text-gray-400 hover:bg-[#2a2a2a] hover:text-white">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Conversation End</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <WorkflowCanvas />
            </div>
            <div className="w-96 border-l border-[#2a2a2a]">
              <Emulator />
            </div>
          </div>
        </div>
      )}

      {activeTab === "variables" && (
        <div className="flex-1 overflow-hidden">
          <VariablesTab />
        </div>
      )}

      {activeTab === "schemas" && (
        <div className="flex-1 overflow-hidden">
          <SchemasTab />
        </div>
      )}
    </div>
  )
}
