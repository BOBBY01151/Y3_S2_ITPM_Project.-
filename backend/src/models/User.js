const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'lecturer', 'council', 'community', 'admin', 'superadmin'],
        default: 'student',
    },
    department: String,
    campus: {
        type: String,
        enum: ['Metro Campus', 'Malabe Campus', 'Kandy Campus', 'Northern Campus'],
    },
    languagePreference: {
        type: String,
        enum: ['en', 'ta'],
        default: 'en',
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'rejected'],
        default: 'pending',
    },
    profilePhoto: {
        type: String, // URL/Path to the photo
        default: ''
    },
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
