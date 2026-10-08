/**
 * Visual verification script for z-index assignment
 * Run with: node verify-zindex.js
 */

import { calculateFlowerPlacements } from '../placementEngine.js';

console.log('=== Z-Index Assignment Verification ===\n');

// Test 1: Size priority bonus
console.log('Test 1: Size Priority Bonus');
console.log('Expected: Larger flowers (peony, sunflower) should have +10 bonus\n');

const flowers1 = ['orchid', 'rose-rose', 'peony', 'sunflower'];
const positions1 = calculateFlowerPlacements(flowers1, 'modern', 800, 1066);

positions1.forEach(pos => {
  console.log(`  ${pos.id.padEnd(15)} - z-index: ${pos.zIndex}`);
});

// Test 2: Cascade layout adjustments
console.log('\n\nTest 2: Cascade Layout Adjustments');
console.log('Expected: Lower flowers (higher y) should have higher z-index\n');

const flowers2 = ['rose-rose', 'lily', 'peony', 'orchid', 'sunflower', 'hydrangea'];
const positions2 = calculateFlowerPlacements(flowers2, 'cascade', 800, 1066);

positions2.forEach(pos => {
  console.log(`  ${pos.id.padEnd(15)} - y: ${Math.floor(pos.y).toString().padStart(4)}, z-index: ${pos.zIndex}`);
});

// Test 3: Distance from center
console.log('\n\nTest 3: Distance from Center (Classic Layout)');
console.log('Expected: Flowers closer to center should have higher z-index\n');

const flowers3 = ['rose-rose', 'lily', 'peony', 'orchid'];
const positions3 = calculateFlowerPlacements(flowers3, 'classic', 800, 1066);

const centerX = 400;
const centerY = 533;

positions3.forEach(pos => {
  const distance = Math.hypot(pos.x - centerX, pos.y - centerY);
  console.log(`  ${pos.id.padEnd(15)} - distance: ${Math.floor(distance).toString().padStart(4)}, z-index: ${pos.zIndex}`);
});

// Test 4: Non-negative integers
console.log('\n\nTest 4: Non-Negative Integer Verification');
console.log('All z-indices should be non-negative integers\n');

const allLayouts = ['classic', 'cascade', 'modern', 'heart'];
const allFlowers = ['rose-rose', 'lily', 'peony', 'orchid', 'sunflower'];

allLayouts.forEach(layout => {
  const positions = calculateFlowerPlacements(allFlowers, layout, 800, 1066);
  const allValid = positions.every(pos => 
    pos.zIndex >= 0 && 
    Number.isInteger(pos.zIndex) && 
    Number.isFinite(pos.zIndex)
  );
  console.log(`  ${layout.padEnd(10)} - All valid: ${allValid ? '✓' : '✗'}`);
});

console.log('\n=== Verification Complete ===\n');
