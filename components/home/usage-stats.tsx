export function UsageStats() {
  const stats = [
    {
      title: "Bot Count",
      value: "1/1",
      percentage: 100,
      color: "#ec4899",
    },
    {
      title: "Table Rows",
      value: "60/1K",
      percentage: 6,
      color: "#3b82f6",
    },
    {
      title: "Messages",
      value: "12/500",
      percentage: 2.4,
      color: "#3b82f6",
    },
    {
      title: "AI Spend",
      value: "$0.07/$5",
      percentage: 1.4,
      color: "#3b82f6",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative w-14 h-14 mb-1">
            <svg viewBox="0 0 36 36" className="w-14 h-14 transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={stat.color}
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - stat.percentage}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white">
              {stat.percentage}%
            </div>
          </div>
          <div className="text-xs text-white text-center">{stat.title}</div>
          <div className="text-xs text-gray-400 text-center">{stat.value}</div>
        </div>
      ))}
    </>
  )
}
