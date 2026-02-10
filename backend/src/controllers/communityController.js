const Community = require('../models/Community');

// @desc    Get all communities
// @route   GET /api/communities
// @access  Public
exports.getCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.json(communities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Post to community
// @route   POST /api/communities/:id/posts
// @access  Private
exports.createPost = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) return res.status(404).json({ message: 'Community not found' });

        community.posts.unshift({
            author: req.user.id,
            content: req.body.content
        });

        await community.save();
        res.json(community.posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
