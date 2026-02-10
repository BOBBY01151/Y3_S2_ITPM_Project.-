const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    fileUrl: {
        type: String,
        required: true,
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: String,
    tags: [String],
    language: {
        type: String,
        enum: ['en', 'ta'],
        default: 'en',
    },
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
