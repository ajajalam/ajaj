const mongoose = require('mongoose');

const fcmTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['android', 'ios', 'web'],
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const otpSchema = new mongoose.Schema({
  code: {
    type: String,
    match: [/^\d{6}$/, 'Please fill a valid OTP code']
  },
  expiresAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
  },
  userPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  userRole: {
    type: String,
    enum: ['admin', 'user', 'supplier'],
    default: 'user'
  },
  countryCode: {
    type: String,
    required: true,
    match: [/^\+\d{1,3}$/, 'Please fill a valid country code']
  },
  userPhone: {
    type: Number,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please fill a valid phone number']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  fcmToken: {
    type: [fcmTokenSchema],
    default: []
  },
  otp: {
    type: otpSchema,
    default: null
  },
  loginType: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
  },
  profileImage: {
    type: String,
    default: 'https://example.com/default-profile-image.png'
  },
  isLogin: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  },
  lastLoginIP: {
    type: String
  },
  geoLocation: {
    lat: { type: Number },
    long: { type: Number }
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;