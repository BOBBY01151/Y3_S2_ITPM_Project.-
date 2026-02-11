const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProfile, createOrUpdateProfile } = require('../controllers/profileController');

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, getProfile);

const upload = require('../middleware/upload');

// @route   POST /api/profile
// @desc    Create or update user's profile
// @access  Private
router.post('/', protect, upload.single('profilePhoto'), createOrUpdateProfile);

module.exports = router;
