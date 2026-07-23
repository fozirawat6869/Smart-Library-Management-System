import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  BookOpen,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // axios.post("/api/register", formData)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 flex justify-center items-center p-5">

      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full grid md:grid-cols-2 overflow-hidden">

        {/* Left */}

        <div className="hidden md:flex flex-col justify-center items-center bg-blue-700 text-white p-10">

          <BookOpen size={70} />

          <h1 className="text-4xl font-bold mt-5">
            Smart Library
          </h1>

          <p className="text-center mt-5">
            Create your account and start
            exploring thousands of books.
          </p>

          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900"
            alt=""
            className="rounded-xl mt-8"
          />

        </div>

        {/* Right */}

        <div className="p-10">

          <h2 className="text-3xl font-bold">
            Register
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >

            <div>

              <label>Full Name</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">

                <User size={18} />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div>

              <label>Email</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div>

              <label>Phone</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">

                <Phone size={18} />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div>

              <label>Role</label>

              <select
                name="role"
                onChange={handleChange}
                className="border rounded-lg w-full p-3 mt-2"
              >
                <option>Student</option>
                <option>Librarian</option>
              </select>

            </div>

            <div>

              <label>Password</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">

                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>

              </div>

            </div>

            <button className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 rounded-lg font-semibold">
              Create Account
            </button>

          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;