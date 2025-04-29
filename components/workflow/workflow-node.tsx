"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface WorkflowNodeProps {
  id: string
  type: string
  title: string
  description?: string
  x: number
  y: number
  isSelected?: boolean
  onSelect: (id: string) => void
  onMove: (id: string, x: number, y: number) => void
}

export function WorkflowNode({
  id,
  type,
  title,
  description,
  x,
  y,
  isSelected = false,
  onSelect,
  onMove,
}: WorkflowNodeProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    onSelect(id)
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      onMove(id, newX, newY)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getNodeColor = () => {
    switch (type) {
      case "main":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "timeout":
        return "bg-yellow-500"
      case "end":
        return "bg-blue-500"
      default:
        return "bg-purple-500"
    }
  }

  return (
    <div
      className={cn(
        "absolute cursor-grab select-none rounded-md border border-[#2a2a2a] bg-[#1e1e1e] p-3 shadow-md transition-shadow",
        isSelected && "border-blue-500 shadow-blue-500/20",
        isDragging && "cursor-grabbing shadow-lg",
      )}
      style={{ left: `${x}px`, top: `${y}px`, width: "200px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex items-center gap-2">
        <div className={cn("h-3 w-3 rounded-full", getNodeColor())} />
        <div className="font-medium text-white">{title}</div>
      </div>
      {description && <div className="mt-2 text-xs text-gray-400">{description}</div>}
    </div>
  )
}
