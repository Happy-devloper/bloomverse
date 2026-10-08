/**
 * Validation utilities for bouquet and letter content
 * Provides whitelisting and constraint validation for shareable content
 */

// Whitelist of allowed flower IDs (must match flowers.js)
export const ALLOWED_FLOWERS = new Set([
  'rose-rose',
  'rose-yellow',
  'lily',
  'peony',
  'sunflower',
  'orchid',
  'hydrangea',
  'camellia',
  'chrysanthemum',
  'hibiscus',
]);

// Whitelist of allowed layout types (must match flowers.js layouts)
export const ALLOWED_LAYOUTS = new Set([
  'classic',
  'cascade',
  'modern',
  'heart',
]);

// Whitelist of allowed letter themes
export const ALLOWED_THEMES = new Set([
  'passionate-rose',
  'moonlight-romance',
  'vintage-love',
  'garden-whisper',
  'eternal-gold',
]);

// Whitelist of allowed handwriting styles
export const ALLOWED_HANDWRITING_STYLES = new Set([
  'Dancing Script',
  'Shadows Into Light',
  'Cedarville Cursive',
  'Patrick Hand',
  'Reenie Beanie',
]);

// Content length constraints
const MAX_RECIPIENT_NAME_LENGTH = 50;
const MAX_SENDER_NAME_LENGTH = 50;
const MAX_BOUQUET_MESSAGE_LENGTH = 250;
const MAX_LETTER_MESSAGE_LENGTH = 2000;
const MIN_FLOWER_COUNT = 1;
const MAX_FLOWER_COUNT = 20;

/**
 * Validates bouquet content structure and constraints
 * @param {Object} content - Bouquet content object
 * @param {string[]} content.flowers - Array of flower IDs
 * @param {string} content.layout - Layout type
 * @param {string} content.recipientName - Recipient name
 * @param {string} content.senderName - Sender name
 * @param {string} content.message - Message text
 * @returns {boolean} True if content is valid
 */
export function validateBouquetContent(content) {
  if (!content || typeof content !== 'object') {
    return false;
  }

  // Validate flowers array
  if (!Array.isArray(content.flowers)) {
    return false;
  }

  if (content.flowers.length < MIN_FLOWER_COUNT || content.flowers.length > MAX_FLOWER_COUNT) {
    return false;
  }

  // Validate each flower ID is in whitelist
  if (!content.flowers.every(id => ALLOWED_FLOWERS.has(id))) {
    return false;
  }

  // Validate layout is in whitelist
  if (!ALLOWED_LAYOUTS.has(content.layout)) {
    return false;
  }

  // Validate string lengths
  if (typeof content.recipientName !== 'string' || content.recipientName.length > MAX_RECIPIENT_NAME_LENGTH) {
    return false;
  }

  if (typeof content.senderName !== 'string' || content.senderName.length > MAX_SENDER_NAME_LENGTH) {
    return false;
  }

  if (typeof content.message !== 'string' || content.message.length > MAX_BOUQUET_MESSAGE_LENGTH) {
    return false;
  }

  return true;
}

/**
 * Validates letter content structure and constraints
 * @param {Object} content - Letter content object
 * @param {string} content.themeId - Theme ID
 * @param {string} content.handwritingStyle - Handwriting style
 * @param {string} content.recipientName - Recipient name
 * @param {string} content.senderName - Sender name
 * @param {string} content.message - Message text
 * @returns {boolean} True if content is valid
 */
export function validateLetterContent(content) {
  if (!content || typeof content !== 'object') {
    console.log('Letter validation failed: not an object');
    return false;
  }

  // Validate themeId is in whitelist (optional for backward compatibility)
  if (content.themeId && !ALLOWED_THEMES.has(content.themeId)) {
    console.log('Letter validation failed: invalid theme', content.themeId);
    return false;
  }

  // Validate handwriting style (optional for backward compatibility)
  if (content.handwritingStyle && !ALLOWED_HANDWRITING_STYLES.has(content.handwritingStyle)) {
    console.log('Letter validation failed: invalid handwriting', content.handwritingStyle);
    return false;
  }

  // Validate string lengths
  if (typeof content.recipientName !== 'string' || content.recipientName.length > MAX_RECIPIENT_NAME_LENGTH) {
    console.log('Letter validation failed: invalid recipient name');
    return false;
  }

  if (typeof content.senderName !== 'string' || content.senderName.length > MAX_SENDER_NAME_LENGTH) {
    console.log('Letter validation failed: invalid sender name');
    return false;
  }

  if (typeof content.message !== 'string' || content.message.length > MAX_LETTER_MESSAGE_LENGTH) {
    console.log('Letter validation failed: invalid message length', content.message?.length);
    return false;
  }

  console.log('Letter validation passed!');
  return true;
}

/**
 * Validates a single flower ID against whitelist and format
 * @param {string} id - Flower ID to validate
 * @returns {boolean} True if flower ID is valid
 */
export function validateFlowerId(id) {
  if (typeof id !== 'string') {
    return false;
  }

  // Must be in whitelist and match expected format (lowercase letters and hyphens only)
  return ALLOWED_FLOWERS.has(id) && /^[a-z-]+$/.test(id);
}
