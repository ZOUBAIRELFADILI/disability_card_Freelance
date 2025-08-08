/**
 * Enhanced download utility that forces file downloads
 */

/**
 * Downloads a file by fetching it as a blob and creating a download link
 * This approach works better than direct links when the server doesn't send proper download headers
 */
export const forceDownload = async (url: string, filename: string): Promise<void> => {
  try {
    // Try to fetch the file first with no-cors mode to avoid CORS issues
    let response;
    
    try {
      // First try with CORS
      response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
      });
    } catch (corsError) {
      // If CORS fails, try no-cors mode (limited but might work for downloads)
      response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit',
      });
    }

    if (!response.ok && response.status !== 0) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the blob
    const blob = await response.blob();
    
    // Create blob URL
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up blob URL
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
  } catch (error) {
    console.error('Force download failed, trying alternative methods:', error);
    throw error; // Re-throw to let calling function handle fallbacks
  }
};

/**
 * Alternative download method using iframe (for some file types)
 */
export const downloadViaIframe = (url: string): void => {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.src = url;
  document.body.appendChild(iframe);
  
  setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch (e) {
      // Ignore if already removed
    }
  }, 2000);
};

/**
 * Force download by creating a link with download attribute and proper configuration
 */
export const directDownload = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  // Force download behavior
  link.setAttribute('download', filename);
  link.setAttribute('target', '_self'); // Stay in same window
  
  // Temporarily add to DOM
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
};

/**
 * Enhanced force download that tries to get file via fetch and force download
 */
export const enhancedForceDownload = async (url: string, filename: string): Promise<void> => {
  try {
    // Create a more robust fetch request
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the blob with proper MIME type detection
    const blob = await response.blob();
    
    // Create blob URL
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create download link with enhanced attributes
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    link.style.position = 'absolute';
    link.style.left = '-9999px';
    
    // Force download attributes
    link.setAttribute('download', filename);
    link.setAttribute('target', '_self');
    
    // Add to DOM, trigger download, and clean up
    document.body.appendChild(link);
    
    // Use both click events for better compatibility
    if (link.click) {
      link.click();
    } else {
      // Fallback for older browsers
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      link.dispatchEvent(event);
    }
    
    // Clean up immediately
    document.body.removeChild(link);
    
    // Clean up blob URL after a short delay
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
  } catch (error) {
    console.error('Enhanced force download failed:', error);
    throw error;
  }
};

/**
 * Smart download function that tries multiple approaches
 * Prioritizes blob download to force download behavior
 */
export const smartDownload = async (url: string, filename: string): Promise<void> => {
  console.log('Attempting to download:', filename, 'from:', url);
  
  try {
    // Method 1: Try enhanced force download first (most reliable)
    await enhancedForceDownload(url, filename);
    console.log('Enhanced force download successful for:', filename);
    return;
  } catch (error) {
    console.log('Enhanced force download failed, trying original force download:', error);
  }
  
  try {
    // Method 2: Try original force download via blob
    await forceDownload(url, filename);
    console.log('Original force download successful for:', filename);
    return;
  } catch (error) {
    console.log('Original force download failed, trying direct download:', error);
  }
  
  try {
    // Method 3: Try direct download
    directDownload(url, filename);
    console.log('Direct download attempted for:', filename);
    return;
  } catch (error) {
    console.log('Direct download failed, trying iframe method:', error);
  }
  
  try {
    // Method 4: Try iframe download
    downloadViaIframe(url);
    console.log('Iframe download attempted for:', filename);
    return;
  } catch (error) {
    console.log('All download methods failed, opening in new tab:', error);
  }
  
  // Final fallback: open in new tab
  window.open(url, '_blank');
};
