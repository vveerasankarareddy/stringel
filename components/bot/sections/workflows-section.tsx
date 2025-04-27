import { CircleHelp, Workflow, ArrowRight, Plus } from "lucide-react"

export function WorkflowsSection() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Workflow className="w-5 h-5 text-green-500" />
        <span className="font-medium">Workflows</span>
        <CircleHelp className="w-4 h-4 text-gray-500" />
      </div>
      <div className="bg-[#18181B]/90 rounded-lg border border-[#2a2a2a] overflow-hidden">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#2a2a2a] rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-md bg-blue-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <h3 className="font-medium mb-1">Customer Onboarding</h3>
              <p className="text-sm text-gray-400 mb-3">Guide new customers through product setup</p>
              <div className="flex items-center text-xs text-gray-400">
                <span>3 steps</span>
                <ArrowRight className="w-3 h-3 mx-2" />
                <span>2 min avg. completion</span>
              </div>
            </div>

            <div className="border border-[#2a2a2a] rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-md bg-purple-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <h3 className="font-medium mb-1">Support Ticket Triage</h3>
              <p className="text-sm text-gray-400 mb-3">Categorize and route support requests</p>
              <div className="flex items-center text-xs text-gray-400">
                <span>5 steps</span>
                <ArrowRight className="w-3 h-3 mx-2" />
                <span>1 min avg. completion</span>
              </div>
            </div>

            <div className="border border-[#2a2a2a] rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-md bg-green-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <h3 className="font-medium mb-1">Lead Qualification</h3>
              <p className="text-sm text-gray-400 mb-3">Qualify and score potential leads</p>
              <div className="flex items-center text-xs text-gray-400">
                <span>4 steps</span>
                <ArrowRight className="w-3 h-3 mx-2" />
                <span>3 min avg. completion</span>
              </div>
            </div>

            <div className="border border-dashed border-[#2a2a2a] rounded-lg p-4 hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center h-[152px]">
              <div className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">Create new workflow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
