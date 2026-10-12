import { useState } from "react";
import { TaskTabs } from "../components/myTask/TaskTabs.jsx";
import { TaskTable } from "../components/myTask/TaskTable.jsx";
import { TaskCalendar } from "../components/myTask/TaskCalendar.jsx";
import { TaskProgress } from "../components/myTask/TaskProgress.jsx";
import { TodaySchedule } from "../components/myTask/TodaySchedule.jsx";
import { QuickTaskInput } from "../components/myTask/QuickTaskInput.jsx";
import { LoadingSpinner } from "../components/common/LoadingSpinner.jsx";
import { ErrorMessage } from "../components/common/ErrorMessage.jsx";
import { useTasks } from "../hooks/useTasks.js";
import { useSchedule } from "../hooks/useSchedule.js";

export default function MyTasks() {
  const [activeTab, setActiveTab] = useState("all");
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    toggleTask,
    deleteTask,
    refetch: refetchTasks,
  } = useTasks();
  const {
    items: scheduleItems,
    loading: scheduleLoading,
    error: scheduleError,
    refetch: refetchSchedule,
  } = useSchedule();

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return task.status === "Pending";
    if (activeTab === "in-progress") return task.status === "In Progress";
    if (activeTab === "completed") return task.status === "Completed";
    if (activeTab === "archived") return task.status === "Archived";
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const progressPercent =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (tasksLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div style={{ color: "var(--text)" }} className="min-w-0">
      {(tasksError || scheduleError) && (
        <ErrorMessage
          message={tasksError || scheduleError}
          onRetry={() => {
            if (tasksError) refetchTasks();
            if (scheduleError) refetchSchedule();
          }}
        />
      )}

      <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            My Tasks
          </h1>
          <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <QuickTaskInput />
          <TaskTable
            tasks={filteredTasks}
            onToggleComplete={toggleTask}
            onDelete={deleteTask}
          />
        </div>
        <div className="w-full xl:w-80 flex flex-col gap-4 md:gap-6 shrink-0">
          <TaskCalendar />
          <TaskProgress
            percent={progressPercent}
            completed={completedCount}
            total={tasks.length}
          />
          <TodaySchedule items={scheduleItems} loading={scheduleLoading} />
        </div>
      </div>
    </div>
  );
}