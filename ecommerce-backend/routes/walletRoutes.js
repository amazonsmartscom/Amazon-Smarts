// routes/walletRoutes.js
const express = require('express');
const router = express.Router();
const { getWalletDetails } = require('../controllers/walletController');

router.get('/:userId', getWalletDetails);

module.exports = router;