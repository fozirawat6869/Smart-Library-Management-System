import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  BookOpen,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);
  setUserMenu(false);

  navigate("/login");
};

 const navLinks = [
  { name: "Home", path: "/home" },
  { name: "Books", path: "/books" },
  { name: "Categories", path: "/categories" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "My Books", path: "/my-books" },
  { name: "Borrow Cart", path: "/borrow-cart" },
];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white shadow-md transition-colors duration-300">
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
          <Link
            key={item.path}
            to={item.path}
            className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 transition"
          >
          {item.name}
          </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Search */}
          {/* <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search Books..."
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Icons */}
          <button
  onClick={() => setDarkMode(!darkMode)}
  className="hover:text-blue-600 cursor-pointer transition"
>
  {darkMode ? <Sun size={22} /> : <Moon size={22} />}
</button>

          <button className="relative hover:text-blue-600 transition">
            <Bell size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Login */}
          {user ? (
  <div className="relative" ref={dropdownRef}>
    <button
  onClick={() => setUserMenu(!userMenu)}
  className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center cursor-pointer justify-center"
>
  {user?.name?.charAt(0).toUpperCase()}
</button>

    {userMenu && (
      <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden">

        <div className="px-4 py-3 border-b">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-600 transition"
        >
          Logout
        </button>

      </div>
    )}
  </div>
) : (
  <Link to="/login">
    <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
      <User size={18} />
      Login
    </button>
  </Link>
)}
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
        <div className="lg:hidden bg-white dark:bg-gray-900 dark:text-white shadow-lg border-t dark:border-gray-700">

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
              <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="font-medium hover:text-blue-600"
               >
              {item.name}
            </Link>
           ))}
        </div>
            
            {user ? (
  <div className="mt-6 border-t pt-4">

    <div className="flex items-center gap-3 mb-4">
      <button
  onClick={() => setUserMenu(!userMenu)}
  className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
>
  {user?.name?.charAt(0).toUpperCase()}
</button>

      <div>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>

    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition"
    >
      Logout
    </button>

  </div>
) : (
  <Link to="/login">
    <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-full flex justify-center items-center gap-2">
      <User size={18} />
      Login
    </button>
  </Link>
)}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;