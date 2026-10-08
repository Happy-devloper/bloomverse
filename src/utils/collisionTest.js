/**
 * Quick validation test for collision resolution
 * This is a temporary test file to verify the resolveCollisions function works
 */

import { calculateFlowerPlacements } from './placementEngine.js';

// Test 1: Dense bouquet should have collision resolution applied
const denseFlowers = Array(15).fill(0).map((_, i) => `flower-${i}`);
const positions = calculateFlowerPlacements(denseFlowers, 'classic', 800, 1066);

console.log('Testing collision resolution with 15 flowers in classic layout');
console.log('Sample positions:', positions.slice(0, 3).map(p => ({
  id: p.id,
  x: p.x.toFixed(2),
  y: p.y.toFixed(2),
  scale: p.scale.toFixed(2),
  size: p.size.toFixed(2)
})));

// Check for overlaps
let overlapCount = 0;
let minDistanceViolations = 0;
const minSpacing = 0.1; // 10% spacing

for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const p1 = positions[i];
    const p2 = positions[j];
    
    const r1 = (p1.size * p1.scale) / 2;
    const r2 = (p2.size * p2.scale) / 2;
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.hypot(dx, dy);
    
    const minDistance = (r1 + r2) * (1 + minSpacing);
    
    if (distance < minDistance) {
      minDistanceViolations++;
    }
    
    // Check for excessive overlap (more than 50%)
    const touchDistance = r1 + r2;
    if (distance < touchDistance * 0.5) {
      overlapCount++;
    }
  }
}

console.log('\nCollision Resolution Results:');
console.log(`Total flower pairs: ${(positions.length * (positions.length - 1)) / 2}`);
console.log(`Minimum distance violations: ${minDistanceViolations}`);
console.log(`Excessive overlaps (>50%): ${overlapCount}`);

if (minDistanceViolations === 0 && overlapCount === 0) {
  console.log('✓ Collision resolution working perfectly!');
} else if (overlapCount === 0) {
  console.log('✓ No excessive overlaps, but some minor spacing issues');
} else {
  console.log('✗ Collision resolution needs adjustment');
}
