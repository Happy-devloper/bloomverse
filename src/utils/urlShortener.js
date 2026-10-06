import { encodeBouquetData } from './urlEncoding';

/**
 * Keep bouquet details in the app's own URL instead of sending them to a
 * third-party URL-shortening service.
 */
export const generateShortBouquetLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  return `${window.location.origin}/?b=${encodeURIComponent(encoded)}`;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Generate all versions of the link using safe encoding
 */
export const generateShareLinks = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  
  const fullUrl = `${baseUrl}/?bouquet=${encodeURIComponent(encoded)}`;
  const compactUrl = `${baseUrl}/?b=${encodeURIComponent(encoded)}`;
  
  return {
    full: fullUrl,
    compact: compactUrl,
    shortened: compactUrl,
    shortUrlLength: compactUrl.length,
    fullUrlLength: fullUrl.length
  };
};
