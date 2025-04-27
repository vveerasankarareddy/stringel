"use client"
import { InstructionsSection } from "./sections/instructions-section"
import { KnowledgeBasesSection } from "./sections/knowledge-bases-section"
import { WorkflowsSection } from "./sections/workflows-section"
import { ConversationAnalysisSection } from "./sections/conversation-analysis-section"

export function MainContent() {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-6 bg-background/90 semi-transparent custom-scrollbar">
      <InstructionsSection />
      <KnowledgeBasesSection />
      <WorkflowsSection />
      <ConversationAnalysisSection />
    </div>
  )
}
