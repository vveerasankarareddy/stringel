"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"
import { useTheme } from "next-themes"

interface Variable {
  id: string
  name: string
  value: string
  type: "string" | "number" | "boolean"
}

interface VariablesTabProps {
  initialVariables?: Variable[]
}

export function VariablesTab({ initialVariables = [] }: VariablesTabProps) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const [variables, setVariables] = useState<Variable[]>(
    initialVariables.length
      ? initialVariables
      : [
          { id: "var-1", name: "greeting", value: "Hello world!", type: "string" },
          { id: "var-2", name: "userId", value: "1234", type: "string" },
        ],
  )
  const [newVarName, setNewVarName] = useState("")
  const [newVarValue, setNewVarValue] = useState("")
  const [newVarType, setNewVarType] = useState<"string" | "number" | "boolean">("string")

  const handleAddVariable = () => {
    if (!newVarName.trim()) return

    const id = `var-${Date.now()}`
    const newVar: Variable = {
      id,
      name: newVarName,
      value: newVarValue,
      type: newVarType,
    }

    setVariables([...variables, newVar])
    setNewVarName("")
    setNewVarValue("")
    setNewVarType("string")
  }

  const handleDeleteVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id))
  }

  const handleUpdateVariable = (id: string, field: keyof Variable, value: string) => {
    setVariables(
      variables.map((v) => {
        if (v.id === id) {
          return { ...v, [field]: field === "type" ? value : value }
        }
        return v
      }),
    )
  }

  return (
    <div className={cn("h-full p-6", isDarkMode ? "bg-[#121212] text-white" : "bg-gray-50")}>
      <div
        className={cn(
          "mx-auto max-w-4xl rounded-lg border p-6 shadow-sm",
          isDarkMode ? "border-[#2a2a2a] bg-[#1e1e1e]" : "border-gray-200 bg-white",
        )}
      >
        <h2 className="text-xl font-semibold">Variables</h2>
        <p className={cn("mt-1 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
          Define variables to use across your automation workflow
        </p>

        <div className="mt-6">
          <div
            className={cn(
              "grid grid-cols-12 gap-4 border-b pb-2 text-sm font-medium",
              isDarkMode ? "border-[#2a2a2a] text-gray-300" : "border-gray-200 text-gray-500",
            )}
          >
            <div className="col-span-4">Name</div>
            <div className="col-span-6">Value</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-1"></div>
          </div>

          {variables.map((variable) => (
            <div key={variable.id} className="mt-2 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  value={variable.name}
                  onChange={(e) => handleUpdateVariable(variable.id, "name", e.target.value)}
                  className={cn(
                    "w-full rounded-md border px-3 py-1.5 text-sm",
                    isDarkMode
                      ? "border-[#2a2a2a] bg-[#2a2a2a] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                  )}
                />
              </div>
              <div className="col-span-6">
                <input
                  type="text"
                  value={variable.value}
                  onChange={(e) => handleUpdateVariable(variable.id, "value", e.target.value)}
                  className={cn(
                    "w-full rounded-md border px-3 py-1.5 text-sm",
                    isDarkMode
                      ? "border-[#2a2a2a] bg-[#2a2a2a] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                  )}
                />
              </div>
              <div className="col-span-1">
                <select
                  value={variable.type}
                  onChange={(e) => handleUpdateVariable(variable.id, "type", e.target.value)}
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
                </select>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => handleDeleteVariable(variable.id)}
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
            <div className="col-span-4">
              <input
                type="text"
                placeholder="New variable name"
                value={newVarName}
                onChange={(e) => setNewVarName(e.target.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-1.5 text-sm",
                  isDarkMode
                    ? "border-[#2a2a2a] bg-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                )}
              />
            </div>
            <div className="col-span-6">
              <input
                type="text"
                placeholder="Variable value"
                value={newVarValue}
                onChange={(e) => setNewVarValue(e.target.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-1.5 text-sm",
                  isDarkMode
                    ? "border-[#2a2a2a] bg-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                )}
              />
            </div>
            <div className="col-span-1">
              <select
                value={newVarType}
                onChange={(e) => setNewVarType(e.target.value as "string" | "number" | "boolean")}
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
              </select>
            </div>
            <div className="col-span-1">
              <button onClick={handleAddVariable} className="rounded-md bg-blue-600 p-1.5 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
