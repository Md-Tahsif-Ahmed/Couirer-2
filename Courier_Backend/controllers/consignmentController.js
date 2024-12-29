const Consignment = require('../models/Consignment');
const User = require('../models/User'); // Import the User model
 
const { protect } = require('../middleware/authMiddleware');

function generate6DigitId() {
  // Take the current timestamp in seconds, then take the last 6 digits
  const timestamp = Math.floor(Date.now() / 1000);
  const randomPart = Math.floor(Math.random() * 1000); // Generate a random number up to 999
  const uniqueId = (timestamp + randomPart) % 1000000; // Ensure it's a 6-digit number
  return uniqueId.toString().padStart(6, '0'); // Pad with leading zeros if needed
}

// const addConsignment = async (req, res) => {
//   try {
//     const consignmentAll = req.body; // Array of consignment objects
//     console.log(consignmentAll);

//     // Assign a unique 6-digit ID to each consignment object
//     const consignmentsWith6DigitId = consignmentAll.map(consignment => ({
//       ...consignment,
//       _id: generate6DigitId(),
//     }));

//     // Use insertMany to add multiple consignment records at once
//     await Consignment.insertMany(consignmentsWith6DigitId);

//     res.status(200).json({ message: 'Consignment data uploaded successfully' });
//   } catch (error) {
//     console.error('Error processing consignment data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Excel Download file......

const path = require('path');

const excelDownload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'public', 'spreadsheet.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.download(filePath, 'spreadsheet.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  } catch (error) {
    console.error('Error during file download:', error);
    res.status(500).send('Server Error');
  }
};
 

// .............*****............
// old bulk entry
// const addConsignment = async (req, res) => {
//   try {
//     const consignmentAll = req.body; // Array of consignment objects
//     console.log(consignmentAll);

//     // Process each consignment object
//     const consignmentsWith6DigitId = await Promise.all(
//       consignmentAll.map(async (consignment) => {
//         const shortId = generate6DigitId();
//         const deduction = consignment.price * 0.01;
//         const adjustedPrice = consignment.price - deduction;

//         // Update user's pendingBalance for each consignment based on semail
//         await User.findOneAndUpdate(
//           { email: consignment.semail },
//           { $inc: { pendingBalance: adjustedPrice } },
//           { new: true }
//         );

//         return {
//           ...consignment,
//           _id: shortId,
//         };
//       })
//     );

//     // Use insertMany to add all consignments at once
//     await Consignment.insertMany(consignmentsWith6DigitId);

