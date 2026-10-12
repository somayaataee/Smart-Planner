import { ActivityIcon, EllipsisVerticalIcon } from "@animateicons/react/lucide";
import { LoadingSpinner } from "../common/LoadingSpinner";

const getScoreColor = (score) => {
  if (score >= 80) return "text-emerald-400 bg-emerald-500/10";
  if (score >= 50) return "text-yellow-400 bg-yellow-500/10";
  return "text-red-400 bg-red-500/10";
};

const getBarColor = (score) => {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 50) return "bg-yellow-400";
  return "bg-red-400";
};

const AVATAR_COLORS = [
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-orange-500/20 text-orange-400",
  "bg-pink-500/20 text-pink-400",
  "bg-cyan-500/20 text-cyan-400",
];

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function PerformanceTable({ data, loading }) {
  if (loading) {
    return (
      <div
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
        className="rounded-2xl border p-5"
      >
        <div className="flex justify-center py-10">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  const safeData = Array.isArray(data) ? data : [];

  return (
    <div
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
      className="rounded-2xl border p-4 sm:p-5 shadow-sm"
    >
      {/* ----------Header ---------- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            style={{ background: "var(--primary)" }}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-black"
          >
            <ActivityIcon size={16} duration={1} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold">Performance</h3>
            <p className="text-xs opacity-50">
              {safeData.length} {safeData.length === 1 ? "project" : "projects"}
            </p>
          </div>
        </div>

        <button
          aria-label="More options"
          className="rounded-lg p-1.5 opacity-50 transition hover:opacity-100 hover:bg-white/5"
        >
          <EllipsisVerticalIcon size={18} />
        </button>
      </div>

      {/* ----------Table ---------- */}
      {safeData.length === 0 ? (
        <div className="rounded-xl border border-dashed py-10 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm opacity-50">No performance data yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                <th className="pb-3 pt-1 text-left text-[10px] font-semibold uppercase tracking-widest opacity-40">
                  Project
                </th>
                <th className="pb-3 pt-1 text-right text-[10px] font-semibold uppercase tracking-widest opacity-40">
                  Hours
                </th>
                <th className="pb-3 pt-1 text-right text-[10px] font-semibold uppercase tracking-widest opacity-40">
                  Tasks
                </th>
                <th className="pb-3 pt-1 text-right text-[10px] font-semibold uppercase tracking-widest opacity-40">
                  Score
                </th>
              </tr>
            </thead>

            <tbody>
              {safeData.map((row, idx) => {
                const score = typeof row?.score === "number" ? row.score : 0;

                return (
                  <tr
                    key={row?.id ?? idx}
                    className="border-b last:border-0 transition-colors hover:bg-white/5"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {/* Project */}
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                        >
                          {getInitials(row?.name)}
                        </span>
                        <span className="truncate text-xs sm:text-sm font-medium">
                          {row?.name ?? "-"}
                        </span>
                      </div>
                    </td>

                    {/* Hours */}
                    <td className="py-3 text-right text-xs sm:text-sm opacity-80 whitespace-nowrap">
                      {row?.hours ?? 0}h
                    </td>

                    {/* Tasks */}
                    <td className="py-3 text-right text-xs sm:text-sm opacity-80 whitespace-nowrap">
                      {row?.tasksCompleted ?? 0}
                    </td>

                    {/* Score */}
                    <td className="py-3 pl-2">
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${getScoreColor(score)}`}
                        >
                          {row?.score ?? "0/0"}
                        </span>
                        {/* mini progress bar */}
                        <div className="h-1 w-16 sm:w-20 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getBarColor(score)}`}
                            style={{ width: `${Math.min(score, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}