
// Controller to add a parcel
 
  //   const parcelData = req.body;

  //   // Create a new parcel using Mongoose model
  //   const newParcel = new Parcel({parcelData, userId: req.user.id,});
  //   await newParcel.save();

  //   res.status(201).json({
  //     message: 'Parcel added successfully',
  //     parcel: newParcel,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     message: 'Error adding parcel',
  //     error: error.message,
  //   });
  // }
  // controllers/parcelController.js
  // const Parcel = require('../models/Parcel');
 
const Consignment = require('../models/Consignment');
const User = require('../models/User'); // Import the User model


  // Controller to add a parcel
 // Helper function to generate a unique 6-digit numeric ID
function generate6DigitId() {
  // Take the current timestamp in seconds, then take the last 6 digits
  const timestamp = Math.floor(Date.now() / 1000);
  const randomPart = Math.floor(Math.random() * 1000); // Generate a random number up to 999
  const uniqueId = (timestamp + randomPart) % 1000000; // Ensure it's a 6-digit number
  return uniqueId.toString().padStart(6, '0'); // Pad with leading zeros if needed
}

// exports.addParcel = async (req, res) => {
//   try {
//     const {
//       sphone,
//       rphone,
//       sname,
//       rname,
//       semail,
//       remail,
//       saddress,
//       raddress,
//       sdistrict,
//       rdistrict,
//       codAmount,
//       price,
//       deliveryCharge,
//       invoice,
//       note,
//       weight,
//       // exchange,
//       dtype, 
//       userEmail,

//     } = req.body;

//     // Validate required fields
//     if (
//       !sphone || !rphone || !sname || !rname ||
//       !semail ||
//       !remail || !saddress || !raddress ||
//       !sdistrict || !rdistrict || !weight || !userEmail || !price || !deliveryCharge
//     ) {
//       return res.status(400).json({ message: 'Please provide all required fields.' });
//     }

//     // Generate the 6-digit numeric ID
//     const shortId = generate6DigitId();

//     const newConsignment = new Consignment({
//       _id: shortId,
//       sphone,
//       rphone,
//       sname,
//       rname,
//       semail,
//       remail,
//       saddress,
//       raddress,
//       sdistrict,
//       rdistrict,
//       codAmount,
//       price,
//       deliveryCharge,
//       invoice,
//       note,
//       weight,
//       // exchange,
//       dtype,
//       userEmail // Ensure req.user is populated
//     });

//     const savedConsignment = await newConsignment.save();

//     res.status(201).json({ consignment: savedConsignment });
//   } catch (error) {
//     console.error('Error adding parcel:', error);
//     res.status(500).json({ message: 'Server error while adding parcel.', error: error.message });
//   }
// };

exports.addParcel = async (req, res) => {
  try {
    const {
      marchantId,
      sphone,
      rphone,
      sname,
      rname,
      semail,
      remail,
      saddress,
      raddress,
      sdistrict,
      rdistrict,
      codAmount,
      price,
      deliveryCharge,
      invoice,
      note,
      weight,
      rthana, 
      exchange,
      dtype,
      userEmail,
    } = req.body;

    // Validate required fields
    // if (
    //   !marchantId||!sphone || !rphone || !sname || !rname ||
    //   !semail || !remail || !saddress || !raddress ||
    //   !sdistrict || !rdistrict || !weight || !userEmail || !price || !deliveryCharge
    // ) {
    //   return res.status(400).json({ message: 'Please provide all required fields.' });
    // }

    // Generate the 6-digit numeric ID
    const shortId = generate6DigitId();

    // Create the consignment document
    const newConsignment = new Consignment({
      _id: shortId,
      marchantId,
      sphone,
      rphone,
      sname,
      rname,
      semail,
      remail,
      saddress,
      raddress,
      sdistrict,
      rdistrict,
      codAmount,
      price,
      deliveryCharge,
      invoice,
      note,
      weight,
      rthana,
      exchange,
      dtype,
      userEmail,
    });

    // Save the consignment
    const savedConsignment = await newConsignment.save();

    // Calculate 1% of the price to deduct and update user pendingBalance
    const deduction = price * 0.01;
    const updatedPendingBalance = price - deduction;

    // Find and update the user's pending balance
    const user = await User.findOneAndUpdate(
      { email: semail },
      { $inc: { pendingBalance: updatedPendingBalance } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(201).json({ consignment: savedConsignment, user });
  } catch (error) {
    console.error('Error adding parcel:', error);
    res.status(500).json({ message: 'Server error while adding parcel.', error: error.message });
  }
};

// Controller to get all parcels (optional)
exports.getAllParcels = async (req, res) => {
  try {
    const parcels = await Consignment.find({});
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching parcels',
      error: error.message,
    });
  }
};

// ............
// Controller to get parcel by ID
exports.getParcelById = async (req, res) => {
  try {
    const parcelId = req.params.id;
    const parcel = await Consignment.findById(parcelId);

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching parcel',
      error: error.message,
    });
  }
};

// Find parcel based on user Email .......
exports.getParcelByUserEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const consignment = await Consignment.find({ userEmail: userEmail }); // Find parcel by email

    if (!consignment) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    res.status(200).json(consignment);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching parcel',
      error: error.message,
    });
  }
}


 


