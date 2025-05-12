const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

// Create and send JWT in cookie
const generateTokenAndSetCookie = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // use true in production with HTTPS
    maxAge: 86400000,
  });

  return payload;
};

// POST /api/auth/signup
exports.signup = async (req, res) => {
  const { email, password, role, username, adminName } = req.body;

  try {
    if (role === "user") {
      if (!username) return res.status(400).json({ message: "Username is required" });
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      const newUser = new User({ email, password, role, username });
      await newUser.save();

      const userPayload = {
        id: newUser._id,
        email: newUser.email,
        role: "user",
        username: newUser.username,
        permissions: [],
      };

      generateTokenAndSetCookie(userPayload, res);
      return res.status(201).json({ message: "User signup successful", user: userPayload });
    }

    if (role === "admin") {
      if (!adminName) return res.status(400).json({ message: "Admin name is required" });
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

      const newAdmin = new Admin({ email, password, role, adminName });
      await newAdmin.save();

      const adminPayload = {
        id: newAdmin._id,
        email: newAdmin.email,
        role: "admin",
        adminName: newAdmin.adminName,
        permissions: ["manageTasks", "manageUsers"],
      };

      generateTokenAndSetCookie(adminPayload, res);
      return res.status(201).json({ message: "Admin signup successful", user: adminPayload });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Try User
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      const userPayload = {
        id: user._id,
        email: user.email,
        role: "user",
        username: user.username,
        permissions: [],
      };
      generateTokenAndSetCookie(userPayload, res);
      return res.status(200).json({ message: "Login successful", user: userPayload });
    }

    // Try Admin
    const admin = await Admin.findOne({ email });
    if (admin && await admin.comparePassword(password)) {
      const adminPayload = {
        id: admin._id,
        email: admin.email,
        role: "admin",
        adminName: admin.adminName,
        permissions: ["manageTasks", "manageUsers"],
      };
      generateTokenAndSetCookie(adminPayload, res);
      return res.status(200).json({ message: "Login successful", user: adminPayload });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role === "user") {
      const user = await User.findById(id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json({
        id: user._id,
        email: user.email,
        role: "user",
        username: user.username,
        permissions: [],
      });
    }

    if (role === "admin") {
      const admin = await Admin.findById(id).select("-password");
      if (!admin) return res.status(404).json({ message: "Admin not found" });
      return res.status(200).json({
        id: admin._id,
        email: admin.email,
        role: "admin",
        adminName: admin.adminName,
        permissions: ["manageTasks", "manageUsers"],
      });
    }

    res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ message: "Failed to get user info" });
  }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
