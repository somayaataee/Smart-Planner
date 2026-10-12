import Sidebar from "../components/layout/Sidebar.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import { LoadingSpinner } from "../components/common/LoadingSpinner.jsx";
import { ErrorMessage } from "../components/common/ErrorMessage.jsx";
import { ProjectPerformance } from "../components/statistics/ProjectPerformance.jsx";
import { ProductivityMetrics } from "../components/statistics/ProductvityMetrics.jsx";
import { HoursBarChart } from "../components/statistics/HoursBarChart.jsx";
import { DailyCompletionChart } from "../components/statistics/DailyCompletionChart.jsx";
import { TasksByTypeChart } from "../components/statistics/TasksByTypeChart.jsx";
import { PerformanceTable } from "../components/statistics/PerformanceTable.jsx";
import { FocusTimeAnalysis } from "../components/statistics/FocusTimeAnalysis.jsx";
import { useProjectPerformance } from "../hooks/useProjectPerformance.js";
import { useProductivityMetrics } from "../hooks/useProductivityMetrics.js";
import { useHoursPerProject } from "../hooks/useHoursPerProjects.js";
import { useDailyCompletion } from "../hooks/useDailyCompletion.js";
import { useTasksByType } from "../hooks/useTasksByType.js";
import { usePerformanceTable } from "../hooks/usePerformanceTable";
import { useFocusTime } from "../hooks/useFocusTime.js";

export default function Statistics() {
  const pp = useProjectPerformance();
  const pm = useProductivityMetrics();
  const hp = useHoursPerProject();
  const dc = useDailyCompletion();
  const tt = useTasksByType();
  const pt = usePerformanceTable();
  const ft = useFocusTime();

  const isLoading =
    pp.loading &&
    pm.loading &&
    hp.loading &&
    dc.loading &&
    tt.loading &&
    pt.loading &&
    ft.loading;
  const hasError =
    pp.error ||
    pm.error ||
    hp.error ||
    dc.error ||
    tt.error ||
    pt.error ||
    ft.error;

  if (isLoading) {
    return (
      <div style={{background:'var(--bg)',text:'var(--text)'}} className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:'var(--bg)',text:'var(--text)'}} className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto pb-28 md:pb-6">
          {hasError && (
            <ErrorMessage
              message="Some data failed to load. Showing available information."
              onRetry={() => {
                if (pp.error) pp.refetch();
                if (pm.error) pm.refetch();
                if (hp.error) hp.refetch();
                if (dc.error) dc.refetch();
                if (tt.error) tt.refetch();
                if (pt.error) pt.refetch();
                if (ft.error) ft.refetch();
              }}
            />
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">
              Smart Planner Statistics
            </h1>
            <div className="flex items-center gap-3">
              <span style={{text:'var(--text)'}} className="text-xs">Planned Focus Time</span>
              <span className="text-xs font-semibold">2h</span>
              <div style={{background:'var(--bg)',text:'var(--text)'}} className="flex rounded-lg p-0.5">
                <button style={{background:'var(--primar)',text:'var(--text)'}} className="px-3 py-1 text-xs rounded-md  font-medium">
                  Week
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="xl:col-span-2 flex flex-col gap-4 md:gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <ProjectPerformance data={pp.data} loading={pp.loading} />
                <ProductivityMetrics
                  data={pm.data}
                  period={pm.period}
                  setPeriod={pm.setPeriod}
                  loading={pm.loading}
                />
              </div>
              <HoursBarChart data={hp.data} loading={hp.loading} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <TasksByTypeChart data={tt.data} loading={tt.loading} />
                <PerformanceTable data={pt.data} loading={pt.loading} />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <DailyCompletionChart data={dc.data} loading={dc.loading} />
              <FocusTimeAnalysis data={ft.data} loading={ft.loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
