const express = require('express');
const router = express.Router();
const multer = require('multer');
const { calculateEmi, processKyc, forecloseLoan } = require('../controllers/emiController');

// Store in memory so we can check exact file sizes before saving/sending to AI
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // Absolute max 15MB to prevent crashes
});

router.post('/calculate', calculateEmi);
router.post('/kyc', upload.fields([
  { name: 'selfie', maxCount: 1 }, { name: 'panCard', maxCount: 1 },
  { name: 'idFront', maxCount: 1 }, { name: 'idBack', maxCount: 1 }
]), processKyc);
router.put('/admin/:id/foreclose', forecloseLoan);

module.exports = router;