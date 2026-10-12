import { LoadingSpinner } from "../common/LoadingSpinner";
          import { ActivityIcon, EllipsisVerticalIcon } from "@animateicons/react/lucide";

export function DailyCompletionChart({ data, loading }) {
  if (loading) {
    return (
      <div style={{text:'var(--text)'}} className=" rounded-xl p-5">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  const safeData = {
    labels: Array.isArray(data?.labels)
      ? data.labels
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    values: Array.isArray(data?.values) ? data.values : [2, 7, 4, 9, 6, 9, 6],
  };

  const maxValue = Math.max(...safeData.values, 1);
  const points = safeData.values
    .map((v, i) => {
      const x = (i / (safeData.values.length - 1)) * 100;
      const y = 100 - ((v / maxValue) * 80 + 10);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div style={{text:'var(--text)',background:'var(--card)',borderColor:'var(--border)'}} className="border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3  className="text-base font-semibold">Daily Task Completion Trend</h3>
        <div className="flex items-center gap-2">
          <button style={{color:'var(--text)',background:'var(--primary)'}} className=" p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <ActivityIcon
              size={18}
              duration={1}
            />
          </button>


          <button style={{color:'var(--primary)',text:'var(--text)'}} className=" hover:text-white/60">
            <EllipsisVerticalIcon size={20}/>
          </button>
        </div>
      </div>

      <div className="relative h-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints} fill="url(#areaGradient)" />
          <polyline
            points={points}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {safeData.values.map((v, i) => {
            const x = (i / (safeData.values.length - 1)) * 100;
            const y = 100 - ((v / maxValue) * 80 + 10);
            return <circle key={i} cx={x} cy={y} r="2" fill="#8b5cf6" />;
          })}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] text-white/40 mt-2">
        {safeData.labels.map((label, i) => (
          <span key={i} className="flex-1 text-center">
            {label}
          </span>
        ))}
      </div>
      <div className="text-center text-[10px] text-yellow-300 mt-1">Tasks</div>
    </div>
  );
}
