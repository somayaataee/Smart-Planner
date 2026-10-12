const tabs = [
  { id: "all", label: "All Tasks" },
  { id: "pending", label: "Pending" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "archived", label: "Archived" },
];

export function TaskTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
            activeTab === tab.id
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
