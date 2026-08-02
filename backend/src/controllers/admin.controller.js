import User from "../models/User.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const totalUsers = users.length;
    const totalStudents = users.filter(
      (user) => user.role === "student"
    ).length;

    const totalAdmins = users.filter(
      (user) => user.role === "admin"
    ).length;

    const totalLibrarians = users.filter(
      (user) => user.role === "librarian"
    ).length;

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      totalUsers,
      totalStudents,
      totalAdmins,
      totalLibrarians,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};