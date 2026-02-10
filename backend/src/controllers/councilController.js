const Council = require('../models/Council');

// @desc    Get all councils
// @route   GET /api/councils
// @access  Public
exports.getCouncils = async (req, res) => {
    try {
        const councils = await Council.find();
        res.json(councils);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create council
// @route   POST /api/councils
// @access  Private (Admin)
exports.createCouncil = async (req, res) => {
    try {
        const council = new Council(req.body);
        await council.save();
        res.status(201).json(council);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
