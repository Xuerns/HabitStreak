import { NavLink } from "react-router-dom";

interface sideBarProps {
  handleLogout: () => void;
  datasName: string | undefined;
  datasGmail: string | undefined;
}

export default function SideBar({
  handleLogout,
  datasName,
  datasGmail,
}: sideBarProps) {
  return (
    <nav className="p-2 inline-flex flex-col h-full" >
      {/* Profile */}
      <div>
        <p>{datasName}</p>
        <p>{datasGmail}</p>
      </div>

      {/* Navigasi */}
      <div className="flex-1 flex flex-col">
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="habitspage">Habits</NavLink>
        <NavLink to="analyticspage">Analytics</NavLink>
      </div>

      {/* Button Logout */}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
