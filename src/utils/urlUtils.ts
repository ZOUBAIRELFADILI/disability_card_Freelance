/**
 * Utility functions for handling URLs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Converts a localhost URL to the production API URL
 * This is needed for profile pictures and other assets that might have localhost URLs in the database
 */
export const convertToProductionUrl = (url: string): string => {
  if (!url) return url;

  console.log('Original URL:', url); // Debug log

  // Handle various localhost formats and remove any duplicate domains
  let convertedUrl = url;
  
  // First, clean up any duplicate domains or malformed URLs
  convertedUrl = convertedUrl.replace(/https:\/\/ndaid\.help\/\.ndaid\.help\/api/gi, 'https://api.ndaid.help');
  convertedUrl = convertedUrl.replace(/http:\/\/ndaid\.help\/\.ndaid\.help\/api/gi, 'https://api.ndaid.help');
  
  // Handle localhost patterns
  const localhostPatterns = [
    /http:\/\/localhost:5253/gi,
    /https:\/\/localhost:7174/gi,
    /http:\/\/Localhost:5253/gi,
    /https:\/\/Localhost:7174/gi,
  ];

  localhostPatterns.forEach(pattern => {
    convertedUrl = convertedUrl.replace(pattern, 'https://api.ndaid.help');
  });

  // If it's a relative path, build the full URL
  if (!convertedUrl.startsWith('http')) {
    const cleanPath = convertedUrl.startsWith('/') ? convertedUrl.slice(1) : convertedUrl;
    convertedUrl = `https://api.ndaid.help/${cleanPath}`;
  }

  console.log('Converted URL:', convertedUrl); // Debug log
  return convertedUrl;
};

/**
 * Gets the full URL for a profile picture
 */
export const getProfilePictureUrl = (profilePicturePath: string): string => {
  if (!profilePicturePath) return '';
  
  return convertToProductionUrl(profilePicturePath);
};
