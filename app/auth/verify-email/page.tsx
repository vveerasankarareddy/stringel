"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [email] = useState("user@example.com") // In a real app, this would come from the previous step

  const handleVerify = () => {
    router.push("/home")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Confirm your email</h1>
        <p className="text-muted-foreground">
          We've sent a verification link to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please check your inbox and click on the verification link to complete your registration.
        </p>

        <div className="flex flex-col space-y-2">
          <Button onClick={handleVerify} className="bg-[#18181B] hover:bg-[#27272A] text-white">
            I've verified my email
          </Button>
          <Button variant="outline" className="border-gray-300 dark:border-gray-700">
            Resend verification email
          </Button>
        </div>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
