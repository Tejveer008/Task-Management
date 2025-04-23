const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require ('../Models/User')
const Admin = require ('../Models/Admin')
const router = express.Router();

// Register Route
router.post('/signup', async (req, res) => {
  console.log("Signup request received");
  const { email, password, role, username, adminName } = req.body;
  const Model = role === 'admin' ? Admin : User;

  try {
    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Model({
      email,
      password: hashedPassword,
      role,
      ...(role === 'admin' ? { adminName } : { username }),
    });

    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  const Model = role === 'admin' ? Admin : User;

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    console.error("Login error:", err); // 🛑 Add this to see the issue in console
    res.status(500).json({ message: 'Login error', error: err });
  }
});

module.exports = router;
