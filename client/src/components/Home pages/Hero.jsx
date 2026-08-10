import toast from "react-hot-toast";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks, getCategories } from "../../api/bookApi";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookRes, categoryRes] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);

      setBooks(bookRes.data.books || []);

      setCategories([
        { _id: "all", name: "All" },
        ...(categoryRes.data.categories || []),
      ]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
  const query = search.trim().toLowerCase();

  if (!query) return;

  // Search book by title or author
  const matchedBook = books.find(
    (book) =>
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query)
  );

  if (matchedBook) {
    navigate(`/books/${matchedBook._id}`);
    return;
  }

  // Search category
  const matchedCategory = categories.find(
    (category) =>
      category.name?.toLowerCase().includes(query) &&
      category._id !== "all"
  );

  if (matchedCategory) {
    navigate(`/books?category=${matchedCategory._id}`,{
      state: {message: "Book found"}
    })
  }
  toast.error("No book or category found.");
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <BookOpen size={18} />
            Smart Library Management System
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover, Borrow &
            <span className="text-blue-600"> Manage Books</span>
            <br />
            Anytime, Anywhere.
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg leading-7">
            Access thousands of books, search instantly, borrow online,
            track due dates, and enjoy a seamless digital library experience.
          </p>

          {/* Search Box */}
          <div className="mt-6 flex bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full border border-gray-200">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search books, authors, categories..."
              className="flex-1 px-4 py-3 text-sm outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 px-5 text-white transition"
            >
              <Search size={22} />
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link to="/books">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition">
                Browse Books
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/learn-more">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-3 rounded-xl font-semibold transition">
                Learn More
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-between sm:justify-start gap-6 md:gap-10 mt-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
                10K+
              </h2>
              <p className="text-gray-600">Books</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">
                3K+
              </h2>
              <p className="text-gray-600">Students</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">
                500+
              </h2>
              <p className="text-gray-600">Authors</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900"
            alt="Library"
            className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
