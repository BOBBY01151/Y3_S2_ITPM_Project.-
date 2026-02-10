const express = require('express');
const router = express.Router();
const { getPendingUsers, updateUserStatus } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes here are protected and restricted to superadmin
router.use(protect);
router.use(authorize('superadmin'));

router.get('/pending', getPendingUsers);
router.put('/:id/status', updateUserStatus);

module.exports = router;
