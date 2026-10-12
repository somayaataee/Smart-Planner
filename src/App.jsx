import { Outlet } from "react-router-dom";
import NavBar from "./components/layout/Navbar";
import SideBar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="min-h-screen md:flex" style={{ background: "var(--bg)" }}>
      {/* Sidebar renders its own mobile bottom nav — no wrapper needed */}
      <SideBar />

      <div className="flex-1 min-w-0 flex flex-col">
        <NavBar />

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pb-28 md:pb-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;