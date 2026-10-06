import { flowers, layouts } from '../data/flowers';

// Mapping for compact encoding to keep URLs short
const FLOWER_MAP = {
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

const LAYOUT_MAP = {
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
 * Encodes bouquet data into a compact, URL-safe string
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
 * Decodes bouquet data from a URL string, supporting both old and new formats
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
 * Generates a full shareable link
 */
export const generateShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  return `${baseUrl}/?bouquet=${encodeURIComponent(encoded)}`;
};

/**
 * Generates the short parameter version of the link
 */
export const generateShortShareLink = (bouquetData) => {
  const encoded = encodeBouquetData(bouquetData);
  const baseUrl = window.location.origin;
  return `${baseUrl}/?b=${encodeURIComponent(encoded)}`;
};

/**
 * Retrieves and decodes bouquet data from the current URL
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
