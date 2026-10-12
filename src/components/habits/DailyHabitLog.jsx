import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner";

export function DailyHabitLog({
  habits,
  selectedDate,
  onToggleHabit,
  loading,
}) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const prevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const nextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  return (
    <div style={{background:'var(--card)',borderColor:'var(--border)',text:'var(--text)'}} className="border rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-purple-400">
          Daily Habit Log
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs ">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(currentDate)}
          </div>
          <div className="flex gap-1">
            <button
              onClick={prevDay}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={nextDay}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs mb-3">
        Today,{" "}
        {currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>

      {loading && habits.length === 0 ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      ) : (
        <div className="space-y-2">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${habit.completedToday ? "bg-white/5" : "bg-white/[0.02]"}`}
            >
              <button
                onClick={() => onToggleHabit(habit.id)}
                disabled={!habit.id}
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 ${habit.completedToday ? "bg-purple-500" : "border border-white/20 hover:border-white/40"}`}
              >
                {habit.completedToday && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${habit.completedToday ? "bg-white/10" : "bg-white/5"}`}
              >
                {habit.icon || "✓"}
              </div>
              <span
                className={`flex-1 text-sm ${habit.completedToday ? "text-white" : "text-white/50"}`}
              >
                {habit.name || "Unnamed Habit"}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                {habit.completedToday ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ) : (
                  <span className="text-white/30 text-xs">
                    {habit.icon || "○"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-white/40">
                <Clock size={12} />
                {habit.time || "--:--"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
