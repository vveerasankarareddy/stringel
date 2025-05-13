"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { X, ChevronDown, ChevronUp } from "lucide-react"

interface NodeSidebarProps {
  nodeId: string | null
  nodeType?: string
  nodeTitle?: string
  nodeContent?: string
  isOpen: boolean
  onClose: () => void
  onSave: (nodeId: string, updates: { title?: string; content?: string; [key: string]: any }) => void
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
  const contentRef = useRef<HTMLDivElement>(null)

  const [title, setTitle] = useState(nodeTitle)
  const [content, setContent] = useState(nodeContent)
  const [sections, setSections] = useState<{ id: string; title: string; isOpen: boolean }[]>([
    { id: "general", title: "General Settings", isOpen: true },
    { id: "advanced", title: "Advanced Settings", isOpen: false },
    { id: "conditions", title: "Conditions", isOpen: false },
    { id: "variables", title: "Variables", isOpen: false },
  ])

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

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section)),
    )
  }

  if (!isOpen || !nodeId) return null

  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-50 flex h-full w-96 flex-col border-l shadow-lg transition-transform duration-300 ease-in-out",
        isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e] text-white" : "border-gray-200 bg-white text-gray-900",
      )}
    >
      {/* Fixed header */}
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 py-3">
        <div className="font-medium">
          <span className="text-lg">{nodeTitle || "Edit Node"}</span>
          <div className="text-xs opacity-60">
            {nodeType} - {nodeId}
          </div>
        </div>
        <button
          onClick={handleClose}
          className={cn("rounded-md p-2 transition-colors", isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100")}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* General section */}
          <div className="rounded-md border">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between p-3",
                isDarkMode ? "border-[#2a2a2a] bg-[#252525]" : "border-gray-100 bg-gray-50",
              )}
              onClick={() => toggleSection("general")}
            >
              <h3 className="font-medium">General Settings</h3>
              {sections.find((s) => s.id === "general")?.isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {sections.find((s) => s.id === "general")?.isOpen && (
              <div className="p-4 space-y-4">
                <div>
                  <label
                    className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                  >
                    Node Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 outline-none focus:ring-2 transition-all",
                      isDarkMode
                        ? "border-gray-600 bg-gray-800 text-white focus:ring-blue-600"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500",
                    )}
                  />
                </div>

                <div>
                  <label
                    className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                  >
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 outline-none focus:ring-2 transition-all",
                      isDarkMode
                        ? "border-gray-600 bg-gray-800 text-white focus:ring-blue-600"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500",
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Advanced section */}
          <div className="rounded-md border">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between p-3",
                isDarkMode ? "border-[#2a2a2a] bg-[#252525]" : "border-gray-100 bg-gray-50",
              )}
              onClick={() => toggleSection("advanced")}
            >
              <h3 className="font-medium">Advanced Settings</h3>
              {sections.find((s) => s.id === "advanced")?.isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {sections.find((s) => s.id === "advanced")?.isOpen && (
              <div className="p-4 space-y-4">
                <div>
                  <label
                    className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                  >
                    Node ID
                  </label>
                  <input
                    type="text"
                    value={nodeId}
                    disabled
                    className={cn(
                      "w-full rounded-md border px-3 py-2 bg-opacity-50 cursor-not-allowed",
                      isDarkMode
                        ? "border-gray-600 bg-gray-800 text-gray-400"
                        : "border-gray-300 bg-gray-100 text-gray-500",
                    )}
                  />
                </div>

                <div>
                  <label
                    className={cn("mb-1 block text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}
                  >
                    Node Type
                  </label>
                  <input
                    type="text"
                    value={nodeType}
                    disabled
                    className={cn(
                      "w-full rounded-md border px-3 py-2 bg-opacity-50 cursor-not-allowed",
                      isDarkMode
                        ? "border-gray-600 bg-gray-800 text-gray-400"
                        : "border-gray-300 bg-gray-100 text-gray-500",
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Conditions section */}
          <div className="rounded-md border">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between p-3",
                isDarkMode ? "border-[#2a2a2a] bg-[#252525]" : "border-gray-100 bg-gray-50",
              )}
              onClick={() => toggleSection("conditions")}
            >
              <h3 className="font-medium">Conditions</h3>
              {sections.find((s) => s.id === "conditions")?.isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {sections.find((s) => s.id === "conditions")?.isOpen && (
              <div className="p-4">
                <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  Configure conditions for this node to execute.
                </p>
                {/* Add condition controls here */}
                <div className="mt-3 flex items-center justify-center rounded-md border border-dashed p-4">
                  <span className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    No conditions configured
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Variables section */}
          <div className="rounded-md border">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between p-3",
                isDarkMode ? "border-[#2a2a2a] bg-[#252525]" : "border-gray-100 bg-gray-50",
              )}
              onClick={() => toggleSection("variables")}
            >
              <h3 className="font-medium">Variables</h3>
              {sections.find((s) => s.id === "variables")?.isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {sections.find((s) => s.id === "variables")?.isOpen && (
              <div className="p-4">
                <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  Define variables that can be used in this node.
                </p>
                {/* Add variable controls here */}
                <div className="mt-3 flex items-center justify-center rounded-md border border-dashed p-4">
                  <span className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    No variables defined
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Add more sections as needed */}
          <div className="h-20"></div> {/* Extra space at the bottom for better scrolling */}
        </div>
      </div>

      {/* Fixed footer with actions */}
      <div className="sticky bottom-0 border-t bg-inherit p-4 shadow-md">
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={cn(
              "rounded-md border px-4 py-2 transition-colors",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#2a2a2a] text-white hover:bg-[#333333]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
