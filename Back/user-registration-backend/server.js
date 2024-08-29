const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');
const login = require('./routes/login');
const appointments = require('./routes/appointments'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/user-registration')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

console.log('Setting up routes...');
app.use('/api/users', users);
app.use('/api', login);
app.use('/api/appointments', appointments); // Use appointments route

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
