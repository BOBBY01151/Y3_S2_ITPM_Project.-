const express = require('express');
const router = express.Router();
const { uploadMaterial, getMaterials } = require('../controllers/materialController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.get('/', getMaterials);
router.post('/', protect, authorize('student', 'lecturer', 'admin'), uploadMaterial);

module.exports = router;
