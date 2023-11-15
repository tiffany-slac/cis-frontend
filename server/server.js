const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Use cors middleware
app.use(cors({
    origin: 'http://localhost:3001', // or specific domain
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
  

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/TestDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema setup
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  address: String,
});

const User = mongoose.model('User', userSchema, 'testcollection');

// Define your API endpoint
app.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const users = await User.find({ name: { $regex: searchTerm, $options: 'i' } }); // Case-insensitive search
    res.json(users);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('Error fetching search results');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
