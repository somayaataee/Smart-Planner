import { EllipsisVerticalIcon } from "@animateicons/react/lucide";
import { LoadingSpinner } from "../common/LoadingSpinner";

const COLORS = ["#8b5cf6", "#3b82f6", "#f59e0b", "#ec4899", "#10b981"];

export function FocusTimeAnalysis({ data, loading }) {
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
    planned: data?.planned ?? 10,
    actual: data?.actual ?? 8.5,
    projects: Array.isArray(data?.projects)
      ? data.projects
      : [
          { name: "React Project", planned: 10, actual: 8.5 },
          { name: "Study", planned: 7, actual: 5 },
          { name: "Learn English", planned: 5, actual: 3 },
          { name: "Health", planned: 2, actual: 1.5 },
          { name: "Personal", planned: 1, actual: 0.5 },
        ],
  };

  const maxHours = Math.max(
    ...safeData.projects.map((p) => p?.planned ?? 0),
    1,
  );
  const circumference = 2 * Math.PI * 35;
  const offset =
    circumference - (safeData.actual / safeData.planned) * circumference;

  return (
    <div style={{text:'var(--text)',background:'var(--card)',borderColor:'var(--border)'}} className="border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Focus Time Analysis</h3>
        <button style={{color:'var(--primary)'}} className=" hover:text-white/60">
            <EllipsisVerticalIcon size={20}/>
        </button>
      </div>

      <p style={{text:'var(--text)'}} className="text-xs mb-3">
        Planned vs. Actual Focus Time
      </p>

      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 shrink-0">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 80 80"
          >
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold">{safeData.actual}h</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {safeData.projects.map((project, idx) => {
            const plannedWidth = ((project?.planned ?? 0) / maxHours) * 100;
            const actualWidth = ((project?.actual ?? 0) / maxHours) * 100;
            return (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-white/60">{project?.name ?? ""}</span>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      width: `${plannedWidth}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                      opacity: 0.3,
                    }}
                  />
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      width: `${actualWidth}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 text-[10px] ">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500/30"></div>
          <span>Planned: {safeData.planned}h</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span>Actual: {safeData.actual}h</span>
        </div>
      </div>
    </div>
  );
}
