import { CircleHelp } from "lucide-react"

export function InstructionsSection() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-[#10b981]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
        <span className="font-medium">Instructions</span>
        <CircleHelp className="w-4 h-4 text-gray-500" />
      </div>
      <div className="bg-[#18181B]/90 rounded-lg p-4 border border-[#2a2a2a]">
        <div className="mb-4">
          <h3 className="text-gray-400 mb-1">Identity</h3>
          <p className="text-sm text-gray-300">
            You are the AI Support Agent for Mr. Mushroom's. Assist customers with orders, billing, account issues, and
            general inquiries.
          </p>
        </div>
        <div>
          <h3 className="text-gray-400 mb-1">Scope</h3>
          <p className="text-sm text-gray-300">Handle orders, billing, accounts, product info, and basic support.</p>
        </div>
        <div className="text-right mt-2">
          <span className="text-xs text-gray-500">209 tokens</span>
        </div>
      </div>
    </div>
  )
}
