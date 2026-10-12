import NavBar from "./components/layout/Navbar";
// import { Outlet } from "react-router-dom";
import ButtomNavbar from "../src/components/ButtomNavbar";
import FocusTimer from "./components/dashboard/section/FocusTimer";
import Productivity from "./components/dashboard/section/ProductivityTip";
import SideBar from "./components/layout/Sidebar";
import TaskProgress from "./components/dashboard/section/TaskProgress";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div className=" min-h-screen lg:flex">
        <div className="lg:block hidden">
          <SideBar />
        </div>
        <div className="flex-1">
          <NavBar />
          <main className="lg:p-8 md:p-6 p-4">
            <Dashboard/>
          </main>
        </div>
        <div className="flex md:block justify-between">
          <FocusTimer />
          <TaskProgress/>
          <Productivity />
        </div>
      </div>
      <div className="">
        <ButtomNavbar />
      </div>
    </>
  );
}
export default App;
