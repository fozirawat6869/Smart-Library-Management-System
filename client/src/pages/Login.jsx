import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { BookOpen, Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // student or admin
  const [loginType, setLoginType] = useState("student");

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        ...formData,
        role: loginType,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");

      if (loginType === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        {/* Left */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-700 text-white p-10">
          <BookOpen size={60} />

          <h1 className="text-4xl font-bold mt-3">Smart Library</h1>

          <p className="text-center mt-3">
            Read. Learn. Grow.
            <br />
            Welcome Back!
          </p>

          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900"
            alt=""
            className="rounded-xl mt-6"
          />
        </div>

        {/* Right */}
        <div className="p-10">
          <h2 className="text-3xl font-bold">Login</h2>

          <p className="text-gray-500 mt-2">Select Login Type</p>

          {/* Login Type */}
          <div className="flex mt-6 mb-6 rounded-lg overflow-hidden border">
            <button
              onClick={() => setLoginType("student")}
              className={`w-1/2 py-3 font-semibold transition ${
                loginType === "student"
                  ? "bg-indigo-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              🎓 Student
            </button>

            <button
              onClick={() => setLoginType("admin")}
              className={`w-1/2 py-3 font-semibold transition ${
                loginType === "admin"
                  ? "bg-indigo-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              👨‍💼 Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div>
              <label>Mobile no.</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">
                <Mail size={18} />

                <input
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder={`Enter your mobile no.`}
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label>Password</label>

              <div className="border rounded-lg flex items-center mt-2 px-3">
                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

              <button type="button" className="text-indigo-700">
                Forgot Password?
              </button>
            </div>

            <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold">
              Login as {loginType === "student" ? "Student" : "Admin"}
            </button>
          </form>

          {loginType === "student" && (
            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-700 font-semibold">
                Register
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
