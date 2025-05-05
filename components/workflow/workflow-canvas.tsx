"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { WorkflowNode } from "./workflow-node"
import { WorkflowConnection } from "./workflow-connection"
import { NodeSidebar } from "./node-sidebar"
import { AutoLayoutButton } from "./auto-layout-button"
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

  // Reconnection state
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [reconnectingEdge, setReconnectingEdge] = useState<{
    id: string
    sourceId: string
    targetId: string
    sourcePort: "input" | "output"
    targetPort: "input" | "output"
    startX: number
    startY: number
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

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0)

  // Source node for new connection
  const [sourceNodeForNewConnection, setSourceNodeForNewConnection] = useState<string | null>(null)

  // Highlighted nodes and edges for search
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([])
  const [highlightedEdgeIds, setHighlightedEdgeIds] = useState<string[]>([])

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
            x: 450,
            y: 100,
          },
          {
            id: "action-2",
            type: "action",
            title: "Telegram Send Message #1",
            content: "omm",
            x: 800,
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

      const nodeWidth = sourceNode.width || 280

      // Output port (right) of source node
      const startX = sourceNode.x + nodeWidth
      const startY = sourceNode.y + 75 // Middle of the node

      // Input port (left) of target node
      const endX = targetNode.x
      const endY = targetNode.y + 75 // Middle of the node

      return { startX, startY, endX, endY }
    },
    [nodes],
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
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenu.isOpen) {
        setContextMenu((prev) => ({ ...prev, isOpen: false }))
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [contextMenu.isOpen])

  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const results = nodes
        .filter(
          (node) =>
            node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (node.content && node.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (node.description && node.description.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .map((node) => node.id)

      setSearchResults(results)
      setHighlightedNodeIds(results)

      // Highlight edges connected to these nodes
      const connectedEdges = edges
        .filter((edge) => results.includes(edge.sourceId) || results.includes(edge.targetId))
        .map((edge) => edge.id)

      setHighlightedEdgeIds(connectedEdges)

      if (results.length > 0) {
        setCurrentSearchIndex(0)
      }
    } else {
      setSearchResults([])
      setHighlightedNodeIds([])
      setHighlightedEdgeIds([])
    }
  }, [searchTerm, nodes, edges])

  const handleNodeSelect = (id: string, isDrag: boolean) => {
    setSelectedNodeId(id)
    setSelectedEdgeId(null)

    // Only open sidebar if it's a click, not a drag
    if (!isDrag) {
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

    if (selectedNodeId === id) {
      setSelectedNodeId(null)
      setSidebarOpen(false)
    }
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

    // Update reconnecting edge
    if (isReconnecting && reconnectingEdge) {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (canvasRect) {
        const x = (e.clientX - canvasRect.left - canvasOffset.x) / scale
        const y = (e.clientY - canvasRect.top - canvasOffset.y) / scale

        // Highlight node under cursor for potential reconnection
        const nodeUnderCursor = findNodeAtPosition(x, y)
        if (nodeUnderCursor && nodeUnderCursor !== reconnectingEdge.sourceId) {
          setHighlightedNodeIds([nodeUnderCursor])
        } else {
          setHighlightedNodeIds([])
        }
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
        } else if (!targetInfo) {
          // If dropped on empty canvas, remember source node for potential new connection
          setSourceNodeForNewConnection(tempConnection.sourceId)

          // Open context menu for node creation
          setContextMenu({
            isOpen: true,
            x: e.clientX,
            y: e.clientY,
            type: "canvas",
          })
        }
      }

      // Reset temp connection
      setIsCreatingConnection(false)
      setTempConnection(null)
    }

    // Handle reconnection completion
    if (isReconnecting && reconnectingEdge) {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (canvasRect) {
        const mouseX = (e.clientX - canvasRect.left - canvasOffset.x) / scale
        const mouseY = (e.clientY - canvasRect.top - canvasOffset.y) / scale

        // Check if dropped on a node
        const targetNodeId = findNodeAtPosition(mouseX, mouseY)

        if (targetNodeId && targetNodeId !== reconnectingEdge.sourceId) {
          // Update the edge with the new target
          setEdges((prev) =>
            prev.map((edge) => (edge.id === reconnectingEdge.id ? { ...edge, targetId: targetNodeId } : edge)),
          )
        }
      }

      // Reset reconnection state
      setIsReconnecting(false)
      setReconnectingEdge(null)
      setHighlightedNodeIds([])
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

  const handleAddNodeContextMenu = (type: string, x: number, y: number) => {
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
      case "start":
        title = "Start Automation"
        description = "Begin the automation workflow"
        break
    }

    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return

    const canvasX = (x - canvasRect.left - canvasOffset.x) / scale - 140 // Center node horizontally
    const canvasY = (y - canvasRect.top - canvasOffset.y) / scale - 75 // Position node vertically

    const newNode: NodeData = {
      id,
      type,
      title,
      description,
      content,
      x: canvasX,
      y: canvasY,
      isStartNode: type === "start",
      isEndNode: false,
    }

    setNodes((prev) => [...prev, newNode])
    setSelectedNodeId(id)

    // If creating from connection, connect to source node
    if (sourceNodeForNewConnection) {
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        sourceId: sourceNodeForNewConnection,
        targetId: id,
        sourcePort: "output",
        targetPort: "input",
        label: "Next",
      }

      setEdges((prev) => [...prev, newEdge])
      setSourceNodeForNewConnection(null)
    }

    setContextMenu((prev) => ({ ...prev, isOpen: false }))
  }

  const startConnectionDrag = (nodeId: string, portType: "input" | "output", e: React.MouseEvent) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    setIsCreatingConnection(true)

    const nodeWidth = node.width || 280
    let startX, startY

    if (portType === "output") {
      startX = node.x + nodeWidth // Right side
      startY = node.y + 75 // Middle
    } else {
      startX = node.x // Left side
      startY = node.y + 75 // Middle
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

  const startEdgeReconnect = (edgeId: string, sourceId: string, targetId: string) => {
    const edge = edges.find((e) => e.id === edgeId)
    if (!edge) return

    const sourceNode = nodes.find((n) => n.id === sourceId)
    const targetNode = nodes.find((n) => n.id === targetId)
    if (!sourceNode || !targetNode) return

    setIsReconnecting(true)

    const sourceWidth = sourceNode.width || 280
    const startX = sourceNode.x + sourceWidth // Output port of source
    const startY = sourceNode.y + 75 // Middle of node

    setReconnectingEdge({
      id: edgeId,
      sourceId,
      targetId,
      sourcePort: "output",
      targetPort: "input",
      startX,
      startY,
    })

    // Highlight the source node
    setHighlightedNodeIds([sourceId])
  }

  const findPortAtPosition = (x: number, y: number): { nodeId: string; portType: "input" | "output" } | null => {
    const portRadius = 15 // Increased hit area

    for (const node of nodes) {
      const nodeWidth = node.width || 280

      // Input port (left)
      const inputPortX = node.x
      const inputPortY = node.y + 75 // Middle

      if (Math.sqrt(Math.pow(x - inputPortX, 2) + Math.pow(y - inputPortY, 2)) <= portRadius) {
        return { nodeId: node.id, portType: "input" }
      }

      // Output port (right)
      const outputPortX = node.x + nodeWidth
      const outputPortY = node.y + 75 // Middle

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

  const handleNodeEdit = (nodeId: string) => {
    setSelectedNodeId(nodeId)
    setSidebarOpen(true)
  }

  const handleNodeContentChange = (nodeId: string, content: string) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, content } : node)))
  }

  // Handle node editor save
  const handleNodeEditorSave = (nodeId: string, updates: { title?: string; content?: string }) => {
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
  }

  // Handle node collapse toggle
  const handleNodeCollapseToggle = (nodeId: string) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, isCollapsed: !node.isCollapsed } : node)))
  }

  // Handle node resize
  const handleNodeResize = (nodeId: string, height: number) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, height } : node)))
  }

  // Auto layout the nodes horizontally
  const autoLayoutNodes = () => {
    const nodeSpacing = 80 // Gap between nodes
    const startX = 100
    const startY = 100

    // Sort nodes based on connections to determine order
    const nodeOrder: string[] = []
    const visited = new Set<string>()

    // Find start nodes (nodes with no incoming edges)
    const startNodes = nodes.filter((node) => node.isStartNode || !edges.some((edge) => edge.targetId === node.id))

    // Traverse the graph to determine node order
    const traverse = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)
      nodeOrder.push(nodeId)

      // Find outgoing edges
      const outEdges = edges.filter((edge) => edge.sourceId === nodeId)
      for (const edge of outEdges) {
        traverse(edge.targetId)
      }
    }

    // Start traversal from each start node
    for (const startNode of startNodes) {
      traverse(startNode.id)
    }

    // Add any remaining nodes that weren't connected
    nodes.forEach((node) => {
      if (!visited.has(node.id)) {
        nodeOrder.push(node.id)
      }
    })

    // Position nodes horizontally based on order
    setNodes((prev) => {
      const updatedNodes = [...prev]
      let currentX = startX

      nodeOrder.forEach((nodeId) => {
        const nodeIndex = updatedNodes.findIndex((n) => n.id === nodeId)
        if (nodeIndex >= 0) {
          const nodeWidth = updatedNodes[nodeIndex].width || 280
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            x: currentX,
            y: startY,
          }
          currentX += nodeWidth + nodeSpacing
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

  // Add a new node
  const handleAddNodeButton = () => {
    // Find the rightmost node to place the new one after it
    let maxX = 100
    nodes.forEach((node) => {
      const nodeRight = node.x + (node.width || 280)
      if (nodeRight > maxX) {
        maxX = nodeRight
      }
    })

    const id = `action-${Date.now()}`
    const newNode: NodeData = {
      id,
      type: "action",
      title: "New Action",
      description: "Configure this action",
      content: "Add content here",
      x: maxX + 80, // Place it after the rightmost node with spacing
      y: 100,
    }

    setNodes((prev) => [...prev, newNode])
    setSelectedNodeId(id)
    setSidebarOpen(true)
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
            onClick={handleAddNodeButton}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm",
              isDarkMode
                ? "border-[#2a2a2a] bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <Plus className="h-4 w-4" />
            <span>Add Node</span>
          </button>

          <AutoLayoutButton onClick={autoLayoutNodes} />
        </div>

        {/* Search bar */}
        <div className="absolute left-4 top-16 z-10 w-64"></div>

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md border shadow-sm",
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
              "flex h-8 w-8 items-center justify-center rounded-md border shadow-sm",
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
              "flex h-8 w-8 items-center justify-center rounded-md border shadow-sm",
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
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
            />
          )}

          {/* Reconnecting edge */}
          {isReconnecting && reconnectingEdge && (
            <path
              d={`M${reconnectingEdge.startX},${reconnectingEdge.startY} C${reconnectingEdge.startX + 100},${reconnectingEdge.startY} ${tempConnection?.endX || reconnectingEdge.startX + 200}-100,${tempConnection?.endY || reconnectingEdge.startY} ${tempConnection?.endX || reconnectingEdge.startX + 200},${tempConnection?.endY || reconnectingEdge.startY}`}
              fill="none"
              stroke={isDarkMode ? "#ec4899" : "#ec4899"}
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
              width={node.width}
              isSelected={selectedNodeId === node.id || highlightedNodeIds.includes(node.id)}
              isStartNode={node.isStartNode}
              isEndNode={node.isEndNode}
              onSelect={handleNodeSelect}
              onMove={handleNodeMove}
              onDelete={handleNodeDelete}
              onStartConnection={startConnectionDrag}
              onEdit={handleNodeEdit}
              onContentChange={handleNodeContentChange}
            />
          ))}
        </div>
      </div>

      {/* Node Sidebar */}
      <NodeSidebar
        nodeId={selectedNodeId}
        nodeType={selectedNode?.type}
        nodeTitle={selectedNode?.title}
        nodeContent={selectedNode?.content}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSave={handleNodeEditorSave}
      />
    </div>
  )
}
