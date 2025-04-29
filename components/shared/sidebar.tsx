"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  ChevronUp,
  Home,
  CreditCard,
  BarChart2,
  Settings,
  MessageSquare,
  LogOut,
  User,
  Settings2,
  Plus,
  Menu,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [hasChannels, setHasChannels] = useState(false)
  const [hasBots, setHasBots] = useState(false)
  const [userName, setUserName] = useState("User")
  const [channels, setChannels] = useState<any[]>([])
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get user name from localStorage or set default
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    } else {
      // If no name is stored, use a default and save it
      localStorage.setItem("userName", "Sankar")
      setUserName("Sankar")
    }

    // Check if we have connected channels
    const telegramConnected = localStorage.getItem("telegramConnected") === "true"

    if (telegramConnected) {
      setHasChannels(true)
      setChannels([
        {
          id: "telegram-1",
          name: "vasudeva",
          type: "telegram",
          url: "/dashboard/telegram",
        },
      ])
    } else {
      setHasChannels(localStorage.getItem("hasChannels") === "true")
    }

    // Check if we have bots
    setHasBots(localStorage.getItem("hasBots") === "true")
  }, [])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "telegram":
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#0088cc">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "bg-[#121212] border-r border-[#2a2a2a] flex flex-col h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-56",
      )}
    >
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">L</span>
        </div>
        {!collapsed && <div className="text-white font-medium">Latos</div>}
        <button
          onClick={onToggle}
          className="ml-auto text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 px-2 text-sm text-gray-400 font-medium">{!collapsed && <span>Menu</span>}</div>

      <div className="mt-2 space-y-1 px-2">
        <Link
          href="/home"
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white group relative",
            isActive("/home") && "bg-[#2a2a2a]",
          )}
        >
          <Home className="w-4 h-4 min-w-4" />
          {!collapsed ? (
            <span>Home</span>
          ) : (
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Home
            </div>
          )}
        </Link>

        <Link
          href="/live-chat"
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white group relative",
            isActive("/live-chat") && "bg-[#2a2a2a]",
          )}
        >
          <MessageSquare className="w-4 h-4 min-w-4" />
          {!collapsed ? (
            <span>Live Chat</span>
          ) : (
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Live Chat
            </div>
          )}
        </Link>

        <Link
          href="/usage"
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white group relative",
            isActive("/usage") && "bg-[#2a2a2a]",
          )}
        >
          <BarChart2 className="w-4 h-4 min-w-4" />
          {!collapsed ? (
            <span>Usage</span>
          ) : (
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Usage
            </div>
          )}
        </Link>

        <Link
          href="/billing"
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white group relative",
            isActive("/billing") && "bg-[#2a2a2a]",
          )}
        >
          <CreditCard className="w-4 h-4 min-w-4" />
          {!collapsed ? (
            <span>Billing</span>
          ) : (
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Billing
            </div>
          )}
        </Link>

        <Link
          href="/settings"
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white group relative",
            isActive("/settings") && "bg-[#2a2a2a]",
          )}
        >
          <Settings className="w-4 h-4 min-w-4" />
          {!collapsed ? (
            <span>Settings</span>
          ) : (
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Settings
            </div>
          )}
        </Link>
      </div>

      {!collapsed && (
        <div className="mt-6 px-2 flex justify-between items-center">
          <span className="text-sm text-gray-400 font-medium">Channels</span>
          <Link href="/channels/connect" className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a]">
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      )}

      {collapsed && (
        <div className="mt-6 px-2 flex justify-center">
          <Link
            href="/channels/connect"
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] group relative"
          >
            <Plus className="w-4 h-4" />
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Connect Channel
            </div>
          </Link>
        </div>
      )}

      {/* Connected Channels */}
      {channels.length > 0 ? (
        <div className="mt-1 px-2">
          {!collapsed && (
            <div className="space-y-1">
              {channels.map((channel) => (
                <Link
                  key={channel.id}
                  href={channel.url}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white text-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">{getChannelIcon(channel.type)}</div>
                  <span>{channel.name}</span>
                </Link>
              ))}
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center mt-2">
              {channels.map((channel) => (
                <Link key={channel.id} href={channel.url} className="p-1 rounded-md hover:bg-[#2a2a2a] group relative">
                  <div className="w-4 h-4 flex items-center justify-center">{getChannelIcon(channel.type)}</div>
                  <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    {channel.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        !collapsed && <div className="mt-2 px-4 text-xs text-gray-500">No channels connected</div>
      )}

      {!collapsed && (
        <div className="mt-6 px-2 flex justify-between items-center">
          <span className="text-sm text-gray-400 font-medium">Bots</span>
          <Link href="/bot/create" className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a]">
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      )}

      {collapsed && (
        <div className="mt-6 px-2 flex justify-center">
          <Link
            href="/bot/create"
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#2a2a2a] group relative"
          >
            <Plus className="w-4 h-4" />
            <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Create Bot
            </div>
          </Link>
        </div>
      )}

      {hasBots ? (
        <div className="mt-1 px-2">
          {!collapsed && (
            <div className="space-y-1">
              <Link
                href="/bot"
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span>perfect-opossum</span>
              </Link>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center mt-2">
              <Link href="/bot" className="p-1 rounded-md hover:bg-[#2a2a2a] group relative">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  perfect-opossum
                </div>
              </Link>
            </div>
          )}
        </div>
      ) : (
        !collapsed && <div className="mt-2 px-4 text-xs text-gray-500">No bots created</div>
      )}

      <div className="mt-auto p-2 border-t border-[#2a2a2a]" ref={userMenuRef}>
        <div
          className={cn(
            "flex items-center gap-2 p-2 cursor-pointer hover:bg-[#2a2a2a] rounded-md",
            collapsed && "justify-center",
          )}
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <div className="w-8 h-8 rounded-md bg-purple-700 flex items-center justify-center text-white">
            {userName.charAt(0)}
          </div>
          {!collapsed && (
            <>
              <div className="text-sm">
                <div className="text-white">{userName}</div>
              </div>
              <button className="ml-auto text-gray-400 hover:text-white">
                {userMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </>
          )}
        </div>

        {userMenuOpen && (
          <div className="absolute bottom-16 left-2 w-44 bg-[#1e1e1e] border border-[#2a2a2a] rounded-md shadow-lg z-50">
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a2a2a] flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                <span>Preferences</span>
              </button>
              <div className="border-t border-[#2a2a2a] my-1"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
