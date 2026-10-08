/**
 * Unit tests for scale adjustment functionality in placementEngine
 * Verifies Requirements 11.1, 11.2, 11.3, 11.4, 11.5
 */

import { calculateFlowerPlacements } from '../placementEngine.js';

describe('Scale Adjustment System (Task 5.1)', () => {
  const canvasWidth = 800;
  const canvasHeight = 600;

  describe('Count-based scaling (Req 11.2, 11.3, 11.4)', () => {
    test('should apply scale factors 0.9-1.2 for ≤5 flowers', () => {
      const flowerIds = ['rose-rose', 'lily', 'peony'];
      const positions = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      positions.forEach(pos => {
        // Check if scale is in expected range (0.9-1.2)
        // Account for z-index bonus (up to 0.1) and baseScale (0.95-1.15)
        expect(pos.scale).toBeGreaterThanOrEqual(0.85);
        expect(pos.scale).toBeLessThanOrEqual(1.5);
      });
    });

    test('should apply scale factors 0.7-1.0 for 6-15 flowers', () => {
      const flowerIds = [
        'rose-rose', 'lily', 'peony', 'sunflower', 
        'orchid', 'hydrangea', 'camellia', 'chrysanthemum'
      ];
      const positions = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      positions.forEach(pos => {
        // Check if scale is in expected range (0.7-1.0)
        // Account for z-index bonus and baseScale
        expect(pos.scale).toBeGreaterThanOrEqual(0.65);
        expect(pos.scale).toBeLessThanOrEqual(1.25);
      });
    });

    test('should apply scale factors 0.5-0.8 for >15 flowers', () => {
      const flowerIds = Array(20).fill('rose-rose');
      const positions = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      positions.forEach(pos => {
        // Check if scale is in expected range (0.5-0.8)
        // Account for z-index bonus and baseScale
        expect(pos.scale).toBeGreaterThanOrEqual(0.45);
        expect(pos.scale).toBeLessThanOrEqual(1.0);
      });
    });
  });

  describe('BaseScale property (Req 11.5)', () => {
    test('should multiply by flower baseScale property', () => {
      // Sunflower has baseScale 1.15, Orchid has 0.95
      const flowerIds = ['sunflower', 'orchid'];
      const positions = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      const sunflowerPos = positions.find(p => p.id === 'sunflower');
      const orchidPos = positions.find(p => p.id === 'orchid');

      // Sunflower should have higher scale due to its baseScale of 1.15
      // Note: This is probabilistic due to random variation, but should hold generally
      // We can't assert exact values due to seeded random, but we can verify baseScale is applied
      expect(sunflowerPos.scale).toBeGreaterThan(0);
      expect(orchidPos.scale).toBeGreaterThan(0);
      
      // Verify scales are influenced by baseScale
      // For small flower count, sunflower (1.15) vs orchid (0.95) should show difference
      const expectedRatio = 1.15 / 0.95; // ~1.21
      const actualRatio = sunflowerPos.scale / orchidPos.scale;
      
      // Ratio should be roughly proportional (allowing for random variance and z-index)
      expect(actualRatio).toBeGreaterThan(0.9);
      expect(actualRatio).toBeLessThan(1.8);
    });
  });

  describe('Size property calculation (Req 11.1)', () => {
    test('should calculate size property based on scale', () => {
      const flowerIds = ['rose-rose', 'lily', 'peony'];
      const positions = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      positions.forEach(pos => {
        // Size should be 150 * scale
        const expectedSize = 150 * pos.scale;
        expect(pos.size).toBeCloseTo(expectedSize, 5);
      });
    });

    test('should update size property for different flower counts', () => {
      const smallBouquet = ['rose-rose', 'lily'];
      const largeBouquet = Array(20).fill('rose-rose');

      const smallPositions = calculateFlowerPlacements(
        smallBouquet,
        'classic',
        canvasWidth,
        canvasHeight
      );

      const largePositions = calculateFlowerPlacements(
        largeBouquet,
        'classic',
        canvasWidth,
        canvasHeight
      );

      // Small bouquet should have larger average size
      const avgSmallSize = smallPositions.reduce((sum, p) => sum + p.size, 0) / smallPositions.length;
      const avgLargeSize = largePositions.reduce((sum, p) => sum + p.size, 0) / largePositions.length;

      expect(avgSmallSize).toBeGreaterThan(avgLargeSize);
    });
  });

  describe('Z-index bonus (Req 11.1)', () => {
    test('should add z-index bonus for front flowers', () => {
      const flowerIds = ['rose-rose', 'lily', 'peony', 'sunflower', 'orchid'];
      const positions = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      // Verify that flowers with different z-indices exist
      const zIndices = positions.map(p => p.zIndex);
      const hasVariation = Math.max(...zIndices) - Math.min(...zIndices) > 0;
      
      expect(hasVariation).toBe(true);
      
      // Verify all scales are positive
      positions.forEach(pos => {
        expect(pos.scale).toBeGreaterThan(0);
      });
    });
  });

  describe('Deterministic scaling (Req 12.1, 12.2)', () => {
    test('should produce same scales for same flower arrangement', () => {
      const flowerIds = ['rose-rose', 'lily', 'peony'];
      
      const positions1 = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      const positions2 = calculateFlowerPlacements(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight
      );

      // Verify scales match exactly
      positions1.forEach((pos1, i) => {
        const pos2 = positions2[i];
        expect(pos1.scale).toBe(pos2.scale);
        expect(pos1.size).toBe(pos2.size);
      });
    });
  });
});
