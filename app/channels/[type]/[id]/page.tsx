"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ChannelDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [channelName, setChannelName] = useState("")
  const [channelType, setChannelType] = useState("")
  const [activeWorkflow, setActiveWorkflow] = useState("main")
  const [isEmulatorOpen, setIsEmulatorOpen] = useState(true)

  useEffect(() => {
    // In a real app, fetch channel data from API
    // For now, we'll use mock data
    const type = params.type as string
    const id = params.id as string
    
    setChannelType(type)
    
    if (type === "telegram") {
      setChannelName("vasudeva")
    } else if (type === "whatsapp") {
      setChannelName("Business Account")
    } else if (type === "instagram") {
      setChannelName("Brand Profile")
    } else if (type === "facebook") {
      setChannelName("Page Manager")
    } else {
      setChannelName("Unknown Channel")
    }
  }, [params])

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "telegram":
        return (
          <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
            </svg>
          </div>
        )
      case "whatsapp":
        return (
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012\
