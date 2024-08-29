const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

console.log('Login route loaded');

// User login
router.post('/login', async (req, res) => {
  console.log('Received login request:', req.body);
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    console.log('Please enter all fields');
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    await client.connect();
    const database = client.db('user-registration');
    const collection = database.collection('users');

    // Find the user by email
    const user = await collection.findOne({ email });
    if (!user) {
      console.log('User does not exist');
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and assign a token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
    console.log('User logged in successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  } finally {
    await client.close();
  }
});

module.exports = router;
