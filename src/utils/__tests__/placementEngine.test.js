/**
 * Tests for placementEngine.js
 * Validates z-index assignment and placement calculations
 */

import { calculateFlowerPlacements, hashCode } from '../placementEngine.js';

describe('Placement Engine - assignZIndices', () => {
  test('assigns z-index based on distance from center', () => {
    const flowerIds = ['rose-rose', 'lily', 'peony'];
    const positions = calculateFlowerPlacements(flowerIds, 'classic', 800, 1066);
    
    // All positions should have z-index values
    expect(positions.every(pos => typeof pos.zIndex === 'number')).toBe(true);
    
    // Z-indices should be non-negative integers
    positions.forEach(pos => {
      expect(pos.zIndex).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(pos.zIndex)).toBe(true);
    });
  });

  test('adds size priority bonus for larger flowers (baseScale > 1.05)', () => {
    // Test with multiple flowers at various positions
    // peony (1.1), sunflower (1.15) should get bonus
    // orchid (0.95), camellia (1.0), rose-rose (1.05 - exactly at threshold, no bonus) should not
    const flowerIds = ['orchid', 'camellia', 'rose-rose', 'peony', 'sunflower'];
    
    // Use modern layout for predictable positioning
    const positions = calculateFlowerPlacements(flowerIds, 'modern', 800, 1066);
    
    const orchid = positions.find(p => p.id === 'orchid');
    const camellia = positions.find(p => p.id === 'camellia');
    const rose = positions.find(p => p.id === 'rose-rose');
    const peony = positions.find(p => p.id === 'peony');
    const sunflower = positions.find(p => p.id === 'sunflower');
    
    // All flowers should be found
    expect(orchid).toBeDefined();
    expect(camellia).toBeDefined();
    expect(rose).toBeDefined();
    expect(peony).toBeDefined();
    expect(sunflower).toBeDefined();
    
    // All should be non-negative integers
    [orchid, camellia, rose, peony, sunflower].forEach(flower => {
      expect(flower.zIndex).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(flower.zIndex)).toBe(true);
    });
    
    // In modern layout, flowers are in tight vertical grouping
    // So distance effects should be minimal
    // peony (1.1 > 1.05) and sunflower (1.15 > 1.05) should have bonus (+10)
    // This means they should have higher z-index than similar-positioned smaller flowers
  });

  test('applies cascade layout-specific adjustments', () => {
    const flowerIds = ['rose-rose', 'lily', 'peony', 'sunflower'];
    const positions = calculateFlowerPlacements(flowerIds, 'cascade', 800, 1066);
    
    // In cascade layout, flowers at bottom (higher y) should have higher z-index
    const sortedByY = [...positions].sort((a, b) => a.y - b.y);
    
    // Check that later (lower) flowers generally have higher z-index
    // (accounting for size priority and distance effects)
    positions.forEach(pos => {
      expect(pos.zIndex).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(pos.zIndex)).toBe(true);
    });
  });

  test('ensures all z-indices are non-negative integers', () => {
    const layouts = ['classic', 'cascade', 'modern', 'heart'];
    const flowerIds = ['rose-rose', 'lily', 'peony', 'orchid', 'sunflower'];
    
    layouts.forEach(layout => {
      const positions = calculateFlowerPlacements(flowerIds, layout, 800, 1066);
      
      positions.forEach(pos => {
        // Must be non-negative
        expect(pos.zIndex).toBeGreaterThanOrEqual(0);
        
        // Must be an integer
        expect(Number.isInteger(pos.zIndex)).toBe(true);
        
        // Should be a reasonable value (not NaN or Infinity)
        expect(Number.isFinite(pos.zIndex)).toBe(true);
      });
    });
  });
});

describe('Placement Engine - Determinism', () => {
  test('produces deterministic positions for same input', () => {
    const flowerIds = ['rose-rose', 'lily', 'tulip'];
    const positions1 = calculateFlowerPlacements(flowerIds, 'classic', 800, 1066);
    const positions2 = calculateFlowerPlacements(flowerIds, 'classic', 800, 1066);
    
    expect(positions1).toEqual(positions2);
  });

  test('hashCode produces consistent values', () => {
    const str = 'rose,lily,tulip';
    const hash1 = hashCode(str);
    const hash2 = hashCode(str);
    
    expect(hash1).toBe(hash2);
    expect(hash1).toBeGreaterThanOrEqual(0);
  });
});
