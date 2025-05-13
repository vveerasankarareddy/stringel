"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface ConnectionProps {
  id: string
  sourceId: string
  targetId: string
  startX: number
  startY: number
  endX: number
  endY: number
  label?: string
  isSelected?: boolean
  isHighlighted?: boolean
  onClick?: (id: string) => void
  onDoubleClick?: (id: string) => void
}

export function WorkflowConnection({
  id,
  sourceId,
  targetId,
  startX,
  startY,
  endX,
  endY,
  label,
  isSelected = false,
  isHighlighted = false,
  onClick,
  onDoubleClick,
}: ConnectionProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  // Calculate control points for a curved path
  const dx = Math.abs(endX - startX)
  const dy = Math.abs(endY - startY)

  // Simple horizontal bezier curve
  const controlPointX1 = startX + dx * 0.4
  const controlPointY1 = startY
  const controlPointX2 = endX - dx * 0.4
  const controlPointY2 = endY

  // Create the SVG path for a bezier curve
  const path = `M${startX},${startY} C${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${endX},${endY}`

  // Calculate the mid point for the label
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) onClick(id)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDoubleClick) onDoubleClick(id)
  }

  return (
    <g onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {/* Draw the connection line */}
      <path
        d={path}
        fill="none"
        stroke={isSelected ? (isDarkMode ? "#6366f1" : "#4f46e5") : isDarkMode ? "#6b7280" : "#a3aebf"}
        strokeWidth={isSelected || isHighlighted ? "2" : "1.5"}
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        className="transition-colors"
        data-source={sourceId}
        data-target={targetId}
      />

      {/* Invisible wider path for easier selection */}
      <path d={path} fill="none" stroke="transparent" strokeWidth="10" className="cursor-pointer" />

      {/* Display the label if provided */}
      {label && (
        <foreignObject
          x={midX - 30}
          y={midY - 15}
          width="60"
          height="30"
          className="overflow-visible pointer-events-none"
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium shadow-sm",
              isDarkMode ? "bg-[#1e1e1e] text-gray-300" : "bg-white text-gray-500",
              isSelected && (isDarkMode ? "bg-blue-900/50 text-blue-200" : "bg-blue-50 text-blue-700"),
              isHighlighted && (isDarkMode ? "bg-pink-900/50 text-pink-200" : "bg-pink-50 text-pink-700"),
            )}
          >
            {label}
          </div>
        </foreignObject>
      )}
    </g>
  )
}
