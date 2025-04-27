"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function UsagePage() {
  const [currentMonth, setCurrentMonth] = useState("Apr - 2025")

  return (
    <MainLayout>
      <div className="p-6 h-full overflow-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">Usage</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#1e1e1e] rounded-md border border-[#2a2a2a]">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-sm text-white">{currentMonth}</span>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Increase Limits
            </Button>
          </div>
        </div>

        {/* AI Spend Overview */}
        <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] mb-6">
          <div className="p-6">
            <div className="flex justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-white">AI Spend</h2>
                <p className="text-sm text-gray-400">
                  Track your usage of third-party AI services here. This meter helps you monitor your spend against your
                  budget.
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-3xl font-bold text-white">$0.07</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-400">Daily Average</div>
                <div className="text-3xl font-bold text-white">$0.01</div>
              </div>
            </div>
          </div>

          <div className="h-64 px-6 pb-6">
            <div className="h-full w-full bg-[#1e1e1e] rounded-md border border-[#2a2a2a] relative">
              {/* Y-axis labels */}
              <div className="absolute left-2 top-2 text-xs text-gray-500">$0.08</div>
              <div className="absolute left-2 top-16 text-xs text-gray-500">$0.06</div>
              <div className="absolute left-2 top-32 text-xs text-gray-500">$0.04</div>
              <div className="absolute left-2 top-48 text-xs text-gray-500">$0.02</div>
              <div className="absolute left-2 bottom-2 text-xs text-gray-500">$0.00</div>

              {/* X-axis labels */}
              <div className="absolute bottom-2 left-10 right-10 flex justify-between">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="text-xs text-gray-500">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Graph line */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L60,100 L70,80 L80,40 L90,20 L100,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M0,100 L60,100 L70,80 L80,40 L90,20 L100,30 L100,100 Z" fill="rgba(59, 130, 246, 0.1)" />
              </svg>

              {/* Dotted budget line */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,70 L100,30" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Usage Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Collaborators */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">Collaborators</h3>
            <p className="text-sm text-gray-400 mb-4">The number of members in your workspace</p>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-white">0 of 1</div>
              <div className="text-sm text-white">0%</div>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>

          {/* Bot Count */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">Bot Count</h3>
            <p className="text-sm text-gray-400 mb-4">The number of bots in your workspace</p>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-white">0 of 1</div>
              <div className="text-sm text-white">0%</div>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>

          {/* Always Alive */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">Always Alive</h3>
            <p className="text-sm text-gray-400 mb-4">The number of bots that are in always alive mode</p>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-white">0 of 0</div>
              <div className="text-sm text-white">0%</div>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* AI Spend Detail */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">AI Spend</h3>
            <p className="text-sm text-gray-400 mb-4">
              Track your usage of third-party AI services here. This meter helps you monitor your spend against your
              budget.
            </p>

            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a2a" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset="268.565"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-white">$0.07</div>
                <div className="text-sm text-gray-400">of $5.00</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-400">[Deleted bot]</span>
              </div>
              <div className="text-sm text-white">$0.07</div>
            </div>
          </div>

          {/* Incoming Messages & Events */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">Incoming Messages & Events</h3>
            <p className="text-sm text-gray-400 mb-4">Incoming messages and events that trigger bot activation.</p>

            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a2a" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset="254.43"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-gray-400">of 500</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-400">[Deleted bot]</span>
              </div>
              <div className="text-sm text-white">12</div>
            </div>
          </div>
        </div>

        {/* Storage Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* File Storage */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">File Storage</h3>
            <p className="text-sm text-gray-400 mb-4">
              This is the storage for files that are not vectorized (e.g. images used in conversations).
            </p>
            <div className="flex justify-center mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="text-center text-sm text-gray-400">No usage data available for this period.</div>
          </div>

          {/* Table Rows */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">Table Rows</h3>
            <p className="text-sm text-gray-400 mb-4">The number of rows in your tables</p>
            <div className="flex justify-center mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <line x1="3" x2="21" y1="15" y2="15" />
                <line x1="9" x2="9" y1="21" y2="9" />
                <line x1="15" x2="15" y1="21" y2="9" />
              </svg>
            </div>
            <div className="text-center text-sm text-gray-400">No usage data available for this period.</div>
          </div>

          {/* Vector DB Storage */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6">
            <h3 className="text-lg font-bold text-white mb-1">Vector DB Storage</h3>
            <p className="text-sm text-gray-400 mb-4">
              This is the storage for Knowledge Base documents. 100MB is about 28,500 vectors
            </p>
            <div className="flex justify-center mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div className="text-center text-sm text-gray-400">No usage data available for this period.</div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
