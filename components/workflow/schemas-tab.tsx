"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"
import { useTheme } from "next-themes"

interface Schema {
  id: string
  name: string
  fields: SchemaField[]
}

interface SchemaField {
  id: string
  name: string
  type: "string" | "number" | "boolean" | "object" | "array"
  required: boolean
}

interface SchemasTabProps {
  initialSchemas?: Schema[]
}

export function SchemasTab({ initialSchemas = [] }: SchemasTabProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const [schemas, setSchemas] = useState<Schema[]>(
    initialSchemas.length
      ? initialSchemas
      : [
          {
            id: "schema-1",
            name: "User",
            fields: [
              { id: "field-1", name: "name", type: "string", required: true },
              { id: "field-2", name: "email", type: "string", required: true },
              { id: "field-3", name: "age", type: "number", required: false },
            ],
          },
        ],
  )
  const [activeSchemaId, setActiveSchemaId] = useState(schemas[0]?.id || "")
  const [newSchemaName, setNewSchemaName] = useState("")
  const [newFieldName, setNewFieldName] = useState("")
  const [newFieldType, setNewFieldType] = useState<SchemaField["type"]>("string")
  const [newFieldRequired, setNewFieldRequired] = useState(false)

  const activeSchema = schemas.find((s) => s.id === activeSchemaId)

  const handleAddSchema = () => {
    if (!newSchemaName.trim()) return

    const id = `schema-${Date.now()}`
    const newSchema: Schema = {
      id,
      name: newSchemaName,
      fields: [],
    }

    setSchemas([...schemas, newSchema])
    setActiveSchemaId(id)
    setNewSchemaName("")
  }

  const handleDeleteSchema = (id: string) => {
    setSchemas(schemas.filter((s) => s.id !== id))
    if (activeSchemaId === id) {
      setActiveSchemaId(schemas.filter((s) => s.id !== id)[0]?.id || "")
    }
  }

  const handleAddField = () => {
    if (!newFieldName.trim() || !activeSchemaId) return

    const fieldId = `field-${Date.now()}`
    const newField: SchemaField = {
      id: fieldId,
      name: newFieldName,
      type: newFieldType,
      required: newFieldRequired,
    }

    setSchemas(
      schemas.map((schema) => {
        if (schema.id === activeSchemaId) {
          return {
            ...schema,
            fields: [...schema.fields, newField],
          }
        }
        return schema
      }),
    )

    setNewFieldName("")
    setNewFieldType("string")
    setNewFieldRequired(false)
  }

  const handleDeleteField = (schemaId: string, fieldId: string) => {
    setSchemas(
      schemas.map((schema) => {
        if (schema.id === schemaId) {
          return {
            ...schema,
            fields: schema.fields.filter((field) => field.id !== fieldId),
          }
        }
        return schema
      }),
    )
  }

  return (
    <div className={cn("grid h-full grid-cols-4 gap-6 p-6", isDarkMode ? "bg-[#121212] text-white" : "bg-gray-50")}>
      {/* Schemas sidebar */}
      <div
        className={cn(
          "col-span-1 rounded-lg border shadow-sm",
          isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e]" : "border-gray-200 bg-white",
        )}
      >
        <div className="p-4">
          <h3 className="font-medium">Schemas</h3>
          <p className={cn("mt-1 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
            Define data structures for your workflow
          </p>

          <div className="mt-4 space-y-1">
            {schemas.map((schema) => (
              <div
                key={schema.id}
                className={cn(
                  "flex items-center justify-between rounded-md p-2",
                  activeSchemaId === schema.id ? (isDarkMode ? "bg-[#2a2a2a]" : "bg-gray-100") : "hover:bg-opacity-80",
                  isDarkMode ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-50",
                )}
              >
                <button className="flex-1 text-left" onClick={() => setActiveSchemaId(schema.id)}>
                  {schema.name}
                </button>
                <button
                  onClick={() => handleDeleteSchema(schema.id)}
                  className={cn(
                    "rounded p-1 hover:bg-opacity-80",
                    isDarkMode
                      ? "text-gray-400 hover:bg-[#333333] hover:text-red-400"
                      : "text-gray-400 hover:bg-gray-200 hover:text-red-600",
                  )}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="New schema name"
              value={newSchemaName}
              onChange={(e) => setNewSchemaName(e.target.value)}
              className={cn(
                "flex-1 rounded-md border px-3 py-1.5 text-sm",
                isDarkMode
                  ? "border-[#2a2a2a] bg-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
              )}
            />
            <button onClick={handleAddSchema} className="rounded-md bg-blue-600 p-1.5 text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Schema detail */}
      <div
        className={cn(
          "col-span-3 rounded-lg border shadow-sm",
          isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e]" : "border-gray-200 bg-white",
        )}
      >
        {activeSchema ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold">{activeSchema.name} Schema</h2>
            <p className={cn("mt-1 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
              Define the structure of your {activeSchema.name} data
            </p>

            <div className="mt-6">
              <div
                className={cn(
                  "grid grid-cols-12 gap-4 border-b pb-2 text-sm font-medium",
                  isDarkMode ? "border-[#2a2a2a] text-gray-300" : "border-gray-200 text-gray-500",
                )}
              >
                <div className="col-span-5">Field Name</div>
                <div className="col-span-4">Type</div>
                <div className="col-span-2">Required</div>
                <div className="col-span-1"></div>
              </div>

              {activeSchema.fields.map((field) => (
                <div key={field.id} className="mt-2 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => {
                        setSchemas(
                          schemas.map((schema) => {
                            if (schema.id === activeSchemaId) {
                              return {
                                ...schema,
                                fields: schema.fields.map((f) =>
                                  f.id === field.id ? { ...f, name: e.target.value } : f,
                                ),
                              }
                            }
                            return schema
                          }),
                        )
                      }}
                      className={cn(
                        "w-full rounded-md border px-3 py-1.5 text-sm",
                        isDarkMode
                          ? "border-[#2a2a2a] bg-[#2a2a2a] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      )}
                    />
                  </div>
                  <div className="col-span-4">
                    <select
                      value={field.type}
                      onChange={(e) => {
                        setSchemas(
                          schemas.map((schema) => {
                            if (schema.id === activeSchemaId) {
                              return {
                                ...schema,
                                fields: schema.fields.map((f) =>
                                  f.id === field.id ? { ...f, type: e.target.value as any } : f,
                                ),
                              }
                            }
                            return schema
                          }),
                        )
                      }}
                      className={cn(
                        "w-full rounded-md border px-2 py-1.5 text-sm",
                        isDarkMode
                          ? "border-[#2a2a2a] bg-[#2a2a2a] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      )}
                    >
                      <option value="string">Text</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="object">Object</option>
                      <option value="array">Array</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${field.id}`}
                        checked={field.required}
                        onChange={(e) => {
                          setSchemas(
                            schemas.map((schema) => {
                              if (schema.id === activeSchemaId) {
                                return {
                                  ...schema,
                                  fields: schema.fields.map((f) =>
                                    f.id === field.id ? { ...f, required: e.target.checked } : f,
                                  ),
                                }
                              }
                              return schema
                            }),
                          )
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`required-${field.id}`}
                        className={cn("ml-2 text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}
                      >
                        Required
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => handleDeleteField(activeSchemaId, field.id)}
                      className={cn(
                        "rounded p-1.5 hover:bg-opacity-80",
                        isDarkMode
                          ? "text-gray-400 hover:bg-[#2a2a2a] hover:text-red-400"
                          : "text-gray-400 hover:bg-gray-100 hover:text-red-600",
                      )}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <input
                    type="text"
                    placeholder="New field name"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    className={cn(
                      "w-full rounded-md border px-3 py-1.5 text-sm",
                      isDarkMode
                        ? "border-[#2a2a2a] bg-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as any)}
                    className={cn(
                      "w-full rounded-md border px-2 py-1.5 text-sm",
                      isDarkMode
                        ? "border-[#2a2a2a] bg-[#2a2a2a] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                    )}
                  >
                    <option value="string">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="new-field-required"
                      checked={newFieldRequired}
                      onChange={(e) => setNewFieldRequired(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="new-field-required"
                      className={cn("ml-2 text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}
                    >
                      Required
                    </label>
                  </div>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={handleAddField}
                    className="rounded-md bg-blue-600 p-1.5 text-white hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <div>
              <p className={cn("text-lg", isDarkMode ? "text-gray-400" : "text-gray-500")}>No schema selected</p>
              <p className={cn("mt-1 text-sm", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                Create a schema or select one from the sidebar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
