"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function InstagramConnectPage() {
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
                <svg viewBox="0 0 24 24" fill="#E1306C" className="w-full h-full">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Connect Instagram</h1>
              <p className="text-gray-400 mb-6">Use your Instagram account to connect to Latos.</p>
            </div>
          </div>

          <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="bg-[#1e1e1e] p-8 rounded-lg border border-[#2a2a2a]">
              <h2 className="text-xl font-semibold text-white mb-4">A few steps left</h2>
              <p className="text-gray-400 mb-6">
                Log in with Instagram and set your permissions. Once that's done, you're all set to connect to Latos!
              </p>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4 text-white">Go To Instagram</Button>

              <Button
                variant="outline"
                className="w-full border-[#2a2a2a] text-white hover:text-white hover:bg-[#2a2a2a]"
              >
                Connect with Meta Business Suite instead
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
