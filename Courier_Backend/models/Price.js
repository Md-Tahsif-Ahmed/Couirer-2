const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    // _id: { type: String },
    from: String,
    destination: String,
    category: String,
    serviceType: String,
    basePrice: Number,
    extraWeightPrice: Number,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Price = mongoose.model('Price', priceSchema);
module.exports = Price;
