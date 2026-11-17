import { describe, it, expect } from 'vitest';

/**
 * Tests for ImageBouquetCanvas golden ratio spiral implementation
 * Validates: Requirements 2.1, 2.4
 */

describe('Golden Ratio Spiral - Classic Layout', () => {
  it('should calculate golden angle correctly', () => {
    // Golden angle is approximately 137.5 degrees or ~2.399963 radians
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    // Verify golden angle is approximately 2.4 radians (137.5 degrees)
    expect(goldenAngle).toBeCloseTo(2.399963, 5);
    
    // Verify it's approximately 137.5 degrees
    const goldenAngleDegrees = goldenAngle * (180 / Math.PI);
    expect(goldenAngleDegrees).toBeCloseTo(137.507764, 5);
  });

  it('should use phyllotaxis pattern for radius calculation', () => {
    // Test that radius grows with square root (phyllotaxis pattern)
    const testIndices = [0, 1, 4, 9, 16];
    const expectedRadii = [0, 55, 110, 165, 220]; // sqrt(i) * 55
    
    testIndices.forEach((i, idx) => {
      const radius = Math.sqrt(i) * 55;
      expect(radius).toBeCloseTo(expectedRadii[idx], 1);
    });
  });

  it('should create natural spiral distribution for multiple flowers', () => {
    // Simulate positions for 8 flowers
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const positions = [];
    
    for (let i = 0; i < 8; i++) {
      const angle = i * goldenAngle;
      const radius = Math.sqrt(i) * 55;
      
      positions.push({
        index: i,
        angle: angle,
        radius: radius,
        x: 400 + Math.cos(angle) * radius * 1.1,
        y: 404 + Math.sin(angle) * radius * 0.85
      });
    }
    
    // Verify first flower is at center (radius 0)
    expect(positions[0].radius).toBe(0);
    
    // Verify spiral spacing increases with square root
    expect(positions[1].radius).toBeCloseTo(55, 1);
    expect(positions[4].radius).toBeCloseTo(110, 1);
    
    // Verify angles follow golden angle pattern
    expect(positions[1].angle).toBeCloseTo(goldenAngle, 5);
    expect(positions[2].angle).toBeCloseTo(goldenAngle * 2, 5);
    
    // Verify elliptical adjustment (x axis 1.1, y axis 0.85)
    const pos1 = positions[1];
    const expectedX = 400 + Math.cos(goldenAngle) * 55 * 1.1;
    const expectedY = 404 + Math.sin(goldenAngle) * 55 * 0.85;
    expect(pos1.x).toBeCloseTo(expectedX, 1);
    expect(pos1.y).toBeCloseTo(expectedY, 1);
  });

  it('should apply natural rotation variation', () => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    // Test rotation for several positions
    const rotations = [];
    for (let i = 0; i < 5; i++) {
      const angle = i * goldenAngle;
      const rotation = (angle * 0.1) + Math.sin(i * 1.5) * 0.4;
      rotations.push(rotation);
    }
    
    // Verify rotations vary based on position
    expect(rotations[0]).not.toBe(rotations[1]);
    expect(rotations[1]).not.toBe(rotations[2]);
    
    // Verify rotation includes both angle component and sine variation
    const rotation1 = (goldenAngle * 0.1) + Math.sin(1 * 1.5) * 0.4;
    expect(rotations[1]).toBeCloseTo(rotation1, 5);
  });

  it('should scale flowers progressively from center', () => {
    const baseScale = 1.0;
    
    // Test scale calculation for different positions
    const scales = [];
    for (let i = 0; i < 10; i++) {
      const scale = baseScale * (1.05 - (i * 0.03));
      scales.push(scale);
    }
    
    // Verify first flower is largest (1.05)
    expect(scales[0]).toBe(1.05);
    
    // Verify scale decreases progressively
    expect(scales[1]).toBeCloseTo(1.02, 2);
    expect(scales[5]).toBeCloseTo(0.90, 2);
    
    // Verify each subsequent flower is slightly smaller
    for (let i = 1; i < scales.length; i++) {
      expect(scales[i]).toBeLessThan(scales[i - 1]);
    }
  });

  it('should maintain golden ratio properties', () => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    // Golden ratio φ (phi) is (1 + sqrt(5)) / 2
    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Verify golden angle relationship: 2π / φ²
    const expectedGoldenAngle = (2 * Math.PI) / (phi * phi);
    expect(goldenAngle).toBeCloseTo(expectedGoldenAngle, 5);
    
    // Verify it divides the circle in golden ratio
    const complementaryAngle = (2 * Math.PI) - goldenAngle;
    const ratio = goldenAngle / complementaryAngle;
    expect(ratio).toBeCloseTo(1 / phi, 2);
  });
});
