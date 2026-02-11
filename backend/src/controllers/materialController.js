const StudyMaterial = require('../models/StudyMaterial');

// @desc    Upload material
// @route   POST /api/materials
// @access  Private (Student/Lecturer)
exports.uploadMaterial = async (req, res) => {
    try {
        const { title, description, subject, tags, language, faculty, graduateYear, degreeProgram } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        const material = new StudyMaterial({
            title,
            description,
            fileUrl: req.file.path, // URL from Cloudinary via multer-storage-cloudinary
            uploader: req.user.id,
            subject,
            tags,
            language,
            faculty,
            graduateYear,
            degreeProgram
        });

        await material.save();
        res.status(201).json(material);
    } catch (err) {
        console.error('[UPLOAD ERROR]', err);
        res.status(500).json({
            message: 'Server error',
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// @desc    Get all materials
// @route   GET /api/materials
// @access  Public
exports.getMaterials = async (req, res) => {
    try {
        const { faculty, graduateYear, degreeProgram, search } = req.query;
        let query = {};

        if (faculty) query.faculty = faculty;
        if (graduateYear) query.graduateYear = graduateYear;
        if (degreeProgram) query.degreeProgram = degreeProgram;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } }
            ];
        }

        const materials = await StudyMaterial.find(query).populate('uploader', 'name');
        res.json(materials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
