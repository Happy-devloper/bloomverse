/**
 * Letter Themes Data File
 * 
 * This file defines romantic themes for love letters, each with coordinated
 * cover page and letter page designs.
 * 
 * @typedef {Object} CoverPageConfig
 * @property {'illustration' | 'gradient' | 'image'} type - Cover page type
 * @property {string} background - CSS gradient or color for background
 * @property {string} centerpiece - CoverIllustration component type
 * @property {string} frame - CoverFrame component type
 * @property {Object} text - Text overlay configuration
 * @property {'top' | 'bottom' | 'center'} text.position - Position of text on cover
 * @property {string} text.color - Text color
 * @property {boolean} text.shadow - Whether to apply drop shadow for readability
 * 
 * @typedef {Object} DecorationConfig
 * @property {string} type - Decoration component type
 * @property {string} position - Position on page ('top-right', 'bottom-left', 'random', etc.)
 * @property {number} opacity - Opacity value between 0 and 1
 * @property {string} [color] - Optional color override
 * @property {'small' | 'medium' | 'large'} [size] - Optional size override
 * 
 * @typedef {Object} LetterPageConfig
 * @property {string} paperColor - Base paper color
 * @property {string} paperTexture - Paper texture class ('cream-subtle', 'linen', 'parchment')
 * @property {string} edgeStyle - SVG clipPath reference for paper edges
 * @property {DecorationConfig[]} decorations - Array of decoration configurations
 * @property {string} accentColor - Color for borders and highlights
 * @property {string} textColor - Main text color
 * 
 * @typedef {Object} LetterTheme
 * @property {string} id - Unique theme identifier (kebab-case)
 * @property {string} name - Display name for the theme
 * @property {string} description - Brief description shown during selection
 * @property {CoverPageConfig} coverPage - Cover page configuration
 * @property {LetterPageConfig} letterPage - Letter page configuration
 */

/**
 * Array of available letter themes.
 * Each theme includes coordinated cover page and letter page designs.
 * 
 * Themes will be populated in subsequent tasks:
 * - Passionate Rose (burgundy/red, roses theme)
 * - Moonlight Romance (blue/purple, night sky theme)
 * - Vintage Love (sepia/cream, nostalgic theme)
 * - Garden Whisper (soft pastels, botanical theme)
 * - Eternal Gold (ivory/gold, luxury theme)
 * 
 * @type {LetterTheme[]}
 */
