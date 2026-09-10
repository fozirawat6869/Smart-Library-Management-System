// import { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   Pencil,
//   Trash2,
//   BookOpen,
//   IndianRupee,
//   Boxes,
//   Loader2,
// } from "lucide-react";
// import API from "../../api/api";

// const AllBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await API.get("/books");

//       const sortedBooks = res.data.books.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//       );

//       setBooks(sortedBooks);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredBooks = useMemo(() => {
//     return books.filter(
//       (book) =>
//         book.title.toLowerCase().includes(search.toLowerCase()) ||
//         book.author.toLowerCase().includes(search.toLowerCase()) ||
//         book.category?.name?.toLowerCase().includes(search.toLowerCase()),
//     );
//   }, [books, search]);

//   const totalBooks = books.length;

//   const totalStock = books.reduce(
//     (acc, book) => acc + Number(book.quantity),
//     0,
//   );

//   if (loading) {
//     return (
//       <div className="flex h-[80vh] items-center justify-center">
//         <Loader2 className="animate-spin text-blue-600" size={50} />
//       </div>
//     );
//   }

//   return (
//     <div className=" bg-slate-100 px-6">
//       {/* Header */}

//       <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-slate-800">📚 All Books</h1>

//           <p className="mt-2 text-slate-500">
//             Manage all books in your library.
//           </p>
//         </div>

//         <div className="relative w-full lg:w-96">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             size={20}
//           />

//           <input
//             type="text"
//             placeholder="Search by title, author or category..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full rounded-2xl border bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//           />
//         </div>
//       </div>

//       {/* Stats */}

//       <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-500">Total Books</p>

//               <h2 className="mt-2 text-3xl font-bold">{totalBooks}</h2>
//             </div>

//             <div className="rounded-2xl bg-blue-100 p-4">
//               <BookOpen size={30} className="text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-500">Total Stock</p>

//               <h2 className="mt-2 text-3xl font-bold">{totalStock}</h2>
//             </div>

//             <div className="rounded-2xl bg-green-100 p-4">
//               <Boxes size={30} className="text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-500">Average Price</p>

//               <h2 className="mt-2 flex items-center text-3xl font-bold">
//                 <IndianRupee size={25} />
//                 {books.length
//                   ? Math.round(
//                       books.reduce((acc, book) => acc + Number(book.price), 0) /
//                         books.length,
//                     )
//                   : 0}
//               </h2>
//             </div>

//             <div className="rounded-2xl bg-yellow-100 p-4">
//               <IndianRupee size={30} className="text-yellow-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cards */}

//       {filteredBooks.length === 0 ? (
//         <div className="rounded-3xl bg-white py-20 text-center shadow-lg">
//           <BookOpen size={70} className="mx-auto mb-5 text-slate-300" />

//           <h2 className="text-2xl font-semibold text-slate-700">
//             No Books Found
//           </h2>

//           <p className="mt-2 text-slate-500">
//             Try searching with another keyword.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {filteredBooks.map((book) => (
//             <div
//               key={book._id}
//               className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//             >
//               {/* Image */}
//               <div className="relative h-72 overflow-hidden">
//                 <img
//                   src={book.image}
//                   alt={book.title}
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//                 />

//                 <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
//                   {book.category?.name || "Unknown"}
//                 </span>
//               </div>

//               {/* Content */}
//               <div className="space-y-4 p-5">
//                 <div>
//                   <h2 className="line-clamp-1 text-xl font-bold text-slate-800">
//                     {book.title}
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">{book.author}</p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-slate-400">Price</p>

//                     <h3 className="text-xl font-bold text-green-600">
//                       ₹{book.price}
//                     </h3>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-xs text-slate-400">Stock</p>

//                     <span
//                       className={`rounded-full px-3 py-1 text-sm font-semibold ${
//                         book.quantity > 10
//                           ? "bg-green-100 text-green-700"
//                           : book.quantity > 0
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {book.quantity}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Stock Progress */}
//                 <div>
//                   <div className="mb-2 flex justify-between text-xs text-slate-500">
//                     <span>Stock</span>
//                     <span>{book.quantity}</span>
//                   </div>

