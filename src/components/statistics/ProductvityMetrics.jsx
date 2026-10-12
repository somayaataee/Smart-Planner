import { BarChart3, Timer, Flame } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner.jsx";

export function ProductivityMetrics({ data, period, setPeriod, loading }) {
  const periods = ["Daily", "Weekly", "Monthly"];

  if (loading) {
    return (
      <div style={{background:'var(--bg)',text:'var(--text)'}} className=" rounded-xl p-5">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  const safeData = {
    avgDailyTasks: data?.avgDailyTasks ?? 0,
    longestFocusSession: data?.longestFocusSession ?? 0,
    goalStreak: data?.goalStreak ?? 0,
  };

  return (
    <div style={{text:'var(--text)',borderColor:'var(--border)'}} className="bg-white/5 border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Productivity Metrics</h3>
        <div  className="flex bg-white/10 rounded-lg p-0.5">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p.toLowerCase())} style={{text:'var(--text)'}}
              className={`px-3 py-1 text-xs rounded-md transition-colors font-medium ${
                period === p.toLowerCase()
                  ? "bg-purple-500 text-white"
                  : " hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{text:'var(--text)'}} className=" grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl p-4">
          <div  className="flex items-center justify-between mb-2">
            <span style={{text:'var(--text)'}} className="text-[10px] ">
              Avg.
              <br />
              Daily Tasks
            </span>
            <BarChart3 size={16} className="text-purple-400" />
          </div>
          <span className="text-2xl font-bold">{safeData.avgDailyTasks}</span>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span style={{text:'var(--text)'}} className="text-[10px] ">
              Longest
              <br />
              Focus Session
            </span>
            <Timer size={16} className="text-blue-400" />
          </div>
          <span className="text-2xl font-bold">
            {safeData.longestFocusSession}m
          </span>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span style={{text:'var(--text)'}} className="text-[10px]">
              Goal
              <br />
              Streak
            </span>
            <Flame size={16} className="text-orange-400" />
          </div>
          <span className="text-2xl font-bold">{safeData.goalStreak} days</span>
        </div>
      </div>
    </div>
  );
}
