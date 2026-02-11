const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');

// @desc    Get current student profile
// @route   GET /api/profile/me
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'role']);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create or update student profile
// @route   POST /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
    const {
        faculty,
        year,
        gender,
        degreeProgramme,
        phoneNumber,
        semester,
        skills
    } = req.body;

    let profilePhoto = req.body.profilePhoto;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        profilePhoto = url + '/uploads/' + req.file.filename;
    }

    // Build profile object
    const profileFields = {
        user: req.user.id,
        faculty,
        year,
        gender,
        profilePhoto,
        degreeProgramme,
        phoneNumber,
        semester,
        skills: skills ? (Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim())) : []
    };

    try {
        // Find the user to ensure they are a student
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can have a student profile' });
        }

        let profile = await StudentProfile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await StudentProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new StudentProfile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
