const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/TestDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for InventoryItem
const InventoryItemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    type: String,
    classType: {
      type: String,
      enum: ['Building', 'Floor', 'Room', 'Item', 'Software', 'Connector', 'Cable'],
    },
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
  

// Create a model based on the schema
const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);

// API endpoint to get information about a specific InventoryItem by ID
app.get('/inventory/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await InventoryItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
