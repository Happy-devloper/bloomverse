import { flowers, layouts } from '../data/flowers';
import { 
  validateBouquetContent, 
  validateLetterContent 
} from './validation';

// Mapping for compact encoding to keep URLs short
export const FLOWER_MAP = {
  'rose-rose': 'rr',
  'rose-yellow': 'ry',
  'lily': 'li',
  'peony': 'pe',
  'sunflower': 'sf',
  'orchid': 'or',
  'hydrangea': 'hy',
  'camellia': 'ca',
  'chrysanthemum': 'ch',
  'hibiscus': 'hi',
};

const REVERSE_FLOWER_MAP = Object.fromEntries(
  Object.entries(FLOWER_MAP).map(([k, v]) => [v, k])
);

export const LAYOUT_MAP = {
  'classic': 'cl',
  'cascade': 'cs',
  'modern': 'mn',
  'heart': 'ht',
};

const REVERSE_LAYOUT_MAP = Object.fromEntries(
  Object.entries(LAYOUT_MAP).map(([k, v]) => [v, k])
);

const ALLOWED_FLOWERS = new Set(flowers.map(({ id }) => id));
const LEGACY_FLOWER_IDS = new Set([
  'red-rose',
  'white-rose',
  'rose',
  'tulip',
  'magnolia',
  'daisy',
  'lavender',
]);
const ALLOWED_LAYOUTS = new Set(layouts.map(({ id }) => id));
const MAX_ENCODED_LENGTH = 8192;
const MAX_FLOWERS = 20;

/**
 * Encodes content (bouquet or letter) into a compact, URL-safe string
 * Supports v3 format with type discriminator
 * @param {Object} content - Content object (BouquetContent or LetterContent)
 * @returns {string} URL-safe encoded string
 */
export const encodeContent = (content) => {
  try {
    // Validate content before encoding
    if (content.type === 'bouquet') {
      if (!validateBouquetContent(content)) {
        console.error('Invalid bouquet content for encoding');
        return '';
      }
    } else if (content.type === 'letter') {
      if (!validateLetterContent(content)) {
        console.error('Invalid letter content for encoding');
        return '';
      }
    } else {
      console.error('Unknown content type:', content.type);
      return '';
    }

    // Build compact structure with type discriminator
    const compact = {
      v: 3, // Version 3 supports both bouquets and letters
      t: content.type,
      r: content.recipientName,
      s: content.senderName,
      m: content.message,
      
      // Bouquet-specific fields
      ...(content.type === 'bouquet' && {
        f: content.flowers.map(id => FLOWER_MAP[id] || id),
        l: LAYOUT_MAP[content.layout] || content.layout
      }),
      
      // Letter-specific fields
      ...(content.type === 'letter' && {
        th: content.themeId,
        hs: content.handwritingStyle,
        cv: content.coverPageVisible !== false
      })
    };

    const json = JSON.stringify(compact);
    const bytes = new TextEncoder().encode(json);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
    const base64 = btoa(binary);
    // Make it URL-safe: replace + with -, / with _, and remove padding =
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Failed to encode content:', error);
    return '';
  }
};

/**
 * Legacy function for encoding bouquet data (v2 format)
 * Maintained for backward compatibility
 * @deprecated Use encodeContent instead
 */
export const encodeBouquetData = (data) => {
  try {
    // Use short keys and mapped IDs to save space
    const compact = {
      v: 2, // Versioning
      f: data.flowers.map(id => FLOWER_MAP[id] || id),
      l: LAYOUT_MAP[data.layout] || data.layout,
      r: data.recipientName,
      s: data.senderName,
      m: data.message
    };

    const json = JSON.stringify(compact);
    const bytes = new TextEncoder().encode(json);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
    const base64 = btoa(binary);
    // Make it URL-safe: replace + with -, / with _, and remove padding =
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Failed to encode bouquet data:', error);
    return '';
  }
};

/**
 * Decodes content (bouquet or letter) from a URL string
 * Supports v3 format with backward compatibility for v2 bouquets
 * @param {string} encoded - URL-safe encoded string
 * @returns {Object|null} Decoded content object or null if invalid
 */
