const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    fileUrl: {
        type: String,
        required: false, // Optional because user can provide externalLink instead
    },
    externalLink: {
        type: String,
        required: false, // Optional Google Drive or other external link
    },
    fileSize: {
        type: Number, // Size in bytes
        default: 0,
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: String,
    faculty: {
        type: String,
        required: true,
    },
    graduateYear: {
        type: String,
        required: true,
    },
    degreeProgram: {
        type: String,
        required: true,
    },
    tags: [String],
    language: {
        type: String,
        enum: ['en', 'ta'],
        default: 'en',
    },
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
