/**
 * Transforms a Cloudinary URL to force download by adding the attachment flag.
 * @param {string} url - The original Cloudinary URL.
 * @returns {string} - The transformed URL.
 */
export const getDownloadUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) return url;

    // Ensure URL is HTTPS
    const secureUrl = url.replace('http://', 'https://');

    // PDF and other non-image files are usually under /upload/
    // We add fl_attachment to force the browser to download it
    // The flag should be added after /upload/
    if (secureUrl.includes('/upload/')) {
        return secureUrl.replace('/upload/', '/upload/fl_attachment/');
    }

    return secureUrl;
};

/**
 * Ensures the Cloudinary URL is HTTPS for better compatibility with iframes.
 * @param {string} url - The original Cloudinary URL.
 * @returns {string} - The secure URL.
 */
export const getPreviewUrl = (url) => {
    if (!url) return url;
    return url.replace('http://', 'https://');
};
