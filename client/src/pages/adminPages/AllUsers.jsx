import { useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiUser,
  FiShield,
  FiBookOpen,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiUserCheck,
} from "react-icons/fi";
import api from "../../api/api";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/getAllUsers");

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;

  const totalStudents = users.filter((user) => user.role === "student").length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const totalLibrarians = users.filter(
    (user) => user.role === "librarian",
  ).length;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesFilter =
        activeFilter === "all" || user.role === activeFilter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        user.name?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText) ||
        user.phone?.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [users, activeFilter, search]);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FiUsers,
      color: "blue",
      filter: "all",
    },
    {
      title: "Students",
      value: totalStudents,
      icon: FiUser,
      color: "indigo",
      filter: "student",
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: FiShield,
      color: "green",
      filter: "admin",
    },
    {
      title: "Librarians",
      value: totalLibrarians,
      icon: FiBookOpen,
      color: "yellow",
      filter: "librarian",
    },
  ];

  const filterButtons = [
    {
      label: "All Users",
      value: "all",
      count: totalUsers,
    },
    {
      label: "Students",
      value: "student",
      count: totalStudents,
    },
    {
      label: "Admins",
      value: "admin",
      count: totalAdmins,
    },
    {
      label: "Librarians",
      value: "librarian",
      count: totalLibrarians,
    },
  ];

  return (
    <div className="px-4 md:px-6 pb-8">
      {/* Header */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FiUsers size={25} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Users Management
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor all registered users
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;

          const isActive = activeFilter === stat.filter;

          return (
            <button
              key={stat.title}
              onClick={() => setActiveFilter(stat.filter)}
              className={`text-left bg-white rounded-2xl p-5 shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isActive
                  ? "border-blue-400 ring-2 ring-blue-100"
                  : "border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    stat.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : stat.color === "indigo"
                        ? "bg-indigo-100 text-indigo-600"
                        : stat.color === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  <Icon size={24} />
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-400">Click to filter</div>
            </button>
          );
        })}
      </div>

      {/* Search + Filters */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search */}

          <div className="relative w-full lg:max-w-md">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Filters */}

          <div className="flex flex-wrap gap-2">
            {filterButtons.map((button) => (
              <button
                key={button.value}
                onClick={() => setActiveFilter(button.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeFilter === button.value
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {button.label}

                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === button.value
                      ? "bg-white/20 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {button.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}

        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">
              {activeFilter === "all"
                ? "All Users"
                : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredUsers.length} user
              {filteredUsers.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <FiUserCheck />
            {filteredUsers.length} Results
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-4 text-left font-semibold">User</th>

                <th className="px-5 py-4 text-left font-semibold">Email</th>

                <th className="px-5 py-4 text-left font-semibold">Phone</th>

                <th className="px-5 py-4 text-left font-semibold">Role</th>

                <th className="px-5 py-4 text-left font-semibold">
                  Verification
                </th>

                <th className="px-5 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

                      <p className="text-gray-500 mt-4 text-sm">
                        Loading users...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-gray-100 p-4 rounded-full text-gray-400">
                        <FiUsers size={28} />
                      </div>

                      <h3 className="font-semibold text-gray-700 mt-4">
                        No Users Found
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-100 hover:bg-blue-50/40 transition-colors duration-200"
                  >
                    {/* User */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            User ID: {user._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    {/* Phone */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>

                    {/* Role */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : user.role === "student"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Verification */}

                    <td className="px-5 py-4">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          <FiCheckCircle size={14} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                          <FiXCircle size={14} />
                          Not Verified
                        </span>
                      )}
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-semibold ${
                          user.isActive ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.isActive ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />

                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
