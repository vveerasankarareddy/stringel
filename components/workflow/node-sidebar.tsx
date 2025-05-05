"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface NodeSidebarProps {
  nodeId: string | null
  nodeType?: string
  nodeTitle?: string
  nodeContent?: string
  isOpen: boolean
  onClose: () => void
  onSave: (nodeId: string, updates: { title?: string; content?: string }) => void
}

export function NodeSidebar({
  nodeId,
  nodeType = "",
  nodeTitle = "",
  nodeContent = "",
  isOpen,
  onClose,
  onSave,
}: NodeSidebarProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const [title, setTitle] = useState(nodeTitle)
  const [content, setContent] = useState(nodeContent)

  useEffect(() => {
    setTitle(nodeTitle)
    setContent(nodeContent)
  }, [nodeId, nodeTitle, nodeContent])

  const handleSave = () => {
    if (nodeId) {
      onSave(nodeId, { title, content })
    }
  }

  const handleClose = () => {
    handleSave()
    onClose()
  }

  if (!isOpen || !nodeId) return null

  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-50 flex h-full w-96 flex-col border-l shadow-lg",
        isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e] text-white" : "border-gray-200 bg-white text-gray-900",
      )}
    >
      {/* Fixed header */}
      <div className="flex h-16 items-center justify-between border-b px-4 py-3">
        <div className="font-medium">
          <span className="text-lg">{nodeTitle || "Edit Node"}</span>
          <div className="text-xs opacity-60">
            {nodeType} - {nodeId}
          </div>
        </div>
        <button
          onClick={handleClose}
          className={cn("rounded-md p-2", isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100")}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div>
            <label className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
              Node Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "w-full rounded-md border px-3 py-2 outline-none",
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:border-blue-600"
                  : "border-gray-300 bg-white text-gray-900 focus:border-blue-500",
              )}
            />
          </div>

          <div>
            <label className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className={cn(
                "w-full rounded-md border px-3 py-2 outline-none",
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white focus:border-blue-600"
                  : "border-gray-300 bg-white text-gray-900 focus:border-blue-500",
              )}
            />
          </div>
        </div>
      </div>

      {/* Fixed footer with actions */}
      <div className="border-t p-4">
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
