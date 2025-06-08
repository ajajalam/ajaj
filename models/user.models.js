const { required } = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    },
    userEmail: {
        type : String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    userPassword: {
        type: String,
        required: true,
        minlength: 6
    },
    userRole: {
        type: String,
        enum: ['admin', 'user','supplier'],
        default: 'user'
    },
    countryCode: {
        type: String,
        required: true,
        match: [/^\+\d{1,3}$/, 'Please fill a valid country code']
    },
    userPhone:{
        type:Number,
        required: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number'],
        unique: true,
    },
    isVerifiied: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    fcmToken: [{
    token:{ 
        type: String,
        required: true
    },
    platform:{
    type: String,
    enum: ['android', 'ios','web'],
    required: true
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    }
    }
    ]

     ,
     otp:{
        code : {
            type: String,
            required: true,
            match: [/^\d{6}$/, 'Please fill a valid OTP code']
        },
        expiresAt: {
            type: Date,
            required: true
        
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
        
     },     
     loginType:{
        type: String,
        enum: ['email', 'google' ],
        default: 'email'
     },
     profileImage: {
        type: String,
        default: 'https://example.com/default-profile-image.png'
    },
    isLogin:{
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;