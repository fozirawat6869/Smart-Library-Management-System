import { useEffect, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");

      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    

    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Book Categories
          </h1>

          <p className="text-gray-500 mt-2">
            Explore books by category
          </p>
        </div>

        {/* Search */}

        <div className="max-w-lg mx-auto mb-10 relative">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search category..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Category Grid */}

        <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category._id}
                onClick={() => navigate(`/books/${category._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-2 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="text-blue-600" size={30} />
                </div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {category.description || "Library category"}
                </p>

                <div className="mt-5 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {category.bookCount || 0} Books
                </div>
              </div>  
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <BookOpen
                className="mx-auto text-gray-400 mb-4"
                size={60}
              />

              <h2 className="text-2xl font-semibold text-gray-700">
                No Categories Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try another search keyword.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Category;