//                   <div className="h-2 overflow-hidden rounded-full bg-slate-200">
//                     <div
//                       className={`h-full rounded-full ${
//                         book.quantity > 10
//                           ? "bg-green-500"
//                           : book.quantity > 0
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                       }`}
//                       style={{
//                         width: `${Math.min(book.quantity * 10, 100)}%`,
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-3 pt-2">
//                   <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95">
//                     <Pencil size={18} />
//                     Edit
//                   </button>

//                   <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700 active:scale-95">
//                     <Trash2 size={18} />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBooks;

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  BookOpen,
  IndianRupee,
  Boxes,
  Loader2,
  PackageCheck,
  AlertTriangle,
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
    const value = search.toLowerCase();

    return books.filter(
      (book) =>
        book.title?.toLowerCase().includes(value) ||
        book.author?.toLowerCase().includes(value) ||
        book.category?.name?.toLowerCase().includes(value),
    );
  }, [books, search]);

  const totalBooks = books.length;

  const totalStock = books.reduce(
    (acc, book) => acc + Number(book.quantity),
    0,
  );

  const averagePrice = books.length
    ? Math.round(
        books.reduce((acc, book) => acc + Number(book.price), 0) / books.length,
      )
    : 0;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={42} />
          <p className="text-sm text-slate-500">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-100 px-3 py-4 sm:px-5 md:px-6">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 lg:mb-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600">
              <BookOpen size={23} />
            </div>

            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              All Books
            </h1>
          </div>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage all books in your library.
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full lg:w-80 xl:w-96">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 transition hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Stats */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Books */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Books</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                {totalBooks}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 transition-transform duration-300 group-hover:scale-110">
              <BookOpen size={23} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Books available in library
          </p>
        </div>

        {/* Total Stock */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Stock</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                {totalStock}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-3 transition-transform duration-300 group-hover:scale-110">
              <Boxes size={23} className="text-green-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">Total available copies</p>
        </div>

        {/* Average Price */}

        <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Average Price</p>

              <h2 className="mt-1 flex items-center text-2xl font-bold text-slate-800 sm:text-3xl">
                <IndianRupee size={20} />
                {averagePrice}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-100 p-3 transition-transform duration-300 group-hover:scale-110">
              <IndianRupee size={23} className="text-yellow-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">Average price per book</p>
        </div>
      </div>

      {/* Result Information */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Book Collection
          </h2>

          <p className="text-xs text-slate-500 sm:text-sm">
            Showing {filteredBooks.length} of {totalBooks} books
          </p>
        </div>

        {search && (
          <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 sm:block">
            Search: "{search}"
          </span>
        )}
      </div>

      {/* Books */}

      {filteredBooks.length === 0 ? (
        <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
          <BookOpen size={55} className="mx-auto mb-4 text-slate-300" />

          <h2 className="text-xl font-semibold text-slate-700">
            No Books Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Try searching with another keyword.
          </p>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredBooks.map((book) => {
            const quantity = Number(book.quantity);

            const stockStatus =
              quantity > 10
                ? {
                    text: "In Stock",
                    bg: "bg-green-100",
                    textColor: "text-green-700",
                    bar: "bg-green-500",
                    icon: <PackageCheck size={13} />,
                  }
                : quantity > 0
                  ? {
                      text: "Low Stock",
                      bg: "bg-yellow-100",
                      textColor: "text-yellow-700",
                      bar: "bg-yellow-500",
                      icon: <AlertTriangle size={13} />,
                    }
                  : {
                      text: "Out of Stock",
                      bg: "bg-red-100",
                      textColor: "text-red-700",
                      bar: "bg-red-500",
                      icon: <AlertTriangle size={13} />,
                    };

            return (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image */}

                <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-60">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Category */}

                  <span className="absolute left-3 top-3 rounded-full bg-blue-600/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                    {book.category?.name || "Unknown"}
                  </span>

                  {/* Stock Status */}

                  <span
                    className={`absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow ${stockStatus.bg} ${stockStatus.textColor}`}
                  >
                    {stockStatus.icon}
                    {stockStatus.text}
                  </span>
                </div>

                {/* Content */}

                <div className="p-4">
                  {/* Title */}

                  <div className="mb-3">
                    <h2
                      title={book.title}
                      className="truncate text-base font-bold text-slate-800 sm:text-lg"
                    >
                      {book.title}
                    </h2>

                    <p
                      title={book.author}
                      className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm"
                    >
                      {book.author}
                    </p>
                  </div>

                  {/* Price + Stock */}

                  <div className="mb-3 flex items-end justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400">Price</p>

                      <h3 className="flex items-center text-lg font-bold text-green-600">
                        <IndianRupee size={15} />
                        {book.price}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-slate-400">Copies</p>

                      <span
                        className={`text-sm font-bold ${
                          quantity > 10
                            ? "text-green-600"
                            : quantity > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {quantity}
                      </span>
                    </div>
                  </div>

                  {/* Stock Progress */}

                  <div className="mb-4">
                    <div className="mb-1.5 flex justify-between text-[11px] text-slate-400">
                      <span>Stock level</span>

                      <span>{Math.min(quantity * 10, 100)}%</span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${stockStatus.bar}`}
                        style={{
                          width: `${Math.min(quantity * 10, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 sm:text-sm">
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-md active:scale-95 sm:text-sm">
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
