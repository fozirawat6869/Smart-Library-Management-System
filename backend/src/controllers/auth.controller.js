import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { sendOTP } from "../utils/sendOtp.js";
import { verifyOTP } from "../utils/verifyOTP.js"

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const sendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const exists = await User.findOne({phone});

    if(exists){
      return res.status(400).json({
        success: false,
        message: "Phone no. already exists",
      })
    }

    const result = await sendOTP(phone);

    res.status(200).json({
      success: true,
      sessionId: result.Details,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { sessionId, otp } = req.body;

    const result = await verifyOTP(sessionId, otp);

    if (result.Status === "Success") {
      return res.json({
        success: true,
        message: "OTP Verified",
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// register 
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const exists = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            phone,
            password,
            role,
            isVerified: true,
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login 
export const loginUser = async(req, res) => {
  try{
    const {phone, password, role } = req.body;

    if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({
    message: "Please enter a valid 10-digit mobile number.",
  });
}
    // find the user from database
    const user = await User.findOne({phone});

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if(user.role !== role){
      return res.status(401).json({
        success: false,
        message: `This account is not a ${role} account`,
      })
    }

    // verify the user otp
    if(!user.isVerified){
      return res.status(401).json({
        success: false,
        message: "Please verify your phone first",
      })
    }

    // compare passowrd from database and req.body
    const match = await user.comparePassword(password);

    if(!match){
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      })
    }

    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      token: generateToken(user._id, user.role),
      user,
    })
  }
  catch (error) {
  console.error("ERROR:", error);
  console.error(error.stack);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
}



