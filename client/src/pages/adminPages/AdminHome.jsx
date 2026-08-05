import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  FolderOpen,
  BookMarked,
  LibraryBig,
  ArrowUpRight,
} from "lucide-react";

import API from "../../api/api";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    students: 0,
    borrowed: 0,
    available: 0,
  });

  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [booksRes, categoryRes] = await Promise.all([
        API.get("/books"),
        API.get("/categories"),
      ]);

      const books = booksRes.data.books || booksRes.data;
      const categories = categoryRes.data.categories || categoryRes.data;

      const availableBooks = books.reduce(
        (sum, book) => sum + Number(book.quantity || 0),
        0
      );

      setStats({
        totalBooks: books.length,
        totalCategories: categories.length,
        students: 0,
        borrowed: 0,
        available: availableBooks,
      });

      setRecentBooks(books.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const statCards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Students",
      value: stats.students,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Borrowed",
      value: stats.borrowed,
      icon: BookMarked,
      color: "bg-orange-500",
    },
    {
      title: "Available",
      value: stats.available,
      icon: LibraryBig,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Welcome Admin 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Manage books, categories, students and library activities from one
          place.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {statCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className={`${item.color} p-4 rounded-xl text-white`}>
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Recent Books */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              📚 Latest Added Books
            </h2>

            <button className="text-blue-600 flex items-center gap-1 hover:text-blue-700">
              View All
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {recentBooks.map((book) => (
              <div
                key={book._id}
                className="flex items-center justify-between border rounded-xl p-4 hover:bg-slate-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {book.title}
                  </h3>

                  <p className="text-gray-500">
                    {book.author}
                  </p>
                  <p className="text-Black-500">
                    {"Available " + book.available}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {book.category?.name || "No Category"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium">
              ➕ Add New Book
            </button>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium">
              📂 Manage Categories
            </button>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium">
              👨‍🎓 View Students
            </button>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium">
              📖 Borrow Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;