import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BookMarked,
  RotateCcw,
  BarChart3,
  Settings,
  User,
  LibraryBig,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    title: "Books",
    icon: <BookOpen size={20} />,
    path: "/books",
  },
  {
    title: "Students",
    icon: <Users size={20} />,
    path: "/students",
  },
  {
    title: "Issue Book",
    icon: <BookMarked size={20} />,
    path: "/issue-book",
  },
  {
    title: "Return Book",
    icon: <RotateCcw size={20} />,
    path: "/return-book",
  },
  {
    title: "Reports",
    icon: <BarChart3 size={20} />,
    path: "/reports",
  },
  {
    title: "Profile",
    icon: <User size={20} />,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <LibraryBig className="text-cyan-400" size={32} />
        <div>
          <h1 className="text-xl font-bold">Smart Library</h1>
          <p className="text-xs text-slate-400">
            Management System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-5">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 mx-3 my-2 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="Admin"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h2 className="font-semibold">Admin</h2>
            <p className="text-sm text-slate-400">
              admin@library.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}