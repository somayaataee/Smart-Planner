import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HouseIcon,
  CircleCheckIcon,
  HourglassIcon,
  ChartNoAxesCombinedIcon,
  RepeatIcon,
  SettingsIcon,
  LogOutIcon,
  FilePenIcon,
  SparklesIcon,
} from "@animateicons/react/lucide";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: HouseIcon },
  { name: "My Tasks", path: "/tasks", icon: CircleCheckIcon },
  { name: "Focus Timer", path: "/focus", icon: HourglassIcon },
  { name: "Statistics", path: "/statistics", icon: ChartNoAxesCombinedIcon },
  { name: "Habits", path: "/habits", icon: RepeatIcon },
  { name: "Notes", path: "/notes", icon: FilePenIcon },
  { name: "Settings", path: "/setting", icon: SettingsIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      <aside
        style={{ background: "var(--card)", color: "var(--text)" }}
        className="hidden md:flex flex-col h-[96vh] mt-3 ml-3 w-60 rounded-2xl shrink-0 sticky top-3"
      >
<div className="px-6 py-6 flex items-center gap-2.5">
  <div
    style={{ background: 'var(--primary)' }}
    className="size-8 rounded-lg flex items-center justify-center shrink-0"
  >
    <span className="text-white font-bold text-sm">S</span>
  </div>
  <span style={{ color: 'var(--text)' }} className="text-lg font-semibold tracking-tight">
    Smart Planner
  </span>
</div>
      
        <nav className="flex-1 px-3 mt-2">
          <ul className="space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <li key={link.path} className="relative">
                  {isActive && (
                    <span
                      style={{ background: "var(--primary)" }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full"
                    />
                  )}
                  <Link
                    to={link.path}
                    style={
                      isActive
                        ? { background: "rgba(124,92,252,0.12)", color: "var(--primary)" }
                        : undefined
                    }
                    className={`flex items-center gap-3 pl-5 pr-4 py-2.5 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "font-medium"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Upgrade card */}
        <div className="mx-3 mb-3">
          <div
            style={{
              background: "linear-gradient(160deg, rgba(124,92,252,0.18), rgba(124,92,252,0.04))",
              border: "1px solid rgba(124,92,252,0.25)",
            }}
            className="rounded-2xl p-4"
          >
            <SparklesIcon size={18} style={{ color: "var(--primary)" }} />
            <p className="text-sm font-semibold mt-2">Upgrade to Pro</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Unlock every feature and stay ahead of your tasks.
            </p>
            <button
              style={{ background: "var(--primary)" }}
              className="w-full mt-3 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Upgrade now
            </button>
          </div>
        </div>

        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 pl-5 pr-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <LogOutIcon size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.06)" }}
        className="md:hidden fixed bottom-0 left-0 right-0 border-t z-50"
      >
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex items-center px-2 py-2 gap-1 min-w-full">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={isActive ? { color: "var(--primary)" } : undefined}
                  className={`flex flex-col items-center justify-center min-w-[68px] py-2 px-2 rounded-xl relative ${
                    isActive ? "" : "text-gray-500"
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <span className="text-[10px] font-medium whitespace-nowrap">
                    {link.name}
                  </span>
                  {isActive && (
                    <span
                      style={{ background: "var(--primary)" }}
                      className="absolute bottom-0.5 w-6 h-0.5 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}