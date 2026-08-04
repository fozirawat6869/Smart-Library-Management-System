import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminComponents/AdminNavbar";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 ">
          {/* overflow-y-auto p-4 md:p-6 */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
