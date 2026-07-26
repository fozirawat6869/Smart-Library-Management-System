import { Calendar, BookOpen, User } from "lucide-react";

const NewArrivalCard = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="h-64 w-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          NEW
        </span>
      </div>

      <div className="p-4">

        <h2 className="font-bold text-lg">{book.title}</h2>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <User size={16} />
          {book.author}
        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <BookOpen size={16} />
          {book.category}
        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <Calendar size={16} />
          {book.createdAt}
        </div>

        <div className="mt-4 flex justify-between items-center">

          <span
            className={`text-sm px-3 py-1 rounded-full ${
              book.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {book.available ? "Available" : "Issued"}
          </span>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            View
          </button>

        </div>
      </div>
    </div>
  );
};

export default NewArrivalCard;