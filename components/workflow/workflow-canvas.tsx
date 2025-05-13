"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { WorkflowNode } from "./workflow-node"
import { WorkflowConnection } from "./workflow-connection"
import { NodeSidebar } from "./node-sidebar"
import { Plus, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Define types for nodes and connections
interface NodeData {
  id: string
  type: string
  title: string
  description?: string
  content?: string
  x: number
  y: number
  width?: number
  height?: number
  isStartNode?: boolean
  isEndNode?: boolean
}

interface Edge {
  id: string
  sourceId: string
  targetId: string
  sourcePort: "input" | "output"
  targetPort: "input" | "output"
  label?: string
}

interface WorkflowCanvasProps {
  initialNodes?: NodeData[]
  initialEdges?: Edge[]
}

export function WorkflowCanvas({ initialNodes = [], initialEdges = [] }: WorkflowCanvasProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  // State for nodes and connections
  const [nodes, setNodes] = useState<NodeData[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  // UI state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([])
  const [highlightedEdgeIds, setHighlightedEdgeIds] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Canvas interaction state
  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const initializedRef = useRef(false)

  // Connection creation state
  const [isCreatingConnection, setIsCreatingConnection] = useState(false)
  const [tempConnection, setTempConnection] = useState<{
    startX: number
    startY: number
    endX: number
    endY: number
    sourceId: string
    sourcePort: "input" | "output"
  } | null>(null)

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean
    x: number
    y: number
    nodeId?: string
    edgeId?: string
    type: "canvas" | "node" | "edge"
  }>({
    isOpen: false,
    x: 0,
    y: 0,
    type: "canvas",
  })

  // Node dimensions cache
  const [nodeDimensions, setNodeDimensions] = useState<Record<string, { width: number; height: number }>>({})

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0)

  // Initialize nodes and connections
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true

      if (initialNodes.length > 0) {
        setNodes(initialNodes)
      } else {
        // Add default nodes if none provided
        setNodes([
          {
            id: "trigger-1",
            type: "trigger",
            title: "When...",
            description: "A Trigger is an event that starts your Automation",
            x: 100,
            y: 100,
            isStartNode: true,
          },
          {
            id: "action-1",
            type: "action",
            title: "Telegram Send Message",
            description: "Send a message to your Telegram channel",
            content: "Add a text",
            x: 480,
            y: 100,
          },
          {
            id: "action-2",
            type: "action",
            title: "Telegram Send Message #1",
            content: "This is a message with more content to demonstrate auto-sizing",
            x: 860,
            y: 100,
            isEndNode: true,
          },
        ])
      }

      if (initialEdges.length > 0) {
        setEdges(initialEdges)
      } else {
        // Add default connections
        setEdges([
          {
            id: "conn-1",
            sourceId: "trigger-1",
            targetId: "action-1",
            sourcePort: "output",
            targetPort: "input",
            label: "Then",
          },
          {
            id: "conn-2",
            sourceId: "action-1",
            targetId: "action-2",
            sourcePort: "output",
            targetPort: "input",
            label: "Next",
          },
        ])
      }
    }
  }, [initialNodes, initialEdges])

  // Calculate node positions for connections
  const getConnectionCoordinates = useCallback(
    (edge: Edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.sourceId)
      const targetNode = nodes.find((node) => node.id === edge.targetId)

      if (!sourceNode || !targetNode) {
        return { startX: 0, startY: 0, endX: 0, endY: 0 }
      }

      const sourceWidth = sourceNode.width || 280
      const sourceHeight = nodeDimensions[sourceNode.id]?.height || 150
      const targetHeight = nodeDimensions[targetNode.id]?.height || 150

      // Output port (right) of source node
      const startX = sourceNode.x + sourceWidth
      const startY = sourceNode.y + sourceHeight / 2

      // Input port (left) of target node
      const endX = targetNode.x
      const endY = targetNode.y + targetHeight / 2

      return { startX, startY, endX, endY }
    },
    [nodes, nodeDimensions],
  )

  // Update canvas position and scale
  const applyTransform = useCallback(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${scale})`
    }
  }, [canvasOffset.x, canvasOffset.y, scale])

  // Apply transform when dependencies change
  useEffect(() => {
    applyTransform()
  }, [applyTransform])

  // Close context menu on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.isOpen) {
        setContextMenu((prev) => ({ ...prev, isOpen: false }))
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [contextMenu.isOpen])

  const handleNodeSelect = (id: string, isDragEvent: boolean) => {
    setSelectedNodeId(id)
    setSelectedEdgeId(null)

    // Only open sidebar for click events, not drag
    if (!isDragEvent) {
      setSidebarOpen(true)
    }
  }

  const handleEdgeSelect = (id: string) => {
    setSelectedEdgeId(id)
    setSelectedNodeId(null)
    setSidebarOpen(false)
  }

  const handleNodeMove = (id: string, x: number, y: number) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, x, y } : node)))
  }

  const handleNodeDelete = (id: string) => {
    // Delete all connections involving this node
    setEdges((prev) => prev.filter((edge) => edge.sourceId !== id && edge.targetId !== id))

    // Remove the node
    setNodes((prev) => prev.filter((node) => node.id !== id))

    // Close context menu
    setContextMenu((prev) => ({ ...prev, isOpen: false }))

    if (selectedNodeId === id) {
      setSelectedNodeId(null)
      setSidebarOpen(false)
    }
  }

  const handleNodeResize = (id: string, width: number, height: number) => {
    setNodeDimensions((prev) => ({
      ...prev,
      [id]: { width, height },
    }))
  }

  const handleEdgeDelete = (id: string) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== id))

    if (selectedEdgeId === id) {
      setSelectedEdgeId(null)
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || e.target === svgRef.current) {
      if (e.button === 0) {
        // Left click
        setIsDraggingCanvas(true)
        setDragStart({ x: e.clientX, y: e.clientY })

        // Clear selections
        setSelectedNodeId(null)
        setSelectedEdgeId(null)
        setSidebarOpen(false)
        setContextMenu((prev) => ({ ...prev, isOpen: false }))
      } else if (e.button === 2) {
        // Right click
        // Open context menu for canvas
        e.preventDefault()
        setContextMenu({
          isOpen: true,
          x: e.clientX,
          y: e.clientY,
          type: "canvas",
        })
      }
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    // Handle canvas dragging
    if (isDraggingCanvas && e.buttons === 1) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setCanvasOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }))
      setDragStart({ x: e.clientX, y: e.clientY })
      applyTransform()
    }

    // Update temp connection if creating one
    if (isCreatingConnection && tempConnection) {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (canvasRect) {
        const x = (e.clientX - canvasRect.left - canvasOffset.x) / scale
        const y = (e.clientY - canvasRect.top - canvasOffset.y) / scale
        setTempConnection((prev) => (prev ? { ...prev, endX: x, endY: y } : null))
      }
    }
  }

  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    setIsDraggingCanvas(false)

    // Handle connection completion
    if (isCreatingConnection && tempConnection) {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (canvasRect) {
        const mouseX = (e.clientX - canvasRect.left - canvasOffset.x) / scale
        const mouseY = (e.clientY - canvasRect.top - canvasOffset.y) / scale

        // Check if dropped on a node port
        const targetInfo = findPortAtPosition(mouseX, mouseY)

        if (
          targetInfo &&
          targetInfo.nodeId !== tempConnection.sourceId &&
          targetInfo.portType !== tempConnection.sourcePort
        ) {
          // Don't allow connecting input to input or output to output
          if (
            (tempConnection.sourcePort === "output" && targetInfo.portType === "input") ||
            (tempConnection.sourcePort === "input" && targetInfo.portType === "output")
          ) {
            // Create new edge
            const newEdge: Edge = {
              id: `edge-${Date.now()}`,
              sourceId: tempConnection.sourcePort === "output" ? tempConnection.sourceId : targetInfo.nodeId,
              targetId: tempConnection.sourcePort === "output" ? targetInfo.nodeId : tempConnection.sourceId,
              sourcePort: "output",
              targetPort: "input",
              label: "Next",
            }

            setEdges((prev) => [...prev, newEdge])
          }
        }
      }

      // Reset temp connection
      setIsCreatingConnection(false)
      setTempConnection(null)
    }
  }

  const handleCanvasContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      type: "canvas",
    })
  }

  const handleAddNode = (type: string, x: number, y: number) => {
    const id = `${type}-${Date.now()}`

    let title = "New Node"
    let description = ""
    let content = undefined

    switch (type) {
      case "trigger":
        title = "When..."
        description = "A new trigger for your automation flow"
        break
      case "telegram":
        title = "Telegram Send Message"
        description = "Send a message to your Telegram channel"
        content = "Add a text"
        break
      case "action":
        title = "Action"
        description = "Perform an action in your workflow"
        content = "Configure this action"
        break
      case "condition":
        title = "Condition"
        description = "Branch your flow based on conditions"
        content = "if [condition] then..."
        break
      case "ai":
        title = "AI Step"
        description = "Use AI to process or generate content"
        content = "Configure AI behavior"
        break
      case "delay":
        title = "Delay"
        description = "Wait for a specified time period"
        content = "Wait for 5 minutes"
        break
    }

    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return

    // Find the rightmost node to place the new node after it
    let rightmostX = 100
    nodes.forEach((node) => {
      const nodeRightEdge = node.x + (node.width || 280)
      if (nodeRightEdge > rightmostX) {
        rightmostX = nodeRightEdge
      }
    })

    // Place new node to the right with 80px spacing
    const newNodeX = rightmostX + 80

    // Use the y position from the context menu if it's within the canvas,
    // otherwise use a standard y positioning
    const canvasY = (y - canvasRect.top - canvasOffset.y) / scale

    // If there are no nodes, place at standard position, otherwise align with existing nodes
    const newNodeY = nodes.length === 0 ? 100 : nodes[0].y

    const newNode: NodeData = {
      id,
      type,
      title,
      description,
      content,
      x: newNodeX,
      y: newNodeY,
      isStartNode: type === "trigger" && nodes.length === 0,
      isEndNode: false,
    }

    setNodes((prev) => [...prev, newNode])
    setSelectedNodeId(id)
    setSidebarOpen(true)

    setContextMenu((prev) => ({ ...prev, isOpen: false }))
  }

  const startConnectionDrag = (nodeId: string, portType: "input" | "output", e: React.MouseEvent) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    setIsCreatingConnection(true)

    const nodeWidth = node.width || 280
    const nodeHeight = nodeDimensions[nodeId]?.height || 150
    let startX, startY

    if (portType === "output") {
      startX = node.x + nodeWidth // Right side
      startY = node.y + nodeHeight / 2 // Middle height
    } else {
      startX = node.x // Left side
      startY = node.y + nodeHeight / 2 // Middle height
    }

    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (canvasRect) {
      const mouseX = (e.clientX - canvasRect.left - canvasOffset.x) / scale
      const mouseY = (e.clientY - canvasRect.top - canvasOffset.y) / scale

      setTempConnection({
        startX,
        startY,
        endX: mouseX,
        endY: mouseY,
        sourceId: nodeId,
        sourcePort: portType,
      })
    }
  }

  const findPortAtPosition = (x: number, y: number): { nodeId: string; portType: "input" | "output" } | null => {
    const portRadius = 15 // Increased hit area

    for (const node of nodes) {
      const nodeWidth = node.width || 280
      const nodeHeight = nodeDimensions[node.id]?.height || 150

      // Input port (left)
      const inputPortX = node.x
      const inputPortY = node.y + nodeHeight / 2 // Middle height

      if (Math.sqrt(Math.pow(x - inputPortX, 2) + Math.pow(y - inputPortY, 2)) <= portRadius) {
        return { nodeId: node.id, portType: "input" }
      }

      // Output port (right)
      const outputPortX = node.x + nodeWidth
      const outputPortY = node.y + nodeHeight / 2 // Middle height

      if (Math.sqrt(Math.pow(x - outputPortX, 2) + Math.pow(y - outputPortY, 2)) <= portRadius) {
        return { nodeId: node.id, portType: "output" }
      }
    }

    return null
  }

  const findNodeAtPosition = (x: number, y: number): string | null => {
    // Check if coordinates are within any node
    for (const node of nodes) {
      const nodeWidth = node.width || 280
      const nodeHeight = 150 // Approximate height

      if (x >= node.x && x <= node.x + nodeWidth && y >= node.y && y <= node.y + nodeHeight) {
        return node.id
      }
    }

    return null
  }

  const handleNodeContextMenu = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      nodeId,
      type: "node",
    })
  }

  const handleNodeContentChange = (nodeId: string, content: string) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, content } : node)))
  }

  // Handle node editor save
  const handleNodeEditorSave = (nodeId: string, updates: { title?: string; content?: string; [key: string]: any }) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              ...(updates.title ? { title: updates.title } : {}),
              ...(updates.content ? { content: updates.content } : {}),
            }
          : node,
      ),
    )
  }

  // Handle node double click
  const handleNodeDoubleClick = (nodeId: string) => {
    setSelectedNodeId(nodeId)
    setSidebarOpen(true)
  }

  // Handle node collapse toggle
  const handleNodeCollapseToggle = (nodeId: string) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, isCollapsed: !node.isCollapsed } : node)))
  }

  // Handle node resize
  const handleNodeHeightChange = (nodeId: string, height: number) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, height } : node)))
  }

  // Auto layout the nodes
  const autoLayoutNodes = () => {
    // Simple horizontal layout from left to right
    const startNode = nodes.find((node) => node.isStartNode) || nodes[0]
    if (!startNode) return

    // Start with the node that has no incoming edges (assuming it's a start node)
    const nodeOrder: string[] = []
    const visited = new Set<string>()

    // First, collect all nodes with no incoming edges
    const nodesWithNoIncoming = nodes
      .filter((node) => !edges.some((edge) => edge.targetId === node.id))
      .map((node) => node.id)

    // DFS to determine node order
    const dfs = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)
      nodeOrder.push(nodeId)

      // Find all outgoing edges
      const outgoingEdges = edges.filter((edge) => edge.sourceId === nodeId)
      outgoingEdges.forEach((edge) => {
        dfs(edge.targetId)
      })
    }

    // Start from nodes with no incoming edges
    nodesWithNoIncoming.forEach((nodeId) => {
      dfs(nodeId)
    })

    // Add any remaining nodes
    nodes.forEach((node) => {
      if (!visited.has(node.id)) {
        nodeOrder.push(node.id)
      }
    })

    // Position nodes horizontally
    const baseY = nodes[0].y // Keep the same y position
    const spacing = 80 // 80px spacing between nodes

    setNodes((prev) => {
      const updatedNodes = [...prev]
      let currentX = 100 // Start position

      nodeOrder.forEach((nodeId) => {
        const nodeIndex = updatedNodes.findIndex((n) => n.id === nodeId)
        if (nodeIndex >= 0) {
          const nodeWidth = updatedNodes[nodeIndex].width || 280
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            x: currentX,
            y: baseY,
          }
          currentX += nodeWidth + spacing
        }
      })

      return updatedNodes
    })
  }

  // Search for nodes by title or content
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setHighlightedNodeIds([])
    setHighlightedEdgeIds([])
  }

  const handleFocusNextSearchResult = () => {
    if (searchResults.length === 0) return

    // Focus on the current search result
    const nodeId = searchResults[currentSearchIndex]
    const node = nodes.find((n) => n.id === nodeId)

    if (node) {
      // Center the node in the viewport
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (canvasRect) {
        setCanvasOffset({
          x: canvasRect.width / 2 - node.x - 140,
          y: canvasRect.height / 2 - node.y - 75,
        })

        // Select the node
        setSelectedNodeId(nodeId)

        // Update the search index for next time
        setCurrentSearchIndex((currentSearchIndex + 1) % searchResults.length)
      }
    }
  }

  // Reset zoom and position
  const resetCanvas = () => {
    setCanvasOffset({ x: 0, y: 0 })
    setScale(1)
  }

  // Get the selected node data
  const selectedNode = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId) : null

  return (
    <div className={cn("relative flex h-full w-full overflow-hidden", isDarkMode ? "bg-[#121212]" : "bg-gray-50")}>
      <div
        ref={canvasRef}
        className="relative flex-1 overflow-hidden"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        onContextMenu={handleCanvasContextMenu}
      >
        {/* Canvas controls */}
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          <button
            onClick={() => {
              setContextMenu({
                isOpen: true,
                x: 100,
                y: 100,
                type: "canvas",
              })
            }}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <Plus className="h-4 w-4" />
            <span>Add Node</span>
          </button>

          <button
            onClick={autoLayoutNodes}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <span>Auto Layout</span>
          </button>
        </div>

        {/* Search bar */}
        {/* <div className="absolute left-4 top-16 z-10 w-64">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} onFocusNext={handleFocusNextSearchResult} />
        </div> */}

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-colors",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-colors",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={resetCanvas}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-colors",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* SVG layer for connections */}
        <svg
          ref={svgRef}
          className="absolute h-full w-full"
          style={{
            transformOrigin: "0 0",
          }}
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={isDarkMode ? "#6b7280" : "#a3aebf"} />
            </marker>
          </defs>

          {/* Render edges */}
          {edges.map((edge) => {
            const points = getConnectionCoordinates(edge)
            return (
              <WorkflowConnection
                key={edge.id}
                id={edge.id}
                sourceId={edge.sourceId}
                targetId={edge.targetId}
                startX={points.startX}
                startY={points.startY}
                endX={points.endX}
                endY={points.endY}
                label={edge.label}
                isSelected={selectedEdgeId === edge.id}
                isHighlighted={highlightedEdgeIds.includes(edge.id)}
                onClick={(id) => handleEdgeSelect(id)}
              />
            )
          })}

          {/* Temporary connection when dragging */}
          {isCreatingConnection && tempConnection && (
            <path
              d={`M${tempConnection.startX},${tempConnection.startY} C${tempConnection.startX + 100},${tempConnection.startY} ${tempConnection.endX - 100},${tempConnection.endY} ${tempConnection.endX},${tempConnection.endY}`}
              fill="none"
              stroke={isDarkMode ? "#6b7280" : "#a3aebf"}
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          )}
        </svg>

        {/* Nodes layer */}
        <div
          className="relative h-full w-full"
          style={{
            transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {nodes.map((node) => (
            <WorkflowNode
              key={node.id}
              id={node.id}
              type={node.type}
              title={node.title}
              description={node.description}
              content={node.content}
              x={node.x}
              y={node.y}
              width={node.width || 280}
              isSelected={selectedNodeId === node.id}
              isStartNode={node.isStartNode}
              isEndNode={node.isEndNode}
              isHighlighted={highlightedNodeIds.includes(node.id)}
              onSelect={handleNodeSelect}
              onMove={handleNodeMove}
              onDelete={handleNodeDelete}
              onStartConnection={startConnectionDrag}
              onContextMenu={handleNodeContextMenu}
              onContentChange={handleNodeContentChange}
              onDoubleClick={handleNodeDoubleClick}
              onResize={handleNodeResize}
            />
          ))}
        </div>

        {/* Context Menu */}
        {contextMenu.isOpen && (
          <div
            className={cn(
              "absolute z-50 w-56 rounded-lg border shadow-lg",
              isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e] text-white" : "border-gray-200 bg-white text-gray-900",
            )}
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            {contextMenu.type === "canvas" && (
              <div className="p-2">
                <div className="mb-2 px-3 py-1 text-sm font-medium text-gray-500">Add Node</div>
                <button
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm",
                    isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
                  )}
                  onClick={() => handleAddNode("telegram", contextMenu.x, contextMenu.y)}
                >
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11.5" fill="#0088cc" stroke="#0088cc" />
                      <path
                        d="M9 8.51l3.89 3.09c.09.08.11.21.03.29 0 0-.03.04-.03.04l-3.89 3.09c-.13.1-.31 0-.31-.17V8.69c0-.18.18-.27.31-.18z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                  <span>Telegram</span>
                </button>
                <button
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm",
                    isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
                  )}
                  onClick={() => handleAddNode("ai", contextMenu.x, contextMenu.y)}
                >
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h2v-2h-2v2zm0-4h2V7h-2v7z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span>AI Step</span>
                </button>
                <button
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm",
                    isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100",
                  )}
                  onClick={() => handleAddNode("condition", contextMenu.x, contextMenu.y)}
                >
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 7l5 5 5-5M7 17l5-5 5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Condition</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Node Sidebar */}
      {sidebarOpen && selectedNode && (
        <NodeSidebar
          nodeId={selectedNodeId}
          nodeType={selectedNode?.type}
          nodeTitle={selectedNode?.title}
          nodeContent={selectedNode?.content}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSave={handleNodeEditorSave}
        />
      )}
    </div>
  )
}
