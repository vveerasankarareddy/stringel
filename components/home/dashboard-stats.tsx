export function DashboardStats() {
  const stats = [
    {
      title: "Total Bots",
      value: "12",
      change: "+2",
      changeType: "increase",
    },
    {
      title: "Active Conversations",
      value: "324",
      change: "+18%",
      changeType: "increase",
    },
    {
      title: "User Satisfaction",
      value: "98%",
      change: "+2.3%",
      changeType: "increase",
    },
    {
      title: "Response Time",
      value: "1.2s",
      change: "-0.1s",
      changeType: "decrease",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <div className={`text-xs ${stat.changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
              {stat.change}
            </div>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </>
  )
}
