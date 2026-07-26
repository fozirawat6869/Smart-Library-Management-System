import { Trash2, CalendarDays, BookOpen } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    available: true,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
    available: true,
  },
];

const BorrowCart = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* Cart Books */}

        <div className="lg:col-span-2 space-y-5">

          <h2 className="text-3xl font-bold text-gray-800 mb-5">
            📚 Borrow Cart
          </h2>

          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4 hover:shadow-xl transition"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full sm:w-36 h-48 object-cover rounded-lg"
              />

              <div className="flex-1 flex flex-col justify-between">

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    {book.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {book.author}
                  </p>

                  <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {book.category}
                  </span>

                  <div className="mt-4 flex items-center gap-2">

                    <BookOpen
                      size={18}
                      className="text-green-600"
                    />

                    <span className="text-green-600 font-medium">
                      Available
                    </span>

                  </div>

                </div>

                <div className="flex flex-wrap justify-between items-center mt-5">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={18}
                      className="text-gray-600"
                    />

                    <select className="border rounded-lg px-3 py-2 text-sm">
                      <option>7 Days</option>
                      <option>14 Days</option>
                      <option>21 Days</option>
                    </select>

                  </div>

                  <button className="mt-3 sm:mt-0 flex items-center gap-2 text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-5">

          <h3 className="text-2xl font-bold mb-6">
            Borrow Summary
          </h3>

          <div className="space-y-4 text-gray-700">

            <div className="flex justify-between">
              <span>Total Books</span>
              <span>2</span>
            </div>

            <div className="flex justify-between">
              <span>Maximum Limit</span>
              <span>5 Books</span>
            </div>

            <div className="flex justify-between">
              <span>Borrow Duration</span>
              <span>14 Days</span>
            </div>

          </div>

          <hr className="my-6" />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Borrow Now
          </button>

          <button
            className="w-full mt-3 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition"
          >
            Continue Browsing
          </button>

        </div>

      </div>
    </div>
  );
};

export default BorrowCart;