import { LayoutGrid, Clock, Target } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner.jsx";

export function ProjectPerformance({ data, loading }) {
  if (loading) {
    return (
      <div  className="bg-white/5 rounded-xl p-5">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  const safeData = {
    totalProjects: data?.totalProjects ?? 0,
    totalHours: data?.totalHours ?? 0,
    completionRate: data?.completionRate ?? 0,
  };

  return (
    <div style={{borderColor:'var(--border)'}} className="bg-white/5 border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Project Performance</h3>
        <div className="flex items-center gap-2">
          <button style={{color:'var(--primary)'}} className="p-1.5 bg-white/6 rounded-lg hover:bg-white/10 transition-colors">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          <div style={{color:'var(--primary)'}}  className="flex items-center gap-1.5 bg-white/7 px-3 py-1.5 rounded-lg text-xs">
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
            June 2024
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span style={{text:'var(--text)'}} className="text-xs ">Total Projects</span>
            <LayoutGrid size={16} className="" style={{color:'var(--primary)'}} />
          </div>
          <span className="text-2xl font-bold">{safeData.totalProjects}</span>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span style={{text:'var(--text)'}} className="text-xs ">Total Hours</span>
            <Clock size={16} className="" style={{color:'var(--primary)'}}/>
          </div>
          <span className="text-2xl font-bold">{safeData.totalHours}</span>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span style={{text:'var(--text)'}} className="text-xs ">Completion Rate</span>
            <Target size={16} className="" style={{color:'var(--primary)'}}/>
          </div>
          <span className="text-2xl font-bold">{safeData.completionRate}%</span>
        </div>
      </div>
    </div>
  );
}
