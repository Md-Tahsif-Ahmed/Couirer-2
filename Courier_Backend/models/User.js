// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    _id: { type: String },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        unique: false,
    },
    address: {
        type: String,
        // required: true,
        unique: false,
    },
    bname: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Marchant', 'Admin', 'Hub Manager', 'Delivery Boy', 'PickUp Boy', 'Accountant', 'Data Entry Oparator'],
        default: 'Marchant',
    },
    balance: { // New field to store COD amount
        type: Number,
        default: 0,
    },
    pendingBalance: { // New field to store COD amount
        type: Number,
        default: 0,
    },
    
    sumDeposite: {
        type: Number,
        default: 0,
    },
    // status: {
    //     type: String,
    //     enum: ['pending', 'approved','reject', 'withdraw'],
    //     default: 'pending',
       
    //   },

    totalDelivered: {
        type: Number,
        default: 0,
    },
    // claimingDate: {
    //     type:Date,
    // }

    
}, { timestamps: true });

// পাসওয়ার্ড হ্যাশিং
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// পাসওয়ার্ড তুলনা করার মেথড
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
