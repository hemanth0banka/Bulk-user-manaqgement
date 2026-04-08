const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [3, 'Full name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: 'Phone number must contain only numeric characters'
        }
    },
    walletBalance: {
        type: Number,
        default: 0,
        min: [0, 'Wallet balance cannot be negative']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    kycStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    deviceInfo: {
        ipAddress: String,
        deviceType: {
            type: String,
            enum: ['Mobile', 'Desktop', 'Tablet', 'Other', ''] // added some flexibility
        },
        os: {
            type: String,
            enum: ['Android', 'iOS', 'Windows', 'macOS', 'Linux', 'Other', '']
        }
    }
}, {
    timestamps: true
});

// Added an optimized compound index as a bonus requirement
userSchema.index({ isBlocked: 1, kycStatus: 1 });
// The requirements also asked for createdAt as an index
userSchema.index({ createdAt: -1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
