const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { name, email, password, role, department, campus } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Security check: Prevent self-registration as admin or superadmin
        if (['admin', 'superadmin'].includes(role)) {
            return res.status(403).json({ message: 'Administrative roles cannot be self-registered.' });
        }

        const status = 'pending'; // All new web registrations are pending approval

        user = new User({
            name,
            email,
            password,
            role,
            department,
            campus,
            status
        });

        await user.save();

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            message: status === 'pending' ? 'Registration successful. Waiting for admin approval.' : 'Registration successful.'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(`[DEBUG] Login attempt for email: ${email}`);


    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: req.t('auth.invalid_credentials') });
        }

        // Check user status
        if (user.status === 'pending') {
            return res.status(401).json({ message: 'Your account is pending approval by an admin.' });
        }

        if (user.status === 'rejected') {
            return res.status(401).json({ message: 'Your registration request has been rejected.' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: req.t('auth.invalid_credentials') });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                campus: user.campus,
                status: user.status
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
