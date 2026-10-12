import { useState } from "react";
import { HabitStreaks } from "../components/habits/HabitStreaks.jsx";
import { WeeksGoal } from "../components/habits/WeeksGoal.jsx";
import { HabitConsistencyScore } from "../components/habits/HabitConsistencyScore.jsx";
import { DailyHabitLog } from "../components/habits/DailyHabitLog.jsx";
import { MonthlyCalendarView } from "../components/habits/MonthlyCalendarView.jsx";
import { LoadingSpinner } from "../components/common/LoadingSpinner.jsx";
import { ErrorMessage } from "../components/common/ErrorMessage.jsx";
import { useHabits } from "../hooks/useHabits.js";
import { useConsistency } from "../hooks/useConsistency.js";

export default function Habits() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    habits,
    loading: habitsLoading,
    error: habitsError,
    toggleHabit,
    refetch: refetchHabits,
  } = useHabits();
  const {
    score,
    loading: scoreLoading,
    error: scoreError,
    refetch: refetchScore,
  } = useConsistency();

  const handleToggleHabit = async (id) => {
    await toggleHabit(id, selectedDate);
  };

  const isLoading = habitsLoading || scoreLoading;
  const hasError = habitsError || scoreError;

  if (isLoading && habits.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div style={{ color: "var(--text)" }} className="min-w-0">
      {hasError && (
        <ErrorMessage
          message={habitsError || scoreError}
          onRetry={() => {
            if (habitsError) refetchHabits();
            if (scoreError) refetchScore();
          }}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold mb-1">
            My Habits Overview
          </h1>
          <p className="text-sm opacity-60">
            You have a productive day ahead. Let's get things done!
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold">
                Weekly Calendar
              </h2>
              <WeekRange selectedDate={selectedDate} />
            </div>
            <button
              style={{ backgroundColor: "var(--primary)" }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
            >
              <svg
                width="16"
                height="16"
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
              Filter
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
        <div className="flex-1 flex flex-col gap-4 md:gap-6 min-w-0">
          <div
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
            className="rounded-2xl border p-4 md:p-5"
          >
            <h3 className="text-sm font-semibold text-purple-400 mb-4">
              Habit Streaks
            </h3>
            {habitsLoading && habits.length === 0 ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {habits.map((habit) => (
                  <HabitStreaks key={habit.id} habit={habit} />
                ))}
                <WeeksGoal />
              </div>
            )}
          </div>
          <DailyHabitLog
            habits={habits}
            selectedDate={selectedDate}
            onToggleHabit={handleToggleHabit}
            loading={habitsLoading}
          />
        </div>
        <div className="w-full xl:w-80 flex flex-col gap-4 md:gap-6 shrink-0">
          <HabitConsistencyScore score={score} loading={scoreLoading} />
          <MonthlyCalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}

function WeekRange({ selectedDate }) {
  const weekStart = new Date(selectedDate);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const format = (d) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return (
    <p className="text-sm opacity-60">
      This Week: {format(weekStart)} - {format(weekEnd)}
    </p>
  );
}