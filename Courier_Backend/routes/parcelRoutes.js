const express = require('express');
const { addParcel, getAllParcels, getParcelById, getParcelByUserEmail } = require('../controllers/parcelController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Add a new parcel
router.post('/parcels', protect, addParcel);

// Get all parcels (optional)
router.get('/parcels', getAllParcels);
router.get('/parcels/:id', getParcelById);
router.get('/parcels/by-email/:email', getParcelByUserEmail); 

module.exports = router;
 
 



 
