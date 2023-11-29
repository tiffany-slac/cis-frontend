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
  _id: String,
  name: String,
  type: String,
  metadata: Object // Considering the nested metadata object
});

const InventoryItemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  type: String,
  classType: String,
  attributes: {
    CPU: String,
    RAM: String,
    Storage: String,
    NetworkPorts: Number,
  },
  connector_class: [{
    count: Number,
    type: String,
  }],
  history: [{
    date: String,
    action: String,
    description: String,
  }],
});

const Asset = mongoose.model('Asset', assetSchema);

// Create a model based on the schema
const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);


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

app.get('/api/inventory/count', async (req, res) => {
  try {
    const itemCount = await InventoryItem.countDocuments(); // Get the count of items
    res.json({ count: itemCount });
  } catch (error) {
    console.error('Error counting inventory items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/inventory', async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find(); // Fetch all items
    if (inventoryItems.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }
    res.json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to get asset details by ID
app.get('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id); // Log the received ID

    const asset = await InventoryItem.findOne({ _id: id }); // Replace 'Asset' with your Mongoose model
    console.log('Database Query Response:', asset); // Log the database query response

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.json(asset); // Return the asset
  } catch (error) {
    console.error('Error fetching asset details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});