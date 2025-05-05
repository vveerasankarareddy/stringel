"use client"

import { useState } from "react"
import Link from "next/link"
import { BrandTelegram, BrandWhatsapp, BrandInstagram, BrandFacebook } from "tabler-icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

// Mock data for connected channels
const mockConnectedChannels = [
  {
    id: "1",
    name: "vasudeva",
    type: "telegram",
    status: "active",
    subscribers: 120,
    messages: 1240,
  },
  // Add more mock channels as needed
]

interface Channel {
  id: string
  name: string
  type: "telegram" | "whatsapp" | "instagram" | "facebook"
  status: "active" | "inactive"
  subscribers: number
  messages: number
}

export function ConnectedChannels() {
  const [connectedChannels, setConnectedChannels] = useState<Channel[]>(mockConnectedChannels)

  // Function to get the appropriate icon based on channel type
  const getChannelIcon = (type: Channel["type"]) => {
    switch (type) {
      case "telegram":
        return <BrandTelegram size={24} className="text-blue-500" />
      case "whatsapp":
        return <BrandWhatsapp size={24} className="text-green-500" />
      case "instagram":
        return <BrandInstagram size={24} className="text-pink-500" />
      case "facebook":
        return <BrandFacebook size={24} className="text-blue-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Connected Channels</h2>
        <Link href="/channels/connect">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle size={16} />
            <span>Connect Channel</span>
          </Button>
        </Link>
      </div>

      {connectedChannels.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <PlusCircle size={24} className="text-gray-500" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No channels connected</h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Connect your first channel to start engaging with your audience
            </p>
            <Link href="/channels/connect">
              <Button>Connect Channel</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {connectedChannels.map((channel) => (
            <Link key={channel.id} href={`/${channel.type}/${channel.id}`}>
              <Card className="h-full cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getChannelIcon(channel.type)}
                      <div>
                        <h3 className="font-medium">{channel.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{channel.type}</p>
                      </div>
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full ${channel.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Subscribers</p>
                      <p className="font-medium">{channel.subscribers}</p>
                    </div>
                    <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Messages</p>
                      <p className="font-medium">{channel.messages}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          <Link href="/channels/connect">
            <Card className="flex h-full cursor-pointer items-center justify-center transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-2 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <PlusCircle size={24} className="text-gray-500" />
                </div>
                <p className="text-sm font-medium">Connect New Channel</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  )
}
