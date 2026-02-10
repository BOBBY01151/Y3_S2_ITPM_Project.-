const StudyMaterial = require('../models/StudyMaterial');

// @desc    Upload material
// @route   POST /api/materials
// @access  Private (Student/Lecturer)
exports.uploadMaterial = async (req, res) => {
    try {
        const { title, description, fileUrl, subject, tags, language } = req.body;

        const material = new StudyMaterial({
            title,
            description,
            fileUrl,
            uploader: req.user.id,
            subject,
            tags,
            language
        });

        await material.save();
        res.status(201).json(material);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get all materials
// @route   GET /api/materials
// @access  Public
exports.getMaterials = async (req, res) => {
    try {
        const materials = await StudyMaterial.find().populate('uploader', 'name');
        res.json(materials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
