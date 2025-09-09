// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String },
  categoryImage: { type: String },
  isActive: { type: Boolean, default: true },
  totalProducts: { type: Number, default: 0 },
  totalSold: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
