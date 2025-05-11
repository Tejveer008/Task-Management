const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../Models/Admin");

exports.getMe = async (req, res) => {
  try {
    // `req.user` is set by the `protect` middleware after verifying the JWT
    const userData = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      username: req.user.username || null,
      adminName: req.user.adminName || null,
      permissions: req.user.permissions || [],
    };

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user info" });
  }
};


exports.signup = async (req, res) => {
  const { email, password, role, username, adminName } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = new User({
      email,
      password,
      role,
      username: role === "user" ? username : undefined,
      adminName: role === "admin" ? adminName : undefined,
    });

    await user.save();

    if (role === "admin") {
      await Admin.create({
        userId: user._id,
        permissions: ["manageTasks", "manageUsers"],
      });
    }

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const adminProfile = await Admin.findOne({ userId: user._id });

  const tokenPayload = {
    id: user._id,
    email: user.email,
    role: adminProfile ? "admin" : "user",
    username: user.username,
    adminName: user.adminName,
    permissions: adminProfile?.permissions || [],
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    maxAge: 86400000,
  });

  res.json({ message: "Login successful", user: tokenPayload });
};

exports.getMe = (req, res) => {
  res.json(req.user);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
