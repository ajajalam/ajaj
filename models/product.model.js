const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one image is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Dynamic reference
    required: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  moq: {
    type: Number,
    required: true,
    min: 1
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);