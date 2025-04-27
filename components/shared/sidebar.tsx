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
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [hasChannels, setHasChannels] = useState(false)
  const [hasBots, setHasBots] = useState(false)
  const [userName, setUserName] = useState("User")
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

  return (
    <div
      className={cn(
        "bg-[#121212] border-r border-[#2a2a2a] flex flex-col h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-56",
      )}
    >
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        {!collapsed && <div className="text-white font-medium">Stringel</div>}
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

      {hasChannels ? (
        <div className="mt-1 px-2">
          {!collapsed && (
            <div className="space-y-1">
              <Link
                href="/channels/instagram"
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#2a2a2a] text-white text-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#E1306C">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <span>Instagram</span>
              </Link>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center mt-2">
              <Link href="/channels/instagram" className="p-1 rounded-md hover:bg-[#2a2a2a] group relative">
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#E1306C">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div className="absolute left-full ml-2 rounded bg-[#1e1e1e] px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  Instagram
                </div>
              </Link>
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
