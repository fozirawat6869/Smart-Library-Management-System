import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/getAllUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const totalUsers = users.length;

  const totalStudents = users.filter((user) => user.role === "student").length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const totalLibrarians = users.filter(
    (user) => user.role === "librarian",
  ).length;

  const filteredUsers = useMemo(() => {
    if (activeFilter === "all") return users;

    return users.filter((user) => user.role === activeFilter);
  }, [users, activeFilter]);

  const buttonStyle = (type) =>
    `px-5 py-2 rounded-lg font-medium transition ${
      activeFilter === type
        ? "bg-blue-600 text-white"
        : "bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">{totalUsers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Students</p>
          <h2 className="text-3xl font-bold text-blue-600">{totalStudents}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Admins</p>
          <h2 className="text-3xl font-bold text-green-600">{totalAdmins}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Librarians</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            {totalLibrarians}
          </h2>
        </div>
      </div>

      {/* Filter Buttons */}

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setActiveFilter("all")}
          className={buttonStyle("all")}
        >
          All Users
        </button>

        <button
          onClick={() => setActiveFilter("student")}
          className={buttonStyle("student")}
        >
          Students
        </button>

        <button
          onClick={() => setActiveFilter("admin")}
          className={buttonStyle("admin")}
        >
          Admins
        </button>

        <button
          onClick={() => setActiveFilter("librarian")}
          className={buttonStyle("librarian")}
        >
          Librarians
        </button>
      </div>

      {/* Users Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>

              <th className="px-5 py-3 text-left">Email</th>

              <th className="px-5 py-3 text-left">Phone</th>

              <th className="px-5 py-3 text-left">Role</th>

              <th className="px-5 py-3 text-left">Verified</th>

              <th className="px-5 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No Users Found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 font-medium">{user.name}</td>

                  <td className="px-5 py-4">{user.email}</td>

                  <td className="px-5 py-4">{user.phone}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
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
  );
}

export default AllUsers;
