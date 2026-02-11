const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'itpm_project/materials',
        resource_type: 'auto', // Important for non-image files like PDF
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],
        public_id: (req, file) => {
            const name = file.originalname.split('.')[0];
            return `${file.fieldname}-${name}-${Date.now()}`;
        },
    },
});

const materialUpload = multer({
    storage: storage,
    limits: { fileSize: 10000000 } // 10MB limit
});

module.exports = materialUpload;
