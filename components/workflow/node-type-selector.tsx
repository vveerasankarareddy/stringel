"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { MessageSquare, GitBranch, Clock, Bot, Play, X, Zap } from "lucide-react"

interface NodeTypeSelectorProps {
  onSelect: (type: string) => void
  position: { x: number; y: number }
  onClose: () => void
  forConnection?: boolean
}

export function NodeTypeSelector({ onSelect, position, onClose, forConnection = false }: NodeTypeSelectorProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const handleSelect = (type: string) => {
    onSelect(type)
    onClose()
  }

  return (
    <div
      className={cn(
        "absolute z-50 w-56 rounded-lg border shadow-lg",
        isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e] text-white" : "border-gray-200 bg-white text-gray-900",
      )}
      style={{ top: position.y, left: position.x }}
    >
      <div className="p-2">
        <div className="mb-2 px-3 py-1 text-sm font-medium text-gray-500">
          {forConnection ? "Continue with" : "Add Node"}
        </div>
        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
          )}
          onClick={() => handleSelect("telegram")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11.5" fill="#0088cc" stroke="#0088cc" />
              <path
                d="M9 8.51l3.89 3.09c.09.08.11.21.03.29 0 0-.03.04-.03.04l-3.89 3.09c-.13.1-.31 0-.31-.17V8.69c0-.18.18-.27.31-.18z"
                fill="#fff"
              />
            </svg>
          </div>
          <span>{forConnection ? "Telegram Message" : "Telegram"}</span>
        </button>
        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
          )}
          onClick={() => handleSelect("ai")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <Bot className="h-4 w-4" />
          </div>
          <span>{forConnection ? "AI Response" : "AI Step"}</span>
        </button>
        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
          )}
          onClick={() => handleSelect("action")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <MessageSquare className="h-4 w-4" />
          </div>
          <span>{forConnection ? "Action Step" : "Action"}</span>
        </button>
        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
          )}
          onClick={() => handleSelect("condition")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <GitBranch className="h-4 w-4" />
          </div>
          <span>{forConnection ? "Conditional Branch" : "Condition"}</span>
        </button>
        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
          )}
          onClick={() => handleSelect("delay")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Clock className="h-4 w-4" />
          </div>
          <span>{forConnection ? "Time Delay" : "Delay"}</span>
        </button>

        <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>

        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
            "text-green-600",
          )}
          onClick={() => handleSelect("start")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Play className="h-4 w-4" />
          </div>
          <span>{forConnection ? "New Starting Point" : "Start Automation"}</span>
        </button>

        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
            "text-red-500",
          )}
          onClick={() => handleSelect("trigger")}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Zap className="h-4 w-4" />
          </div>
          <span>{forConnection ? "Trigger Event" : "Add Trigger"}</span>
        </button>

        <button
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm",
            isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
            "text-gray-500",
          )}
          onClick={onClose}
        >
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <X className="h-4 w-4" />
          </div>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  )
}
