const express = require('express');
const router = express.Router();
const { getStorageUsage } = require('../controllers/storageController');
const { protect } = require('../middleware/auth');

// Get current user's storage usage
router.get('/usage', protect, getStorageUsage);

module.exports = router;
