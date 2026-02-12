const express = require('express');
const router = express.Router();
const { uploadMaterial, getMaterials, updateMaterial, deleteMaterial } = require('../controllers/materialController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const materialUpload = require('../middleware/materialUpload');

router.get('/', getMaterials);
router.post('/', protect, authorize('student', 'lecturer', 'admin'), (req, res, next) => {
    materialUpload.single('file')(req, res, (err) => {
        if (err) {
            console.error('[MULTER ERROR]', err);
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }
        next();
    });
}, uploadMaterial);
router.put('/:id', protect, authorize('student', 'lecturer', 'admin'), updateMaterial);
router.delete('/:id', protect, authorize('student', 'lecturer', 'admin'), deleteMaterial);

module.exports = router;
