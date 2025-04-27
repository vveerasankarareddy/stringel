"use client"
import {
  BookOpen,
  ChevronRight,
  CircleHelp,
  Eye,
  FileText,
  Globe,
  Grid3X3,
  Home,
  Info,
  Layers,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share2,
  Table,
  Type,
} from "lucide-react"

export default function AIAgentInterface() {
  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-14 bg-[#1e1e1e] flex flex-col items-center py-4 border-r border-[#2a2a2a]">
        <div className="w-6 h-6 mb-6">
          <svg viewBox="0 24" fill="none" className="text-white">
            <path
              d="M12 2L2 7L12 12L22 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-5 mt-2">
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Home className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Layers className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <BookOpen className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Eye className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <FileText className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Layers className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center gap-5 mb-4">
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Settings className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-6 h-6 text-white hover:text-purple-400">
            <Info className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-sm font-medium">
            SR
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="h-14 border-b border-[#2a2a2a] flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-400">
              <div className="w-5 h-5 rounded-md border border-slate-200 border-gray-600 flex items-center justify-center dark:border-slate-800">
                <Home className="w-3 h-3" />
              </div>
              <span className="text-sm">sankar reddy's Workspace</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <div className="w-5 h-5 rounded-md border border-slate-200 border-gray-600 flex items-center justify-center dark:border-slate-800">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              </div>
              <span className="text-sm">perfect-opossum</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-[#2a2a2a] bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
              <span className="text-gray-300">Assistant</span>
            </button>
            <button className="bg-purple-700 hover:bg-purple-600 rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
              <span>Upgrade</span>
            </button>
            <button className="border border-[#2a2a2a] bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
              <span>Explore Hub</span>
            </button>
            <button className="border border-[#2a2a2a] bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
              <Share2 className="w-4 h-4 mr-1" />
              <span>Share</span>
            </button>
            <button className="bg-[#0066cc] hover:bg-blue-600 rounded-md px-3 py-1.5 text-sm flex items-center gap-1">
              <span>Publish</span>
              <svg
                width="16"
                height="16"
                viewBox="0 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Left Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Instructions Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[#10b981]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 24"
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
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-slate-200 border-[#2a2a2a] dark:border-slate-800">
                <div className="mb-4">
                  <h3 className="text-gray-400 mb-1">Identity</h3>
                  <p className="text-sm text-gray-300">
                    You are the AI Support Agent for Mr. Mushroom's. Assist customers with orders, billing, account
                    issues, and general inquiries.
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">Scope</h3>
                  <p className="text-sm text-gray-300">
                    Handle orders, billing, accounts, product info, and basic support.
                  </p>
                </div>
                <div className="text-right mt-2">
                  <span className="text-xs text-gray-500">209 tokens</span>
                </div>
              </div>
            </div>

            {/* Knowledge Bases Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-orange-400" />
                <span className="font-medium">Knowledge bases</span>
                <CircleHelp className="w-4 h-4 text-gray-500" />
              </div>
              <div className="bg-[#1e1e1e] rounded-lg p-4 border border-slate-200 border-[#2a2a2a] flex flex-col items-center justify-center min-h-[300px] dark:border-slate-800">
                <div className="bg-[#2a2a2a] text-gray-400 text-xs px-3 py-1 rounded-full mb-6">Disabled</div>
                <h3 className="text-xl font-medium mb-6">Add knowledge source</h3>
                <div className="flex gap-2 mb-6">
                  <button className="bg-[#1e3a8a] text-blue-300 px-3 py-2 rounded-md text-sm flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </button>
                  <button className="bg-[#854d0e] text-yellow-300 px-3 py-2 rounded-md text-sm flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Document
                  </button>
                  <button className="bg-[#166534] text-green-300 px-3 py-2 rounded-md text-sm flex items-center">
                    <Table className="w-4 h-4 mr-2" />
                    Table
                  </button>
                  <button className="bg-[#581c87] text-purple-300 px-3 py-2 rounded-md text-sm flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Web Search
                  </button>
                  <button className="bg-[#9d174d] text-pink-300 px-3 py-2 rounded-md text-sm flex items-center">
                    <Type className="w-4 h-4 mr-2" />
                    Rich Text
                  </button>
                  <button className="bg-[#1e1e1e] text-gray-300 border border-slate-200 border-[#2a2a2a] px-3 py-2 rounded-md text-sm flex items-center dark:border-slate-800">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M4 4l16 16" />
                    </svg>
                    <span className="ml-2">Notion</span>
                  </button>
                </div>
                <p className="text-sm text-gray-400 text-center max-w-md">
                  Your bot uses these sources to answer questions. Click to add sources or drag and drop files. (.pdf,
                  .html, .txt, .doc, .docx)
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Emulator */}
          <div className="w-96 border-l border-[#2a2a2a] flex flex-col">
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
                    viewBox="0 24"
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
                <svg viewBox="0 24" fill="none" className="text-gray-600 w-full h-full">
                  <path
                    d="M21 15a2 2 0 1-2 2H7l-4 4V5a2 1 2-2h14a2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <button className="bg-[#0066cc] hover:bg-blue-600 rounded-md px-4 py-2 text-sm mb-4">
                Test your bot
              </button>
              <p className="text-sm text-gray-400 text-center">You can test your bot by typing a message below</p>
            </div>
            <div className="p-3 border-t border-[#2a2a2a]">
              <div className="flex items-center bg-[#1e1e1e] rounded-full border border-slate-200 border-[#2a2a2a] px-3 py-2 dark:border-slate-800">
                <button className="text-gray-400 mr-2">
                  <Plus className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="bg-transparent flex-1 outline-none text-sm"
                />
                <button className="bg-[#2a2a2a] rounded-full p-1 ml-2">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
