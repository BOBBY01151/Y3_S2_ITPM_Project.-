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
