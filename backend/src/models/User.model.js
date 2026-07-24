import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid phone number"],
    },

    role: {
      type: String,
      enum: ["student", "librarian", "admin"],
      default: "student",
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    
    isVerified: {
      type: Boolean,
      default: false
    },

    otp: String,

    otpExpiry: Date
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;