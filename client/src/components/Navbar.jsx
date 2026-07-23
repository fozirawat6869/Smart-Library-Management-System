import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Moon,
  Bell,
  User,
  Menu,
  X,
  BookOpen,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "Books",
    "Categories",
    "New Arrivals",
    "My Books",
    "Contact",
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <BookOpen className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-blue-600">
            SmartLibrary
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search Books..."
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Icons */}
          <button className="hover:text-blue-600 transition">
            <Moon size={22} />
          </button>

          <button className="relative hover:text-blue-600 transition">
            <Bell size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Login */}
          <Link to="/login">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              <User size={18} />
              Login / Register
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t">

          <div className="p-5">

            {/* Search */}
            <div className="relative mb-5">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search Books..."
                className="w-full border rounded-full py-2 pl-10 pr-4"
              />
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-medium hover:text-blue-600"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <Link to="/login">
            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-full flex justify-center items-center gap-2">
              <User size={18} />
              Login / Register
            </button>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;