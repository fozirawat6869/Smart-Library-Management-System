import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Phone, BookOpen } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const sendOTP = async () => {
    if (!formData.phone) {
      return alert("Enter phone number");
    }

    try {
      const res = await API.post("/auth/send-otp", {
        phone: formData.phone,
      });

      setSessionId(res.data.sessionId);
      setOtpSent(true);

      alert("OTP Sent Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // verify otp
  const verifyOTP = async () => {
    try {
      const res = await API.post("/auth/verify-otp", {
        sessionId,
        otp,
      });

      if (res.data.success) {
        setVerified(true);
        alert("Phone Verified Successfully");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify your phone number first.");
      return;
    }

    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message);
      navigate("/login");

      setOtp("");
      setOtpSent(false);
      setVerified(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "student",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 flex justify-center items-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full grid md:grid-cols-2 overflow-hidden">
        {/* Left */}

        <div className="hidden md:flex flex-col justify-center items-center bg-blue-700 text-white p-10">
          <BookOpen size={70} />

          <h1 className="text-4xl font-bold mt-5">Smart Library</h1>

          <p className="text-center mt-5">
            Create your account and start exploring thousands of books.
          </p>

          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900"
            alt=""
            className="rounded-xl mt-8"
          />
        </div>

        {/* Right */}

        <div className="p-7">
          <h2 className="text-3xl font-bold">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-1 mt-2">
            <div>
              <label>Full Name</label>

              <div className="border rounded-lg flex items-center mt-1 px-2">
                <User size={18} />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  className="w-full p-2 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Email</label>

              <div className="border rounded-lg flex items-center mt-1 px-3">
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  className="w-full p-2 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Verification */}

              {otpSent && (
                <div className="mt-3">
                  <label>Enter OTP</label>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="border rounded-lg w-full p-2 mt-1"
                  />

                  {verified && (
                    <p className="text-green-600 mt-3 font-semibold">
                      ✓ Phone verified successfully
                    </p>
                  )}
                </div>
              )}

              {/* Verify OTP Button */}
              {otpSent && !verified && (
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={verifyOTP}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>

            <div>
              <label>Phone</label>

              <div className="border rounded-lg flex items-center mt-1 px-3">
                <Phone size={18} />

                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone Number"
                  className="w-full p-2 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={verified}
                  className={`w-full py-2 rounded-lg text-white ${
                    verified
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {verified ? "Phone Verified ✓" : "Send OTP"}
                </button>
              </div>
            </div>

            <div>
              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border rounded-lg w-full p-2 mt-1"
              >
                <option value="student">Student</option>
                <option value="librarian">Librarian</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label>
                Password
                <div className="border rounded-lg flex items-center mt-1 px-3">
                  <Lock size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    placeholder="Enter your   Password"
                    required
                    className="w-full p-2 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={!verified}
              className={`w-full py-3 pt-2 rounded-lg ${
                verified
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
