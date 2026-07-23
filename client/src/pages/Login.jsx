import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // axios.post("/api/login", formData)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 flex items-center justify-center p-5">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* Left */}

        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-700 text-white p-10">

          <BookOpen size={70} />

          <h1 className="text-4xl font-bold mt-5">
            Smart Library
          </h1>

          <p className="text-center mt-4 text-indigo-100">
            Read. Learn. Grow.
            <br />
            Welcome back to your library.
          </p>

          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900"
            alt=""
            className="rounded-xl mt-8"
          />

        </div>

        {/* Right */}

        <div className="p-10">

          <h2 className="text-3xl font-bold">
            Login
          </h2>

          <p className="text-gray-500 mt-2">
            Login into your account
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >

            <div>

              <label>Email</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full p-3 outline-none"
                  required
                />

              </div>

            </div>

            <div>

              <label>Password</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">

                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 outline-none"
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

            <div className="flex justify-between">

              <label className="flex gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-indigo-600"
              >
                Forgot Password?
              </button>

            </div>

            <button className="bg-indigo-700 hover:bg-indigo-800 text-white w-full py-3 rounded-lg font-semibold">
              Login
            </button>

          </form>

          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-700 font-semibold"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;