"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/layouts/main-layout"
import { useIsMobile } from "@/hooks/use-mobile"
import axios, { AxiosError } from 'axios'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function ConnectExistingTelegramBotPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [botToken, setBotToken] = useState("")
  const [botName, setBotName] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [webhookWarning, setWebhookWarning] = useState(false)
  const [webhookConflict, setWebhookConflict] = useState(false)
  const [botId, setBotId] = useState<string | null>(null)

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("/mybots")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRemoveWebhook = async () => {
    if (!botId) return
    
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/telegram/remove-webhook/${botId}`,
        {},
        { withCredentials: true }
      )

      if (response.data.success) {
        setWebhookConflict(false)
        setWebhookWarning(true)
        await handleSubmitAfterWebhookRemoval()
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error removing webhook:', axiosError.response?.data || axiosError.message)
      setError('Failed to remove webhook. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitAfterWebhookRemoval = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/telegram/update-bot-token`,
        {
          botToken,
          botName: botName || undefined,
        },
        { withCredentials: true }
      )

      if (response.status === 200 && response.data.success) {
        localStorage.setItem("telegramConnected", "true")
        localStorage.setItem("hasChannels", "true")
        
        router.push(`/telegram/success?name=${encodeURIComponent(response.data.botName || 'Your Bot')}`)
      }
    } catch (error) {
      handleApiError(error as AxiosError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiError = (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message)
    
    const errorData = error.response?.data as any
    if (error.response?.status === 409 || 
        (errorData?.error && errorData?.error.includes("Conflict")) ||
        (errorData?.message && errorData?.message.includes("webhook"))) {
      setWebhookConflict(true)
      setBotId(errorData?.botId || null)
    } else if (error.response?.status === 401) {
      router.push('/login')
    } else if (error.response?.status === 400) {
      setError((errorData?.message as string) || 'Invalid bot token. Please check and try again.')
    } else {
      setError('Failed to connect bot. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setWebhookWarning(false)
    setWebhookConflict(false)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/telegram/update-bot-token`,
        {
          botToken,
          botName: botName || undefined,
        },
        { withCredentials: true }
      )

      if (response.status === 200 && response.data.success) {
        localStorage.setItem("telegramConnected", "true")
        localStorage.setItem("hasChannels", "true")
        router.push(`/telegram/success?name=${encodeURIComponent(response.data.botName || 'Your Bot')}`)
      }
    } catch (error) {
      handleApiError(error as AxiosError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout hideSidebar={!isMobile}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#2a2a2a] flex items-center">
          <Button
            variant="link"
            className="pl-0 text-gray-400 hover:text-white hover:bg-transparent hover:glow"
            onClick={() => router.push("/telegram/connect")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-lg font-medium text-white ml-2">Connect Existing Bot</h1>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">Connect your existing Telegram bot</h2>
              <p className="text-gray-400">Follow these simple steps to connect your existing Telegram bot</p>
            </div>

            {webhookWarning && (
              <Alert className="mb-6 bg-amber-900/30 border-amber-700 text-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  We've removed the webhook from your bot to ensure proper connection.
                  Your bot will now work in long polling mode instead of webhook mode.
                </AlertDescription>
              </Alert>
            )}

            {webhookConflict && (
              <Alert className="mb-6 bg-orange-900/30 border-orange-700 text-orange-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Webhook Already Set</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">This bot already has a webhook set up, which conflicts with our connection method.</p>
                  <Button 
                    onClick={handleRemoveWebhook} 
                    disabled={isLoading}
                    className="bg-orange-700 hover:bg-orange-800 text-white mt-2"
                  >
                    {isLoading ? "Removing..." : "Remove Webhook and Continue"}
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      1
                    </div>
                    <h3 className="font-medium text-white">Open @BotFather in Telegram</h3>
                  </div>
                  <div className="ml-8">
                    <a
                      href="https://t.me/botfather"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      Open BotFather
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
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      2
                    </div>
                    <h3 className="font-medium text-white">Send the /mybots command</h3>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center gap-2">
                      <code className="bg-[#121212] px-2 py-1 rounded text-sm">/mybots</code>
                      <Button variant="ghost" size="sm" onClick={handleCopyCommand} className="h-8 w-8 p-0">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      3
                    </div>
                    <h3 className="font-medium text-white">Select your bot and get the API token</h3>
                  </div>
                  <div className="ml-8">
                    <p className="text-gray-400 text-sm">
                      Select your bot, then click on "API Token" to reveal your bot's token.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      4
                    </div>
                    <h3 className="font-medium text-white">Paste your bot token below</h3>
                  </div>
                  <div className="ml-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ"
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                        className="bg-[#121212] border-[#2a2a2a]"
                        required
                      />
                      
                      <Input
                        placeholder="Custom bot name (optional)"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        className="bg-[#121212] border-[#2a2a2a]"
                      />
                      
                      {error && (
                        <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading || !botToken}
                      >
                        {isLoading ? "Connecting..." : "Connect Bot"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}