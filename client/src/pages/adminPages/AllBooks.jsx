import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  BookOpen,
  IndianRupee,
  Boxes,
  Loader2,
} from "lucide-react";
import API from "../../api/api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");

      const sortedBooks = res.data.books.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setBooks(sortedBooks);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.category?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [books, search]);

  const totalBooks = books.length;

  const totalStock = books.reduce(
    (acc, book) => acc + Number(book.quantity),
    0,
  );

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={50} />
      </div>
    );
  }

  return (
    <div className=" bg-slate-100 px-6">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">📚 All Books</h1>

          <p className="mt-2 text-slate-500">
            Manage all books in your library.
          </p>
        </div>

        <div className="relative w-full lg:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Stats */}

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Books</p>

              <h2 className="mt-2 text-3xl font-bold">{totalBooks}</h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <BookOpen size={30} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Stock</p>

              <h2 className="mt-2 text-3xl font-bold">{totalStock}</h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4">
              <Boxes size={30} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Average Price</p>

              <h2 className="mt-2 flex items-center text-3xl font-bold">
                <IndianRupee size={25} />
                {books.length
                  ? Math.round(
                      books.reduce((acc, book) => acc + Number(book.price), 0) /
                        books.length,
                    )
                  : 0}
              </h2>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-4">
              <IndianRupee size={30} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}

      {filteredBooks.length === 0 ? (
        <div className="rounded-3xl bg-white py-20 text-center shadow-lg">
          <BookOpen size={70} className="mx-auto mb-5 text-slate-300" />

          <h2 className="text-2xl font-semibold text-slate-700">
            No Books Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  {book.category?.name || "Unknown"}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4 p-5">
                <div>
                  <h2 className="line-clamp-1 text-xl font-bold text-slate-800">
                    {book.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">{book.author}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>

                    <h3 className="text-xl font-bold text-green-600">
                      ₹{book.price}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">Stock</p>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        book.quantity > 10
                          ? "bg-green-100 text-green-700"
                          : book.quantity > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.quantity}
                    </span>
                  </div>
                </div>

                {/* Stock Progress */}
                <div>
                  <div className="mb-2 flex justify-between text-xs text-slate-500">
                    <span>Stock</span>
                    <span>{book.quantity}</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${
                        book.quantity > 10
                          ? "bg-green-500"
                          : book.quantity > 0
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(book.quantity * 10, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95">
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700 active:scale-95">
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
