"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Trash2, Edit } from "lucide-react"
import { useTheme } from "next-themes"

interface WorkflowNodeProps {
  id: string
  type: string
  title: string
  description?: string
  content?: string
  x: number
  y: number
  width?: number
  isSelected?: boolean
  isStartNode?: boolean
  isEndNode?: boolean
  onSelect: (id: string, isDrag: boolean) => void
  onMove: (id: string, x: number, y: number) => void
  onDelete?: (id: string) => void
  onStartConnection?: (id: string, portType: "input" | "output", e: React.MouseEvent) => void
  onEdit?: (id: string) => void
  onContentChange?: (id: string, content: string) => void
}

export function WorkflowNode({
  id,
  type,
  title,
  description,
  content,
  x,
  y,
  width = 280,
  isSelected = false,
  isStartNode = false,
  isEndNode = false,
  onSelect,
  onMove,
  onDelete,
  onStartConnection,
  onEdit,
  onContentChange,
}: WorkflowNodeProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const [nodeHeight, setNodeHeight] = useState(0)
  const [inputPortY, setInputPortY] = useState(0)
  const [outputPortY, setOutputPortY] = useState(0)
  const dragStartPosRef = useRef({ x: 0, y: 0 })
  const hasDraggedRef = useRef(false)

  // Measure node height and update port positions
  useEffect(() => {
    if (nodeRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height
          setNodeHeight(height)

          // Calculate port positions (centered vertically)
          const portY = height / 2
          setInputPortY(portY)
          setOutputPortY(portY)
        }
      })

      observer.observe(nodeRef.current)
      return () => observer.disconnect()
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on action buttons or ports
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest(".node-action") || e.target.closest(".node-port") || e.target.closest(".node-content-edit"))
    ) {
      return
    }

    setIsDragging(true)
    hasDraggedRef.current = false
    dragStartPosRef.current = { x: e.clientX, y: e.clientY }

    // Only track drag offset, don't select yet
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    })

    // Prevent default to avoid text selection during drag
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      onMove(id, newX, newY)

      // Check if we've moved enough to consider this a drag
      const dx = Math.abs(e.clientX - dragStartPosRef.current.x)
      const dy = Math.abs(e.clientY - dragStartPosRef.current.y)
      if (dx > 3 || dy > 3) {
        hasDraggedRef.current = true
      }
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)

      // Only select if it wasn't a significant drag
      if (!hasDraggedRef.current) {
        onSelect(id, false)
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    // Only handle click if it wasn't part of a drag
    if (!hasDraggedRef.current) {
      onSelect(id, false)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(id)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(id)
    }
  }

  const handleConnectionStart = (e: React.MouseEvent, portType: "input" | "output") => {
    e.stopPropagation()
    if (onStartConnection) {
      onStartConnection(id, portType, e)
    }
  }

  const handleEditContent = () => {
    setIsEditing(true)
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus()
      }
    }, 0)
  }

  const handleContentBlur = () => {
    setIsEditing(false)
    if (contentRef.current && onContentChange) {
      onContentChange(id, contentRef.current.value)
    }
  }

  // Determine border color based on node type and state
  const getBorderColor = () => {
    if (isStartNode) return isDarkMode ? "border-green-600" : "border-green-500"
    if (isEndNode) return isDarkMode ? "border-red-600" : "border-red-500"
    if (isSelected) return isDarkMode ? "border-blue-500" : "border-blue-400"
    return isDarkMode ? "border-gray-600" : "border-gray-300"
  }

  const getNodeStyle = () => {
    switch (type) {
      case "trigger":
        return {
          bgColor: isDarkMode ? "bg-blue-900/20" : "bg-blue-50",
          icon: (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ),
        }
      case "action":
        return {
          bgColor: isDarkMode ? "bg-indigo-900/20" : "bg-indigo-50",
          icon: (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11.5" fill="#0088cc" stroke="#0088cc" />
                <path
                  d="M9 8.51l3.89 3.09c.09.08.11.21.03.29 0 0-.03.04-.03.04l-3.89 3.09c-.13.1-.31 0-.31-.17V8.69c0-.18.18-.27.31-.18z"
                  fill="#fff"
                />
              </svg>
            </div>
          ),
        }
      case "condition":
        return {
          bgColor: isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50",
          icon: (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-100 text-yellow-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 12H18L15 21L9 3L6 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ),
        }
      case "ai":
        return {
          bgColor: isDarkMode ? "bg-purple-900/20" : "bg-purple-50",
          icon: (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 text-purple-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h2v-2h-2v2zm0-4h2V7h-2v7z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
        }
      default:
        return {
          bgColor: isDarkMode ? "bg-gray-800" : "bg-gray-50",
          icon: <div className="h-8 w-8 rounded-md bg-gray-100"></div>,
        }
    }
  }

  const nodeStyle = getNodeStyle()

  return (
    <div
      ref={nodeRef}
      className={cn(
        "absolute cursor-grab select-none rounded-lg border-2 shadow-sm",
        getBorderColor(),
        nodeStyle.bgColor,
        isDarkMode ? "text-white" : "text-gray-900",
        isSelected && "ring-2 ring-blue-500/30",
        isDragging && "cursor-grabbing shadow-md",
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      {/* Input port (left side) */}
      <div
        className={cn(
          "node-port absolute -left-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2",
          isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white",
        )}
        style={{ top: `${inputPortY}px`, transform: "translateY(-50%)" }}
        onMouseDown={(e) => handleConnectionStart(e, "input")}
      >
        <div className={cn("h-2 w-2 rounded-full", isDarkMode ? "bg-gray-400" : "bg-gray-500")} />
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {nodeStyle.icon}
          <div className="flex-1">
            <div className={cn("font-medium", isDarkMode ? "text-white" : "text-gray-900")}>{title}</div>
            {description && (
              <div className={cn("mt-1 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>{description}</div>
            )}

            {content && (
              <div
                className={cn(
                  "mt-3 rounded-md border p-3 text-sm",
                  isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600",
                  isEditing ? "border-blue-500" : "border-dashed",
                )}
              >
                {isEditing ? (
                  <textarea
                    ref={contentRef}
                    className={cn(
                      "w-full resize-none bg-transparent outline-none",
                      isDarkMode ? "text-gray-300" : "text-gray-600",
                    )}
                    defaultValue={content}
                    onBlur={handleContentBlur}
                    rows={3}
                  />
                ) : (
                  <div className="flex items-start">
                    <span className="flex-1">{content}</span>
                    <button
                      className="node-content-edit ml-2 rounded p-1 text-gray-400 hover:text-gray-600"
                      onClick={handleEditContent}
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {onEdit && (
              <button
                className={cn(
                  "node-action rounded p-1",
                  isDarkMode
                    ? "text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-300"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600",
                )}
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                className={cn(
                  "node-action rounded p-1",
                  isDarkMode
                    ? "text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-300"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600",
                )}
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Output port (right side) */}
      <div
        className={cn(
          "node-port absolute -right-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2",
          isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white",
        )}
        style={{ top: `${outputPortY}px`, transform: "translateY(-50%)" }}
        onMouseDown={(e) => handleConnectionStart(e, "output")}
      >
        <div className={cn("h-2 w-2 rounded-full", isDarkMode ? "bg-blue-400" : "bg-blue-500")} />
      </div>
    </div>
  )
}
