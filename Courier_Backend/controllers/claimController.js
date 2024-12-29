const Claim = require('../models/Claim');
const User = require('../models/User'); 
function generate6DigitId() {
    // Take the current timestamp in seconds, then take the last 6 digits
    const timestamp = Math.floor(Date.now() / 1000);
    const randomPart = Math.floor(Math.random() * 1000); // Generate a random number up to 999
    const uniqueId = (timestamp + randomPart) % 1000000; // Ensure it's a 6-digit number
    return uniqueId.toString().padStart(6, '0'); // Pad with leading zeros if needed
  }

  exports.addClaim = async (req, res) => {
    try {
      const {
        claimAmount,
        userEmail,
      } = req.body;
      // Generate the 6-digit numeric ID
    const shortId = generate6DigitId();
    const newClaim = new Claim({
        _id: shortId,
        claimAmount,
        userEmail
    });
     // Save the Claim
     const savedClaim = await newClaim.save();

     res.status(201).json({ Claim: savedClaim });
    } catch (error) {
      console.error('Error adding claim:', error);
      res.status(500).json({ message: 'Server error while adding claim.', error: error.message });
    }
  };

  // Fetch all claims for a user
  exports.getClaimsByUserEmail = async (req, res) => {
    try {
      const { status } = req.query; // Extract status from query parameters
      const { email } = req.params;
  
      // Build the query object
      const query = { userEmail: email };
      if (status) {
        query.status = status; // Add status to the query if provided
      }
  
      // Fetch claims based on the query
      const claims = await Claim.find(query);
  
      res.status(200).json({ claims });
    } catch (error) {
      console.error('Error fetching claims:', error);
      res.status(500).json({ message: 'Server error while fetching claims.', error: error.message });
    }
  };
  

exports.getClaims = async (req, res) => {
    try {
        const { status, userEmail, role } = req.query;
        console.log("Status filter:", status);
        console.log("UserEmail filter:", userEmail);
        console.log("UserRole filter:", role);
   
        const query = {};
        if (status) query.status = status;
        if (role === "Admin") {
            // Admin can view all consignments, no further filtering
          }  else if (userEmail) {
            // Regular user should see their own consignments
            query.userEmail = userEmail;
           
          }

        const claims = await Claim.find(query);
        res.status(200).json(claims);
      } catch (error) {
        res.status(500).json({
          message: 'Error fetching claims',
          error: error.message,
        });
      }
}
 

exports.approveClaim = async (req, res) => {
  try {
    // Find the claim by ID
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Find the user associated with the claim email
    const user = await User.findOne({ email: claim.userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has enough balance
    if (user.balance < claim.claimAmount) {
      return res.status(400).json({ message: 'Insufficient balance for approval' });
    }

    // Update user's balance
    user.balance -= claim.claimAmount;
    await user.save();

    // Approve the claim
    claim.status = 'approved';
    const updatedClaim = await claim.save();

    res.json({
      message: 'Claim approved successfully',
      claim: updatedClaim,
      userBalance: user.balance,
    });
  } catch (error) {
    console.error('Error approving Claim:', error);
    res.status(500).json({ message: 'Error approving Claim', error: error.message });
  }
};

  
exports.rejectClaim = async (req, res) => {
    try {
        const Claim = await Claim.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        res.json(Claim);
    } catch (error) {
        res.status(500).json({ message: 'Error rejected Claim' });
    }
    };