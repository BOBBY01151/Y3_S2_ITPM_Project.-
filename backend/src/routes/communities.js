const express = require('express');
const router = express.Router();
const { getCommunities, createPost } = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

router.get('/', getCommunities);
router.post('/:id/posts', protect, createPost);

module.exports = router;
