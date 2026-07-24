import { useState } from "react";
import { Search, BookOpen } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    available: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    available: false,
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500",
    available: true,
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500",
    available: true,
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Novel",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500",
    available: false,
  },
  {
    id: 6,
    title: "Think Like a Monk",
    author: "Jay Shetty",
    category: "Self Help",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
    available: true,
  },
];

const categories = [
  "All",
  "Programming",
  "Self Help",
  "Productivity",
  "Finance",
  "Novel",
];

const Books = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <BookOpen className="mx-auto text-blue-600" size={45} />
          <h1 className="text-4xl font-bold mt-3">Library Books</h1>
          <p className="text-gray-600 mt-2">
            Browse and discover your next favorite book.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {book.category}
                </span>

                <h2 className="font-bold text-xl mt-3">
                  {book.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {book.author}
                </p>

                <div className="flex items-center justify-between mt-5">
                  {book.available ? (
                    <span className="text-green-600 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Issued
                    </span>
                  )}

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold">
              No Books Found 📚
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;