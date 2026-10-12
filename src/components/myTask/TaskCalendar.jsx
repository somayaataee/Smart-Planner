import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const shortDayNames = ["S", "M", "T", "W", "T", "F", "S"];

const calendarTabs = ["Month", "Week", "Day", "List"];

export function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 1));
  const [activeView, setActiveView] = useState("Month");
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const events = {
    5: [
      {
        time: "9:00 AM",
        title: "React Project",
        duration: "2h",
        priority: "High",
        color: "bg-purple-600",
        borderColor: "border-purple-500",
        textColor: "text-purple-300",
      },
    ],
    6: [
      {
        time: "10:00 AM",
        title: "Learn English",
        duration: "1h",
        priority: "Medium",
        color: "bg-orange-500",
        borderColor: "border-orange-400",
        textColor: "text-orange-300",
      },
    ],
    7: [
      {
        time: "9:00 AM",
        title: "Review Notes",
        duration: "30min",
        priority: "Low",
        color: "bg-blue-500",
        borderColor: "border-blue-400",
        textColor: "text-blue-300",
      },
    ],
  };

  const renderDays = () => {
    const days = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const dayLabels = isMobile ? shortDayNames : dayNames;

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="aspect-square p-1 text-white/30 text-xs md:text-sm flex items-start justify-center"
        >
          <span className="mt-1">{daysInPrevMonth - i}</span>
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events[day] || [];
      const isToday = day === 5;
      days.push(
        <div
          key={day}
          className={`aspect-square p-1 text-xs md:text-sm relative flex flex-col items-center ${isToday ? "bg-white/10 rounded-lg" : ""}`}
        >
          <span
            className={`inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 text-xs md:text-sm rounded-full mb-0.5 ${isToday ? "bg-white text-black font-bold" : "text-white"}`}
          >
            {day}
          </span>
          <div className="w-full flex flex-col gap-0.5 mt-auto">
            {dayEvents.map((event, idx) => (
              <div
                key={idx}
                className={`w-full h-1.5 md:h-2 rounded-full cursor-pointer ${event.color}`}
                onMouseEnter={() => setHoveredEvent({ day, event, idx })}
                onMouseLeave={() => setHoveredEvent(null)}
              />
            ))}
          </div>
          {dayEvents.map(
            (event, idx) =>
              hoveredEvent &&
              hoveredEvent.day === day &&
              hoveredEvent.idx === idx && (
                <div
                  key={`popup-${idx}`}
                  className="hidden md:block absolute z-50 left-full top-0 ml-2 w-48 bg-gray-900 border rounded-xl p-3 shadow-2xl"
                  style={{
                    marginTop: "10px",
                    borderColor: event.borderColor.replace("border-", ""),
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${event.color}`}
                    ></div>
                    <span className="text-xs text-white/60">{event.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-white/70">{event.duration}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${event.textColor} bg-white/10`}
                    >
                      {event.priority}
                    </span>
                  </div>
                  <div
                    className="absolute -left-1.5 top-4 w-3 h-3 bg-gray-900 transform rotate-45"
                    style={{
                      borderLeft: `1px solid`,
                      borderBottom: `1px solid`,
                      borderColor: event.borderColor.replace("border-", ""),
                    }}
                  ></div>
                </div>
              ),
          )}
        </div>,
      );
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="aspect-square p-1 text-white/30 text-xs md:text-sm flex items-start justify-center"
        >
          <span className="mt-1">{i}</span>
        </div>,
      );
    }
    return days;
  };

  return (
    <div style={{borderColor:'var(--border)',background:'var(--card)'}} className="border rounded-xl p-3 md:p-4">
      <div className="flex items-start justify-between mb-2 md:mb-1">
        <h2 className="text-base md:text-lg font-semibold">Calendar</h2>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-white/50 hidden sm:inline">
            Planned Focus Time
          </span>
          <span className="text-white/50 sm:hidden">Focus</span>
          <span className="font-semibold">2h</span>
        </div>
      </div>
      <div className="flex justify-end mb-3 md:mb-4">
        <div className="flex bg-white/10 rounded-lg p-0.5">
          {calendarTabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-md transition-colors font-medium ${activeView === tab ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold text-sm md:text-base">
          {monthNames[month]} {year}
        </span>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <button style={{background:'var(--primary)',text:'var(--text)'}} className="px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-lg hover:bg-white/20 transition-colors font-medium">
            Today
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day, i) => (
          <div
            key={i}
            className="text-center text-[10px] md:text-xs text-white/50 py-1 font-medium hidden md:block"
          >
            {day}
          </div>
        ))}
        {shortDayNames.map((day, i) => (
          <div
            key={i}
            className="text-center text-[10px] md:text-xs text-white/50 py-1 font-medium md:hidden"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
}