//     res.status(200).json({ message: 'Consignment data uploaded successfully' });
//   } catch (error) {
//     console.error('Error processing consignment data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// new bulk entry
const addConsignment = async (req, res) => {
  try {
    const consignmentAll = req.body; // Array of consignment objects
    console.log(consignmentAll);

    // Define column-to-model field mapping
    const columnMapping = {
      'Invoice': 'invoice',
      'Name': 'rname',
      'Address': 'raddress',
      'Phone': 'rphone',
      'Amount': 'codAmount',
      'Note': 'note',
      'Contact Name': 'sname',
      'Contact Phone': 'sphone',
    };

    // Transform each row to match the MongoDB schema
    const transformedData = consignmentAll.map((consignment) => {
      const mappedConsignment = {};
      for (const [key, value] of Object.entries(consignment)) {
        if (columnMapping[key]) {
          mappedConsignment[columnMapping[key]] = value;
        }
      }
      mappedConsignment.createdAt = new Date(); // Add additional fields if needed
      return mappedConsignment;
    });

    // Process each transformed consignment object
    const consignmentsWith6DigitId = await Promise.all(
      transformedData.map(async (consignment) => {
        const shortId = generate6DigitId();
        const deduction = consignment.codAmount * 0.01; // Assuming codAmount is equivalent to price
        const adjustedPrice = consignment.codAmount - deduction;

        // Update user's pendingBalance for each consignment based on semail
        await User.findOneAndUpdate(
          { email: consignment.semail }, // Assuming semail is in the transformed data
          { $inc: { pendingBalance: adjustedPrice } },
          { new: true }
        );

        return {
          ...consignment,
          _id: shortId,
        };
      })
    );

    // Use insertMany to add all consignments at once
    await Consignment.insertMany(consignmentsWith6DigitId);

    res.status(200).json({ message: 'Consignment data uploaded successfully' });
  } catch (error) {
    console.error('Error processing consignment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


getAllConsignments = async (req, res) => {
  try {
    const { parcel, status, userEmail, role, boyEmail } = req.query;
    console.log("Status filter:", status);
    console.log("UserEmail filter:", userEmail);
    console.log("UserRole filter:", role);
    console.log("BoyEmail filter:", boyEmail);

    // Initialize query object
    const query = {};

      // Apply partial match if parcelId is provided
    // if (parcel) {
    //   query.status = { $regex: parcel, $options: "i" }; // Case-insensitive match
    // }
 
    if (parcel) {
      query.$or = [
        { _id: parcel }, // Exact match for ID
        { _id: { $regex: parcel, $options: "i" } },
        {status: parcel},
        {status: { $regex: parcel, $options: "i" }},
        {sname: parcel},
        {sname: { $regex: parcel, $options: "i" }},
        {sphone: parcel},
        {sphone: { $regex: parcel, $options: "i" }},
        {sdistrict: parcel},
        {sdistrict: { $regex: parcel, $options: "i" }},
        {semail: parcel},
        {semail: { $regex: parcel, $options: "i" }},
        {saddress: parcel},
        {saddress: { $regex: parcel, $options: "i" }},
        {rname: parcel},
        {rname: { $regex: parcel, $options: "i" }},
        {rphone: parcel},
        {rphone: { $regex: parcel, $options: "i" }},
        {rdistrict: parcel},
        {rdistrict: { $regex: parcel, $options: "i" }},
        {remail: parcel},
        {remail: { $regex: parcel, $options: "i" }},
        {invoice: parcel},
        {invoice: { $regex: parcel, $options: "i" }},
        {rphone: parcel},
        {rphone: { $regex: parcel, $options: "i" }},
        {rdistrict: parcel},
        {rdistrict: { $regex: parcel, $options: "i" }},
        {raddress: parcel},
        {raddress: { $regex: parcel, $options: "i" }},
        {dtype: parcel},
        {dtype: { $regex: parcel, $options: "i" }},
        {boyEmail: parcel},
        {boyEmail: { $regex: parcel, $options: "i" }}, // Partial match (will work only if `_id` is stored as a string, not ObjectId)
      ];
    }
     else {
    // Apply status filter if provided
    if (status) query.status = status;

    if (role === "Admin") {
      // Admin can view all consignments, no further filtering
    } else if (role === "Delivery Boy") {
      // Delivery Boy should see consignments assigned to them
      query.boyEmail = boyEmail;
      if (!status) query.status = "asigned"; // Default to 'assigned' status if no specific status is provided
    } else if (userEmail) {
      // Regular user should see their own consignments
      query.userEmail = userEmail;
      if (!status) query.status = "asigned"; // Default to 'assigned' status if no specific status is provided
    }
  }

    // Fetch consignments based on the constructed query
    const consignments = await Consignment.find(query);
    console.log("Filtered consignments:", consignments);

    // Return the result
    res.status(200).json(consignments);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Error fetching consignments',
      error: error.message,
    });
  }
};

 


const getConsignmentByEmail = async (req, res) => {
  const userEmail = req.params.email;
  const { parcel } = req.query;

  try {
    // Build the query conditionally
    const query = { userEmail };
    if (parcel) {
      query.$or = [
        { _id: parcel }, // Exact match for ID
        { _id: { $regex: parcel, $options: "i" } },
        {status: parcel},
        {status: { $regex: parcel, $options: "i" }},
        {sname: parcel},
        {sname: { $regex: parcel, $options: "i" }},
        {sphone: parcel},
        {sphone: { $regex: parcel, $options: "i" }},
        {sdistrict: parcel},
        {sdistrict: { $regex: parcel, $options: "i" }},
        {semail: parcel},
        {semail: { $regex: parcel, $options: "i" }},
        {saddress: parcel},
        {saddress: { $regex: parcel, $options: "i" }},
        {rname: parcel},
        {rname: { $regex: parcel, $options: "i" }},
        {rphone: parcel},
        {rphone: { $regex: parcel, $options: "i" }},
        {rdistrict: parcel},
        {rdistrict: { $regex: parcel, $options: "i" }},
        {remail: parcel},
        {remail: { $regex: parcel, $options: "i" }},
        {invoice: parcel},
        {invoice: { $regex: parcel, $options: "i" }},
        {rphone: parcel},
        {rphone: { $regex: parcel, $options: "i" }},
        {rdistrict: parcel},
        {rdistrict: { $regex: parcel, $options: "i" }},
        {raddress: parcel},
        {raddress: { $regex: parcel, $options: "i" }},
        {dtype: parcel},
        {dtype: { $regex: parcel, $options: "i" }},
        {boyEmail: parcel},
        {boyEmail: { $regex: parcel, $options: "i" }}, // Partial match (will work only if `_id` is stored as a string, not ObjectId)
      ];
    }

    // Query the database for consignments based on email and optional parcelId
    const consignments = await Consignment.find(query);
    if (!consignments || consignments.length === 0) {
      return res.status(404).json({ message: 'No consignments found for this email.' });
    }

    res.status(200).json(consignments);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Error fetching consignments',
      error: error.message,
    });
  }
};

  
// get consignment by ID;
getConsignmentById = async (req, res) => {
    try {
        const consignmentId = req.params.id;
        const consignment = await Consignment.findById(consignmentId);

        if (!consignment) {
            return res.status(404).json({
                message: 'Consignment  not found'});
            }
        res.status(200).json(consignment); 
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching consignment',
                error: error.message,
            });
        }
    };

