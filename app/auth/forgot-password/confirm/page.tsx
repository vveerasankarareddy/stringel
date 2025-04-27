"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ConfirmCodePage() {
  const router = useRouter()
  const [code, setCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/auth/forgot-password/reset")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-muted-foreground">Enter the code we sent to your email</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-[#0f172a] hover:bg-[#1e293b]">
          Verify code
        </Button>
      </form>

      <div className="text-center text-sm">
        Didn't receive a code? <button className="font-medium text-primary hover:underline">Resend code</button>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
