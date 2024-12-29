const mongoose = require('mongoose');

const consignmentSchema = new mongoose.Schema({
  _id: { type: String },
  marchantId: {type: String },
  // sphone: { type: String, required:true },
  // rphone: { type: String, required:true },
  sphone: { type: String },
  rphone: { type: String },
  sname: { type: String },
  rname: { type: String },
  semail: { type: String },
  remail: { type: String },
  saddress: { type: String },
  raddress: { type: String },
  sdistrict: { type: String },
  rdistrict: { type: String },
  codAmount: { type: Number, required:true },
  price: { type: Number},
  deliveryCharge: { type: Number},
  invoice: { type: String },
  note: { type: String },
  weight: { type: Number },
  dtype: { type: String },
  userEmail: { // New field to store user's email
    type: String,
    
  },
  status: {
    type: String,
    enum: ['1st pending','in review', 'pending', 'approved', 'delivered', 'cancelled', 'asigned', 'pickedup', 'delevered', 'deposited', 'paid', 'partial-delivered'],
    default: '1st pending',
   
  },
  deliveryStatus: {
    type: String,
    enum: ['regular', 'express'],
    // default: 'regular',
  },
  rthana: { type: String },  
  exchange: { type: Boolean, default: false },
  boyEmail: { // New field to store user's email
    type: String,
    required: false,
  },
  createdAt: { type: Date, default: Date.now }
  
  ,
  approvalDate: {
    type:Date
    
  },
  pickupDate: {
    type:Date 
  },
  deliveryDate: {
    type: Date 
  },
  remark: { type: String,
    required: false,
   },
});

const Consignment = mongoose.model('Consignment', consignmentSchema);

module.exports = Consignment;
