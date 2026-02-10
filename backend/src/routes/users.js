const express = require('express');
const router = express.Router();
const { getPendingUsers, updateUserStatus, updateAccountDetails, changePassword } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Routes for authenticated users (any role)
router.put('/me', protect, updateAccountDetails);
router.put('/me/password', protect, changePassword);

// Routes restricted to superadmin
router.use(protect);
router.use(authorize('superadmin'));

router.get('/pending', getPendingUsers);
router.put('/:id/status', updateUserStatus);

module.exports = router;
