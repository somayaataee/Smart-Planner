import { LoadingSpinner } from "../common/LoadingSpinner";
import { ActivityIcon,EllipsisVerticalIcon  } from "@animateicons/react/lucide";

const COLORS = [
  "#8b5cf6",
  "#6366f1",
  "#ec4899",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
];

export function HoursBarChart({ data, loading }) {
  if (loading) {
    return (
      <div style={{background:'var(--)',text:'var(--text)'}} className="rounded-xl p-5">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  const safeData = Array.isArray(data) ? data : [];
  const maxValue = Math.max(...safeData.map((d) => d?.hours ?? 0), 1);

  return (
    <div style={{text:'var(--text)',background:'var(--card)',borderColor:'var(--border)'}} className="border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Hours per Project</h3>
        <div className="flex items-center gap-2">
          <button style={{background:'var(--primary)'}} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
           <ActivityIcon size={18} duration={1}/>
          </button>
          <button style={{color:'var(--primary)',text:'var(--text)'}} className=" hover:text-white/60">
            <EllipsisVerticalIcon size={20}/>
          </button>
        </div>
      </div>

      <div className="flex items-end gap-2 h-40 mb-3 px-2">
        {safeData.map((item, idx) => {
          const height = ((item?.hours ?? 0) / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md transition-all duration-500"
                style={{
                  height: `${height}%`,
                  backgroundColor: COLORS[idx % COLORS.length],
                  minHeight: "4px",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between px-2">
        {safeData.map((item, idx) => (
          <div key={idx} className="flex-1 text-center">
            <span style={{text:'var(--text)'}} className="text-[9px] block transform -rotate-45 origin-top-left translate-y-2 truncate max-w-[60px] mx-auto">
              {item?.name ?? ""}
            </span>
          </div>
        ))}
      </div>

      <div style={{text:'var(--text)'}} className="flex justify-between text-[10px] mt-4 px-2">
        <span>0</span>
        <span>3h</span>
        <span>6h</span>
        <span>9h</span>
        <span>12h</span>
        <span>15h</span>
      </div>
      <div style={{text:'var(--text)'}} className="text-center text-[10px] mt-1">Project</div>
    </div>
  );
}
