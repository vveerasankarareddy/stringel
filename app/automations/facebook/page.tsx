"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FacebookAutomationPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Facebook Automation</h1>
          <p className="text-muted-foreground">Connect your Facebook page and automate responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
            <CardHeader>
              <CardTitle>Connect Facebook</CardTitle>
              <CardDescription>Link your Facebook page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 border border-dashed border-[#2a2a2a] rounded-md">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="#1877F2" className="mb-4">
                  <path d="M24 12.073c0-5.8-4.2-10.6-9.9-11.6v8.6h2.8l.5 3h-3.3v1.8c0 .8.4 1.6 1.6 1.6h1.8v2.5s-1.6.3-3.2.3c-3.2 0-5.3-1.9-5.3-5.4v-1.8H6v-3h3.1v-8.6C4.2 1.473 0 6.273 0 12.073c0 6.6 5.4 12 12 12s12-5.4 12-12z" />
                </svg>
                <Button className="bg-[#1877F2] hover:bg-[#0e5fc7] text-white">Connect Facebook</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] border-[#2a2a2a] text-white">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>What you can automate with Facebook</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-0.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Auto-respond to messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-0.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Schedule posts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-0.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Comment management</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-0.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Lead generation</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
