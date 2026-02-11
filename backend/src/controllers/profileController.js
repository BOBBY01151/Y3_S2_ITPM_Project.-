const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');

// @desc    Get current student profile
// @route   GET /api/profile/me
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'role', 'campus', 'department']);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error('[ERROR] getProfile:', err);
        res.status(500).json({ message: 'Server Error' });
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
        skills,
        campus
    } = req.body;

    console.log('[DEBUG] createOrUpdateProfile called. Body:', JSON.stringify(req.body, null, 2));
    console.log('[DEBUG] req.file:', req.file);
    console.log('[DEBUG] req.user.id:', req.user.id);

    let profilePhoto = req.body.profilePhoto;
    if (req.file) {
        console.log('[DEBUG] File received by profileController:', req.file);
        // When using multer-storage-cloudinary, req.file.path contains the Cloudinary URL
        profilePhoto = req.file.path;
        console.log('[DEBUG] Cloudinary URL to be saved:', profilePhoto);
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
        campus,
        skills: skills ? (Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim())) : []
    };

    try {
        // Find the user to ensure they are a student
        const user = await User.findById(req.user.id);
        console.log('[DEBUG] User found for profile update:', user ? `${user.name} (Role: ${user.role})` : 'User not found');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'student') {
            return res.status(403).json({ message: `Only students can have a student profile. Your current role is: ${user.role}` });
        }

        let profile = await StudentProfile.findOne({ user: req.user.id });

        if (profile) {
            console.log('[DEBUG] Updating existing profile for user:', req.user.id);
            // Update
            profile = await StudentProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, runValidators: true }
            );
            console.log('[DEBUG] Profile updated successfully. Result ID:', profile._id);

            // Update User model fields as well for consistency
            console.log('[DEBUG] Syncing to User model...');
            await User.findByIdAndUpdate(req.user.id, {
                $set: {
                    campus: profile.campus,
                    department: profile.faculty
                }
            });

            // Population after update
            const populatedProfile = await StudentProfile.findById(profile._id).populate('user', ['name', 'email', 'role', 'campus', 'department']);
            return res.json(populatedProfile);
        }

        // Create
        console.log('[DEBUG] Creating new profile for user:', req.user.id);
        profile = new StudentProfile(profileFields);
        await profile.save();
        console.log('[DEBUG] Profile created successfully. Result ID:', profile._id);

        // Update User model fields as well for consistency
        console.log('[DEBUG] Syncing to User model (new profile)...');
        await User.findByIdAndUpdate(req.user.id, {
            $set: {
                campus: profile.campus,
                department: profile.faculty
            }
        });

        // Population after create
        const populatedProfile = await StudentProfile.findById(profile._id).populate('user', ['name', 'email', 'role', 'campus', 'department']);
        res.json(populatedProfile);
    } catch (err) {
        console.error('[ERROR] createOrUpdateProfile:', err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: err.message || 'Server Error' });
    }
};
