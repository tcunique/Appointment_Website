const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add a log to ensure this file is loaded
console.log('Users route loaded');

// User registration
router.post('/register', async (req, res) => {
  console.log('Received registration request:', req.body); // Log the request body
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.json({ msg: 'User registered successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
