/**
 * Converts various Google Drive link formats to direct Google CDN image URLs
 * @param {string} url - Google Drive view/share URL
 * @returns {string} - Direct image URL (lh3.googleusercontent.com)
 */
export const convertDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  try {
    const trimmed = url.trim();
    const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                  trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
                  trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  } catch (err) {
    console.error('Error converting Drive URL:', err);
  }
  return url;
};

/**
 * Wraps an external image URL with Cloudinary Fetch API for automatic format (WebP), quality, and size optimization.
 * 
 * @param {string} url - The original image URL
 * @param {object} options - Optional width / quality
 * @returns {string} - The optimized Cloudinary URL
 */
export const getOptimizedUrl = (url, options = {}) => {
  if (!url || typeof url !== 'string') return url;
  
  // Skip local assets, relative paths, or already optimized urls
  if (url.startsWith('/') || url.startsWith('./') || url.includes('res.cloudinary.com')) {
    return url;
  }

  const targetUrl = convertDriveUrl(url);
  const CLOUD_NAME = 'mgeyukbq';
  const width = options.width || 1200;
  
  // Cloudinary transformations:
  // f_auto = Serve WebP/AVIF depending on browser
  // q_auto = Automatic quality compression
  // c_limit = Scale down, keeping aspect ratio, without upscaling
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/f_auto,q_auto,c_limit,w_${width}/${encodeURIComponent(targetUrl)}`;
};
