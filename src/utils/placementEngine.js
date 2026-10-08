/**
 * Flower Placement Engine
 * 
 * This module provides intelligent flower positioning for bouquet arrangements.
 * It calculates optimal positions, scales, rotations, and depth layers for flowers
 * based on the selected layout type and flower collection.
 * 
 * Requirements: 6.1, 12.1, 12.2, 12.5
 */

import { flowers } from '../data/flowers.js';

/**
 * FlowerPosition structure
 * @typedef {Object} FlowerPosition
 * @property {string} id - Flower identifier
 * @property {number} x - X coordinate in canvas space
 * @property {number} y - Y coordinate in canvas space
 * @property {number} scale - Final scale factor
 * @property {number} rotation - Rotation in radians
 * @property {number} zIndex - Depth layer (higher = front)
 * @property {number} size - Calculated diameter for collision detection
 */

/**
 * Generates a deterministic hash code from a string
 * Used as a seed for deterministic randomization
 * 
 * @param {string} str - Input string to hash
 * @returns {number} Positive integer hash code
 */
export function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Creates a seeded random number generator
 * 
 * @param {number} seed - Seed value for deterministic randomization
 * @returns {function(): number} Function that returns pseudo-random numbers between 0 and 1
 */
function createSeededRandom(seed) {
  let value = seed;
  return function() {
    // Linear congruential generator algorithm
    value = (value * 1103515245 + 12345) & 0x7fffffff;
    return value / 0x7fffffff;
  };
}

/**
 * Initializes base flower positions based on layout type
 * 
 * Creates initial x,y coordinates for each flower according to the selected
 * layout pattern. Does not apply scale, rotation, or depth calculations.
 * 
 * @param {string[]} flowerIds - Array of flower identifiers
 * @param {string} layoutType - Layout style ('classic', 'cascade', 'modern', 'heart')
 * @param {number} canvasWidth - Canvas width in pixels
 * @param {number} canvasHeight - Canvas height in pixels
 * @param {number} seed - Seed value for deterministic positioning
 * @returns {FlowerPosition[]} Array of initialized flower positions with x,y coordinates
 */
export function initializeBasePositions(
  flowerIds,
  layoutType,
  canvasWidth,
  canvasHeight,
  seed
) {
  const count = flowerIds.length;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const positions = [];

  for (let i = 0; i < count; i++) {
    const flowerId = flowerIds[i];
    let x, y;

    switch (layoutType) {
      case 'classic':
        // Circular cluster formation (Requirements 7.1)
        {
          const angle = (i / count) * Math.PI * 2 + seed * 0.001;
          const radius = 150 + Math.sqrt(i) * 40;
          x = centerX + Math.cos(angle) * radius;
          y = centerY + Math.sin(angle) * radius * 0.85; // Elliptical
        }
        break;

      case 'cascade':
        // Flowing downward cascade (Requirements 7.2)
        {
          const row = Math.floor(i / 3); // 3 flowers per row
          const col = i % 3;
          x = centerX + (col - 1) * 140 + (row % 2) * 20; // Stagger rows
          y = centerY - 100 + row * 120;
        }
        break;

      case 'modern':
        // Tight vertical grouping (Requirements 7.3)
        x = centerX + (i % 2 === 0 ? -80 : 80);
        y = centerY - 150 + i * 75;
        break;

      case 'heart':
        // Parametric heart curve (Requirements 7.4)
        {
          const t = (i / count) * Math.PI * 2;
          const scale = 25;
          x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
          y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) 
                    - 2 * Math.cos(3*t) - Math.cos(4*t));
        }
        break;

      default:
        // Fallback to classic layout
        {
          const angle = (i / count) * Math.PI * 2 + seed * 0.001;
          const radius = 150 + Math.sqrt(i) * 40;
          x = centerX + Math.cos(angle) * radius;
          y = centerY + Math.sin(angle) * radius * 0.85;
        }
    }

    positions.push({
      id: flowerId,
      x,
      y,
      scale: 1.0, // Will be calculated later
      rotation: 0, // Will be calculated later
      zIndex: 0, // Will be calculated later
      size: 150 // Base assumption: flowers are ~150px, will be adjusted
    });
  }

  return positions;
}

