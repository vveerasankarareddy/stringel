"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { EnhancedDashboardLayout } from "@/components/layouts/enhanced-dashboard-layout"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContactsPage() {
  const params = useParams()
  const channelType = params.channelType as string
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])

  const contacts = [
    {
      id: "1",
      name: "Veerasankarareddy",
      avatar: "/placeholder.svg?height=40&width=40",
      gender: "",
      status: "Subscribed",
      subscribedDate: "2 weeks ago",
    },
  ]

  const toggleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id))
    }
  }

  return (
    <EnhancedDashboardLayout channelType={channelType}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <header
          className={cn(
            "flex items-center justify-between p-4 border-b",
            isDarkMode ? "bg-[#18181B] border-[#2a2a2a] text-white" : "bg-white border-gray-200",
          )}
        >
          <h1 className="text-xl font-semibold">Contacts</h1>
          <div className="flex gap-2">
            <Button variant="outline">Create New Contact</Button>
            <Button className="bg-blue-500 hover:bg-blue-600">Import</Button>
          </div>
        </header>

        {/* Segments section */}
        <div className={cn("p-4 border-b", isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200")}>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-medium text-white">Segments</h2>
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800",
              )}
            >
              PRO
            </span>
          </div>
          <p className="text-sm text-gray-400">Apply filter(s) to your contacts to create your first Segment</p>
        </div>

        {/* Filters and search */}
        <div
          className={cn(
            "p-4 border-b flex items-center justify-between",
            isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
          )}
        >
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className={cn("pl-10", isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200")}
            />
          </div>
        </div>

        {/* Contacts table */}
        <div className="flex-1 overflow-auto bg-[#121212]">
          <table className="w-full">
            <thead
              className={cn(
                "sticky top-0 border-b",
                isDarkMode ? "bg-[#18181B] border-[#2a2a2a] text-gray-300" : "bg-white border-gray-200 text-gray-600",
              )}
            >
              <tr>
                <th className="p-4 text-left w-12">
                  <Checkbox
                    checked={selectedContacts.length === contacts.length && contacts.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 text-left w-12">Avatar</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Subscribed</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className={cn("border-b hover:bg-[#2a2a2a]", isDarkMode ? "border-[#2a2a2a]" : "border-gray-200")}
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => toggleSelectContact(contact.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={contact.avatar || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4">{contact.name}</td>
                  <td className="p-4">{contact.gender}</td>
                  <td className="p-4">{contact.status}</td>
                  <td className="p-4">{contact.subscribedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status bar */}
        <div
          className={cn(
            "p-4 border-t flex items-center justify-between",
            isDarkMode ? "bg-[#18181B] border-[#2a2a2a]" : "bg-white border-gray-200",
          )}
        >
          <div className="text-sm text-gray-400">
            {selectedContacts.length} selected of {contacts.length} total
          </div>
          <div>
            <Button variant="outline" disabled={selectedContacts.length === 0}>
              Bulk Actions
            </Button>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  )
}
