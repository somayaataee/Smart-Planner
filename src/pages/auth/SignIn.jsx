import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    // check against registered users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      setError("No account found with this email. Please sign up first.");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // success — create session and go to dashboard
    localStorage.setItem("token", JSON.stringify({ email: user.email, name: user.name }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white text-center">
          Welcome Todo list and habit tracker.
        </h1>
        <p className="text-white/50 text-sm text-center mt-1">
          Sign in to your account
        </p>

        {/* error message */}
        {error && (
          <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white/80 mb-1.5">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-white/30 outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-white/30 outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/60">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/30 bg-white/5 accent-white"
              />
              Remember me
            </label>
            <span className="text-white/40 cursor-not-allowed">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-medium rounded-lg py-2.5 mt-2 hover:bg-white/85 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-white/40 text-xs">or continue with</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button type="button" className="flex items-center justify-center border border-white/15 rounded-lg py-2.5 hover:bg-white/10 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.45-1.68 4.25-5.27 4.25-3.17 0-5.76-2.63-5.76-5.87s2.59-5.87 5.76-5.87c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.99 3.83 14.96 3 12.65 3 7.91 3 4.07 6.81 4.07 11.55s3.84 8.55 8.58 8.55c4.95 0 8.24-3.48 8.24-8.38 0-.56-.06-.99-.14-1.42z" />
            </svg>
          </button>
          <button type="button" className="flex items-center justify-center border border-white/15 rounded-lg py-2.5 hover:bg-white/10 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M16.36 1c.1 1.07-.32 2.1-.95 2.86-.66.8-1.75 1.42-2.8 1.34-.13-1.04.37-2.12.97-2.82C14.27 1.5 15.41.93 16.36 1zm3.36 16.86c-.5 1.13-.74 1.63-1.39 2.62-.9 1.38-2.18 3.1-3.77 3.11-1.4.02-1.76-.91-3.67-.9-1.9.01-2.3.92-3.7.9-1.58-.02-2.79-1.56-3.69-2.94-2.53-3.86-2.79-8.39-1.23-10.8.9-1.41 2.32-2.27 3.86-2.27 1.39 0 2.27.94 3.62.94 1.32 0 1.97-.94 3.66-.94 1.34 0 2.76.73 3.66 2-3.22 1.76-2.7 6.36.65 7.28z" />
            </svg>
          </button>
          <button type="button" className="flex items-center justify-center border border-white/15 rounded-lg py-2.5 hover:bg-white/10 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
            </svg>
          </button>
        </div>

        <p className="text-center text-white/50 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}