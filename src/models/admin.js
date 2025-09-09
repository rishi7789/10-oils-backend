const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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

    // phone: {
    //     type: Number,
    //     unique: true
    // },

    // image: {
    //     type: String,
    // },
    isActive: { type: Boolean, default: true }, 

}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
