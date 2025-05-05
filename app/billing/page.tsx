"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const workspaceName = localStorage.getItem("workspaceName") || "sankar reddy's Workspace"

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="add-ons">Add-ons</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
                <CardHeader>
                  <CardTitle>Your next payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$0.00</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This amount includes the current spend on metered AI usage.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
                <CardHeader>
                  <CardTitle>AI Spend Limit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$5.00</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Maximum monthly limit for bot actions that use AI.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="border-[#2a2a2a] text-white">
                    Increase Limit
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
                <CardHeader>
                  <CardTitle>Payment information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary">View invoices and payment information</p>
                  <p className="text-sm text-muted-foreground mt-4">Need help with billing?</p>
                  <p className="text-sm text-muted-foreground">Email: finance@latos.com</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="add-ons">
            <div className="space-y-6">
              <div className="grid gap-4">
                {[
                  { name: "Bot", description: "Adds 1 additional bot", price: "$10/month" },
                  { name: "Table Rows", description: "Adds 100,000 additional table rows", price: "$5/month" },
                  { name: "Vector DB Storage", description: "Adds 1GB of Vector DB Storage", price: "$15/month" },
                  { name: "Collaborators", description: "Adds 1 collaborator seat", price: "$10/month" },
                  { name: "Messages & Events", description: "Adds 5,000 messages and events", price: "$5/month" },
                  {
                    name: "Always Alive",
                    description: 'Adds "Always Alive" functionality for 1 bot',
                    price: "$20/month",
                  },
                  { name: "File Storage", description: "Adds 10GB of File Storage", price: "$5/month" },
                ].map((addon, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{addon.name}</h3>
                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{addon.price}</span>
                        <Button variant="outline" size="sm">
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans">
            <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-md border border-input p-1">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === "yearly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("yearly")}
                >
                  Yearly
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Pay-as-you-go</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$0</div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">1 bot</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">500 incoming messages & events / month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">1 workspace seat</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">1,000 Table rows</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">$5 AI Credit</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Current plan
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plus</CardTitle>
                  <CardDescription>A flexible plan for teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    ${billingCycle === "monthly" ? "79" : "69"}.00
                    {billingCycle === "yearly" && <span className="text-sm text-green-500 ml-2">-10%</span>}
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">2 bots (1 with Always Alive)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">5,000 incoming messages & events / month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">2 collaborators</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">100,000 Table rows</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Custom Analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Buy plan</Button>
                </CardFooter>
              </Card>

              <Card className="border-green-600">
                <CardHeader>
                  <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full w-fit mb-2">Best value</div>
                  <CardTitle>Team</CardTitle>
                  <CardDescription>For teams with mature chatbot projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    ${billingCycle === "monthly" ? "445" : "400"}.50
                    {billingCycle === "yearly" && <span className="text-sm text-green-500 ml-2">-10%</span>}
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">3 bots (with Always Alive)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">50,000 incoming messages & events / month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">3 collaborators</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Live-chat support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Real-Time Collaboration</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Buy plan</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For businesses requiring advanced features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">Custom</div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Custom workspace limits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Volume discounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Custom payment terms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Custom SLAs & Agreements</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Dedicated support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contact us
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
