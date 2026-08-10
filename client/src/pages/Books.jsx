
import { useEffect,useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getBooks, getCategories } from "../api/bookApi";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get category from URL
  const categoryFromURL = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "all"
  );

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  if (location.state?.message) {
    toast.success(location.state.message);
  }
}, [location.state]);

  // Keep selected category synchronized with URL
  useEffect(() => {
    setSelectedCategory(categoryFromURL || "all");
  }, [categoryFromURL]);

  const fetchData = async () => {
    try {
      const [bookRes, categoryRes] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);

      setBooks(bookRes.data.books || []);

      setCategories([
        {
          _id: "all",
          name: "All",
        },
        ...(categoryRes.data.categories || []),
      ]);
    } catch (error) {
      console.log("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Change category
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: categoryId,
      });
    }
  };

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      book.category?._id === selectedCategory ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Books
          </h1>

          <p className="mt-2 text-gray-600">
            Find your favorite books and start reading.
          </p>
        </div>

        {/* Search */}
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-lg mb-6">
          <input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 outline-none"
          />

          <button className="bg-blue-600 text-white px-5">
            <Search size={21} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category._id)}
              className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${
                selectedCategory === category._id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Books */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen
              size={50}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-700">
              No books found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredBooks.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group"
              >

                {/* Image */}
                <div className="h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5">

                  <h2 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {book.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {book.author}
                  </p>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-blue-600 font-semibold">
                      {book.category?.name || "Unknown"}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        book.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>

                  </div>

                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Books;