/**
 * Resolves collisions between flowers by pushing overlapping flowers apart
 * 
 * Iteratively detects and resolves overlapping flower positions. Back flowers
 * (lower z-index) move more than front flowers to preserve depth hierarchy.
 * Terminates early if no collisions are detected.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.5
 * 
 * @param {FlowerPosition[]} positions - Array of flower positions to adjust
 * @returns {FlowerPosition[]} Modified positions array with collisions resolved
 */
function resolveCollisions(positions) {
  const maxIterations = 10;
  const minSpacing = 0.1; // 10% of flower diameter (Requirement 10.3)
  
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let hadCollision = false;
    
    // Check all pairs of flowers for collisions
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        
        // Calculate effective radii from size and scale
        const r1 = (p1.size * p1.scale) / 2;
        const r2 = (p2.size * p2.scale) / 2;
        
        // Check distance between centers
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.hypot(dx, dy);
        
        // Minimum required spacing (10% spacing buffer)
        const minDistance = (r1 + r2) * (1 + minSpacing);
        
        // Detect collision (Requirement 10.1)
        if (distance < minDistance && distance > 0) {
          hadCollision = true;
          
          // Calculate push-apart vector
          const overlap = minDistance - distance;
          const angle = Math.atan2(dy, dx);
          
          // Push flowers apart proportionally to their z-index
          // Back flowers (lower z-index) move more than front flowers (Requirement 10.2)
          const ratio1 = (100 - p1.zIndex) / 200;
          const ratio2 = (100 - p2.zIndex) / 200;
          
          // Apply position adjustments to reduce overlap (Requirement 10.2)
          p1.x -= Math.cos(angle) * overlap * ratio1;
          p1.y -= Math.sin(angle) * overlap * ratio1;
          p2.x += Math.cos(angle) * overlap * ratio2;
          p2.y += Math.sin(angle) * overlap * ratio2;
        }
      }
    }
    
    // Terminate early if no collisions detected (Requirement 10.5)
    if (!hadCollision) break;
  }
  
  return positions;
}

/**
 * Main flower placement calculation function
 * 
 * Calculates optimal positions, scales, rotations, and depth layers for flowers
 * based on the selected layout type and flower collection. The algorithm produces
 * deterministic results for the same input parameters.
 * 
 * @param {string[]} flowerIds - Array of flower identifiers
 * @param {string} layoutType - Layout style ('classic', 'cascade', 'modern', 'heart')
 * @param {number} canvasWidth - Canvas width in pixels
 * @param {number} canvasHeight - Canvas height in pixels
 * @returns {FlowerPosition[]} Array of calculated flower positions
 */
export function calculateFlowerPlacements(
  flowerIds,
  layoutType,
  canvasWidth,
  canvasHeight
) {
  // Validate inputs
  if (!flowerIds || flowerIds.length === 0) {
    return [];
  }

  const count = flowerIds.length;
  
  // Create seeded random generator for deterministic results
  // Using the concatenated flower IDs as seed ensures same arrangement for same flowers
  const seed = hashCode(flowerIds.join(','));
  const seededRandom = createSeededRandom(seed);

  // Step 1: Initialize base positions based on layout type
  const positions = initializeBasePositions(
    flowerIds,
    layoutType,
    canvasWidth,
    canvasHeight,
    seed
  );

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Step 2: Assign z-index layers for depth
  assignZIndices(positions, layoutType, centerX, centerY, flowers);

  // Step 3: Apply scale adjustments based on flower count
  applyScaleAdjustments(positions, count, seededRandom, flowers);

  // Step 4: Calculate rotation angles
  calculateRotations(positions, layoutType, count, seed);

  // Step 5: Detect and resolve collisions
  resolveCollisions(positions);

  // Step 6: Validate boundaries (not implemented yet)
  // This will be implemented in a later task

  // Step 7: Sort by y-coordinate for proper rendering order
  positions.sort((a, b) => a.y - b.y);

  return positions;
}

/**
 * Assigns z-index values for depth layering
 * 
 * @param {FlowerPosition[]} positions - Array of flower positions
 * @param {string} layoutType - Layout style
 * @param {number} centerX - Canvas center X coordinate
 * @param {number} centerY - Canvas center Y coordinate
 * @param {Object[]} flowerData - Array of flower data objects with baseScale property
 */
