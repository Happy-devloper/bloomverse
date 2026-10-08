/**
 * Tests for Letter Themes Data
 */

import { describe, it, expect } from 'vitest';
import { letterThemes, getThemeById } from './letterThemes.js';

describe('letterThemes', () => {
  it('should contain 5 themes', () => {
    expect(letterThemes).toHaveLength(5);
  });

  it('should have all required themes', () => {
    const themeIds = letterThemes.map(theme => theme.id);
    expect(themeIds).toContain('passionate-rose');
    expect(themeIds).toContain('moonlight-romance');
    expect(themeIds).toContain('vintage-love');
    expect(themeIds).toContain('garden-whisper');
    expect(themeIds).toContain('eternal-gold');
  });

  it('should have all themes with required properties', () => {
    letterThemes.forEach(theme => {
      // Check top-level properties
      expect(theme).toHaveProperty('id');
      expect(theme).toHaveProperty('name');
      expect(theme).toHaveProperty('description');
      expect(theme).toHaveProperty('coverPage');
      expect(theme).toHaveProperty('letterPage');

      // Check coverPage properties
      expect(theme.coverPage).toHaveProperty('type');
      expect(theme.coverPage).toHaveProperty('background');
      expect(theme.coverPage).toHaveProperty('centerpiece');
      expect(theme.coverPage).toHaveProperty('frame');
      expect(theme.coverPage).toHaveProperty('text');
      expect(theme.coverPage.text).toHaveProperty('position');
      expect(theme.coverPage.text).toHaveProperty('color');
      expect(theme.coverPage.text).toHaveProperty('shadow');

      // Check letterPage properties
      expect(theme.letterPage).toHaveProperty('paperColor');
      expect(theme.letterPage).toHaveProperty('paperTexture');
      expect(theme.letterPage).toHaveProperty('edgeStyle');
      expect(theme.letterPage).toHaveProperty('decorations');
      expect(theme.letterPage).toHaveProperty('accentColor');
      expect(theme.letterPage).toHaveProperty('textColor');

      // Validate decorations array
      expect(Array.isArray(theme.letterPage.decorations)).toBe(true);
      theme.letterPage.decorations.forEach(decoration => {
        expect(decoration).toHaveProperty('type');
        expect(decoration).toHaveProperty('position');
        expect(decoration).toHaveProperty('opacity');
      });
    });
  });

  describe('Vintage Love theme', () => {
    const theme = letterThemes.find(t => t.id === 'vintage-love');

    it('should exist', () => {
      expect(theme).toBeDefined();
    });

    it('should have sepia/cream color palette', () => {
      expect(theme.coverPage.background).toContain('#D4A574');
      expect(theme.letterPage.paperColor).toBe('#FAF4E8');
    });

    it('should have dried-flowers centerpiece', () => {
      expect(theme.coverPage.centerpiece).toBe('dried-flowers');
    });

    it('should have botanical frame', () => {
      expect(theme.coverPage.frame).toBe('botanical');
    });

    it('should have torn edge style', () => {
      expect(theme.letterPage.edgeStyle).toBe('torn');
    });

    it('should have 3 decorations', () => {
      expect(theme.letterPage.decorations).toHaveLength(3);
    });
  });

  describe('Garden Whisper theme', () => {
    const theme = letterThemes.find(t => t.id === 'garden-whisper');

    it('should exist', () => {
      expect(theme).toBeDefined();
    });

    it('should have soft pastel color palette', () => {
      expect(theme.coverPage.background).toContain('#E8F5E9');
      expect(theme.letterPage.paperColor).toBe('#FFFEF7');
    });

    it('should have wildflower-meadow centerpiece', () => {
      expect(theme.coverPage.centerpiece).toBe('wildflower-meadow');
    });

    it('should have botanical frame', () => {
      expect(theme.coverPage.frame).toBe('botanical');
    });

    it('should have green/pink accents', () => {
      expect(theme.letterPage.accentColor).toBe('#66BB6A');
      const decorationColors = theme.letterPage.decorations.map(d => d.color);
      expect(decorationColors).toContain('#E91E63'); // pink
      expect(decorationColors).toContain('#4CAF50'); // green
    });
  });

  describe('Eternal Gold theme', () => {
    const theme = letterThemes.find(t => t.id === 'eternal-gold');

    it('should exist', () => {
      expect(theme).toBeDefined();
    });

    it('should have ivory/gold color palette', () => {
      expect(theme.coverPage.background).toContain('#F5F5DC');
      expect(theme.letterPage.paperColor).toBe('#FFFFF0');
    });

    it('should have gold-ornament centerpiece', () => {
      expect(theme.coverPage.centerpiece).toBe('gold-ornament');
    });

    it('should have baroque frame', () => {
      expect(theme.coverPage.frame).toBe('baroque');
    });

    it('should have gold decorations', () => {
      const decorationColors = theme.letterPage.decorations.map(d => d.color);
      expect(decorationColors).toContain('#DAA520'); // goldenrod
      expect(decorationColors).toContain('#B8860B'); // dark goldenrod
      expect(decorationColors).toContain('#D4AF37'); // metallic gold
    });
  });
});

describe('getThemeById', () => {
  it('should return theme for valid id', () => {
    const theme = getThemeById('vintage-love');
    expect(theme).toBeDefined();
    expect(theme.id).toBe('vintage-love');
    expect(theme.name).toBe('Vintage Love');
  });

  it('should return theme for garden-whisper', () => {
    const theme = getThemeById('garden-whisper');
    expect(theme).toBeDefined();
    expect(theme.id).toBe('garden-whisper');
    expect(theme.name).toBe('Garden Whisper');
  });

  it('should return theme for eternal-gold', () => {
    const theme = getThemeById('eternal-gold');
    expect(theme).toBeDefined();
    expect(theme.id).toBe('eternal-gold');
    expect(theme.name).toBe('Eternal Gold');
  });

  it('should return null for invalid id', () => {
    const theme = getThemeById('nonexistent-theme');
    expect(theme).toBeNull();
  });

  it('should return null for null input', () => {
    const theme = getThemeById(null);
    expect(theme).toBeNull();
  });

  it('should return null for undefined input', () => {
    const theme = getThemeById(undefined);
    expect(theme).toBeNull();
  });

  it('should return null for non-string input', () => {
    const theme = getThemeById(123);
    expect(theme).toBeNull();
  });
});
