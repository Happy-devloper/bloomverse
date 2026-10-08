/**
 * Basic verification tests for placementEngine
 * Tests the initializeBasePositions function for task 2.1
 */

import { initializeBasePositions, hashCode } from '../placementEngine.js';

describe('initializeBasePositions', () => {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const seed = 12345;

  describe('Classic Round Layout (Requirement 7.1)', () => {
    test('should create circular cluster with elliptical distribution', () => {
      const flowerIds = ['rose1', 'tulip1', 'lily1', 'orchid1', 'daisy1'];
      const positions = initializeBasePositions(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(5);
      
      // Verify all positions have required fields
      positions.forEach(pos => {
        expect(pos).toHaveProperty('id');
        expect(pos).toHaveProperty('x');
        expect(pos).toHaveProperty('y');
        expect(pos).toHaveProperty('scale', 1.0);
        expect(pos).toHaveProperty('rotation', 0);
        expect(pos).toHaveProperty('zIndex', 0);
        expect(pos).toHaveProperty('size', 150);
      });

      // Verify positions are distributed in a roughly circular pattern
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      
      positions.forEach(pos => {
        const distanceX = Math.abs(pos.x - centerX);
        const distanceY = Math.abs(pos.y - centerY);
        
        // Should be within reasonable bounds for circular distribution
        expect(distanceX).toBeGreaterThan(0);
        expect(distanceX).toBeLessThan(400);
        expect(distanceY).toBeGreaterThan(0);
        expect(distanceY).toBeLessThan(300);
      });
    });

    test('should use flower IDs in returned positions', () => {
      const flowerIds = ['rose1', 'tulip1', 'lily1'];
      const positions = initializeBasePositions(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight,
        seed
      );

      const positionIds = positions.map(p => p.id);
      expect(positionIds).toEqual(flowerIds);
    });
  });

  describe('Luxury Cascade Layout (Requirement 7.2)', () => {
    test('should create flowing downward cascade with row staggering', () => {
      const flowerIds = ['rose1', 'tulip1', 'lily1', 'orchid1', 'daisy1', 'peony1'];
      const positions = initializeBasePositions(
        flowerIds,
        'cascade',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(6);

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // First 3 flowers should be in row 0
      expect(positions[0].y).toBe(centerY - 100);
      expect(positions[1].y).toBe(centerY - 100);
      expect(positions[2].y).toBe(centerY - 100);

      // Next 3 flowers should be in row 1, lower than row 0
      expect(positions[3].y).toBe(centerY - 100 + 120);
      expect(positions[4].y).toBe(centerY - 100 + 120);
      expect(positions[5].y).toBe(centerY - 100 + 120);

      // Verify staggering: row 1 should have x offset
      const row0XPositions = [positions[0].x, positions[1].x, positions[2].x];
      const row1XPositions = [positions[3].x, positions[4].x, positions[5].x];
      
      // Row 1 has 20px stagger offset
      expect(row1XPositions[0]).toBe(row0XPositions[0] + 20);
    });
  });

  describe('Minimal Modern Layout (Requirement 7.3)', () => {
    test('should create tight vertical grouping', () => {
      const flowerIds = ['rose1', 'tulip1', 'lily1', 'orchid1'];
      const positions = initializeBasePositions(
        flowerIds,
        'modern',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(4);

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Verify alternating left/right positioning
      expect(positions[0].x).toBe(centerX - 80); // Even index: left
      expect(positions[1].x).toBe(centerX + 80); // Odd index: right
      expect(positions[2].x).toBe(centerX - 80); // Even index: left
      expect(positions[3].x).toBe(centerX + 80); // Odd index: right

      // Verify vertical spacing (75px intervals)
      expect(positions[0].y).toBe(centerY - 150);
      expect(positions[1].y).toBe(centerY - 150 + 75);
      expect(positions[2].y).toBe(centerY - 150 + 150);
      expect(positions[3].y).toBe(centerY - 150 + 225);
    });
  });

  describe('Heart Shape Layout (Requirement 7.4)', () => {
    test('should position flowers along parametric heart curve', () => {
      const flowerIds = ['rose1', 'tulip1', 'lily1', 'orchid1', 'daisy1'];
      const positions = initializeBasePositions(
        flowerIds,
        'heart',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(5);

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Verify positions follow heart shape characteristics
      positions.forEach(pos => {
        // Heart shape should be centered around canvas center
        const distX = pos.x - centerX;
        const distY = pos.y - centerY;
        
        // Heart shape has max width/height around ±400px with scale=25
        expect(Math.abs(distX)).toBeLessThan(450);
        expect(Math.abs(distY)).toBeLessThan(450);
      });

      // Verify positions are distributed around the curve
      const xPositions = positions.map(p => p.x);
      const yPositions = positions.map(p => p.y);
      
      // Should have variation in both x and y
      const xRange = Math.max(...xPositions) - Math.min(...xPositions);
      const yRange = Math.max(...yPositions) - Math.min(...yPositions);
      
      expect(xRange).toBeGreaterThan(100);
      expect(yRange).toBeGreaterThan(100);
    });
  });

  describe('Requirement 7.5: Even distribution within layout', () => {
    test('should distribute flowers evenly in classic layout', () => {
      const flowerIds = Array.from({ length: 8 }, (_, i) => `flower${i}`);
      const positions = initializeBasePositions(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(8);

      // Calculate angles relative to center
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      
      const angles = positions.map(pos => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        return Math.atan2(dy, dx);
      });

      // Angles should be distributed around the circle
      // (not all clustered in one area)
      const angleRange = Math.max(...angles) - Math.min(...angles);
      expect(angleRange).toBeGreaterThan(Math.PI); // At least 180 degrees spread
    });
  });

  describe('Default layout fallback', () => {
    test('should fallback to classic layout for unknown layout type', () => {
      const flowerIds = ['rose1', 'tulip1', 'lily1'];
      const positions = initializeBasePositions(
        flowerIds,
        'unknown-layout',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(3);

      // Should behave like classic layout
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      
      positions.forEach(pos => {
        const distance = Math.hypot(pos.x - centerX, pos.y - centerY);
        expect(distance).toBeGreaterThan(140); // Should be away from center
        expect(distance).toBeLessThan(400);
      });
    });
  });

  describe('Edge cases', () => {
    test('should handle single flower', () => {
      const flowerIds = ['rose1'];
      const positions = initializeBasePositions(
        flowerIds,
        'classic',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(1);
      expect(positions[0].id).toBe('rose1');
      expect(positions[0].x).toBeDefined();
      expect(positions[0].y).toBeDefined();
    });

    test('should handle many flowers', () => {
      const flowerIds = Array.from({ length: 20 }, (_, i) => `flower${i}`);
      const positions = initializeBasePositions(
        flowerIds,
        'cascade',
        canvasWidth,
        canvasHeight,
        seed
      );

      expect(positions).toHaveLength(20);
      
      // All positions should be unique
      const uniquePositions = new Set(
        positions.map(p => `${p.x},${p.y}`)
      );
      expect(uniquePositions.size).toBeGreaterThan(15); // Most should be unique
    });
  });
});

describe('hashCode utility', () => {
  test('should generate consistent hash for same input', () => {
    const input = 'rose,tulip,lily';
    const hash1 = hashCode(input);
    const hash2 = hashCode(input);
    
    expect(hash1).toBe(hash2);
    expect(typeof hash1).toBe('number');
    expect(hash1).toBeGreaterThan(0);
  });

  test('should generate different hashes for different inputs', () => {
    const hash1 = hashCode('rose,tulip,lily');
    const hash2 = hashCode('lily,tulip,rose');
    
    expect(hash1).not.toBe(hash2);
  });
});
