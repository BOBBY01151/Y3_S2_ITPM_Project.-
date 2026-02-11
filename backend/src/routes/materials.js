const express = require('express');
const router = express.Router();
const { uploadMaterial, getMaterials } = require('../controllers/materialController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const materialUpload = require('../middleware/materialUpload');

router.get('/', getMaterials);
router.post('/', protect, authorize('student', 'lecturer', 'admin'), materialUpload.single('file'), uploadMaterial);

module.exports = router;
