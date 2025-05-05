"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import confetti from "canvas-confetti"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/layouts/main-layout"
import { useIsMobile } from "@/hooks/use-mobile"

export default function TelegramSuccessPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const botName = searchParams.get("name") || "Your bot"
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    // Countdown and redirect
    const redirectTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(redirectTimer)
          router.push("/home")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(redirectTimer)
    }
  }, [router])

  return (
    <MainLayout hideSidebar={!isMobile}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#2a2a2a] flex items-center">
          <h1 className="text-lg font-medium text-white">Success</h1>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6 max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-900/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">Congratulations!</h1>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-medium text-white">{botName}</span>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#0088cc">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
                </svg>
                <span className="text-xl font-medium text-white">is connected!</span>
              </div>

              <p className="text-gray-400 mb-6">
                Your Telegram bot has been successfully connected to our platform. You can now start engaging with your
                audience.
              </p>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/home")}>
                Go to Dashboard ({countdown})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}