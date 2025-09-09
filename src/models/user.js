const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    phone: {
        type: Number,
        unique: true
    },

    image: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    isActive: { type: Boolean, default: true }, 

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
