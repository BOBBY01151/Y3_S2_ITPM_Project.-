const StudyMaterial = require('../models/StudyMaterial');

// Storage quota per user in bytes (500MB)
const STORAGE_QUOTA = 500 * 1024 * 1024;

// @desc    Get storage usage for current user
// @route   GET /api/storage/usage
// @access  Private
const getStorageUsage = async (req, res) => {
    try {
        // Get all materials uploaded by the current user
        const materials = await StudyMaterial.find({ uploader: req.user._id });

        // Calculate total storage used
        const totalUsed = materials.reduce((sum, material) => {
            return sum + (material.fileSize || 0);
        }, 0);

        // Calculate percentage
        const percentage = Math.round((totalUsed / STORAGE_QUOTA) * 100);

        // Determine status color based on usage
        let status = 'safe'; // green
        if (percentage >= 90) {
            status = 'critical'; // red
        } else if (percentage >= 70) {
            status = 'warning'; // yellow
        }

        res.json({
            used: totalUsed,
            quota: STORAGE_QUOTA,
            percentage,
            status,
            fileCount: materials.length,
            // Helper formatted strings
            usedFormatted: formatBytes(totalUsed),
            quotaFormatted: formatBytes(STORAGE_QUOTA),
            availableFormatted: formatBytes(STORAGE_QUOTA - totalUsed)
        });
    } catch (err) {
        console.error('[STORAGE ERROR]', err);
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};

// Helper function to format bytes to human-readable format
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

module.exports = { getStorageUsage };
