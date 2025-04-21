// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // adjust path as needed

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // you can use .select('name email') to limit fields
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
