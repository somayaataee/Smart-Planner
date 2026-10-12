import { useState } from "react";
import { Plus } from "lucide-react";

export function QuickTaskInput() {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) setTaskName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-4"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Add Quick Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} style={{background:'var(--bg)',text:'var(--text)'}}
          className="w-full border border-white/20 rounded-lg px-4 py-2 placeholder-white/50 focus:outline-none focus:border-white/40 text-sm"
        />
      </div>
      <button style={{background:'var(--primary)',text:'var(--text)'}}
        type="submit"
        className="flex items-center justify-center gap-2  px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors text-sm shrink-0"
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Add Quick Task</span>
        <span className="sm:hidden">Add</span>
      </button>
    </form>
  );
}
