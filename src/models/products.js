const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  regularPrice: { type: Number, required: true },
  salePrice: { type: Number },
  description: { type: String },
  images: [String],
  sku: { type: String, required: true },
  // productVariants: [{
  //   size: { type: String, required: true },
  //   sku: { type: String, required: true },
  //   regularPrice: { type: Number, required: true },
  //   salePrice: { type: Number },
  //   description: { type: String },
  //   images: [String],
  //   stock: { type: Number, default: 0 },
  //   tag: { type: String },
  //   isActive: { type: Boolean, default: true },
  // }],
  isActive: { type: Boolean, default: true },

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
