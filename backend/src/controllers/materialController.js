const StudyMaterial = require('../models/StudyMaterial');

// @desc    Upload material
// @route   POST /api/materials
// @access  Private (Student/Lecturer)
exports.uploadMaterial = async (req, res) => {
    try {
        const { title, description, subject, tags, language, faculty, graduateYear, degreeProgram, externalLink } = req.body;

        // Validate that either file or external link is provided
        if (!req.file && !externalLink) {
            return res.status(400).json({ message: 'Please upload a file or provide an external link' });
        }

        // Validate external link format if provided
        if (externalLink) {
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/;
            if (!urlPattern.test(externalLink)) {
                return res.status(400).json({ message: 'Please provide a valid URL for the external link' });
            }
        }

        const materialData = {
            title,
            description,
            uploader: req.user._id,
            subject,
            tags,
            language,
            faculty,
            graduateYear,
            degreeProgram
        };

        // Add file data if file was uploaded
        if (req.file) {
            materialData.fileUrl = req.file.path; // URL from Cloudinary
            materialData.fileSize = req.file.size; // Size in bytes
        }

        // Add external link if provided
        if (externalLink) {
            materialData.externalLink = externalLink;
        }

        const material = new StudyMaterial(materialData);

        await material.save();

        // Populate uploader name before sending response
        await material.populate('uploader', 'name');

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

// @desc    Update material
// @route   PUT /api/materials/:id
// @access  Private (Uploader/Admin)
exports.updateMaterial = async (req, res) => {
    try {
        let material = await StudyMaterial.findById(req.params.id);

        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }

        // Make sure user is uploader or admin
        if (material.uploader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { title, description, subject, tags, language, faculty, graduateYear, degreeProgram, externalLink } = req.body;

        material = await StudyMaterial.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title,
                    description,
                    subject,
                    tags,
                    language,
                    faculty,
                    graduateYear,
                    faculty,
                    graduateYear,
                    degreeProgram,
                    externalLink
                }
            },
            { new: true }
        ).populate('uploader', 'name');

        res.json(material);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(500).send('Server error');
    }
};

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private (Uploader/Admin)
exports.deleteMaterial = async (req, res) => {
    try {
        const material = await StudyMaterial.findById(req.params.id);

        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }

        // Make sure user is uploader or admin
        if (material.uploader.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await material.deleteOne();

        res.json({ message: 'Material removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(500).send('Server error');
    }
};
