"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

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
  onClick?: (id: string) => void
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
  onClick,
}: ConnectionProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  // Calculate control points for a curved path
  const dx = Math.abs(endX - startX)
  const controlPointX1 = startX + dx * 0.4
  const controlPointY1 = startY
  const controlPointX2 = endX - dx * 0.4
  const controlPointY2 = endY

  // Create the SVG path for a bezier curve
  const path = `M${startX},${startY} C${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${endX},${endY}`

  // Calculate the mid point for the label
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2 - 15 // Offset slightly above the path

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) onClick(id)
  }

  return (
    <g onClick={handleClick}>
      {/* Draw the connection line */}
      <path
        d={path}
        fill="none"
        stroke={isDarkMode ? (isSelected ? "#3b82f6" : "#6b7280") : isSelected ? "#2563eb" : "#a3aebf"}
        strokeWidth={isSelected ? "2.5" : "2"}
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
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
            )}
          >
            {label}
          </div>
        </foreignObject>
      )}
    </g>
  )
}
