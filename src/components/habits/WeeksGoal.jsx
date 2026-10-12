export function WeeksGoal() {
  return (
    <div style={{background:'var(--card)',text:'var(--text)',borderColor:'var(--border)'}} className=" rounded-xl p-3 border flex flex-col items-center justify-center">
      <h4 className="text-sm font-medium text-white/90 mb-2">Week's Goal</h4>
      <div className="relative w-20 h-20">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset="75"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset="180"
          />
        </svg>
        <div style={{color:'var(--primary)'}} className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px]  text-center leading-tight">
            Week's
            <br />
            goal
          </span>
        </div>
      </div>
      <div className="mt-2 space-y-1 w-full">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span className="">Week</span>
          <span className="ml-auto">5 days</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <span className="">Week</span>
          <span className="ml-auto">2 days</span>
        </div>
      </div>
    </div>
  );
}
