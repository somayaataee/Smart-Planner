import { useNavigate } from "react-router-dom";
import photo from "../../assets/images/user.jpg";
import { useState, useRef, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { BellRingIcon } from "@animateicons/react/lucide";
import SearchButton from "../SearchButton";

const notifications = [
  { text: "Completed React Project", time: "2m ago" },
  { text: "3 tasks pending today", time: "1h ago" },
  { text: "Focus session starts in 3 minutes", time: "3m" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const popRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div
      style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.06)" }}
      className="md:mt-5 m-2 px-4 py-3 rounded-2xl border"
    >
      <div className="flex justify-between items-center gap-4">
      
        {/* Search — desktop only */}
        <div className="relative hidden md:block flex-1 max-w-md">
          <SearchButton />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <div className="relative" ref={popRef}>
            <button
              onClick={() => setShowNotification((v) => !v)}
              style={{ background: "rgba(255,255,255,0.04)" }}
              className="relative p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors"
              aria-label="Notifications"
            >
              <BellRingIcon
                style={{ color: "var(--text)" }}
                size={20}
                duration={1}
              />
              {notifications.length > 0 && (
                <span
                  style={{ background: "var(--primary)" }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold text-white flex items-center justify-center"
                >
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotification && (
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="absolute top-full right-0 mt-3 z-50 w-72 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <span style={{ color: "var(--text)" }} className="text-sm font-semibold">
                    Notifications
                  </span>
                </div>
                <ul className="py-1">
                  {notifications.map((n, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors"
                    >
                      <span
                        style={{ background: "var(--primary)" }}
                        className="mt-0.5 shrink-0 size-5 rounded-full flex items-center justify-center"
                      >
                        <IoMdCheckmark className="text-white text-xs" />
                      </span>
                      <div className="min-w-0">
                        <p style={{ color: "var(--text)" }} className="text-sm leading-snug truncate">
                          {n.text}
                        </p>
                        <span className="text-xs text-gray-500">{n.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1.5 rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            <img
              src={photo}
              alt="Profile"
              className="size-9 md:size-10 rounded-full object-cover ring-2"
              style={{ borderColor: "var(--primary)" }}
            />
            <div className="hidden md:block text-left leading-tight">
              <p style={{ color: "var(--text)" }} className="text-sm font-medium">
                Arman
              </p>
              <p className="text-xs text-gray-500">Pro User</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}