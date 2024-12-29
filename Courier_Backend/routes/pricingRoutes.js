const express = require('express');
const { addPrice, setPrice, getPricing, addPricing } = require('../controllers/pricingController')
const router = express.Router();

router.post('/pricing-cal', addPrice);
router.post('/pricing-set', setPrice);
router.get('/pricing-set', getPricing);
router.post('/all/pricing-set', addPricing);


module.exports = router;

