const User = require('../models/User');

// @desc    Get all pending user registrations
// @route   GET /api/users/pending
// @access  Private/SuperAdmin
exports.getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ status: 'pending' }).select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Update user status (approve/reject)
// @route   PUT /api/users/:id/status
// @access  Private/SuperAdmin
exports.updateUserStatus = async (req, res) => {
    const { status } = req.body;

    if (!['active', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = status;
        await user.save();

        res.json({ message: `User status updated to ${status}`, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Update account details (name, email)
// @route   PUT /api/users/me
// @access  Private
exports.updateAccountDetails = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is being changed and if it already exists
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = email;
        }

        // Update name if provided
        if (name) {
            user.name = name;
        }

        await user.save();

        // Return user without password
        const updatedUser = await User.findById(user._id).select('-password');
        res.json({ message: 'Account details updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Change password
// @route   PUT /api/users/me/password
// @access  Private
exports.changePassword = async (req, res) => {
    const { newPassword } = req.body;

    // Validation
    if (!newPassword) {
        return res.status(400).json({ message: 'Please provide new password' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update password (pre-save hook will hash it)
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
