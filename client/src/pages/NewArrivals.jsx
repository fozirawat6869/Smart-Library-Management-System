import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import NewArrivalCard from "../components/NewArrivalCard";
import { getBooks } from "../api/bookApi";

const NewArrivals = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await getBooks();

    const latest = res.books
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .slice(0, 20);

    setBooks(latest);
  };

  const filtered = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          📚 New Arrivals
        </h1>

        <p className="text-gray-500 mt-2">
          Discover the newest books added to our library
        </p>

      </div>

      <div className="relative max-w-lg mx-auto mt-8">

        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={18}
        />

        <input
          className="w-full border rounded-lg pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search new books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        {filtered.map((book) => (
          <NewArrivalCard
            key={book._id}
            book={{
              ...book,
              createdAt: new Date(book.createdAt).toLocaleDateString(),
            }}
          />
        ))}

      </div>

      {filtered.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No new books found.
        </div>
      )}
    </div>
  );
};

export default NewArrivals;