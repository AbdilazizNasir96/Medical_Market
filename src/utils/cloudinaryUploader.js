/**
 * Cloudinary Image Upload Utility
 * 
 * This utility handles image uploads to Cloudinary
 * Steps:
 * 1. Admin selects image file
 * 2. uploadToCloudinary() sends file to Cloudinary
 * 3. Cloudinary returns secure URL
 * 4. URL is saved to Supabase product_images table
 * 5. Public site fetches URLs from Supabase and displays images
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} - Cloudinary image URL
 */
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url; // Return the secure HTTPS URL
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {FileList} files - Multiple image files
 * @returns {Promise<string[]>} - Array of Cloudinary image URLs
 */
export const uploadMultipleToCloudinary = async (files) => {
  const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
  return Promise.all(uploadPromises);
};
