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

// Whitelist of allowed letter templates
export const ALLOWED_TEMPLATES = new Set([
  'classic-letter',
  'vintage-postcard',
]);

// Content length constraints
const MAX_RECIPIENT_NAME_LENGTH = 50;
const MAX_SENDER_NAME_LENGTH = 50;
const MAX_BOUQUET_MESSAGE_LENGTH = 250;
const MAX_LETTER_MESSAGE_LENGTH = 500;
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
 * @param {string} content.template - Template type
 * @param {string} content.recipientName - Recipient name
 * @param {string} content.senderName - Sender name
 * @param {string} content.message - Message text
 * @returns {boolean} True if content is valid
 */
export function validateLetterContent(content) {
  if (!content || typeof content !== 'object') {
    return false;
  }

  // Validate template is in whitelist
  if (!ALLOWED_TEMPLATES.has(content.template)) {
    return false;
  }

  // Validate string lengths
  if (typeof content.recipientName !== 'string' || content.recipientName.length > MAX_RECIPIENT_NAME_LENGTH) {
    return false;
  }

  if (typeof content.senderName !== 'string' || content.senderName.length > MAX_SENDER_NAME_LENGTH) {
    return false;
  }

  if (typeof content.message !== 'string' || content.message.length > MAX_LETTER_MESSAGE_LENGTH) {
    return false;
  }

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
