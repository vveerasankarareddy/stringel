"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { WorkflowNode } from "./workflow-node"

interface Node {
  id: string
  type: string
  title: string
  description?: string
  x: number
  y: number
}

interface WorkflowCanvasProps {
  initialNodes?: Node[]
}

export function WorkflowCanvas({ initialNodes = [] }: WorkflowCanvasProps) {
  const [nodes, setNodes] = useState<Node[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 1000 })
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const initializedRef = useRef(false)

  // Initialize nodes only once when the component mounts
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true

      if (initialNodes.length > 0) {
        setNodes(initialNodes)
      } else {
        // Add default nodes if none provided
        setNodes([
          {
            id: "main",
            type: "main",
            title: "Main",
            description: "Entry point for the conversation",
            x: 100,
            y: 100,
          },
          {
            id: "error",
            type: "error",
            title: "Error",
            description: "Handles errors in the conversation",
            x: 100,
            y: 200,
          },
          {
            id: "timeout",
            type: "timeout",
            title: "Timeout",
            description: "Handles conversation timeouts",
            x: 100,
            y: 300,
          },
          {
            id: "end",
            type: "end",
            title: "Conversation End",
            description: "End of conversation flow",
            x: 100,
            y: 400,
          },
        ])
      }
    }
  }, []) // Empty dependency array ensures this only runs once

  const handleNodeSelect = (id: string) => {
    setSelectedNodeId(id)
  }

  const handleNodeMove = (id: string, x: number, y: number) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, x, y } : node)))
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDraggingCanvas(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setCanvasOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false)
  }

  const handleAddNode = () => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "custom",
      title: "New Node",
      description: "Custom workflow node",
      x: 300,
      y: 200,
    }
    setNodes((prev) => [...prev, newNode])
    setSelectedNodeId(newNode.id)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#121212]">
      <div className="absolute left-4 top-4 z-10 flex gap-2">
        <button onClick={handleAddNode} className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
          Add Node
        </button>
      </div>
      <div
        ref={canvasRef}
        className="absolute h-full w-full cursor-grab"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {nodes.map((node) => (
          <WorkflowNode
            key={node.id}
            id={node.id}
            type={node.type}
            title={node.title}
            description={node.description}
            x={node.x}
            y={node.y}
            isSelected={selectedNodeId === node.id}
            onSelect={handleNodeSelect}
            onMove={handleNodeMove}
          />
        ))}
      </div>
    </div>
  )
}
