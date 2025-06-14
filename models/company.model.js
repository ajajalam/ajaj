const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  industryType: {
    type: String,
    required: true,
    enum: ['manufacturing', 'wholesale', 'retail', 'it', 'services', 'other'],
    default: 'other'
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  gstNumber: {
    type: String,
    match: [/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please fill a valid GST number'],
    required: false
  },
  countryCode: {
    type: String,
    required: true,
    match: [/^\+\d{1,3}$/, 'Please fill a valid country code']
  },
  phone: {
    type: Number,
    required: true,
    match: [/^\d{10}$/, 'Please fill a valid phone number'],
    unique: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    unique: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pinCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  website: {
    type: String,
    default: ''
  },
  location: {
    lat: {
      type: Number,
      required: false
    },
    long: {
      type: Number,
      required: false
    }
  },
  documents: [
    {
      docType: {
        type: String,
        enum: ['gst', 'registration', 'license', 'other'],
        required: true
      },
      url: {
        type: String,
        required: true
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  approved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;