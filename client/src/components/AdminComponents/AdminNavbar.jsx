import {
  Menu,
  Search,
  Bell,
  UserCircle,
  BookOpen,
} from "lucide-react";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-4 md:px-6">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Mobile Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BookOpen size={20} />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-gray-800">
                Smart Library
              </h1>
              <p className="text-xs text-gray-500">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Center Search (Desktop Only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search books, users..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={22} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-100 transition">
            <UserCircle size={36} className="text-blue-600" />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                Admin
              </p>
              <p className="text-xs text-gray-500">
                Library Manager
              </p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;