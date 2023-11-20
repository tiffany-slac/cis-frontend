const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

mongoose.connect('mongodb://localhost:27017/TestDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const assetSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  metadata: Object // Considering the nested metadata object
});

const Asset = mongoose.model('Asset', assetSchema);

// Route to get assets data
app.get('/api/assets', async (req, res) => {
  try {
    const assetsData = await Asset.find(); // Fetch all assets
    res.json(assetsData);
  } catch (error) {
    console.error('Error fetching assets data:', error);
    res.status(500).send('Error fetching assets data');
  }
});

// Route to get asset details by ID
app.get('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const assetDetails = await Asset.findOne({ id }); // Replace YourModel with your Mongoose model name

    if (assetDetails) {
      res.json(assetDetails);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    console.error('Error fetching asset details:', error);
    res.status(500).send('Error fetching asset details');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get('/api/assets/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

//     if (isValidObjectId) {
//       const objectId = mongoose.Types.ObjectId(id);
//       const assetDetails = await Asset.findById(objectId);
//       res.json(assetDetails);
//     } else {
//       res.status(400).send('Invalid asset ID');
//     }
//   } catch (error) {
//     console.error('Error fetching asset details:', error);
//     res.status(500).send('Error fetching asset details');
//   }
// });
// app.get('/api/assets/:_id', async (req, res) => {
//   try {
//     const { _id } = req.params; // Change 'id' to '_id'
//     const isValidObjectId = mongoose.Types.ObjectId.isValid(_id);

//     if (isValidObjectId) {
//       const objectId = mongoose.Types.ObjectId(_id);
//       const assetDetails = await Asset.findById(objectId);
//       if (assetDetails) {
//         res.json(assetDetails);
//       } else {
//         res.status(404).send('Asset not found'); // Handle case where asset is not found
//       }
//     } else {
//       res.status(400).send('Invalid asset ID');
//     }
//   } catch (error) {
//     console.error('Error fetching asset details:', error);
//     res.status(500).send('Error fetching asset details');
//   }
// });


// // Route to get asset details by ID
// app.get('/api/assets/:_id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

//     if (isValidObjectId) {
//       const objectId = mongoose.Types.ObjectId(id);
//       const assetDetails = await Asset.findById(objectId);
//       res.json(assetDetails);
//     } else {
//       res.status(400).send('Invalid asset ID');
//     }
//   } catch (error) {
//     console.error('Error fetching asset details:', error);
//     res.status(500).send('Error fetching asset details');
//   }
// });

/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:3001', // or specific domain
  optionsSuccessStatus: 200,
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


// API endpoint for fetching cater data
app.get('/api/users', async (req, res) => {
  try {
    const caterData = await Cater.find(); // Assuming "Cater" is your Mongoose model
    res.json(caterData);
  } catch (error) {
    console.error('Error fetching cater data:', error);
    res.status(500).send('Error fetching cater data');
  }
});

// API endpoint for search functionality
app.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const users = await User.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.json(users);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('Error fetching search results');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/