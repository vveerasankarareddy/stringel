"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState(
    localStorage.getItem("workspaceName") || "sankar reddy's Workspace",
  )
  const [email, setEmail] = useState("sankarreddy143089@gmail.com")
  const [publicProfile, setPublicProfile] = useState(true)

  return (
    <MainLayout>
      <div className="p-6 h-full overflow-auto custom-scrollbar">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-muted-foreground">Manage your workspace settings</p>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-6">
              <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
                <CardHeader>
                  <CardTitle>Workspace Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Display Name</Label>
                    <Input
                      id="workspace-name"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="bg-[#121212] border-[#2a2a2a]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Handle</Label>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">Set Workspace Handle</div>
                      <Button variant="outline" size="sm">
                        Set Handle
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A Workspace Handle will allow to navigate directly to this Workspace using a pretty URL. This is
                      particularly useful when you want to showcase your work on external platforms or share it with
                      others.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Workspace Owner</Label>
                    <div className="text-sm">{email}</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Workspace ID</Label>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">workspace_0JMCKYVVWJEt4NMCZAYSVR2</div>
                      <Button variant="ghost" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-600">
                <CardHeader>
                  <CardTitle className="text-red-600">Delete Workspace</CardTitle>
                  <CardDescription>
                    Deleting a workspace is an irreversible process and will permanently erase all data associated with
                    this workspace. Please download your invoices from the Billing section before proceeding.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="destructive">Delete Workspace</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Members</CardTitle>
                <Button>Invite member</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                        S
                      </div>
                      <div>
                        <div className="font-medium">{email}</div>
                        <div className="text-sm text-muted-foreground">You</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Owner</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Your Plan Limit: 0 of 1
                  <Button variant="link" className="px-2 py-0 h-auto">
                    Get more seats
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="audits">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>View all actions performed in your workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4 border-b pb-4">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{email}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(Date.now() - i * 3600000).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {
                            [
                              "updated the bot information of perfect-opossum",
                              "updated a bot channel for perfect-opossum",
                              "published a bot named perfect-opossum",
                            ][i % 3]
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Load more items</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
