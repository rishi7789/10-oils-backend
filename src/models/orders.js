const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String },
    lastName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: Number },
    orderItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            productName: { type: String },
            sku: { type: String },
            quantity: { type: Number, default: 0 },
            price: { type: Number }
        }
    ],
    totalAmount: { type: Number },
    shippingAddress: { type: String },
    orderNotes: { type: String },
    paymentMethod: { type: String, enum: ['cod', 'online'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    deliveryStatus: { type: String, enum: ['pending', 'shipped', 'delivered', 'returned'], default: 'pending' },
    isPaid: { type: Boolean, default: false },
    couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
