const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'itpm_project/profiles',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        public_id: (req, file) => {
            console.log('[DEBUG] Generating Cloudinary public_id for:', file.originalname);
            // Remove file extension from original name if present
            const name = file.originalname.split('.')[0];
            return `${file.fieldname}-${name}-${Date.now()}`;
        },
    },
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 } // 5MB limit
});

console.log('[DEBUG] multer-storage-cloudinary middleware initialized');

module.exports = upload;
