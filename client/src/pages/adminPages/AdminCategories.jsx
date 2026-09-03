import { useState, useEffect } from "react";
import API from "../../api/api";

const AdminCategories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // Create Category
  const createCategory = async () => {
    if (!name || !description) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/categories", {
        name,
        description,
      });

      alert("Category Created Successfully");

      setName("");
      setDescription("");

      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  // delete category
  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/categories/${id}`);
      alert("Category Deleted Successfully");
      fetchCategories();
    } catch (error) {
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="px-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={createCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h2>

            <p className="text-gray-600 mt-2 text-sm">
              {category.description || "No description available"}
            </p>

            <button
              onClick={() => deleteCategory(category._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 
             mt-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
