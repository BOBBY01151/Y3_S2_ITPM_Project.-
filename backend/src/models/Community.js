const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    description: String,
    moderator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    posts: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
