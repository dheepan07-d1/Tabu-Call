import {
  LayoutDashboard,
  FileText,
  Users,
  Pill,
  Bell,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">T</div>

        <div>
          <h2>TabuCall</h2>
          <span>Healthcare Assistant</span>
        </div>
      </div>


      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/prescriptions"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <FileText size={20} />
          <span>Prescriptions</span>
        </NavLink>


        <NavLink
          to="/patients"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Users size={20} />
          <span>Patients</span>
        </NavLink>


        <NavLink
          to="/medication-status"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Pill size={20} />
          <span>Medication Status</span>
        </NavLink>


        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Bell size={20} />
          <span>Alerts</span>
        </NavLink>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>


      {/* Admin */}
      <div className="sidebar-bottom">

        <div className="admin-avatar">
          A
        </div>

        <div>
          <strong>Admin</strong>
          <span>Hospital Staff</span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;