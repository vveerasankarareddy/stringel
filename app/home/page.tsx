"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, ExternalLink, MoreHorizontal } from "lucide-react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HomePage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [userName, setUserName] = useState("")
  const [channels, setChannels] = useState<any[]>([])
  const [bots, setBots] = useState<any[]>([])

  useEffect(() => {
    // Get user name from localStorage or set default
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    } else {
      // If no name is stored, use a default and save it
      localStorage.setItem("userName", "Sankar")
      setUserName("Sankar")
    }

    // Check if we have connected channels
    const telegramConnected = localStorage.getItem("telegramConnected") === "true"

    if (telegramConnected) {
      setChannels([
        {
          id: "telegram-1",
          name: "vasudeva",
          type: "telegram",
          status: "active",
          lastActive: "2 hours ago",
          messages: 12,
        },
      ])
    }

    // Check if we have bots
    const hasBots = localStorage.getItem("hasBots") === "true"

    if (hasBots) {
      setBots([
        {
          id: "bot-1",
          name: "perfect-opossum",
          type: "assistant",
          status: "active",
          lastActive: "1 hour ago",
          messages: 24,
        },
      ])
    }
  }, [])

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "telegram":
        return (
          <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
            </svg>
          </div>
        )
      case "instagram":
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
        )
      case "assistant":
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
        )
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <span className="text-white text-lg font-medium">Home</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {/* Welcome Card */}
        <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-md hidden md:block"></div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome, {userName}!</h1>
              <p className="text-gray-400 text-sm">Let's build something amazing today</p>
            </div>
          </div>
        </div>

        {/* Channels Section */}
        {channels.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Channels</h2>
              <Button
                variant="outline"
                className="border-[#2a2a2a] text-white hover:text-white hover:bg-[#2a2a2a]"
                onClick={() => router.push("/channels/connect")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map((channel) => (
                <Card key={channel.id} className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center">
                      {getChannelIcon(channel.type)}
                      <div className="ml-2">
                        <CardTitle className="text-lg">{channel.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {channel.type.charAt(0).toUpperCase() + channel.type.slice(1)}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#2a2a2a]" />
                        <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Edit Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#2a2a2a]" />
                        <DropdownMenuItem className="text-red-500 hover:bg-[#2a2a2a] cursor-pointer">
                          Disconnect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${channel.status === "active" ? "bg-green-500" : "bg-gray-500"} mr-2`}
                        ></div>
                        <span className="text-sm text-gray-400">
                          {channel.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">Last active: {channel.lastActive}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-400">Messages</span>
                      <span className="text-sm text-white">{channel.messages}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      className="w-full border-[#2a2a2a] text-white hover:text-white hover:bg-[#2a2a2a]"
                      onClick={() => router.push(`/channels/${channel.type}`)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Add Channel Card */}
              <Card className="bg-[#1e1e1e] border-[#2a2a2a] border-dashed text-white flex flex-col items-center justify-center p-6 h-[232px]">
                <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Connect Channel</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Add a new channel to expand your reach</p>
                <Button
                  variant="outline"
                  className="border-[#2a2a2a] text-white hover:text-white hover:bg-[#2a2a2a]"
                  onClick={() => router.push("/channels/connect")}
                >
                  Connect
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Get Started Section (only shown if no channels and no bots) */}
        {channels.length === 0 && bots.length === 0 && (
          <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="text-blue-500 w-full h-full">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-white mb-2 text-center">Get Started with Latos</h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Create a bot or connect a channel to start building your AI agent
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={() => router.push("/bot/create")}
              >
                <Plus className="w-4 h-4" />
                Create Bot
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={() => router.push("/channels/connect")}
              >
                <Plus className="w-4 h-4" />
                Connect Channel
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
