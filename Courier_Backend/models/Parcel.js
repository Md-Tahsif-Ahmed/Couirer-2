const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParcelSchema = new Schema({
  marchantId: {
    type: String,
    // required: true,
  },
  sphone: {
    type: String,
    required: true,
  },
  rphone: {
    type: String,
    required: true,
  },
  sname: {
    type: String,
    required: true,
  },
  rname: {
    type: String,
    required: true,
  },
  semail: {
    type: String,
    required: true,
  },
  remail: {
    type: String,
    required: true,
  },
  saddress: {
    type: String,
    required: true,
  },
  raddress: {
    type: String,
    required: true,
  },
  // district: {
  //   type: String,
  //   default: 'Dhaka City',
  // },
  // thana: {
  //   type: String,
  //   required: true,
  // },
  codAmount: {
    type: Number,
    required: true,
  },
  invoice: {
    type: String,
    default: '',
  },
  note: {
    type: String,
    maxlength: 400,
  },
  weight: {
    type: Number,
    required: true,
  },
  // exchange: {
  //   type: Boolean,
  //   default: false,
  // },
  dtype: {
    type: String,
    default: false,
  },
  userEmail: { // New field to store user's email
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Parcel', ParcelSchema);
 
