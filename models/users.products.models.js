const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'books', 'furniture', 'other'],
        default: 'other'
    },
    brand: {
        type: String
    },
    images: [{
        type: String 
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number, 
        min: 0,
        max: 100,
        default: 0
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
