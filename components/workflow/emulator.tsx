"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, RefreshCw } from "lucide-react"

export function Emulator() {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "bot" }>>([
    {
      id: "welcome",
      text: "Hi there! I'm your bot assistant. How can I help you today?",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user" as const,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I understand you're asking about that. Let me help you with it.",
        "That's an interesting question! Here's what I know.",
        "I'm processing your request. Give me a moment.",
        "I can definitely assist with that request.",
        "Let me check that for you right away.",
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: `bot-${Date.now()}`,
        text: randomResponse,
        sender: "bot" as const,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hi there! I'm your bot assistant. How can I help you today?",
        sender: "bot",
      },
    ])
  }

  return (
    <div className="flex h-full flex-col bg-[#121212]">
      <div className="flex items-center justify-between border-b border-[#2a2a2a] p-4">
        <h2 className="text-lg font-medium">Emulator</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded p-1 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
          title="Reset conversation"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-[#2a2a2a] text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-[#2a2a2a] p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-md border border-[#2a2a2a] bg-[#1e1e1e] px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
