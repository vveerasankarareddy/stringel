"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function FacebookConnectPage() {
  const router = useRouter()

  return (
    <MainLayout hideSidebar={true}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-[#2a2a2a]">
          <Button
            variant="link"
            className="mb-4 pl-0 text-gray-400 hover:text-white hover:bg-transparent hover:glow"
            onClick={() => router.push("/channels/connect")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex-1 flex">
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="mb-8">
              <div className="w-16 h-16 mb-6">
                <svg viewBox="0 0 24 24" fill="#1877F2" className="w-full h-full">
                  <path d="M24 12.073c0-5.8-4.2-10.6-9.9-11.6v8.6h2.8l.5 3h-3.3v1.8c0 .8.4 1.6 1.6 1.6h1.8v2.5s-1.6.3-3.2.3c-3.2 0-5.3-1.9-5.3-5.4v-1.8H6v-3h3.1v-8.6C4.2 1.473 0 6.273 0 12.073c0 6.6 5.4 12 12 12s12-5.4 12-12z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Connect Facebook Page</h1>
              <p className="text-gray-400 mb-6">Follow the instruction to create your first Messenger automation.</p>
            </div>
          </div>

          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="bg-[#1e1e1e] p-8 rounded-lg border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold text-white mb-4">Sign in with your Facebook Account</h2>
              <p className="text-gray-400 mb-6">
                To start building automation in Facebook Messenger, sign in with your Facebook account.
              </p>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign In With Facebook</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
