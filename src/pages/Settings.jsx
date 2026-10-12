import { useContext, useRef, useState } from "react";

import ProfileImg from "../assets/images/user.jpg";
import ToggleSwitch from "../components/ToggleSwitch";

import { ThemeContext } from "../context/Theme";

import {
  SettingsIcon,
  KeyRoundIcon,
  LogOutIcon,
  PencilIcon,
} from "@animateicons/react/lucide";

import {
  IoMdArrowDropdown,
  IoMdCheckmark,
  IoMdColorPalette,
} from "react-icons/io";

export default function Settings() {
  const { themes, selectedTheme, setSelectedTheme } = useContext(ThemeContext);

  const [userImage, setUserImage] = useState(ProfileImg);
  const inputFileRef = useRef(null);

  const handleChangeImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setUserImage(imageUrl);
  };

  const [showColorPlate, setShowColorPlate] = useState(false);

  return (
    <div style={{ color: "var(--text)" }} className="min-w-0">
      {/* ----------Header ---------- */}
      <section
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="mb-6 rounded-3xl border p-4 sm:p-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div
            style={{ background: "var(--primary)" }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-black"
          >
            <SettingsIcon size={23} duration={1} />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Settings
            </h1>
            <p className="mt-1 text-sm opacity-60">
              Customize your experience.
            </p>
          </div>
        </div>
      </section>

      {/* ----------Cards grid ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* ----------Profile Settings ---------- */}
        <section
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
          className="rounded-3xl border p-4 sm:p-5 md:p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold">
              Profile Settings
            </h2>
            <p className="mt-1 text-sm opacity-50">
              Manage your personal information.
            </p>
          </div>

          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            placeholder="your name.."
            style={{
              borderColor: "var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
            }}
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[var(--primary)]"
          />

          <div className="my-7">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Profile Picture</h3>
                <p className="mt-1 text-xs opacity-50">
                  Choose a new profile picture.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <img
                src={userImage}
                alt="Profile"
                className="h-20 w-20 rounded-2xl border-2 object-cover shadow-md"
                style={{ borderColor: "var(--primary)" }}
              />

              <input
                type="file"
                ref={inputFileRef}
                onChange={handleChangeImage}
                className="hidden"
                accept="image/png,image/jpeg,image/jpg,image/webp"
              />

              <button
                type="button"
                onClick={() => inputFileRef.current?.click()}
                style={{ backgroundColor: "var(--primary)" }}
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black transition-all hover:-translate-y-1 hover:shadow-lg self-start"
              >
                <PencilIcon size={16} />
                Change
              </button>
            </div>
          </div>

          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
            }}
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[var(--primary)]"
          />

          <div
            style={{ backgroundColor: "var(--border)" }}
            className="my-6 h-px w-full"
          />

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="mt-1 text-xs opacity-50">
                Receive task notifications.
              </p>
            </div>
            <ToggleSwitch />
          </div>
        </section>

        {/* ----------App Preferences ---------- */}
        <section
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
          className="rounded-3xl border p-4 sm:p-5 md:p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold">
              App Preferences
            </h2>
            <p className="mt-1 text-sm opacity-50">
              Manage security and application preferences.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Security</h3>
              <p className="mt-1 text-xs opacity-50">
                Manage your account security.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Security"
                style={{ backgroundColor: "var(--primary)" }}
                className="rounded-xl p-3 text-black transition hover:-translate-y-1"
              >
                <KeyRoundIcon size={17} />
              </button>
              <button
                type="button"
                aria-label="Settings"
                style={{ backgroundColor: "var(--primary)" }}
                className="rounded-xl p-3 text-black transition hover:-translate-y-1"
              >
                <SettingsIcon size={17} duration={1} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 rounded-2xl p-3 text-left transition hover:bg-white/5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                style={{ backgroundColor: "var(--primary)" }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black"
              >
                <KeyRoundIcon size={17} />
              </div>

              <div className="min-w-0">
                <h3 className="font-medium">Change Password</h3>
                <p className="text-xs opacity-50">
                  Update your account password.
                </p>
              </div>
            </div>

            <IoMdArrowDropdown size={20} className="shrink-0" />
          </button>

          <div
            style={{ backgroundColor: "var(--border)" }}
            className="my-6 h-px"
          />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                style={{ backgroundColor: "var(--primary)" }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black"
              >
                <LogOutIcon size={17} />
              </div>

              <div className="min-w-0">
                <h3 className="font-medium">Session Logouts</h3>
                <p className="mt-1 text-xs opacity-50">
                  Manage logout sessions.
                </p>
              </div>
            </div>

            <ToggleSwitch />
          </div>

          <div
            style={{ backgroundColor: "var(--border)" }}
            className="my-6 h-px"
          />

          <button
            type="button"
            style={{ backgroundColor: "var(--primary)" }}
            className="w-full rounded-xl py-3 font-bold text-black transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Save Changes
          </button>
        </section>

        {/* ----------Theme ---------- */}
        <section
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
          className="rounded-3xl border p-4 sm:p-5 md:p-6 shadow-sm md:col-span-2 xl:col-span-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Theme</h2>
              <p className="mt-1 text-sm opacity-50">
                Select your color scheme.
              </p>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Open theme colors"
                onClick={() => setShowColorPlate((prev) => !prev)}
                style={{ backgroundColor: "var(--primary)" }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-black transition hover:scale-105"
              >
                <IoMdColorPalette size={20} />
              </button>

              {showColorPlate && (
                <div
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                  className="absolute right-0 top-12 z-20 rounded-2xl border p-3 shadow-2xl"
                >
                  <div className="flex gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        aria-label={`Select ${theme.name} theme`}
                        className={`${theme.preview} h-8 w-8 rounded-full border-2 border-white/20 transition hover:scale-110`}
                        onClick={() => {
                          setSelectedTheme(theme);
                          setShowColorPlate(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{ backgroundColor: "var(--border)" }}
            className="my-7 h-px"
          />

          <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                className="group text-left"
              >
                <div
                  className={`${theme.preview} relative flex h-16 sm:h-20 w-full items-center justify-center rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:scale-105 group-hover:border-white/30`}
                >
                  {selectedTheme.id === theme.id && (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-2xl text-white">
                      <IoMdCheckmark />
                    </span>
                  )}
                </div>

                <p className="mt-2 text-center text-sm font-medium truncate">
                  {theme.name}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}