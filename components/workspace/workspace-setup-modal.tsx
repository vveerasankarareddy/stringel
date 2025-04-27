"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface WorkspaceSetupModalProps {
  onComplete: (workspaceName: string) => void
}

export function WorkspaceSetupModal({ onComplete }: WorkspaceSetupModalProps) {
  const [workspaceName, setWorkspaceName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (workspaceName.trim()) {
      onComplete(workspaceName)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-lg border border-border">
        <h2 className="text-2xl font-bold mb-4">Welcome to Latos</h2>
        <p className="text-muted-foreground mb-6">Let's set up your workspace to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              placeholder="My Awesome Workspace"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be the name of your workspace where you'll manage your bots and projects.
            </p>
          </div>

          <Button type="submit" className="w-full bg-[#18181B] hover:bg-[#27272A] text-white">
            Create Workspace
          </Button>
        </form>
      </div>
    </div>
  )
}
