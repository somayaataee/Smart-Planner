export function HabitStreaks({ habit }) {
  if (!habit || !Array.isArray(habit.weeklyData)) return null;

  const maxValue = Math.max(...habit.weeklyData, 1);

  return (
    <div
      className={`bg-gradient-to-br ${habit.color || "from-white/10 to-white/5"} rounded-xl p-3 border border-white/5`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{habit.icon || "✓"}</span>
          <span className="text-sm font-medium text-white/90">
            {habit.name || "Unnamed"}
          </span>
        </div>
        <button className="text-white/30 hover:text-white/60 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
      <div className="flex items-end gap-1 h-10 mb-2">
        {habit.weeklyData.map((value, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-sm ${habit.barColor || "bg-white/30"} opacity-80`}
            style={{ height: `${(value / maxValue) * 100}%`, minHeight: "4px" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">Progress</span>
        <span className="font-medium text-white/80">
          {habit.streak || 0} days
        </span>
      </div>
    </div>
  );
}
