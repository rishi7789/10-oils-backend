const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'amount']},
  discountValue: { type: Number },
  usabilityLimit: { type: Number},
  expiryDate: { type: Date },
  isExpired: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

couponSchema.pre('save', function (next) {
  if (this.expiryDate) {
    this.isExpired = this.expiryDate > new Date();
  }
  next();
});

module.exports = mongoose.model('Coupon', couponSchema);
