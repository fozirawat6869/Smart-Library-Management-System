import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import { ShieldCheck } from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message);

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "OTP Verification Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <div className="flex justify-center">
          <ShieldCheck size={60} className="text-blue-700" />
        </div>

        <h2 className="text-3xl font-bold text-center mt-4">
          Verify OTP
        </h2>

        <p className="text-center text-gray-600 mt-2">
          OTP sent to
        </p>

        <p className="text-center font-semibold mb-6">
          {email}
        </p>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg p-3 text-center text-xl tracking-widest"
            required
          />

          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg mt-5"
          >
            Verify OTP
          </button>

        </form>

      </div>

    </div>
  );
};

export default VerifyOTP;