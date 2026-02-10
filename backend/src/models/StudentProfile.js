const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    faculty: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        required: true
    },
    profilePhoto: {
        type: String, // URL/Path to the photo
        default: ''
    },
    degreeProgramme: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default: []
    }
}, { timestamps: true });

// Ensure this model is only for students (optional but good for data integrity)
// This can be checked in the controller before saving

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
