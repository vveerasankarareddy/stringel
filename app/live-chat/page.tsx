"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Settings } from "lucide-react"
import { useState } from "react"

export default function LiveChatPage() {
  const [activeTab, setActiveTab] = useState("open")

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* Left sidebar */}
        <div className="w-64 border-r border-[#2a2a2a] h-full">
          <div className="p-4 border-b border-[#2a2a2a]">
            <h1 className="text-xl font-bold text-white">Live Chat</h1>
          </div>

          <div className="p-4 border-b border-[#2a2a2a]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search conversations" className="pl-9 bg-[#1e1e1e] border-[#2a2a2a] text-white" />
            </div>
          </div>

          <div className="p-4 border-b border-[#2a2a2a]">
            <div className="flex justify-between items-center">
              <div className="flex">
                <button
                  className={`px-3 py-1 text-sm ${activeTab === "open" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`}
                  onClick={() => setActiveTab("open")}
                >
                  Open
                </button>
                <button
                  className={`px-3 py-1 text-sm ${activeTab === "closed" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`}
                  onClick={() => setActiveTab("closed")}
                >
                  Closed
                </button>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-400 mb-2">Conversations</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-[#2a2a2a] cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                  JD
                </div>
                <div>
                  <div className="text-sm text-white">John Doe</div>
                  <div className="text-xs text-gray-400">No messages yet</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-[#2a2a2a] cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">
                  AS
                </div>
                <div>
                  <div className="text-sm text-white">Alice Smith</div>
                  <div className="text-xs text-gray-400">No messages yet</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-white">No conversation selected</div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="text-gray-600 w-full h-full">
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Start by sending a message</h2>
              <p className="text-sm text-gray-400 mb-6">Select a conversation or start a new one to begin chatting</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">New Conversation</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
