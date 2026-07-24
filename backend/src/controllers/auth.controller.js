import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTP from "../utils/sendEmail.js";
import OTP from "../models/otp.model.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();

    await OTP.findOneAndDelete({ email });

    await OTP.create({
      email,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });

    await sendOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// register 

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const otpData = await OTP.findOne({ email });

  if (!otpData || !otpData.verified) {
  return res.status(400).json({
    success: false,
    message: "Please verify your email first",
  });
}

    await User.create({
      name,
      email,
      phone,
      password,
      role,
      isVerified: true,
    });

    await OTP.findOneAndDelete({ email });

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    res.status(500).json({
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

export const verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const data = await OTP.findOne({ email });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (String(data.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (data.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    data.verified = true;
    await data.save();

    return res.status(200).json({
    success: true,
    message: "OTP verified successfully",
  });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