// get consigment by Id 
getConsignmentByNumber = async (req, res) => {
  const  rphone  = req.params.rphone;
  console.log('Received rphone:', rphone);
  
  try {
    const consignments = await Consignment.findOne({ rphone: rphone });
      if (consignments ) {
          console.log('Receiver data found:', consignments );
          res.json(consignments );
      } else {
          console.log('Receiver not found');
          res.status(404).json({ message: 'Receiver not found' });
      }
  } catch (error) {
      console.error('Error fetching receiver data:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


//  consignment update by ID
updateConsignment = async (req, res) => {
  const consignmentId = req.params.id;
  const updates = req.body;
  try {
      // Fetch the current consignment by ID
      const consignment = await Consignment.findById(consignmentId);

      if (!consignment) {
          return res.status(404).json({ message: 'Consignment not found.' });
      }

      // Check if the current status is 'in review' and update it to 'pending'
      if (consignment.status === 'in review') {
          updates.status = 'pending';
      }

      // Update the consignment with the new values
      const updatedConsignment = await Consignment.findByIdAndUpdate(
          consignmentId,
          updates,
          {
              new: true,
              runValidators: true,
              context: 'query'
          }
      );

      res.status(200).json({
          message: 'Consignment updated successfully.',
          consignment: updatedConsignment
      });
  } catch (error) {
      console.error('Error updating consignment:', error);

      // Handle invalid ObjectId error
      if (error.kind === 'ObjectId') {
          return res.status(400).json({ message: 'Invalid consignment ID.' });
      }

      // Handle validation errors
      if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(val => val.message);
          return res.status(400).json({ message: 'Validation Error.', errors: messages });
      }

      // Generic server error
      res.status(500).json({ message: 'Server Error. Unable to update consignment.' });
  }
};

// updateConsignment = async (req, res) => {
//     const consignmentId = req.params.id;
//     const updates = req.body;
//     try {
//         const consignment = await Consignment.findByIdAndUpdate(consignmentId, updates,    
//           {
//           status: 'pending'
//         },
//            {
//             new: true,
//             runValidators: true,
//             context: 'query'
//         });
//         if (!consignment) {
//             return res.status(404).json({message: 'Consign not found.'});

//         }
//         res.status(200).json({
//             message: 'Consignment updated successfully.',consignment
//         });
      

         
//     } catch (error) {
//         console.error('Error updating consignment:', error);
//         // invalid objectError
//         if (error.kind === 'ObjectId') {
//             return res.status(400).json({ message: 'Invalid consignment ID.' });
//           }
      
//           // Handle validation errors
//           if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(val => val.message);
//             return res.status(400).json({ message: 'Validation Error.', errors: messages });
//           }
      
//           // Generic server error
//           res.status(500).json({ message: 'Server Error. Unable to update consignment.' });
//         }
//       };

deleteConsignment = async (req, res)=> {
    const { id } = req.params;

    try {
        const deletedConsignment = await Consignment.findByIdAndDelete(id);
        if ( !deletedConsignment) {
            return res.status(404).json({ message: 'Consignment not found'});

        }
        res.status(200).json({ message: 'Consignment deleted successfully'});

    } catch (error) {
        console.error('Error deleting consignment:', error);
        // Handle Invalid objectId error
        if (error.kind === 'objectId') {
            return res.status(400).json({ message: 'Invalid consignment ID'});
        }
        // Genaric server error
        res.status(500).json({ message: 'Server Error. Unable to delete'})
    }
};

approveConsignment = async (req, res) => {
  try {
    const approvalDate = new Date();
    const pickupDate = new Date(approvalDate);
    pickupDate.setDate(approvalDate.getDate() + 3);

    const deliveryDate = new Date(pickupDate);
    deliveryDate.setDate(pickupDate.getDate() + 2);

    const updatedParcel = await Consignment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        approvalDate,     // Set approvalDate
        pickupDate,       // Set pickupDate to approvalDate + 3 days
        deliveryDate      // Set deliveryDate to pickupDate + 2 days
      },
      { new: true }
    );

    res.json(updatedParcel);
  } catch (error) {
    console.error('Error approving parcel:', error);
    res.status(500).json({ message: 'Error approving parcel' });
  }
};

  rejectConsignment = async (req, res) => {
    try {
        const parcel = await Consignment.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
        res.json(parcel);
      } catch (error) {
        res.status(500).json({ message: 'Error rejected parcel' });
      }
    };

    // Asign-job for Delivery boy 
    asignConsignment = async (req, res) => {
      try {
        const { boyEmail } = req.body; // Get boyEmail from the request body
    
        const parcel = await Consignment.findByIdAndUpdate(
          req.params.id,
          { 
            status: 'asigned', 
            boyEmail: boyEmail // Update the parcel with the user's email
          },
          { new: true }
        );
    
        res.json(parcel);
      } catch (error) {
        res.status(500).json({ message: 'Error assigning parcel' });
      }
    };
    // pickedup parcel by delivery boy
    pickupConsignment = async (req, res) => {
      try {
        const { boyEmail } = req.body; // Get boyEmail from the request body
    
        const parcel = await Consignment.findByIdAndUpdate(
          req.params.id,
          { 
            status: 'pickedup', 
            boyEmail: boyEmail // Update the parcel with the user's email
          },
          { new: true }
        );
        // ......
        const deliveryBoy = await User.findOne({ email: boyEmail, role: 'Delivery Boy' });
        if (!deliveryBoy) {
          return res.status(404).json({ message: 'Delivery Boy account not found' });
        }

        deliveryBoy.pendingBalance += parcel.codAmount;
        await deliveryBoy.save();
        
        res.json(parcel);
      } catch (error) {
        res.status(500).json({ message: 'Error assigning parcel' });
      }
    };
    
    //  delevered consignment 
    // deleveredConsignment = async (req, res) => {
    //   try {
    //     const { boyEmail } = req.body; // Get boyEmail from the request body
    //     const parcel = await Consignment.findByIdAndUpdate(
    //       req.params.id,
    //       {
    //         status:"delevered",
    //         boyEmail: boyEmail // Update the parcel with the user's email
    //       },
    //       { new: true }
    //     );
    //     res.json(parcel);
    //   } catch (error) {
    //     res.status(500).json({ message: 'Error deleviring parcel'});
    //   }
    // };
   

