/**
 * Unit tests for urlEncoding module
 * Tests v3 content encoding/decoding with backward compatibility for v2 bouquets
 * Requirements: 5.1, 5.2, 5.3, 13.4
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  encodeContent,
  decodeContent,
  encodeBouquetData,
  decodeBouquetData,
  generateShareLink,
  generateShortShareLink,
  getContentFromUrl,
  FLOWER_MAP,
  LAYOUT_MAP,
} from '../urlEncoding';

describe('encodeContent (v3 format)', () => {
  describe('Bouquet content encoding (Requirement 5.2)', () => {
    test('should encode valid bouquet content with type discriminator', () => {
      const bouquetContent = {
        type: 'bouquet',
        flowers: ['rose-rose', 'lily', 'peony'],
        layout: 'classic',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Happy Birthday!'
      };

      const encoded = encodeContent(bouquetContent);

      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThan(0);
      // URL-safe characters only
      expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    test('should use flower and layout mappings for compression', () => {
      const bouquetContent = {
        type: 'bouquet',
        flowers: ['rose-rose', 'sunflower'],
        layout: 'heart',
        recipientName: 'Test',
        senderName: 'User',
        message: 'Hi'
      };

      const encoded = encodeContent(bouquetContent);
      const decoded = decodeContent(encoded);

      // Verify round-trip preserves data
      expect(decoded.flowers).toEqual(['rose-rose', 'sunflower']);
      expect(decoded.layout).toBe('heart');
    });

    test('should reject invalid bouquet content', () => {
      const invalidContent = {
        type: 'bouquet',
        flowers: ['invalid-flower-id'],
        layout: 'classic',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Test'
      };

      const encoded = encodeContent(invalidContent);
      expect(encoded).toBe('');
    });

    test('should reject bouquet with too many flowers', () => {
      const tooManyFlowers = {
        type: 'bouquet',
        flowers: Array(25).fill('rose-rose'), // Max is 20
        layout: 'classic',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Test'
      };

      const encoded = encodeContent(tooManyFlowers);
      expect(encoded).toBe('');
    });
  });

  describe('Letter content encoding (Requirement 5.2)', () => {
    test('should encode valid letter content with type discriminator', () => {
      const letterContent = {
        type: 'letter',
        template: 'classic-letter',
        recipientName: 'Dear Friend',
        senderName: 'Your Pal',
        message: 'Just wanted to say hello and hope you are doing well.'
      };

      const encoded = encodeContent(letterContent);

      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThan(0);
      expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    test('should encode vintage postcard template', () => {
      const postcardContent = {
        type: 'letter',
        template: 'vintage-postcard',
        recipientName: 'Mom',
        senderName: 'Sarah',
        message: 'Wish you were here!'
      };

      const encoded = encodeContent(postcardContent);
      const decoded = decodeContent(encoded);

      expect(decoded.type).toBe('letter');
      expect(decoded.template).toBe('vintage-postcard');
      expect(decoded.message).toBe('Wish you were here!');
    });

    test('should reject invalid letter template', () => {
      const invalidLetter = {
        type: 'letter',
        template: 'invalid-template',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Test'
      };

      const encoded = encodeContent(invalidLetter);
      expect(encoded).toBe('');
    });

    test('should reject letter with message exceeding max length', () => {
      const longMessage = {
        type: 'letter',
        template: 'classic-letter',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'x'.repeat(501) // Max is 500
      };

      const encoded = encodeContent(longMessage);
      expect(encoded).toBe('');
    });
  });

  describe('Content validation', () => {
    test('should reject unknown content type', () => {
      const unknownType = {
        type: 'unknown',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Test'
      };

      const encoded = encodeContent(unknownType);
      expect(encoded).toBe('');
    });

    test('should reject content without type field', () => {
      const noType = {
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Test'
      };

      const encoded = encodeContent(noType);
      expect(encoded).toBe('');
    });
  });
});

describe('decodeContent (v3 format with backward compatibility)', () => {
  describe('v3 bouquet decoding (Requirement 5.3)', () => {
    test('should decode v3 bouquet content correctly', () => {
      const original = {
        type: 'bouquet',
        flowers: ['rose-rose', 'lily', 'orchid'],
        layout: 'cascade',
        recipientName: 'Emma',
        senderName: 'Jack',
        message: 'Thinking of you!'
      };

      const encoded = encodeContent(original);
      const decoded = decodeContent(encoded);

      expect(decoded).toBeTruthy();
      expect(decoded.type).toBe('bouquet');
      expect(decoded.version).toBe(3);
      expect(decoded.flowers).toEqual(original.flowers);
      expect(decoded.layout).toBe(original.layout);
      expect(decoded.recipientName).toBe(original.recipientName);
      expect(decoded.senderName).toBe(original.senderName);
      expect(decoded.message).toBe(original.message);
    });
  });

  describe('v3 letter decoding (Requirement 5.3)', () => {
    test('should decode v3 letter content correctly', () => {
      const original = {
        type: 'letter',
        template: 'vintage-postcard',
        recipientName: 'Grandma',
        senderName: 'Lucy',
        message: 'Having a wonderful time! The scenery is beautiful.'
      };

      const encoded = encodeContent(original);
      const decoded = decodeContent(encoded);

      expect(decoded).toBeTruthy();
      expect(decoded.type).toBe('letter');
      expect(decoded.version).toBe(3);
      expect(decoded.template).toBe(original.template);
      expect(decoded.recipientName).toBe(original.recipientName);
      expect(decoded.senderName).toBe(original.senderName);
      expect(decoded.message).toBe(original.message);
    });
  });

  describe('v2 backward compatibility (Requirement 13.4)', () => {
    test('should decode v2 bouquet format', () => {
      const v2Bouquet = {
        flowers: ['rose-rose', 'lily'],
        layout: 'classic',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Legacy bouquet'
      };

      const encoded = encodeBouquetData(v2Bouquet);
      const decoded = decodeContent(encoded);

      expect(decoded).toBeTruthy();
      expect(decoded.type).toBe('bouquet');
      expect(decoded.version).toBe(2);
      expect(decoded.flowers).toEqual(v2Bouquet.flowers);
      expect(decoded.layout).toBe(v2Bouquet.layout);
      expect(decoded.recipientName).toBe(v2Bouquet.recipientName);
      expect(decoded.message).toBe(v2Bouquet.message);
    });

    test('should validate v2 bouquet content', () => {
      // Create invalid v2 data manually
      const invalidV2 = {
        v: 2,
        f: ['invalid-flower'],
        l: 'cl',
        r: 'Alice',
        s: 'Bob',
        m: 'Test'
      };

      const json = JSON.stringify(invalidV2);
      const bytes = new TextEncoder().encode(json);
      const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      const base64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const decoded = decodeContent(base64);
      expect(decoded).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('should return null for empty string', () => {
      const decoded = decodeContent('');
      expect(decoded).toBeNull();
    });

    test('should return null for invalid base64', () => {
      const decoded = decodeContent('!!!invalid!!!');
      expect(decoded).toBeNull();
    });

    test('should return null for non-string input', () => {
      const decoded = decodeContent(null);
      expect(decoded).toBeNull();
    });

    test('should return null for excessively long string', () => {
      const longString = 'a'.repeat(9000);
      const decoded = decodeContent(longString);
      expect(decoded).toBeNull();
    });

    test('should return null for unknown version', () => {
      const unknownVersion = {
        v: 99,
        t: 'unknown-type',
        r: 'Alice',
        s: 'Bob',
        m: 'Test'
      };

      const json = JSON.stringify(unknownVersion);
      const bytes = new TextEncoder().encode(json);
      const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      const base64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const decoded = decodeContent(base64);
      expect(decoded).toBeNull();
    });
  });
});

describe('URL parameter support', () => {
  let originalLocation;

  beforeEach(() => {
    originalLocation = global.window?.location;
    global.window = global.window || {};
  });

  afterEach(() => {
    if (originalLocation) {
      global.window.location = originalLocation;
    }
  });

  describe('getContentFromUrl (Requirement 5.3)', () => {
    test('should retrieve content from "content" parameter', () => {
      const bouquet = {
        type: 'bouquet',
        flowers: ['rose-rose', 'lily'],
        layout: 'classic',
        recipientName: 'Alice',
        senderName: 'Bob',
        message: 'Test'
      };
      const encoded = encodeContent(bouquet);

      global.window.location = {
        search: `?content=${encoded}`
      };

      const retrieved = getContentFromUrl();
      expect(retrieved).toBeTruthy();
      expect(retrieved.type).toBe('bouquet');
      expect(retrieved.flowers).toEqual(['rose-rose', 'lily']);
    });

    test('should retrieve content from "c" short parameter', () => {
      const letter = {
        type: 'letter',
        template: 'classic-letter',
        recipientName: 'Friend',
        senderName: 'Me',
        message: 'Hello!'
      };
      const encoded = encodeContent(letter);

      global.window.location = {
        search: `?c=${encoded}`
      };

      const retrieved = getContentFromUrl();
      expect(retrieved).toBeTruthy();
      expect(retrieved.type).toBe('letter');
      expect(retrieved.template).toBe('classic-letter');
    });

    test('should fall back to legacy "bouquet" parameter', () => {
      const bouquet = {
        type: 'bouquet',
        flowers: ['peony', 'orchid'],
        layout: 'heart',
        recipientName: 'Legacy',
        senderName: 'User',
        message: 'Old format'
      };
      const encoded = encodeContent(bouquet);

      global.window.location = {
        search: `?bouquet=${encoded}`
      };

      const retrieved = getContentFromUrl();
      expect(retrieved).toBeTruthy();
      expect(retrieved.type).toBe('bouquet');
    });

    test('should fall back to legacy "b" short parameter', () => {
      const bouquet = {
        flowers: ['rose-rose'],
        layout: 'modern',
        recipientName: 'Test',
        senderName: 'User',
        message: 'Hi'
      };
      const encoded = encodeBouquetData(bouquet);

      global.window.location = {
        search: `?b=${encoded}`
      };

      const retrieved = getContentFromUrl();
      expect(retrieved).toBeTruthy();
      expect(retrieved.type).toBe('bouquet');
    });

    test('should prioritize "content" over legacy parameters', () => {
      const newContent = {
        type: 'letter',
        template: 'vintage-postcard',
        recipientName: 'New',
        senderName: 'Format',
        message: 'Priority test'
      };
      const newEncoded = encodeContent(newContent);

      const oldContent = {
        flowers: ['rose-rose'],
        layout: 'classic',
        recipientName: 'Old',
        senderName: 'Format',
        message: 'Should not appear'
      };
      const oldEncoded = encodeBouquetData(oldContent);

      global.window.location = {
        search: `?content=${newEncoded}&bouquet=${oldEncoded}`
      };

      const retrieved = getContentFromUrl();
      expect(retrieved.type).toBe('letter');
      expect(retrieved.recipientName).toBe('New');
    });

    test('should return null when no parameters present', () => {
      global.window.location = {
        search: ''
      };

      const retrieved = getContentFromUrl();
      expect(retrieved).toBeNull();
    });
  });
});

describe('Share link generation', () => {
  beforeEach(() => {
    global.window = global.window || {};
    global.window.location = { origin: 'https://bloomverse.example' };
  });

  test('should generate share link with content parameter', () => {
    const content = {
      type: 'bouquet',
      flowers: ['rose-rose'],
      layout: 'classic',
      recipientName: 'Alice',
      senderName: 'Bob',
      message: 'Test'
    };

    const link = generateShareLink(content);
    expect(link).toContain('https://bloomverse.example/?content=');
    expect(link.length).toBeGreaterThan(40);
  });

  test('should generate short share link with c parameter', () => {
    const content = {
      type: 'letter',
      template: 'classic-letter',
      recipientName: 'Friend',
      senderName: 'Me',
      message: 'Hello'
    };

    const link = generateShortShareLink(content);
    expect(link).toContain('https://bloomverse.example/?c=');
  });

  test('should return empty string for invalid content', () => {
    const invalidContent = {
      type: 'bouquet',
      flowers: ['invalid-flower'],
      layout: 'classic',
      recipientName: 'Alice',
      senderName: 'Bob',
      message: 'Test'
    };

    const link = generateShareLink(invalidContent);
    expect(link).toBe('');
  });
});

describe('Compression mappings', () => {
  test('FLOWER_MAP should cover all allowed flowers', () => {
    const expectedFlowers = [
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
    ];

    expectedFlowers.forEach(flower => {
      expect(FLOWER_MAP).toHaveProperty(flower);
      expect(FLOWER_MAP[flower]).toBeTruthy();
    });
  });

  test('LAYOUT_MAP should cover all allowed layouts', () => {
    const expectedLayouts = ['classic', 'cascade', 'modern', 'heart'];

    expectedLayouts.forEach(layout => {
      expect(LAYOUT_MAP).toHaveProperty(layout);
      expect(LAYOUT_MAP[layout]).toBeTruthy();
    });
  });

  test('compressed codes should be 2 characters', () => {
    Object.values(FLOWER_MAP).forEach(code => {
      expect(code.length).toBe(2);
    });

    Object.values(LAYOUT_MAP).forEach(code => {
      expect(code.length).toBe(2);
    });
  });
});

describe('Round-trip encoding', () => {
  test('should preserve all bouquet data through encode/decode cycle', () => {
    const original = {
      type: 'bouquet',
      flowers: ['rose-rose', 'lily', 'peony', 'orchid', 'sunflower'],
      layout: 'cascade',
      recipientName: 'Emma Thompson',
      senderName: 'James Wilson',
      message: 'Wishing you a wonderful day filled with joy and happiness!'
    };

    const encoded = encodeContent(original);
    const decoded = decodeContent(encoded);

    expect(decoded.type).toBe(original.type);
    expect(decoded.flowers).toEqual(original.flowers);
    expect(decoded.layout).toBe(original.layout);
    expect(decoded.recipientName).toBe(original.recipientName);
    expect(decoded.senderName).toBe(original.senderName);
    expect(decoded.message).toBe(original.message);
  });

  test('should preserve all letter data through encode/decode cycle', () => {
    const original = {
      type: 'letter',
      template: 'vintage-postcard',
      recipientName: 'Dearest Grandmother',
      senderName: 'Your loving granddaughter',
      message: 'I hope this postcard finds you well. The weather here is beautiful and I am thinking of you every day. Send my love to everyone at home. Missing you dearly!'
    };

    const encoded = encodeContent(original);
    const decoded = decodeContent(encoded);

    expect(decoded.type).toBe(original.type);
    expect(decoded.template).toBe(original.template);
    expect(decoded.recipientName).toBe(original.recipientName);
    expect(decoded.senderName).toBe(original.senderName);
    expect(decoded.message).toBe(original.message);
  });
});
