import { LoadingSpinner } from "../common/LoadingSpinner.jsx";

const COLORS = [
  "#8b5cf6",
  "#a16207",
  "#f59e0b",
  "#14b8a6",
  "#ec4899",
  "#78716c",
];

export function TasksByTypeChart({ data, loading }) {
  if (loading) {
    return (
      <div className="bg-white/5 rounded-xl p-5">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  const safeData = Array.isArray(data) ? data : [];
  const total =
    safeData.reduce((sum, item) => sum + (item?.value ?? 0), 0) || 1;

  let currentAngle = 0;
  const slices = safeData.map((item, idx) => {
    const value = item?.value ?? 0;
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = ((startAngle + angle) * Math.PI) / 180;
    const x1 = 50 + 35 * Math.cos(startRad);
    const y1 = 50 + 35 * Math.sin(startRad);
    const x2 = 50 + 35 * Math.cos(endRad);
    const y2 = 50 + 35 * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;

    return {
      path: `M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: COLORS[idx % COLORS.length],
      percentage: Math.round(percentage),
      name: item?.name ?? "",
    };
  });

  return (
    <div style={{background:'var(--card)',borderColor:'var(--border)'}} className="border rounded-xl p-5">
      <h3 style={{text:'var(--text)'}} className="text-base font-semibold mb-4">Tasks by Project Type</h3>

      <div className="flex items-center gap-4">
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {slices.map((slice, idx) => (
              <path key={idx} d={slice.path} fill={slice.color} />
            ))}
            <circle cx="50" cy="50" r="20" fill="#0a0a0a" />
          </svg>
        </div>

        <div className="flex-1 space-y-1.5">
          {slices.map((slice, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: slice.color }}
              />
              <span style={{text:'var(--text)'}} className="text-[10px] ">{slice.name}</span>
              <span style={{text:'var(--text)'}} className="text-[10px]  ml-auto">
                {slice.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