export const letterThemes = [
  // Task 1.2: Passionate Rose Theme
  {
    id: 'passionate-rose',
    name: 'Passionate Rose',
    description: 'Deep burgundy roses and romantic red hearts for intense, passionate, classic romance',
    
    coverPage: {
      type: 'gradient',
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF6B6B 100%)',
      centerpiece: 'rose-bouquet',
      frame: 'ornate-gold',
      text: {
        position: 'bottom',
        color: '#FFFFFF',
        shadow: true
      }
    },
    
    letterPage: {
      paperColor: '#FFF5F5',
      paperTexture: 'cream-subtle',
      edgeStyle: 'smooth',
      
      decorations: [
        {
          type: 'rose-petals',
          position: 'top-right',
          opacity: 0.3,
          color: '#DC143C',
          size: 'medium'
        },
        {
          type: 'rose-petals',
          position: 'bottom-left',
          opacity: 0.25,
          color: '#8B0000',
          size: 'small'
        },
        {
          type: 'rose-corner',
          position: 'top-left',
          opacity: 0.4,
          color: '#8B0000',
          size: 'large'
        }
      ],
      
      accentColor: '#8B0000',
      textColor: '#2C1810'
    }
  },
  
  // Task 1.3: Moonlight Romance Theme
  {
    id: 'moonlight-romance',
    name: 'Moonlight Romance',
    description: 'Dreamy night sky with crescent moon and stars for ethereal, poetic romance',
    
    coverPage: {
      type: 'gradient',
      background: 'linear-gradient(180deg, #1a1f3a 0%, #2d2463 40%, #4a306d 70%, #6a4c93 100%)',
      centerpiece: 'moon-stars',
      frame: 'simple-border',
      text: {
        position: 'bottom',
        color: '#E6E6FA',
        shadow: true
      }
    },
    
    letterPage: {
      paperColor: '#F0F4FF',
      paperTexture: 'linen',
      edgeStyle: 'smooth',
      
      decorations: [
        {
          type: 'constellation',
          position: 'top-right',
          opacity: 0.25,
          color: '#6a4c93',
          size: 'medium'
        },
        {
          type: 'stars-scattered',
          position: 'bottom-left',
          opacity: 0.2,
          color: '#4a306d',
          size: 'small'
        },
        {
          type: 'crescent-moon',
          position: 'top-left',
          opacity: 0.3,
          color: '#C0C0C0',
          size: 'large'
        }
      ],
      
      accentColor: '#6a4c93',
      textColor: '#2C2645'
    }
  },
  
  // Task 1.4: Vintage Love Theme
  {
    id: 'vintage-love',
    name: 'Vintage Love',
    description: 'Sepia tones and nostalgic aesthetic with dried flowers for timeless, vintage romance',
    
    coverPage: {
      type: 'gradient',
      background: 'linear-gradient(135deg, #D4A574 0%, #E8D5B7 50%, #F5EBD9 100%)',
      centerpiece: 'dried-flowers',
      frame: 'botanical',
      text: {
        position: 'bottom',
        color: '#5D4E37',
        shadow: false
      }
    },
    
    letterPage: {
      paperColor: '#FAF4E8',
      paperTexture: 'parchment',
      edgeStyle: 'torn',
      
      decorations: [
        {
          type: 'watercolor-stain',
          position: 'top-right',
          opacity: 0.2,
          color: '#D4A574',
          size: 'large'
        },
        {
          type: 'dried-flower-corner',
          position: 'bottom-left',
          opacity: 0.4,
          color: '#8B7355',
          size: 'medium'
        },
        {
          type: 'sepia-flourish',
          position: 'top-left',
          opacity: 0.3,
          color: '#A0826D',
          size: 'small'
        }
      ],
      
      accentColor: '#8B7355',
      textColor: '#4A3C28'
    }
  },
  
  // Task 1.5: Garden Whisper Theme
  {
    id: 'garden-whisper',
    name: 'Garden Whisper',
    description: 'Soft pastels with wildflower meadow for gentle, nature-inspired romance',
    
    coverPage: {
      type: 'gradient',
      background: 'linear-gradient(135deg, #E8F5E9 0%, #F8E8EE 50%, #FFF9E6 100%)',
      centerpiece: 'wildflower-meadow',
      frame: 'botanical',
      text: {
        position: 'bottom',
        color: '#2E7D32',
        shadow: false
      }
    },
    
    letterPage: {
      paperColor: '#FFFEF7',
      paperTexture: 'cream-subtle',
      edgeStyle: 'smooth',
      
      decorations: [
        {
          type: 'wildflower-cluster',
          position: 'top-right',
          opacity: 0.35,
          color: '#E91E63',
          size: 'medium'
        },
        {
          type: 'botanical-illustration',
          position: 'bottom-left',
          opacity: 0.3,
          color: '#4CAF50',
          size: 'small'
        },
        {
          type: 'watercolor-wash',
          position: 'top-left',
          opacity: 0.15,
          color: '#C8E6C9',
          size: 'large'
        }
      ],
      
      accentColor: '#66BB6A',
      textColor: '#2C3E2F'
    }
  },
  
  // Task 1.6: Eternal Gold Theme
  {
    id: 'eternal-gold',
    name: 'Eternal Gold',
    description: 'Ivory and gold luxury with ornate details for elegant, timeless romance',
    
    coverPage: {
      type: 'gradient',
      background: 'linear-gradient(135deg, #F5F5DC 0%, #FFFEF0 50%, #FFF8E1 100%)',
      centerpiece: 'gold-ornament',
      frame: 'baroque',
      text: {
        position: 'bottom',
        color: '#B8860B',
        shadow: true
      }
    },
    
    letterPage: {
      paperColor: '#FFFFF0',
      paperTexture: 'linen',
      edgeStyle: 'smooth',
      
      decorations: [
        {
          type: 'gold-leaf',
          position: 'top-right',
          opacity: 0.4,
          color: '#DAA520',
          size: 'small'
        },
        {
          type: 'ornate-corner',
          position: 'bottom-left',
          opacity: 0.35,
          color: '#B8860B',
          size: 'large'
        },
        {
          type: 'baroque-flourish',
          position: 'top-left',
          opacity: 0.3,
          color: '#D4AF37',
          size: 'medium'
        }
      ],
      
      accentColor: '#B8860B',
      textColor: '#3E2723'
    }
  }
];

/**
 * Retrieves a letter theme by its ID.
 * 
 * @param {string} id - The theme ID to search for
 * @returns {LetterTheme | null} - The matching theme object, or null if not found
 * 
 * @example
 * const theme = getThemeById('passionate-rose');
 * if (theme) {
 *   console.log(theme.name); // "Passionate Rose"
 * }
 */
export function getThemeById(id) {
  if (!id || typeof id !== 'string') {
    return null;
  }
  
  const theme = letterThemes.find(theme => theme.id === id);
  return theme || null;
}
