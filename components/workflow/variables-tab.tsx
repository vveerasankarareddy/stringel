"use client"

import { useState } from "react"
import { Plus, Search, Info } from "lucide-react"

interface Variable {
  id: string
  name: string
  type: string
  scope: string
  description: string
}

export function VariablesTab() {
  const [variables, setVariables] = useState<Variable[]>([
    {
      id: "var1",
      name: "userName",
      type: "string",
      scope: "conversation",
      description: "User's name from the conversation",
    },
    {
      id: "var2",
      name: "orderNumber",
      type: "number",
      scope: "conversation",
      description: "Order reference number",
    },
    {
      id: "var3",
      name: "isReturningCustomer",
      type: "boolean",
      scope: "user",
      description: "Whether the user has interacted before",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVariables = variables.filter((variable) =>
    variable.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col bg-[#121212]">
      <div className="border-b border-[#2a2a2a] p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search variables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#1e1e1e] py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Add Variable</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-[#2a2a2a] p-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Info className="h-4 w-4" />
            <p className="text-sm">
              Use variables to track user interactions and store information for later. The variable scope controls
              where each variable can be accessed.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between border-b border-[#2a2a2a] pb-2 text-xs font-medium uppercase text-gray-400">
            <div className="w-1/4">Name</div>
            <div className="w-1/5">Type</div>
            <div className="w-1/5">Scope</div>
            <div className="flex-1">Description</div>
          </div>

          {filteredVariables.length > 0 ? (
            <div className="flex flex-col gap-2">
              {filteredVariables.map((variable) => (
                <div
                  key={variable.id}
                  className="flex items-center rounded-md border border-[#2a2a2a] bg-[#1e1e1e] p-3 hover:border-gray-600"
                >
                  <div className="w-1/4 font-medium text-blue-400">{variable.name}</div>
                  <div className="w-1/5 text-gray-300">{variable.type}</div>
                  <div className="w-1/5">
                    <span className="rounded bg-[#2a2a2a] px-2 py-1 text-xs text-gray-300">{variable.scope}</span>
                  </div>
                  <div className="flex-1 text-gray-400">{variable.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center text-gray-400">
              <p>No variables found. Create one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
