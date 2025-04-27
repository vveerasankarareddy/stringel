"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MainLayout } from "@/components/layouts/main-layout"
import { UsageStats } from "@/components/home/usage-stats"

export default function HomePage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [hasNoBots, setHasNoBots] = useState(true)

  useEffect(() => {
    // Get user name from localStorage or set default
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    } else {
      // If no name is stored, use a default and save it
      localStorage.setItem("userName", "Sankar")
      setUserName("Sankar")
    }
  }, [])

  return (
    <MainLayout>
      <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
          <span className="text-white">Home</span>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {/* Horizontal layout for welcome and stats */}
        <div className="flex justify-between items-start mb-8 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-md"></div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome, {userName}!</h1>
              <p className="text-gray-400 text-sm">Let's build something amazing today</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <UsageStats />
          </div>
        </div>

        {hasNoBots ? (
          <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="text-blue-500 w-full h-full">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-white mb-2">Get Started with Latos</h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Create a bot or connect a channel to start building your AI agent
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={() => router.push("/bot/create")}
              >
                <Plus className="w-4 h-4" />
                Create Bot
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={() => router.push("/channels/connect")}
              >
                <Plus className="w-4 h-4" />
                Connect Channel
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </MainLayout>
  )
}
