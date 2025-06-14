// Dashboard.jsx
import React from "react";
import SidebarLayout from "../Admin/SidebarLayout";

const Dashboard = () => {
  return (
    <SidebarLayout>
      <h1 className="text-xl font-semibold">Welcome Admin</h1>
      <p>This is your dashboard.</p>
    </SidebarLayout>
  );
};

export default Dashboard;
