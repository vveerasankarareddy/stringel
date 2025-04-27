import { BookOpen, CircleHelp, Globe, FileText, Table, Search, Type } from "lucide-react"

export function KnowledgeBasesSection() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-orange-400" />
        <span className="font-medium">Knowledge bases</span>
        <CircleHelp className="w-4 h-4 text-gray-500" />
      </div>
      <div className="bg-[#18181B]/90 rounded-lg p-4 border border-[#2a2a2a] flex flex-col items-center justify-center min-h-[300px]">
        <div className="bg-[#2a2a2a] text-gray-400 text-xs px-3 py-1 rounded-full mb-6">Disabled</div>
        <h3 className="text-xl font-medium mb-6">Add knowledge source</h3>
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          <button className="bg-[#1e3a8a]/90 text-blue-300 px-3 py-2 rounded-md text-sm flex items-center hover:bg-[#1e3a8a] transition-colors">
            <Globe className="w-4 h-4 mr-2" />
            Website
          </button>
          <button className="bg-[#854d0e]/90 text-yellow-300 px-3 py-2 rounded-md text-sm flex items-center hover:bg-[#854d0e] transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Document
          </button>
          <button className="bg-[#166534]/90 text-green-300 px-3 py-2 rounded-md text-sm flex items-center hover:bg-[#166534] transition-colors">
            <Table className="w-4 h-4 mr-2" />
            Table
          </button>
          <button className="bg-[#581c87]/90 text-purple-300 px-3 py-2 rounded-md text-sm flex items-center hover:bg-[#581c87] transition-colors">
            <Search className="w-4 h-4 mr-2" />
            Web Search
          </button>
          <button className="bg-[#9d174d]/90 text-pink-300 px-3 py-2 rounded-md text-sm flex items-center hover:bg-[#9d174d] transition-colors">
            <Type className="w-4 h-4 mr-2" />
            Rich Text
          </button>
          <button className="bg-[#18181B]/90 text-gray-300 border border-[#2a2a2a] px-3 py-2 rounded-md text-sm flex items-center hover:bg-[#2a2a2a] transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
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
          Your bot uses these sources to answer questions. Click to add sources or drag and drop files. (.pdf, .html,
          .txt, .doc, .docx)
        </p>
      </div>
    </div>
  )
}
