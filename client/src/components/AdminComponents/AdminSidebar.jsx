import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderTree,
  LogOut,
  X,
} from "lucide-react";


const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 transition ${
      isActive ? "bg-blue-600" : "hover:bg-gray-800"
    }`;

  const Navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Smart Library</h1>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex flex-col">
          <NavLink
            to="/admin"
            end
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/books"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <BookOpen size={20} />
            Books
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <FolderTree size={20} />
            Categories
          </NavLink>

          <NavLink
            to="/admin/users"
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <Users size={20} />
            Users
          </NavLink>
        </nav>

        {/* Logout */}
        <button className="absolute bottom-6 left-6 flex items-center gap-2 text-red-400 hover:text-red-500
        transition" 
        onClick={logout}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;