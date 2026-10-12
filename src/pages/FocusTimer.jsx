import {
  IoMdTimer,
  IoMdFlame,
} from "react-icons/io";
import { RepeatIcon, CirclePauseIcon, CirclePlayIcon } from "@animateicons/react/lucide";
import TimerIcon from "../components/TimerIcon";
import Sidebar from "../components/layout/Sidebar";
// import { LoadingSpinner } from "../components/common/LoadingSpinner";

export default function FocusTimer() {
  return (
    <div
      style={{ background: "var(--bg)", color: "var(--text)" }}
      className="flex min-h-screen"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto pb-28 md:pb-6">
          <h1
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
            className="
            border
            p-4 sm:p-5
            rounded-2xl
            flex
            items-center
            gap-2
            text-lg sm:text-xl
            font-bold
            "
          >
            <TimerIcon />
            Focus Timer : Stay in the Flow
          </h1>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* ---------- Timer Card ---------- */}
            <main
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
              className="lg:col-span-2 rounded-2xl p-4 sm:p-6 border"
            >
              <div
                style={{ color: "var(--primary)" }}
                className="text-center mb-5 text-sm"
              >
                "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا"
              </div>

              {/* ---------- Circle Timer (scales with screen) ---------- */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto flex items-center justify-center">
                <svg
                  className="absolute w-full h-full"
                  viewBox="0 0 300 300"
                >
                  {/* Background Circle */}
                  <circle
                    cx="150"
                    cy="150"
                    r="120"
                    stroke="#9d2d3a"
                    strokeWidth="12"
                    fill="none"
                  />

                  {/* Progress Circle */}
                  <circle
                    cx="150"
                    cy="150"
                    r="120"
                    stroke="#81bcf6"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="754"
                    strokeDashoffset="100"
                    transform="rotate(-90 150 150)"
                  />
                </svg>

                <div className="z-10 text-center">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                    25:00
                  </h1>
                  <p className="text-yellow-400">Focus</p>
                </div>
              </div>

              {/* ---------- Controls ---------- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                <button
                  style={{ backgroundColor: "var(--primary)" }}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold text-black"
                >
                  <CirclePlayIcon />
                  Start
                </button>
                <button
                  style={{ backgroundColor: "var(--primary)" }}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold text-black"
                >
                  <CirclePauseIcon />
                  Pause
                </button>
                <button
                  style={{ backgroundColor: "var(--primary)" }}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold text-black"
                >
                  <RepeatIcon size={24} duration={1} color="#ffffff" />
                  Restart
                </button>
              </div>
            </main>

            {/* ---------- Right column ---------- */}
            <div className="space-y-4">
              {/* Session details */}
              <div
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                }}
                className="rounded-2xl border p-4 sm:p-5"
              >
                <h2 className="text-lg font-bold mb-5">
                  Focus Session Details
                </h2>
                <p className="mb-2 text-sm opacity-80">Task to Focus On</p>
                <select className="bg-white/10 w-full p-3 rounded-xl outline-none">
                  <option style={{ background: "var(--primary)" }}>
                    React Project
                  </option>
                  <option style={{ background: "var(--primary)" }}>
                    Learn English
                  </option>
                  <option style={{ background: "var(--primary)" }}>
                    Practice Coding
                  </option>
                </select>

                <p className="mt-5 mb-2 text-sm opacity-80">
                  Estimated Duration
                </p>
                <input
                  style={{ color: "var(--primary)" }}
                  type="range"
                  className="w-full"
                  min="0"
                  max="100"
                />

                <div className="bg-white/10 p-3 rounded-xl mt-3">
                  Pomodoro
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                  className="rounded-2xl border p-4"
                >
                  <IoMdTimer size={20} className="text-blue-400" />
                  <h3 className="mt-2 text-sm opacity-80">Today's Focus</h3>
                  <p className="text-xl sm:text-2xl font-bold">2h 30m</p>
                  <span className="opacity-60 text-xs sm:text-sm">
                    5 Sessions
                  </span>
                </div>

                <div
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                  className="rounded-2xl border p-4"
                >
                  <IoMdFlame size={20} className="text-orange-400" />
                  <h3 className="mt-2 text-sm opacity-80">Streak</h3>
                  <p className="text-xl sm:text-2xl font-bold">7 Days</p>
                  <span className="opacity-60 text-xs sm:text-sm">
                    Keep going
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}