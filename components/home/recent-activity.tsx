import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      bot: "Customer Support",
      action: "Resolved ticket #1234",
      time: "2 minutes ago",
    },
    {
      bot: "Sales Assistant",
      action: "Generated product recommendation",
      time: "15 minutes ago",
    },
    {
      bot: "Onboarding Guide",
      action: "Completed user onboarding",
      time: "1 hour ago",
    },
    {
      bot: "Data Analyzer",
      action: "Generated monthly report",
      time: "3 hours ago",
    },
    {
      bot: "Customer Support",
      action: "Escalated ticket #1201 to human agent",
      time: "5 hours ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your bots have been busy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-primary/10 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.bot}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