// Delivered consignment
const deliveredConsignment = async (req, res) => {
  try {
    const { boyEmail } = req.body;

    if (!boyEmail) {
      return res.status(400).json({ message: 'Delivery boy email is required' });
    }

    const parcel = await Consignment.findByIdAndUpdate(
      req.params.id,
      { status: "delivered", boyEmail },
      { new: true }
    );

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    const deliveryBoy = await User.findOne({ email: boyEmail, role: 'Delivery Boy' });
    if (!deliveryBoy) {
      return res.status(404).json({ message: 'Delivery Boy account not found' });
    }
    deliveryBoy.pendingBalance -=parcel.codAmount;
    deliveryBoy.balance += parcel.codAmount;
    await deliveryBoy.save();


     // .......admin......
     const admin = await User.findOne({ role: 'Admin' });
     if (!admin) {
       return res.status(404).json({ message: 'Admin account not found' });
     }
 
     admin.pendingBalance += parcel.codAmount;
     await admin.save();
     

    res.json({
      message: 'Parcel delivered and COD amount added to account',
      parcel,
      deliveryBoy,
      admin
    });
  } catch (error) {
    console.error('Error delivering parcel:', error);
    res.status(500).json({ message: 'An error occurred while delivering the parcel' });
  }
};

// payment transfer to ADMIN

