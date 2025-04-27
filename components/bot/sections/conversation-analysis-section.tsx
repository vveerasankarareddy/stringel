"use client"

import { useState } from "react"
import { CircleHelp, RefreshCw, ExternalLink } from "lucide-react"

export function ConversationAnalysisSection() {
  const [activeTab, setActiveTab] = useState("sentiment")

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="font-medium">Conversation Analysis</span>
        <CircleHelp className="w-4 h-4 text-gray-500" />
      </div>
      <div className="bg-[#18181B]/90 rounded-lg border border-[#2a2a2a] overflow-hidden">
        <div className="border-b border-[#2a2a2a]">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm ${activeTab === "sentiment" ? "border-b-2 border-blue-500" : "text-gray-400"}`}
              onClick={() => setActiveTab("sentiment")}
            >
              Sentiment
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "topics" ? "border-b-2 border-blue-500" : "text-gray-400"}`}
              onClick={() => setActiveTab("topics")}
            >
              Topics
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "resolution" ? "border-b-2 border-blue-500" : "text-gray-400"}`}
              onClick={() => setActiveTab("resolution")}
            >
              Resolution
            </button>
            <div className="ml-auto px-4 py-2">
              <button className="flex items-center gap-1 text-sm text-blue-500">
                <span>More</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 h-64 relative">
          <div className="absolute top-2 right-2">
            <button className="text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {activeTab === "sentiment" && (
            <div className="h-full">
              <div className="flex items-end justify-between h-[calc(100%-30px)]">
                {["18 Apr", "19 Apr", "20 Apr", "21 Apr", "22 Apr", "23 Apr", "24 Apr"].map((date, index) => {
                  // Generate random heights for the chart bars
                  const positiveHeight = 20 + Math.random() * 40
                  const neutralHeight = 10 + Math.random() * 30
                  const negativeHeight = 5 + Math.random() * 20

                  return (
                    <div key={index} className="flex flex-col items-center group">
                      <div className="relative w-12 flex flex-col">
                        <div
                          className="w-full bg-red-500/70 rounded-t-sm transition-all duration-300 group-hover:bg-red-500"
                          style={{ height: `${negativeHeight}px` }}
                        >
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-[#18181B] text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {Math.round(negativeHeight)}%
                          </div>
                        </div>
                        <div
                          className="w-full bg-blue-500/70 transition-all duration-300 group-hover:bg-blue-500"
                          style={{ height: `${neutralHeight}px` }}
                        />
                        <div
                          className="w-full bg-green-500/70 rounded-b-sm transition-all duration-300 group-hover:bg-green-500"
                          style={{ height: `${positiveHeight}px` }}
                        />
                      </div>
                      <div className="text-xs mt-2 text-gray-400">{date}</div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-500/70"></div>
                  <span className="text-xs text-gray-400">Positive</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-blue-500/70"></div>
                  <span className="text-xs text-gray-400">Neutral</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-red-500/70"></div>
                  <span className="text-xs text-gray-400">Negative</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="h-full flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Product Questions</span>
                    <span className="text-xs">42%</span>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Billing Issues</span>
                    <span className="text-xs">28%</span>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">Technical Support</span>
                    <span className="text-xs">18%</span>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs">General Inquiries</span>
                    <span className="text-xs">12%</span>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resolution" && (
            <div className="h-full flex items-center justify-center">
              <div className="flex gap-8">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2a2a2a" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="50.24"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="55" fontSize="16" textAnchor="middle" fill="currentColor">
                      80%
                    </text>
                  </svg>
                  <p className="text-sm mt-2">Resolved</p>
                </div>

                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2a2a2a" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#f59e0b"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="188.4"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="55" fontSize="16" textAnchor="middle" fill="currentColor">
                      25%
                    </text>
                  </svg>
                  <p className="text-sm mt-2">Escalated</p>
                </div>

                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2a2a2a" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#ef4444"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="238.64"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="55" fontSize="16" textAnchor="middle" fill="currentColor">
                      5%
                    </text>
                  </svg>
                  <p className="text-sm mt-2">Unresolved</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
