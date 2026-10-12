import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./components/common/LoadingSpinner.jsx";
import { ThemeProvider } from "./context/Theme.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Calendar from "./pages/Calendar.jsx";
import MyTasks from "./pages/MyTasks.jsx";
import Settings from "./pages/Settings.jsx";
import Notfound from "./Notfound.jsx";
import Statistics from "./pages/Statistics.jsx";
import Notes from "./pages/Notes.jsx";
import Habits from "./pages/Habits.jsx";
import FocusTimer from "./pages/FocusTimer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Pages WITHOUT the app layout (sidebar/navbar) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* App layout wraps all these pages via <Outlet /> */}
          <Route element={<App />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<MyTasks />} />
            <Route path="/calender" element={<Calendar />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/focus" element={<FocusTimer />} />
          </Route>

          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
);