export const decodeContent = (encoded) => {
  if (typeof encoded !== 'string' || !encoded || encoded.length > MAX_ENCODED_LENGTH) {
    return null;
  }
  try {
    // Restore URL-safe characters: replace - with +, _ with /
    // Also handle cases where + might have been converted to space by some parsers
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/ /g, '+');

    // Add back padding if necessary
    while (base64.length % 4) {
      base64 += '=';
    }

    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    const jsonStr = new TextDecoder().decode(bytes);
    const data = JSON.parse(jsonStr);

    if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

    // Version 3 with type discriminator
    if (data.v === 3) {
      const base = {
        version: 3,
        recipientName: data.r,
        senderName: data.s,
        message: data.m
      };
      
      if (data.t === 'bouquet') {
        const bouquetContent = {
          ...base,
          type: 'bouquet',
          flowers: data.f.map(code => REVERSE_FLOWER_MAP[code] || code),
          layout: REVERSE_LAYOUT_MAP[data.l] || data.l
        };
        
        // Validate using validation.js
        if (!validateBouquetContent(bouquetContent)) {
          console.error('Invalid v3 bouquet content');
          return null;
        }
        
        return bouquetContent;
      } else if (data.t === 'letter') {
        const letterContent = {
          ...base,
          type: 'letter',
          themeId: data.th || 'vintage-love',
          handwritingStyle: data.hs || 'Dancing Script',
          coverPageVisible: data.cv !== false
        };
        
        // Validate using validation.js
        if (!validateLetterContent(letterContent)) {
          console.error('Invalid v3 letter content');
          return null;
        }
        
        return letterContent;
      }
      
      console.error('Unknown content type in v3:', data.t);
      return null;
    }
    
    // Backward compatibility with version 2 (bouquets only)
    if (data.v === 2 || (data.f && data.m)) {
      if (!Array.isArray(data.f)) return null;
      
      const bouquetContent = {
        version: 2,
        type: 'bouquet',
        flowers: data.f.map(code => REVERSE_FLOWER_MAP[code] || code),
        layout: REVERSE_LAYOUT_MAP[data.l] || data.l,
        recipientName: data.r,
        senderName: data.s,
        message: data.m
      };
      
      // Validate using validation.js
      if (!validateBouquetContent(bouquetContent)) {
        console.error('Invalid v2 bouquet content');
        return null;
      }
      
      return bouquetContent;
    }

    console.error('Unrecognized data format version');
    return null;
  } catch (error) {
    console.error('Failed to decode content:', error);
    return null;
  }
};

/**
 * Legacy function for decoding bouquet data
 * Maintained for backward compatibility
 * @deprecated Use decodeContent instead
 */
export const decodeBouquetData = (encoded) => {
  if (typeof encoded !== 'string' || !encoded || encoded.length > MAX_ENCODED_LENGTH) {
    return null;
  }
  try {
    // Restore URL-safe characters: replace - with +, _ with /
    // Also handle cases where + might have been converted to space by some parsers
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/ /g, '+');

    // Add back padding if necessary
    while (base64.length % 4) {
      base64 += '=';
    }

    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    const jsonStr = new TextDecoder().decode(bytes);
    const data = JSON.parse(jsonStr);

    if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

    let bouquet;
    if (data.v === 2 || (data.f && data.m)) {
      if (!Array.isArray(data.f)) return null;
      bouquet = {
        flowers: data.f.map(code => REVERSE_FLOWER_MAP[code] || code),
        layout: REVERSE_LAYOUT_MAP[data.l] || data.l,
        recipientName: data.r,
        senderName: data.s,
        message: data.m
      };
    } else {
      bouquet = data;
    }

    if (
      !Array.isArray(bouquet.flowers) ||
      bouquet.flowers.length === 0 ||
      bouquet.flowers.length > MAX_FLOWERS ||
      !bouquet.flowers.every((id) => ALLOWED_FLOWERS.has(id) || LEGACY_FLOWER_IDS.has(id)) ||
      !ALLOWED_LAYOUTS.has(bouquet.layout) ||
      typeof bouquet.recipientName !== 'string' ||
      bouquet.recipientName.length > 50 ||
      typeof bouquet.senderName !== 'string' ||
      bouquet.senderName.length > 50 ||
      typeof bouquet.message !== 'string' ||
      bouquet.message.length > 250
    ) {
      return null;
    }

    return bouquet;
  } catch (error) {
    console.error('Failed to decode bouquet data:', error);
    return null;
  }
};

/**
 * Generates a full shareable link for content (bouquet or letter)
 * Uses the universal 'content' parameter
 */
export const generateShareLink = (content) => {
  const encoded = encodeContent(content);
  if (!encoded) return '';
  const baseUrl = window.location.origin;
  return `${baseUrl}/?content=${encodeURIComponent(encoded)}`;
};

/**
 * Generates a short shareable link for content
 * Uses 'c' short parameter for universal content
 */
export const generateShortShareLink = (content) => {
  const encoded = encodeContent(content);
  if (!encoded) return '';
  const baseUrl = window.location.origin;
  return `${baseUrl}/?c=${encodeURIComponent(encoded)}`;
};

/**
 * Legacy: Generates a full shareable link for bouquet data
 * @deprecated Use generateShareLink with content object instead
 */
export const generateBouquetShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  return `${baseUrl}/?bouquet=${encodeURIComponent(encoded)}`;
};

/**
 * Legacy: Generates the short parameter version of the bouquet link
 * @deprecated Use generateShortShareLink with content object instead
 */
export const generateShortBouquetShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  return `${baseUrl}/?b=${encodeURIComponent(encoded)}`;
};

/**
 * Retrieves and decodes content from the current URL
 * Supports 'content', 'c', 'bouquet', and 'b' parameters
 * @returns {Object|null} Decoded content object or null
 */
export const getContentFromUrl = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    
    // Try new universal parameter first
    const contentParam = params.get('content') || params.get('c');
    if (contentParam) {
      return decodeContent(contentParam);
    }
    
    // Fall back to legacy bouquet parameters
    const bouquetParam = params.get('bouquet') || params.get('b');
    if (bouquetParam) {
      return decodeContent(bouquetParam);
    }
  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }
  return null;
};

/**
 * Legacy: Retrieves and decodes bouquet data from the current URL
 * @deprecated Use getContentFromUrl instead
 */
export const getBouquetFromUrl = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('bouquet') || params.get('b');
    if (encoded) {
      return decodeBouquetData(encoded);
    }
  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }
  return null;
};
