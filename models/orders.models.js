import { ref } from 'joi';

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    oredrTime:{
        type: <time datetime="time"></time>   
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    trackingNumber: {
        type: String
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    cancellationReason: {
        type: String
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;

