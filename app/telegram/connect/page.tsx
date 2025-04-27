"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TelegramConnectPage() {
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
                <svg viewBox="0 0 24 24" fill="#0088cc" className="w-full h-full">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Let's connect Telegram bot to Latos</h1>
              <p className="text-gray-400 mb-6">You can create a new bot or connect existing one.</p>
            </div>
          </div>

          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="bg-[#1e1e1e] p-8 rounded-lg border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold text-white mb-4">How do you want to start?</h2>
              <p className="text-gray-400 mb-6">
                In each scenario, we will guide you through easy step-by-step instructions.
              </p>

              <div className="flex gap-4 mb-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Create New Bot
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-[#2a2a2a] text-white hover:text-white hover:bg-[#2a2a2a]"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                  Connect Existing Bot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
