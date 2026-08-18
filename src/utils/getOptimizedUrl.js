/**
 * Wraps an external image URL with Cloudinary Fetch API for automatic format (WebP), quality, and size optimization.
 * 
 * @param {string} url - The original image URL
 * @returns {string} - The optimized Cloudinary URL
 */
export const getOptimizedUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // Skip local assets, relative paths, or already optimized urls
  if (url.startsWith('/') || url.startsWith('./') || url.includes('res.cloudinary.com')) {
    return url;
  }

  let targetUrl = url;
  
  // Convert Google Drive view URLs to direct download URLs
  if (targetUrl.includes('drive.google.com/file/d/')) {
    const match = targetUrl.match(/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      targetUrl = `https://drive.google.com/uc?id=${match[1]}`;
    }
  }

  const CLOUD_NAME = 'mgeyukbq';
  
  // Cloudinary transformations:
  // f_auto = Serve WebP/AVIF depending on browser
  // q_auto = Automatic quality compression
  // c_limit,w_1920 = Scale down to max width 1920px, keeping aspect ratio, without upscaling
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/f_auto,q_auto,c_limit,w_1920/${encodeURIComponent(targetUrl)}`;
};
