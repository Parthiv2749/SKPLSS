import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Image, Users, Menu, X } from "lucide-react";
import Topbar from "./Topbar";

const SidebarLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#FDF8F3] font-poppins">
      {/* TOPBAR AT TOP */}
      <Topbar />

      {/* CONTENT AREA: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out border-r border-[#E1D5C9] shadow-sm
            ${isCollapsed ? "w-16" : "w-64"}
            hidden sm:flex flex-col bg-[#F2E6DA]`}
        >
          <div className="flex justify-end p-2">
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-2 mt-4">
            <SidebarLink icon={<Home />} label="Dashboard" to="/admin" collapsed={isCollapsed} />
            <SidebarLink icon={<Calendar />} label="Events" to="/admin/events" collapsed={isCollapsed} />
            <SidebarLink icon={<Image />} label="Gallery" to="/admin/gallery" collapsed={isCollapsed} />
            <SidebarLink icon={<Users />} label="Members" to="/admin/members" collapsed={isCollapsed} />
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, to, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        isActive ? "bg-[#F48F0F]/50 text-[#292929] font-semibold" : "hover:bg-[#FDF8F3]"
      }`}
    >
      <div>{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

export default SidebarLayout;
