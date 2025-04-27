"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function BotsList() {
  const router = useRouter()
  const bots = [
    {
      name: "Customer Support",
      status: "Active",
      conversations: 156,
    },
    {
      name: "Sales Assistant",
      status: "Active",
      conversations: 89,
    },
    {
      name: "Onboarding Guide",
      status: "Inactive",
      conversations: 42,
    },
    {
      name: "Data Analyzer",
      status: "Active",
      conversations: 37,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bots</CardTitle>
        <CardDescription>Manage your AI agents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bots.map((bot, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{bot.name}</p>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${bot.status === "Active" ? "bg-green-500" : "bg-gray-300"}`} />
                  <p className="text-xs text-muted-foreground">
                    {bot.status} • {bot.conversations} conversations
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push("/bot")}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
