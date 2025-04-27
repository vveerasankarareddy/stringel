import { RefreshCw, Plus, Send } from "lucide-react"

export function Emulator() {
  return (
    <div className="w-96 border-l border-[#2a2a2a] flex flex-col bg-[#18181B]/90 semi-transparent sticky top-0 h-screen">
      <div className="h-14 border-b border-[#2a2a2a] flex items-center px-4 justify-between">
        <span>Emulator</span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="text-gray-600 w-full h-full">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button className="bg-[#0066cc] hover:bg-blue-600 rounded-md px-4 py-2 text-sm mb-4">Test your bot</button>
        <p className="text-sm text-gray-400 text-center">You can test your bot by typing a message below</p>
      </div>
      <div className="p-3 border-t border-[#2a2a2a]">
        <div className="flex items-center bg-[#18181B] rounded-full border border-[#2a2a2a] px-3 py-2">
          <button className="text-gray-400 mr-2">
            <Plus className="w-5 h-5" />
          </button>
          <input type="text" placeholder="Type a message..." className="bg-transparent flex-1 outline-none text-sm" />
          <button className="bg-[#2a2a2a] rounded-full p-1 ml-2">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