function assignZIndices(positions, layoutType, centerX, centerY, flowerData = []) {
  positions.forEach((pos, i) => {
    let zIndex = 0;
    
    // Base z-index on distance from center (closer = higher)
    const distanceFromCenter = Math.hypot(
      pos.x - centerX, 
      pos.y - centerY
    );
    zIndex = Math.max(0, 100 - Math.floor(distanceFromCenter / 5));
    
    // Add size priority bonus for larger flowers (baseScale > 1.05)
    const flower = flowerData.find(f => f.id === pos.id);
    const sizePriority = (flower?.baseScale > 1.05) ? 10 : 0;
    zIndex += sizePriority;
    
    // Layout-specific adjustments
    if (layoutType === 'cascade') {
      // Flowers at top are behind flowers at bottom
      zIndex += Math.floor((pos.y - centerY) / 20);
    }
    
    // Ensure z-index is a non-negative integer
    pos.zIndex = Math.max(0, Math.floor(zIndex));
  });
}

/**
 * Applies dynamic scale adjustments based on flower count
 * 
 * @param {FlowerPosition[]} positions - Array of flower positions
 * @param {number} flowerCount - Total number of flowers
 * @param {function(): number} seededRandom - Seeded random number generator
 * @param {Object[]} flowerData - Array of flower data objects with baseScale property
 */
function applyScaleAdjustments(positions, flowerCount, seededRandom, flowerData = []) {
  positions.forEach((pos) => {
    let scaleFactor = 1.0;
    
    // Count-based base scaling (Requirements 11.2, 11.3, 11.4)
    if (flowerCount <= 5) {
      scaleFactor = 0.9 + seededRandom() * 0.3; // 0.9 to 1.2
    } else if (flowerCount <= 15) {
      scaleFactor = 0.7 + seededRandom() * 0.3; // 0.7 to 1.0
    } else {
      scaleFactor = 0.5 + seededRandom() * 0.3; // 0.5 to 0.8
    }
    
    // Apply flower's baseScale property (Requirement 11.5)
    const flower = flowerData.find(f => f.id === pos.id);
    const baseScale = flower?.baseScale || 1.0;
    scaleFactor *= baseScale;
    
    // Front flowers slightly larger
    const zIndexBonus = (pos.zIndex / 100) * 0.1;
    scaleFactor += zIndexBonus;
    
    pos.scale = scaleFactor;
    
    // Update size property based on final scale (Requirement 11.1)
    // Base flower size is 150px, scaled by the calculated factor
    pos.size = 150 * scaleFactor;
  });
}

/**
 * Calculates rotation angles for natural variation
 * 
 * @param {FlowerPosition[]} positions - Array of flower positions
 * @param {string} layoutType - Layout style
 * @param {number} totalCount - Total number of flowers
 * @param {number} seed - Seed for deterministic randomization
 */
function calculateRotations(positions, layoutType, totalCount, seed) {
  positions.forEach((pos, index) => {
    let rotation = 0;
    
    // Base random variation within range using deterministic seed
    const itemSeed = hashCode(pos.id + index);
    const randomAngle = (itemSeed % 60 - 30) * (Math.PI / 180); // -30° to +30°
    
    if (layoutType === 'cascade') {
      // Flowers tilt in direction of cascade flow
      const row = Math.floor(index / 3);
      rotation = (row % 2 === 0 ? -15 : 15) * (Math.PI / 180);
      rotation += randomAngle * 0.5;
    } 
    else if (layoutType === 'heart') {
      // Flowers follow the heart curve tangent
      const t = (index / totalCount) * Math.PI * 2;
      rotation = t + Math.PI / 2; // Perpendicular to curve
      rotation += randomAngle * 0.3;
    } 
    else {
      // Classic and modern: random within safe range
      rotation = randomAngle;
    }
    
    // Clamp to maintain bloom visibility (-45° to +45°)
    rotation = Math.max(-Math.PI/4, Math.min(Math.PI/4, rotation));
    
    pos.rotation = rotation;
  });
}
