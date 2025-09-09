// models/Review.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
title : {type: String},
subTitle : {type: String},
descriptionText: [
    {
        description : {type: String}
    }
],
image : {type: String},
buttonTitle :{type: String},
buttonLink: {type: String},
isActive: { type: Boolean, default: true },

},{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
