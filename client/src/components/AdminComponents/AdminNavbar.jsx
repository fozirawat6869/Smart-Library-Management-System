import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  BookCopy,
  FolderTree,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    
    {
      name: "Books",
      path: "/admin/books",
      icon: <BookCopy size={18} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FolderTree size={18} />,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <Users size={18} />,
    },
    {
      name: "Issue Books",
      path: "/admin/issues",
      icon: <ClipboardList size={18} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <BarChart3 size={18} />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={18} />,
    },
  ];
/* 
/admin               // Dashboard
/admin/books         // Manage Books
/admin/categories    // Manage Categories
/admin/students      // Manage Students
/admin/issues        // Issue & Return Books
/admin/reports       // Reports
/admin/settings      // Settings
*/
  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/admin"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <BookOpen size={30} />
            <span>Smart Library</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-2 hover:text-yellow-300 transition"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="bg-blue-600 px-3 py-2 rounded-full">
              Admin
            </div>

            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 hover:text-yellow-300"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 mt-3 bg-red-500 px-4 py-2 rounded-lg w-full justify-center"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;