"use client"

import { useState } from "react"
import { CircleHelp, RefreshCw, Plus, Send, Share2 } from "lucide-react"
import { MainLayout } from "@/components/layouts/main-layout"

export default function BotPage() {
  const [activeTab, setActiveTab] = useState("instructions")

  return (
    <MainLayout>
      {/* Top Navigation */}
      <div className="h-14 border-b border-[#2a2a2a] flex items-center px-4 justify-between bg-[#121212]">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>sankar reddy's Workspace</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <button className="flex items-center gap-1 text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>perfect-opossum</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="border border-[#2a2a2a] bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1 text-gray-300">
            bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Assistant</span>
          </button>

          <button className="bg-purple-700 hover:bg-purple-600 rounded-md px-3 py-1.5 text-sm flex items-center gap-1 text-white">
            <span>Upgrade</span>
          </button>

          <button className="border border-[#2a2a2a] bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1 text-white">
            <span>Explore Hub</span>
          </button>

          <button className="border border-[#2a2a2a] bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1 text-white">
            <Share2 className="w-4 h-4 mr-1" />
            <span>Share</span>
          </button>

          <button className="bg-[#0066cc] hover:bg-blue-600 rounded-md px-3 py-1.5 text-sm flex items-center gap-1 text-white">
            <span>Publish</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#121212]">
          {/* Instructions Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[#10b981]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </div>
              <span className="font-medium text-white">Instructions</span>
              <CircleHelp className="w-4 h-4 text-gray-500" />
            </div>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#2a2a2a]">
              <div className="mb-4">
                <h3 className="text-gray-400 mb-1">Identity</h3>
                <p className="text-sm text-gray-300">
                  You are the AI Support Agent for Mr. Mushroom's. Assist customers with orders, billing, account
                  issues, and general inquiries.
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 mb-1">Scope</h3>
                <p className="text-sm text-gray-300">
                  Handle orders, billing, accounts, product info, and basic support.
                </p>
              </div>
              <div className="text-right mt-2">
                <span className="text-xs text-gray-500">209 tokens</span>
              </div>
            </div>
          </div>

          {/* Knowledge Bases Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
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
                className="text-orange-400"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span className="font-medium text-white">Knowledge bases</span>
              <CircleHelp className="w-4 h-4 text-gray-500" />
            </div>
            <div className="bg-[#1e1e1e] rounded-lg p-8 border border-[#2a2a2a] flex flex-col items-center justify-center min-h-[300px]">
              <div className="bg-[#2a2a2a] text-gray-400 text-xs px-3 py-1 rounded-full mb-6">Disabled</div>
              <h3 className="text-xl font-medium mb-6">Add knowledge source</h3>
              <div className="flex gap-2 mb-6">
                <button className="bg-[#1e3a8a] text-blue-300 px-3 py-2 rounded-md text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Website
                </button>
                <button className="bg-[#854d0e] text-yellow-300 px-3 py-2 rounded-md text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Document
                </button>
                <button className="bg-[#166534] text-green-300 px-3 py-2 rounded-md text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <line x1="3" x2="21" y1="9" y2="9" />
                    <line x1="3" x2="21" y1="15" y2="15" />
                    <line x1="9" x2="9" y1="21" y2="9" />
                    <line x1="15" x2="15" y1="21" y2="9" />
                  </svg>
                  Table
                </button>
                <button className="bg-[#581c87] text-purple-300 px-3 py-2 rounded-md text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Web Search
                </button>
                <button className="bg-[#9d174d] text-pink-300 px-3 py-2 rounded-md text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Rich Text
                </button>
                <button className="bg-[#1e1e1e] text-gray-300 border border-[#2a2a2a] px-3 py-2 rounded-md text-sm flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 4l16 16" />
                  </svg>
                  <span className="ml-2">Notion</span>
                </button>
              </div>
              <p className="text-sm text-gray-400 text-center max-w-md">
                Your bot uses these sources to answer questions. Click to add sources or drag and drop files. (.pdf,
                .html, .txt, .doc, .docx)
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Emulator */}
        <div className="w-96 border-l border-[#2a2a2a] flex flex-col bg-[#121212]">
          <div className="h-14 border-b border-[#2a2a2a] flex items-center px-4 justify-between">
            <span className="text-white">Emulator</span>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-24 h-24 mb-4">
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
            <button className="bg-[#0066cc] hover:bg-blue-600 rounded-md px-4 py-2 text-sm mb-4 text-white">
              Test your bot
            </button>
            <p className="text-sm text-gray-400 text-center">You can test your bot by typing a message below</p>
          </div>
          <div className="p-3 border-t border-[#2a2a2a]">
            <div className="flex items-center bg-[#1e1e1e] rounded-full border border-[#2a2a2a] px-3 py-2">
              <button className="text-gray-400 mr-2">
                <Plus className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="bg-transparent flex-1 outline-none text-sm text-white"
              />
              <button className="bg-[#2a2a2a] rounded-full p-1 ml-2">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
