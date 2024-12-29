const mongoose = require('mongoose');
const ClaimSchema = new mongoose.Schema({
_id: { type: String },
userEmail: {
    type: String,
    required: true,
     
},
claimAmount: {
    type: Number,
    default: 0,
},
status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
   
  },
createdAt: { type: Date, default: Date.now }


});

module.exports = mongoose.model('Claim', ClaimSchema);