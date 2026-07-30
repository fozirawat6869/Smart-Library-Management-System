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

// export const sendOtp = async (req, res) => {
//   try {
//     const { phone } = req.body;

//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone no. is required",
//       });
//     }

//     console.log("Number from request body:", number);
//     console.log("Inside sendOtp API");
//     console.log("2Factor API Key:", process.env.TwoFactorKey);

//     const url = `https://2factor.in/API/V1/${process.env.TwoFactorKey}/SMS/+91${number}/AUTOGEN/OTP1`;
// //  const url=`https://2factor.in/API/V1/b2af6789-d7a9-11f0-a6b2-0200cd936042/SMS/918755306869/AUTOGEN/OTP1 `
//     console.log("Request URL:", url);

//     const response = await axios.get(url);
    

//     console.log("2Factor Response:", response.data);

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       data: response.data,
//     });

//   } catch (error) {
//     console.log("========== ERROR ==========");
//     console.log("Code:", error.code);
//     console.log("Message:", error.message);

//     if (error.response) {
//       console.log("Status:", error.response.status);
//       console.log("Data:", error.response.data);
//     }

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


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
    const {email, password} = req.body;

    // find the user from database
    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // verify the user otp
    if(!user.isVerified){
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
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



