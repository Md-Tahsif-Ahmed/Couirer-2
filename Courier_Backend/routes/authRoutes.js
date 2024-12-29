// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// রেজিস্ট্রেশন রাউট
router.post('/register', registerUser);

// লগইন রাউট
router.post('/login', loginUser);

module.exports = router;
