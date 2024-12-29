const express = require('express');
const { parcelPrice } = require('../controllers/parcelpriceController');
const router = express.Router();

router.post('/cal-price', parcelPrice);

module.exports = router;