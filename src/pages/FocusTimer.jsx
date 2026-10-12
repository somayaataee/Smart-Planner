import { useState, useEffect, useRef } from "react";
import {
  IoMdTimer,
  IoMdFlame,
} from "react-icons/io";
import { RepeatIcon, CirclePauseIcon, CirclePlayIcon } from "@animateicons/react/lucide";
import TimerIcon from "../components/TimerIcon";

const FOCUS_DURATION = 25 * 60; 
const CIRCLE_LENGTH = 754;

export default function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // ---------- helpers ----------
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = secondsLeft / FOCUS_DURATION;
  const dashOffset = CIRCLE_LENGTH * (1 - progress);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleRestart = () => {
    setIsRunning(false);
    setSecondsLeft(FOCUS_DURATION);
  };

  return (
    <div style={{ color: "var(--text)" }} className="min-w-0">
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

              <circle
                cx="150"
                cy="150"
                r="120"
                stroke="#81bcf6"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={CIRCLE_LENGTH}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 150 150)"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>

            <div className="z-10 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums">
                {formatTime(secondsLeft)}
              </h1>
              <p className="text-yellow-400">
                {isRunning ? "Focusing..." : secondsLeft === 0 ? "Done! 🎉" : "Focus"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            <button
              onClick={handleStart}
              disabled={isRunning || secondsLeft === 0}
              style={{ backgroundColor: "var(--primary)" }}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <CirclePlayIcon />
              Start
            </button>
            <button
              onClick={handlePause}
              disabled={!isRunning}
              style={{ backgroundColor: "var(--primary)" }}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <CirclePauseIcon />
              Pause
            </button>
            <button
              onClick={handleRestart}
              style={{ backgroundColor: "var(--primary)" }}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold text-black transition-all"
            >
              <RepeatIcon size={24} duration={1} color="#ffffff" />
              Restart
            </button>
          </div>
        </main>

        <div className="space-y-4">
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
  );
}