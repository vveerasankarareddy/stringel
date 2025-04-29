"use client"

import { useState } from "react"
import { Plus, Search, FileJson } from "lucide-react"

interface Schema {
  id: string
  name: string
  description: string
  fields: Array<{ name: string; type: string; required: boolean }>
}

export function SchemasTab() {
  const [schemas, setSchemas] = useState<Schema[]>([
    {
      id: "schema1",
      name: "CustomerInfo",
      description: "Customer information schema",
      fields: [
        { name: "name", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "phone", type: "string", required: false },
      ],
    },
    {
      id: "schema2",
      name: "OrderDetails",
      description: "Order details schema",
      fields: [
        { name: "orderId", type: "string", required: true },
        { name: "items", type: "array", required: true },
        { name: "total", type: "number", required: true },
      ],
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSchemas = schemas.filter((schema) => schema.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-full flex-col bg-[#121212]">
      <div className="border-b border-[#2a2a2a] p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#1e1e1e] py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Add Schema</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredSchemas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredSchemas.map((schema) => (
              <div
                key={schema.id}
                className="rounded-md border border-[#2a2a2a] bg-[#1e1e1e] p-4 hover:border-gray-600"
              >
                <div className="mb-2 flex items-center gap-2">
                  <FileJson className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-medium text-white">{schema.name}</h3>
                </div>
                <p className="mb-4 text-sm text-gray-400">{schema.description}</p>
                <div className="rounded-md border border-[#2a2a2a] bg-[#121212]">
                  <div className="border-b border-[#2a2a2a] p-2 text-xs font-medium uppercase text-gray-400">
                    <div className="grid grid-cols-3 gap-2">
                      <div>Field</div>
                      <div>Type</div>
                      <div>Required</div>
                    </div>
                  </div>
                  <div className="p-2">
                    {schema.fields.map((field, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 py-1 text-sm">
                        <div className="text-blue-400">{field.name}</div>
                        <div className="text-gray-300">{field.type}</div>
                        <div>{field.required ? "✓" : "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-gray-400">
            <p>No schemas found. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
