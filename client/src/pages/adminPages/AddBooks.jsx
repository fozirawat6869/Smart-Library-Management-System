import { useEffect, useState } from "react";
import API from "../../api/api";
import { useRef } from "react";
import { Upload, X } from "lucide-react";

function AddBooks() {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
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

    if (!formData.image) {
      newErrors.image = "Book image is required";
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
      const data = new FormData();

      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("isbn", formData.isbn);
      data.append("category", formData.category);
      data.append("image", formData.image);

      await API.post("/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book Added Successfully");

      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        quantity: "",
        image: null,
        isbn: "",
        category: "",
      });

      setPreview(""); // Clear the image preview
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      } // deletes the file input value image
      setErrors({});
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl md:text-4xl font-bold">📚 Add New Book</h2>

          <p className="mt-2 text-blue-100">
            Fill in the details to add a new book to your library.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Book Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3
bg-gray-50
focus:bg-white
focus:ring-4
focus:ring-blue-100
focus:border-blue-500
outline-none
transition
${errors.title ? "border-red-500" : "border-gray-300"}`}
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

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Cover
            </label>

            {!preview ? (
              <div
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
      ${
        errors.image
          ? "border-red-400 bg-red-50"
          : "border-blue-300 hover:border-blue-500 hover:bg-blue-50"
      }`}
              >
                <Upload className="mx-auto w-12 h-12 text-blue-500 mb-3" />

                <p className="text-gray-600 font-medium">
                  Click to upload book cover
                </p>

                <p className="text-sm text-gray-400 mt-1">PNG, JPG, JPEG</p>

                <input
                  ref={fileInputRef}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (!file) return;

                    if (!file.type.startsWith("image/")) {
                      alert("Please upload an image");
                      return;
                    }

                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));

                    setPreview(URL.createObjectURL(file));

                    setErrors((prev) => ({
                      ...prev,
                      image: "",
                    }));
                  }}
                />
              </div>
            ) : (
              <div className="relative w-fit">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-56 object-cover rounded-xl shadow-lg border"
                />

                <button
                  type="button"
                  onClick={() => {
                    setPreview("");

                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                    }));

                    fileInputRef.current.value = "";
                  }}
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {errors.image && (
              <p className="text-red-500 text-sm mt-2">{errors.image}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 resize-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r
             from-blue-600
             to-indigo-600
             hover:from-blue-700
             hover:to-indigo-700
             text-white
              py-4 font-semibold text-lg shadow-lg transition hover:scale-[1.02]"
            >
              📚 Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBooks;
