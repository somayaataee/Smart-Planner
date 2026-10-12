import { useCalendar } from "../../hooks/useCalendar.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner.jsx";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const shortDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function MonthlyCalendarView({ selectedDate, onDateSelect }) {
  const { currentMonth, calendarData, loading, error, prevMonth, nextMonth } =
    useCalendar(selectedDate);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const { completedDays = [], missedDays = [] } = calendarData;

  const renderDays = () => {
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="aspect-square p-1 text-white/20 text-xs flex items-start justify-center"
        >
          <span className="mt-1">{daysInPrevMonth - i}</span>
        </div>,
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = completedDays.includes(day);
      const isMissed = missedDays.includes(day);
      const isSelected =
        selectedDate instanceof Date &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month;
      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(new Date(year, month, day))}
          className={`aspect-square p-1 text-xs flex flex-col items-center justify-start cursor-pointer rounded-lg transition-colors ${isSelected ? "bg-white/10" : "hover:bg-white/5"}`}
        >
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${isSelected ? "bg-white text-black font-bold" : "text-white"}`}
          >
            {day}
          </span>
          {(isCompleted || isMissed) && (
            <div
              className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isCompleted ? "bg-emerald-400" : "bg-red-400"}`}
            />
          )}
        </div>,
      );
    }
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="aspect-square p-1 text-white/20 text-xs flex items-start justify-center"
        >
          <span className="mt-1">{i}</span>
        </div>,
      );
    }
    return days;
  };

  return (
    <div style={{background:'var(--card)',borderColor:'var(--border)'}} className="border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-purple-400 mb-4">
        Monthly Calendar View
      </h3>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      ) : error ? (
        <div className="text-center py-4 text-xs text-red-400">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {shortDayNames.map((day, i) => (
              <div
                key={i}
                className="text-center text-[10px] text-white/40 py-1"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
        </>
      )}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-[10px] text-white/50">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <span className="text-[10px] text-white/50">Missed</span>
        </div>
      </div>
    </div>
  );
}
