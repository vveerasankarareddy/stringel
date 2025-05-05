"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface NodeEditorProps {
  nodeId: string
  nodeType: string
  nodeTitle: string
  nodeContent?: string
  isOpen: boolean
  onClose: () => void
  onSave: (nodeId: string, updates: { title?: string; content?: string }) => void
}

export function NodeEditor({
  nodeId,
  nodeType,
  nodeTitle,
  nodeContent = "",
  isOpen,
  onClose,
  onSave,
}: NodeEditorProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const [title, setTitle] = useState(nodeTitle)
  const [content, setContent] = useState(nodeContent)

  useEffect(() => {
    setTitle(nodeTitle)
    setContent(nodeContent)
  }, [nodeId, nodeTitle, nodeContent])

  const handleSave = () => {
    onSave(nodeId, { title, content })
  }

  const handleClose = () => {
    handleSave()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-50 border-t shadow-lg",
        isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e] text-white" : "border-gray-200 bg-white text-gray-900",
      )}
      style={{ height: "40%" }}
    >
      <div className="flex h-10 items-center justify-between border-b px-4">
        <div className="font-medium">
          Edit Node: {nodeType} - {nodeId}
        </div>
        <button
          onClick={handleClose}
          className={cn("rounded-md p-1 hover:bg-opacity-80", isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex h-[calc(100%-2.5rem)] flex-col gap-4 overflow-auto p-4">
        <div>
          <label className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
            Node Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "w-full rounded-md border px-3 py-2 outline-none focus:ring-2",
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white focus:ring-blue-600"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500",
            )}
          />
        </div>

        <div className="flex-1">
          <label className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={cn(
              "h-[calc(100%-2rem)] w-full rounded-md border px-3 py-2 outline-none focus:ring-2",
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white focus:ring-blue-600"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500",
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={cn(
              "rounded-md border px-4 py-2",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#2a2a2a] text-white hover:bg-[#333333]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            Cancel
          </button>
          <button onClick={handleSave} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
