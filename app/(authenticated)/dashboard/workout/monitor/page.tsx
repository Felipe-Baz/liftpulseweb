import type { Metadata } from "next"
import TemplateAnalytics from "./template-analytics"
import { AnalyticsDashboard } from "./analytics-dashboard"

export const metadata: Metadata = {
  title: "Acompanhamento de Treinos",
  description: "Monitor training templates and user feedback",
}

export default function InstructorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Acompanhamento de treinos</h1>
      <div className="space-y-8">
        <AnalyticsDashboard />
        <TemplateAnalytics />
      </div>
    </div>
  )
}

