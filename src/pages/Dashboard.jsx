import { useState } from "react";
import { IoMdFlame, IoMdSunny } from "react-icons/io";
import AddTask from "../components/dashboard/AddTask.jsx";
import { useTaskStore } from "../store/taskStore.js";
import { FileLockIcon, Plus, Timer } from "lucide-react";
import { Trash2Icon } from "@animateicons/react/lucide";

export default function Dashboard() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [openModal, setOpenModal] = useState(false);

  // -----add task
  const handleAddTask = (task) => {
    addTask(task);
    setOpenModal(false);
  };

  //------status task
  const completedTask = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  // -------top header card data
  const cartData = [
    {
      id: 1,
      value: tasks.length,
      title: "Total Tasks",
      icon: <Timer className="text-blue-400" size={22} />,
    },
    {
      id: 2,
      value: completedTask,
      title: "Task Completed",
      icon: <FileLockIcon className="text-green-400" size={22} />,
    },
    {
      id: 3,
      value: "0",
      title: "Day Streak",
      icon: <IoMdFlame className="text-orange-400" size={24} />,
    },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-500/15 text-red-400 border border-red-500/20";
    }
    if (priority === "Medium") {
      return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";
    }
    return "bg-green-500/15 text-green-400 border border-green-500/20";
  };

  const getStatusIcon = (status) => {
    if (status === "Done") return "✅";
    if (status === "Pending") return "🔄";
    if (status === "Canceled") return "❌";
    return "";
  };

  return (
    <div style={{ color: "var(--text)" }} className="min-w-0">
      {/* ----------Header section ---------- */}
      <section
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="mb-6 flex flex-col gap-6 rounded-3xl border p-4 shadow-sm sm:p-5 md:p-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Good Morning,
            <span
              style={{ color: "var(--primary)" }}
              className="ml-2 inline-flex items-center gap-1"
            >
              User's Name
              <IoMdSunny className="inline-block" size={22} />
            </span>
          </h1>
          <p className="mt-3 text-sm opacity-70 md:text-base">
            You have a productive day. Let's get things done!
          </p>
        </div>

        <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:w-auto">
          {cartData.map((item) => (
            <div
              key={item.id}
              style={{
                borderColor: "var(--border)",
                background: "var(--bg)",
              }}
              className="min-w-0 rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-1 sm:p-4"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {item.icon}
                <span className="text-lg font-bold sm:text-xl">
                  {item.value}
                </span>
              </div>
              <p className="mt-2 truncate text-xs opacity-80 sm:whitespace-nowrap">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------Add Task button ---------- */}
      <button
        onClick={() => setOpenModal(true)}
        style={{ background: "var(--primary)" }}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-black shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-auto"
      >
        Add Task
        <Plus size={20} />
      </button>

      {/* ----------Modal ---------- */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <AddTask
            closeModal={() => setOpenModal(false)}
            addTask={handleAddTask}
          />
        </div>
      )}

      {/* ----------today schedule list ---------- */}
      <section
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="rounded-3xl border p-3 shadow-sm sm:p-4 md:p-6"
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
            Today's Schedule
          </h2>
          <p className="mt-1 text-sm opacity-60">
            Manage your tasks and stay productive.
          </p>
        </div>

        {tasks.length === 0 ? (
          <div
            style={{ background: "var(--card)" }}
            className="rounded-2xl p-10 text-center"
          >
            <div className="mb-3 text-4xl">📝</div>
            <h3 className="font-bold">No tasks yet</h3>
            <p className="mt-2 text-sm opacity-50">
              Add your first task and start being productive.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  color: "var(--text)",
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                }}
                className="group flex flex-col gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                  {/* ----------Reminder notification ---------- */}
                  <div className="shrink-0 text-xs opacity-60">
                    {task.reminder ? (
                      <span>🔔 Reminder</span>
                    ) : (
                      <span className="opacity-0">Reminder</span>
                    )}
                  </div>

                  {/* ------time ---------- */}
                  <div
                    style={{ color: "var(--primary)" }}
                    className="shrink-0 font-semibold text-sm sm:text-base"
                  >
                    {task.time}
                  </div>

                  {/* -------title ---------- */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{task.title}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <span>{getStatusIcon(task.status)}</span>
                    <span className="hidden sm:inline">{task.status}</span>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="rounded-xl p-2 transition-all duration-300"
                  >
                    <Trash2Icon
                      style={{ color: "var(--primary)" }}
                      size={20}
                      duration={1}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}