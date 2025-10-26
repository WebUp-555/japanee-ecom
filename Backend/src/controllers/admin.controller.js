import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const ADMIN_ROLE = "admin";

// 🧑‍💼 Admin Login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const adminUser = await User.findOne({ email, role: ADMIN_ROLE });
  if (!adminUser) {
    throw new ApiError(401, "Admin not found or not an admin");
  }

  const isPasswordValid = await adminUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { _id: adminUser._id, email: adminUser.email, role: adminUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
  );

  // Optionally set token as a cookie
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });

  res.status(200).json({
    success: true,
    token,
    message: "Admin logged in successfully",
  });
});

// 👥 Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  res.status(200).json({
    success: true,
    users,
    message: "All users fetched successfully",
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json({
    success: true,
    user,
    message: "User fetched successfully",
  });
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
  
export const addproduct = asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price || !description || !category) {
    throw new ApiError(400, "All product fields are required");
  }
  // Here you would typically add the product to the database
  
});

// 🚪 Admin Logout
export const adminLogout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ success: true, message: "Admin logged out successfully" });
});
