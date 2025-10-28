import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// 📝 Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user and include password explicitly
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate JWT token
    const token = generateToken(user._id);

    // 4️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // set true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5️⃣ Send response
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
 
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🚪 Logout user
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

// GET LOGGED-IN USER DETAILS
export const getCurrentUser = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    console.log("user from request ", req.user )
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

