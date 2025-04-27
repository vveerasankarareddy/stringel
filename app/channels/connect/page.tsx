"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ConnectChannelPage() {
  const router = useRouter()

  return (
    <MainLayout hideSidebar={true}>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            variant="link"
            className="mb-4 pl-0 text-gray-400 hover:text-white hover:bg-transparent hover:glow"
            onClick={() => router.push("/home")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-white">Connect Channel</h1>
          <p className="text-muted-foreground">Choose a platform to connect with your AI agent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Instagram */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Instagram</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Supercharge your Instagram marketing with messaging automation.
            </p>
            <Button
              className="mt-auto bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white"
              onClick={() => router.push("/instagram/connect")}
            >
              Connect
            </Button>
          </div>

          {/* Facebook */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M24 12.073c0-5.8-4.2-10.6-9.9-11.6v8.6h2.8l.5 3h-3.3v1.8c0 .8.4 1.6 1.6 1.6h1.8v2.5s-1.6.3-3.2.3c-3.2 0-5.3-1.9-5.3-5.4v-1.8H6v-3h3.1v-8.6C4.2 1.473 0 6.273 0 12.073c0 6.6 5.4 12 12 12s12-5.4 12-12z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Facebook</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Build relationships with customers through interactive and tailored content.
            </p>
            <Button
              className="mt-auto bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white"
              onClick={() => router.push("/facebook/connect")}
            >
              Connect
            </Button>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">WhatsApp</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Use the world's most popular messaging app to chat and engage your customers.
            </p>
            <Button
              className="mt-auto bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white"
              onClick={() => router.push("/whatsapp/connect")}
            >
              Connect
            </Button>
          </div>

          {/* Telegram */}
          <div className="bg-[#121212] rounded-lg border border-[#2a2a2a] p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Telegram</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Unleash the power of limitless Telegram messaging automation.
            </p>
            <Button
              className="mt-auto bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white"
              onClick={() => router.push("/telegram/connect")}
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
