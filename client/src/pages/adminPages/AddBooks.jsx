import { useEffect, useState } from "react";
import API from "../../api/api";

function AddBooks() {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    isbn: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Book title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await API.post("/books", formData);

      alert("Book Added Successfully");

      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
        isbn: "",
        category: "",
      });

      setErrors({});
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-3">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Book</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Book Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block mb-2 font-medium">Author</label>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.author ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-medium">Quantity</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label className="block mb-2 font-medium">ISBN</label>

            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.isbn ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.isbn && (
              <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Image URL</label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-2 border resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBooks;
