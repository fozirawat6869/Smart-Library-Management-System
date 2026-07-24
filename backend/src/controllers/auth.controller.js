import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTP from "../utils/sendEmail.js";


// register 

export const registerUser = async(req, res) => {
try{
    const {name, email,phone, password, role} = req.body;

  // check if user exists
  const exists = await User.findOne({email});

  if(exists){
    return res.status(400).json({message: "User already exists"});
  }

  const otp = generateOTP();
  // if user not exists then create
  const user = await User
  .create({
    name, 
    email,
    phone, 
    password, 
    otp,
    otpExpiry: Date.now() + 5*60*1000,
    isVerified: false,
    role
  });

  await sendOTP(email, otp);

  res.status(201).json({
    success: true,
    message: "OTP sent to your email",
    email: user.email,
  })
}catch(error){
  res.status(500).json({
    success: false,
    message: error.message,
  })
}
}

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

export const verifyOTP = async(req, res) => {
  try{
    const {email, otp} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if(user.isVerified){
      return res.status(400).json({
        success: false,
        message: "User already verified",
      })
    }

    if(user.otp !== otp){
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      })
    }

    if(user.otpExpiry < Date.now()){
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      })
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User verified successfully",
    })

  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

