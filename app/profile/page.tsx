"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Sankar")
  const [lastName, setLastName] = useState("Reddy")
  const [email, setEmail] = useState("sankar@example.com")
  const [company, setCompany] = useState("Acme Inc")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <Tabs defaultValue="general" className="w-full max-w-3xl">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-[#121212] border-[#2a2a2a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-[#121212] border-[#2a2a2a]"
                    />
                  </div>
                </div>
                {/* Other fields */}
              </CardContent>
              <CardFooter>
                <Button className="bg-[#18181B] hover:bg-[#27272A] text-white">Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Other tabs content */}
        </Tabs>
      </div>
    </MainLayout>
  )
}
