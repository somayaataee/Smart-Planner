export function TaskProgress({ percent, completed, total }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div style={{text:'var(--text)',borderColor:'var(--border)',background:'var(--card)'}} className="border rounded-xl p-3 md:p-4">
      <h3 className="text-sm font-medium mb-3 md:mb-4">Task Progress</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold">{percent}%</span>
            <span style={{text:'var(--text)'}} className="text-[10px] md:text-xs ">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