// payAdminConsignment = async (req, res) => {
//   try {
//     const { boyEmail } = req.body; // Get boyEmail from the request body

//     const parcel = await Consignment.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status: 'deposited', 
//         boyEmail: boyEmail 
//       },
//       { new: true }
//     );

//     // .......boy........
//     const deliveryBoy = await User.findOne({ email: boyEmail, role: 'Delivery Boy' });
//     if (!deliveryBoy) {
//       return res.status(404).json({ message: 'Delivery Boy account not found' });
//     }
//     deliveryBoy.balance -= parcel.codAmount;
//     await deliveryBoy.save();
//     // .......admin......
//     const admin = await User.findOne({ role: 'Admin' });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin account not found' });
//     }
//     admin.pendingBalance -= parcel.codAmount;
//     admin.balance += parcel.codAmount;
//     await admin.save();
    
//     res.json(parcel,
//       deliveryBoy,
//       admin
//     );
//   } catch (error) {
//     res.status(500).json({ message: 'Error  adding balance'});
//   }
// };

// Remark part
// Backend (Controller)
const addRemark = async (req, res) => {
  try {
    const { id } = req.params; // Get consignment ID from route parameters
    const { remark } = req.body; // Get remark from request body

    // Find the consignment by ID and update its remark
    const updatedConsignment = await Consignment.findByIdAndUpdate(
      id,
      { remark },
      { new: true } // Return the updated document
    );

    if (!updatedConsignment) {
      return res.status(404).json({ error: 'Consignment not found' });
    }

    res.status(200).json({ consignment: updatedConsignment });
  } catch (error) {
    console.error('Error updating remark:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ............ummey dog
// payAdminConsignment = async (req, res) => {
//   try {
//     const { boyEmail } = req.body; // Get boyEmail from the request body

//     // Update parcel status to deposited and assign boyEmail
//     const parcel = await Consignment.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status: 'deposited', 
//         boyEmail: boyEmail 
//       },
//       { new: true }
//     );

//     if (!parcel) {
//       return res.status(404).json({ message: 'Parcel not found' });
//     }

//     // Update Delivery Boy's balance
//     const deliveryBoy = await User.findOne({ email: boyEmail, role: 'Delivery Boy' });
//     if (!deliveryBoy) {
//       return res.status(404).json({ message: 'Delivery Boy account not found' });
//     }
//     deliveryBoy.balance -= parcel.codAmount;
//     await deliveryBoy.save();

//     // Update Admin's balance
//     const admin = await User.findOne({ role: 'Admin' });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin account not found' });
//     }
//     admin.pendingBalance -= parcel.codAmount;
//     admin.balance += parcel.codAmount;
//     await admin.save();

//     // Calculate sum of deposited prices for the sender and update `sumDeposite`
//     const senderEmail = parcel.semail;
//     const totalDepositedPrice = await Consignment.aggregate([
//       { $match: { semail: senderEmail, status: 'deposited' } }, // Filter by sender email and deposited status
//       { $group: { _id: "$semail", totalDepositedPrice: { $sum: "$price" } } } // Sum prices by sender email
//     ]);

//     if (totalDepositedPrice.length > 0) {
//       await User.updateOne(
//         { email: senderEmail },
//         { $set: { sumDeposite: totalDepositedPrice[0].totalDepositedPrice } }
//       );
//     }

//     res.json({
//       parcel,
//       deliveryBoy,
//       admin,
//       message: 'Consignment updated and balances adjusted successfully'
//     });
//   } catch (error) {
//     console.error("Error updating consignment and balances:", error);
//     res.status(500).json({ message: 'Error adding balance' });
//   }
// };
payAdminConsignment = async (req, res) => {
  try {
    const { boyEmail } = req.body;

    // Update parcel status to deposited and assign boyEmail
    const parcel = await Consignment.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'deposited', 
        boyEmail: boyEmail 
      },
      { new: true }
    );

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Update Delivery Boy's balance
    const deliveryBoy = await User.findOne({ email: boyEmail, role: 'Delivery Boy' });
    if (!deliveryBoy) {
      return res.status(404).json({ message: 'Delivery Boy account not found' });
    }
    deliveryBoy.balance -= parcel.codAmount;
    await deliveryBoy.save();

    // Update Admin's balance
    const admin = await User.findOne({ role: 'Admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }
    admin.pendingBalance -= parcel.codAmount;
    admin.balance += parcel.codAmount;
    await admin.save();

    // Calculate sum of deposited prices for the sender and subtract 1% to update `sumDeposite`
    const senderEmail = parcel.semail;

    try {
      const totalDepositedPrice = await Consignment.aggregate([
        { $match: { semail: senderEmail, status: 'deposited' } },
        { $group: { _id: "$semail", totalDepositedPrice: { $sum: "$price" } } }
      ]);
    
      if (totalDepositedPrice.length > 0) {
        // Calculate 1% deduction and update balance after deduction
        const totalPrice = totalDepositedPrice[0].totalDepositedPrice;
        const deduction = totalPrice * 0.01;
        const updatedBalance = totalPrice - deduction;
    
        // Update the User's sumDeposite field with the updated balance
        const updateResult = await User.updateOne(
          { email: senderEmail },
          { $set: { sumDeposite: updatedBalance } }
        );
    
        if (updateResult.nModified > 0) {
          console.log("sumDeposite updated successfully.");
        } else {
          console.log("No changes made. Check if the user exists.");
        }
      } else {
        console.log("No deposited consignments found for this sender.");
      }
    } catch (error) {
      console.error("Error updating sumDeposite:", error);
    }
    
    res.json({
      parcel,
      deliveryBoy,
      admin,
      message: 'Consignment updated and balances adjusted successfully'
    });
  } catch (error) {
    console.error("Error updating consignment and balances:", error);
    res.status(500).json({ message: 'Error adding balance' });
  }
};



// partial delivered work system
const partialDelivered = async (req, res) => {
  try {
    const { parcelId } = req.params;
    const { partialPrice, boyEmail } = req.body;

    if (!partialPrice || partialPrice <= 0) {
      return res.status(400).json({ error: 'Invalid partial price.' });
    }

    // Find the parcel and update its details
    const parcel = await Consignment.findById(parcelId);

    if (!parcel) {
      return res.status(404).json({ error: 'Parcel not found.' });
    }

    if (parcel.codAmount < partialPrice) {
      return res.status(400).json({ error: 'Partial price exceeds COD amount.' });
    }

    const oldCodAmount = parcel.codAmount;

    // Update parcel details
    parcel.codAmount -= partialPrice;
    parcel.price -= partialPrice;
    parcel.status = 'partial-delivered';
    parcel.boyEmail = boyEmail;
    await parcel.save();

    // Update Delivery Boy's account
    const deliveryBoy = await User.findOne({ email: boyEmail, role: 'Delivery Boy' });
    if (!deliveryBoy) {
      return res.status(404).json({ error: 'Delivery Boy account not found.' });
    }

    deliveryBoy.pendingBalance -= oldCodAmount;
    deliveryBoy.balance += parcel.codAmount;
    await deliveryBoy.save();

    // Update Admin's account
    const admin = await User.findOne({ role: 'Admin' });
    if (!admin) {
      return res.status(404).json({ error: 'Admin account not found.' });
    }

    admin.pendingBalance += parcel.codAmount;
    await admin.save();

    res.status(200).json({
      parcel,
      deliveryBoy,
      admin,
      message: 'Parcel updated successfully.',
    });
  } catch (error) {
    console.error('Error updating parcel:', error);
    res.status(500).json({ error: 'Failed to update parcel.' });
  }
};

// Delivery Boy info.

const totalDeliveredByBoy = async (req, res) => {
  try {
      // const { boyEmail } = req.query;
      const { email: boyEmail } = req.params;

      console.log('Boy Email:', boyEmail); // Debugging

      if (!boyEmail) {
          return res.status(400).json({ success: false, message: 'Boy email is required' });
      }

      // Count parcels delivered by the delivery boy
      const totalDelivered = await Consignment.countDocuments({
          boyEmail,
          status: 'delivered',
      });

      // Update the User table with the totalDelivered count
      const updateResult = await User.updateOne(
          { email: boyEmail },
          { $set: { totalDelivered } }
      );

      console.log('Updated User:', updateResult);

      // Send the count to the front-end
      res.status(200).json({ success: true, totalDelivered });
  } catch (error) {
      console.error('Error in totalDeliveredByBoy:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Assigned total by delivery Boy
const totalAsignedByBoy = async (req, res) => {
  try {
    // const { boyEmail } = req.query;
    const { email: boyEmail } = req.params;

    console.log('Boy Email:', boyEmail); // Debugging

    if (!boyEmail) {
        return res.status(400).json({ success: false, message: 'Boy email is required' });
    }

    // Count parcels delivered by the delivery boy
    const totalAsigned = await Consignment.countDocuments({
        boyEmail,
        status: 'asigned',
    });

    // Update the User table with the totalDelivered count
    const updateResult = await User.updateOne(
        { email: boyEmail },
        { $set: { totalAsigned } }
    );

    console.log('Updated User:', updateResult);

    // Send the count to the front-end
    res.status(200).json({ success: true, totalAsigned });
} catch (error) {
    console.error('Error in totalAsignedByBoy:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
}
};


// ..............Asign Rider for parcel
// Update consignment status and delivery boy
const assignRider = async (req, res) => {
  const { consignmentId, riderId } = req.body;

  try {
    // Find the rider by ID to get their email
    const rider = await User.findById(riderId);
    if (!rider) {
      return res.status(404).json({ message: 'Delivery Boy not found.' });
    }

    // Update the consignment
    const consignment = await Consignment.findByIdAndUpdate(
      consignmentId,
      {
        status: 'asigned', // Update status to "Assigned"
        boyEmail: rider.email, // Assign delivery boy's email
      },
      { new: true } // Return the updated document
    );

    if (!consignment) {
      return res.status(404).json({ message: 'Consignment not found.' });
    }

    res.status(200).json({ message: 'Consignment updated successfully.', consignment });
  } catch (error) {
    console.error('Error updating consignment:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// Express Delivery 
expressDelivery = async (req, res) => {
  try {
      const updatedDeliveryStatus = await Consignment.findByIdAndUpdate(
      req.params.id,
      {
        deliveryStatus: 'express',
      },
      { new: true }
    );
    res.json(updatedDeliveryStatus);
  } catch (error) {
    console.error('Error express Delivery for parcel:', error);
    res.status(500).json({ message: 'Error express Delivery for parcel' });
  }
};

// Regular Delivery
regularDelivery = async (req, res) => {
  try{
      const updatedDeliveryStatus = await Consignment.findByIdAndUpdate(
        req.params.id,
        {
          deliveryStatus: "regular",
        },
        {new: true},

      );
      res.json(updatedDeliveryStatus);
    } catch (error) {
      console.error('Error regular Delivery for parcel:', error);
      res.status(500).json({ message: 'Error regular Delivery for parcel' });
    }
};






  
  
module.exports = {
    addConsignment,
    getAllConsignments,
    getConsignmentById,
    updateConsignment,
    deleteConsignment,
    approveConsignment,
    rejectConsignment,
    asignConsignment,
    getConsignmentByEmail,
    pickupConsignment,
    getConsignmentByNumber,
    deliveredConsignment, 
    payAdminConsignment, 
    addRemark,
    partialDelivered,
    totalDeliveredByBoy,
    totalAsignedByBoy,
    assignRider,
    excelDownload,
    expressDelivery,
    regularDelivery 

  };