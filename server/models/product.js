const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please include the item name'],
    trim: true,
    maxLength: [20, 'Item name cannot exceed 20 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please include the item price']
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'marcos', 'LG'],
      message: '{VALUE} is not supported'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;