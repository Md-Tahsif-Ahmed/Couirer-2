const express = require('express');
const { addClaim, getClaimsByUserEmail, getClaims, approveClaim, rejectClaim } = require('../controllers/claimController');
const router = express.Router();

router.post('/claim', addClaim); // For adding a claim
router.get('/claim/:email', getClaimsByUserEmail); // For fetching claims by email
router.get('/claim', getClaims); 
router.patch('/claim/:id/approve', approveClaim);
router.patch('/claim/:id/reject', rejectClaim);
module.exports = router;
