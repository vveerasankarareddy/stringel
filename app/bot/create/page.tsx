"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function CreateBotPage() {
  const router = useRouter()
  const [botName, setBotName] = useState("")
  const [botDescription, setBotDescription] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("customer-support")

  const handleCreateBot = () => {
    // In a real app, this would create the bot
    router.push("/bot")
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create New Bot</h1>
          <p className="text-muted-foreground">Set up your new AI assistant</p>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="template">Choose Template</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
              <CardHeader>
                <CardTitle>Bot Information</CardTitle>
                <CardDescription>Enter the basic details for your new bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Bot Name</Label>
                  <Input
                    id="bot-name"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="e.g., Customer Support Assistant"
                    className="bg-[#121212] border-[#2a2a2a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bot-description">Description</Label>
                  <Input
                    id="bot-description"
                    value={botDescription}
                    onChange={(e) => setBotDescription(e.target.value)}
                    placeholder="What does your bot do?"
                    className="bg-[#121212] border-[#2a2a2a]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => document.querySelector('[data-value="template"]')?.click()}>
                  Continue to Templates
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="template">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: "customer-support",
                  name: "Customer Support",
                  description: "Handle customer inquiries and support tickets",
                  color: "#3b82f6",
                },
                {
                  id: "sales-assistant",
                  name: "Sales Assistant",
                  description: "Help customers find products and complete purchases",
                  color: "#10b981",
                },
                {
                  id: "onboarding",
                  name: "Onboarding Guide",
                  description: "Guide new users through your product or service",
                  color: "#f59e0b",
                },
                {
                  id: "faq-bot",
                  name: "FAQ Bot",
                  description: "Answer frequently asked questions",
                  color: "#8b5cf6",
                },
                {
                  id: "lead-generation",
                  name: "Lead Generation",
                  description: "Qualify leads and collect contact information",
                  color: "#ec4899",
                },
                {
                  id: "blank",
                  name: "Blank Template",
                  description: "Start from scratch with no predefined behavior",
                  color: "#6b7280",
                },
              ].map((template) => (
                <Card
                  key={template.id}
                  className={`bg-[#1e1e1e] border-2 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? `border-[${template.color}]`
                      : "border-[#2a2a2a] hover:border-gray-500"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center mb-2"
                      style={{ backgroundColor: `${template.color}20` }}
                    >
                      <div className="w-5 h-5" style={{ backgroundColor: template.color, borderRadius: "4px" }}></div>
                    </div>
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => document.querySelector('[data-value="basic"]')?.click()}>
                Back
              </Button>
              <Button onClick={() => document.querySelector('[data-value="capabilities"]')?.click()}>
                Continue to Capabilities
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="capabilities">
            <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
              <CardHeader>
                <CardTitle>Bot Capabilities</CardTitle>
                <CardDescription>Select what your bot can do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Answer questions from knowledge base",
                    "Process payments",
                    "Schedule appointments",
                    "Collect user information",
                    "Generate content",
                    "Analyze data",
                    "Send notifications",
                    "Integrate with external APIs",
                  ].map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`capability-${index}`}
                        className="rounded border-gray-500 text-blue-600 focus:ring-blue-600"
                      />
                      <Label htmlFor={`capability-${index}`}>{capability}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => document.querySelector('[data-value="template"]')?.click()}>
                  Back
                </Button>
                <Button onClick={handleCreateBot}>Create Bot</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
