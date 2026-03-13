const express = require('express');
const router = express.Router();
const { requestWithdrawal, getAllWithdrawals, updateWithdrawalStatus } = require('../controllers/withdrawalController');

router.post('/request', requestWithdrawal);
router.get('/admin/all', getAllWithdrawals); // New route
router.put('/admin/:id', updateWithdrawalStatus); // New route

module.exports = router;