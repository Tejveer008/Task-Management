const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { username, password } = req.body;

  if (username) user.username = username;
  if (password) user.password = password;

  await user.save();
  res.json({ message: "Profile updated" });
};
