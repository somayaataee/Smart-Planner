import { ChevronLeft, ChevronRight } from "lucide-react";

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-orange-500",
  Low: "bg-green-500",
  Break: "bg-purple-500",
};
const priorityBadgeColors = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-orange-500/20 text-orange-400",
  Break: "bg-purple-500/20 text-purple-400",
  Low: "bg-green-500/20 text-green-400",
};

export function TodaySchedule({ items }) {
  return (
    <div style={{borderColor:'var(--border)',background:'var(--card)'}} className="  border rounded-xl p-3 md:p-4">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-sm font-medium">Today's Schedule</h3>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-3">
            <span className="text-[10px] md:text-xs text-white/50 w-12 md:w-14 shrink-0">
              {item.time}
            </span>
            <div
              className={`h-6 md:h-8 w-1 rounded-full ${priorityColors[item.priority]}`}
            ></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm truncate">
                  {item.title}
                </span>
                <span className="text-[10px] md:text-xs text-white/50 ml-2 shrink-0">
                  {item.duration}
                </span>
              </div>
            </div>
            <span
              className={`text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full shrink-0 ${priorityBadgeColors[item.priority]}`}
            >
              {item.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
