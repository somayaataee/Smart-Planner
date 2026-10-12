import { useState } from "react";
import { Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const priorityColors = {
  High: "text-red-400",
  Medium: "text-yellow-400",
  Low: "text-green-400",
};
const statusConfig = {
  "In Progress": {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  Pending: { bg: "bg-gray-500/20", text: "text-gray-400", dot: "bg-gray-400" },
  Completed: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    dot: "bg-green-400",
  },
  Archived: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    dot: "bg-purple-400",
  },
};

function TaskCard({ task, onToggleComplete, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const statusStyle = statusConfig[task.status] || statusConfig["Pending"];

  return (
    <div style={{text:'var(--text)',background:'var(--card)'}} className=" rounded-xl p-3 mb-2 md:hidden">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1 rounded border-white/30"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3
              className={`text-sm font-medium ${task.completed ? "line-through text-white/50" : ""}`}
            >
              {task.name}
            </h3>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-white/50 ml-2"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-white/50">({task.project})</span>
            <span
              className={`text-xs font-medium ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>
          {expanded && (
            <div className="mt-3 space-y-2 border-t border-white/10 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Due Date</span>
                <span>{task.dueDate}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Status</span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusStyle.bg} ${statusStyle.text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                  ></span>
                  {task.status}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Assignee</span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/10 rounded-lg text-xs hover:bg-white/20 transition-colors">
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TaskTable({ tasks, onToggleComplete, onDelete }) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-white/60">
                <th className="p-4 w-10">
                  <input type="checkbox" className="rounded border-white/30" />
                </th>
                <th className="p-4 font-medium">Task Name</th>
                <th className="p-4 font-medium">Project</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium">Priority</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Assignee</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const statusStyle =
                  statusConfig[task.status] || statusConfig["Pending"];
                return (
                  <tr
                    key={task.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                        className="rounded border-white/30"
                      />
                    </td>
                    <td className="p-4 text-sm">{task.name}</td>
                    <td className="p-4 text-sm text-white/70">
                      ({task.project})
                    </td>
                    <td className="p-4 text-sm text-white/70">
                      {task.dueDate}
                    </td>
                    <td
                      className={`p-4 text-sm font-medium ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                        ></span>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 text-white/60 hover:text-white transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(task.id)}
                          className="p-1.5 text-white/60 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
