"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  channelType: string
  channelName: string
}

export function PreviewModal({ isOpen, onClose, channelType, channelName }: PreviewModalProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"
  const [userInput, setUserInput] = useState("")
  const [chatHistory, setChatHistory] = useState([{ role: "bot", message: "Hi there! How can I help you today?" }])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", message: userInput }])

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", message: `Thanks for your message: "${userInput}"! This is a simulated response.` },
      ])
    }, 1000)

    setUserInput("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={cn(
          "relative flex h-[80vh] w-[400px] flex-col rounded-lg shadow-lg",
          isDarkMode ? "bg-[#1e1e1e]" : "bg-white",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b p-4",
            isDarkMode ? "border-[#2a2a2a] text-white" : "border-gray-200",
          )}
        >
          <div className="flex items-center gap-2">
            {channelType === "telegram" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0088cc]">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
                </svg>
              </div>
            )}
            <h2 className="text-lg font-medium">{channelName} - Preview</h2>
          </div>
          <button
            onClick={onClose}
            className={cn(
              "rounded p-1 hover:bg-opacity-80",
              isDarkMode ? "hover:bg-[#2a2a2a] text-gray-300" : "hover:bg-gray-100 text-gray-500",
            )}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat history */}
        <div className={cn("flex-1 overflow-y-auto p-4", isDarkMode ? "bg-[#121212]" : "bg-gray-50")}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={cn(
                "mb-4 max-w-[80%] rounded-lg p-3",
                chat.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : isDarkMode
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-yellow-100 text-gray-800",
              )}
            >
              {chat.message}
            </div>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSendMessage}
          className={cn("border-t p-4", isDarkMode ? "border-[#2a2a2a]" : "border-gray-200")}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              className={cn(
                "flex-1 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                isDarkMode
                  ? "border-[#2a2a2a] bg-[#2a2a2a] text-white placeholder:text-gray-400"
                  : "border-gray-300 bg-white text-gray-900",
              )}
            />
            <button type="submit" className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
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
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
