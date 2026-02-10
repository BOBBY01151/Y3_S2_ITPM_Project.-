const mongoose = require('mongoose');

const councilSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Sports Council', 'Other Councils'],
        required: true,
    },
    description: String,
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    activities: [{
        title: String,
        date: Date,
        description: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Council', councilSchema);
