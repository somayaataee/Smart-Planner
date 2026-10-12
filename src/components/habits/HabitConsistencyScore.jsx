export function HabitConsistencyScore({ score, loading }) {
  const circumference = 2 * Math.PI * 80;
  const safeScore = Math.min(100, Math.max(0, score || 0));

  if (loading) {
    return (
      <div className="bg-white/5 rounded-xl p-4 md:p-5 flex items-center justify-center py-12">
        <div className="animate-pulse text-white/30 text-sm">
          Loading score...
        </div>
      </div>
    );
  }

  return (
    <div style={{background:'var(--card)',text:'var(--text)',borderColor:'var(--border)'}} className="border rounded-xl p-4 md:p-5">
      <h3 className="text-sm font-semibold text-purple-400 mb-4">
        Habit Consistency Score
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-24">
          <svg className="w-full h-full" viewBox="0 0 200 120">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255,255,275,0.3)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="gaugeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference * 0.75}
              strokeDashoffset={
                circumference * 0.75 -
                (safeScore / 100) * (circumference * 0.75)
              }
              className="transition-all duration-1000"
            />
            <line
              x1="100"
              y1="100"
              x2={100 + 60 * Math.cos(Math.PI - (safeScore / 100) * Math.PI)}
              y2={100 - 60 * Math.sin(Math.PI - (safeScore / 100) * Math.PI)}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="white" />
          </svg>
        </div>
      </div>
      <div className="text-center mt-2">
        <span className="text-3xl font-bold">{safeScore}%</span>
        <p className="text-xs mt-1">Overall consistency</p>
      </div>
    </div>
  );
}
