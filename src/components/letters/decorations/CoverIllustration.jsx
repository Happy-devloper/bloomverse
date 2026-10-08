import React from 'react';

/**
 * Cover Illustration Component - Displays romantic centerpiece graphics
 */
export default function CoverIllustration({ type, size = 200, className = '' }) {
  const illustrations = {
    'rose-bouquet': (
      <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
        <g fill="#DC143C">
          {/* Roses */}
          <circle cx="100" cy="80" r="25" opacity="0.9"/>
          <circle cx="75" cy="100" r="22" opacity="0.85"/>
          <circle cx="125" cy="100" r="22" opacity="0.85"/>
          <circle cx="90" cy="120" r="20" opacity="0.8"/>
          <circle cx="110" cy="120" r="20" opacity="0.8"/>
        </g>
        {/* Stems */}
        <g stroke="#2d5016" strokeWidth="3" fill="none">
          <path d="M 100 105 Q 95 140 90 180"/>
          <path d="M 100 105 Q 105 140 110 180"/>
          <path d="M 75 122 Q 70 150 65 180"/>
        </g>
      </svg>
    ),
    
    'moon-stars': (
      <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
        {/* Crescent Moon */}
        <path d="M 120 50 A 45 45 0 1 0 120 150 A 35 35 0 1 1 120 50" 
              fill="#E6E6FA" opacity="0.9"/>
        {/* Stars */}
        {[
          {x: 60, y: 60}, {x: 160, y: 70}, {x: 50, y: 120},
          {x: 170, y: 130}, {x: 80, y: 160}, {x: 150, y: 50}
        ].map((star, i) => (
          <g key={i}>
            <circle cx={star.x} cy={star.y} r="3" fill="#FFD700" opacity="0.8"/>
            <path d={`M ${star.x} ${star.y-8} L ${star.x} ${star.y+8} M ${star.x-8} ${star.y} L ${star.x+8} ${star.y}`}
                  stroke="#FFD700" strokeWidth="1.5" opacity="0.6"/>
          </g>
        ))}
      </svg>
    ),
    
    'wildflower-meadow': (
      <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
        {/* Wildflowers */}
        {[
          {x: 50, y: 120, color: '#E91E63'},
          {x: 100, y: 100, color: '#9C27B0'},
          {x: 150, y: 115, color: '#FF9800'},
          {x: 75, y: 140, color: '#4CAF50'},
          {x: 125, y: 135, color: '#2196F3'}
        ].map((flower, i) => (
          <g key={i}>
            <circle cx={flower.x} cy={flower.y} r="8" fill={flower.color} opacity="0.7"/>
            <circle cx={flower.x} cy={flower.y} r="4" fill="#FFEB3B" opacity="0.9"/>
            <line x1={flower.x} y1={flower.y+8} x2={flower.x} y2={flower.y+40} 
                  stroke="#4CAF50" strokeWidth="2"/>
          </g>
        ))}
      </svg>
    ),
    
    'dried-flowers': (
      <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
        {/* Dried lavender sprigs */}
        <g opacity="0.7">
          <path d="M 80 180 Q 75 140 70 100" stroke="#8B7355" strokeWidth="2" fill="none"/>
          <path d="M 100 180 Q 100 140 100 90" stroke="#8B7355" strokeWidth="2" fill="none"/>
          <path d="M 120 180 Q 125 140 130 100" stroke="#8B7355" strokeWidth="2" fill="none"/>
          {[...Array(8)].map((_, i) => (
            <ellipse key={i} cx="70" cy={105 + i*10} rx="4" ry="2" fill="#A0826D" opacity="0.6"/>
          ))}
          {[...Array(10)].map((_, i) => (
            <ellipse key={i} cx="100" cy={95 + i*10} rx="4" ry="2" fill="#A0826D" opacity="0.6"/>
          ))}
          {[...Array(8)].map((_, i) => (
            <ellipse key={i} cx="130" cy={105 + i*10} rx="4" ry="2" fill="#A0826D" opacity="0.6"/>
          ))}
        </g>
      </svg>
    ),
    
    'gold-ornament': (
      <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
        {/* Ornate gold design */}
        <g fill="none" stroke="#B8860B" strokeWidth="2">
          <circle cx="100" cy="100" r="60" opacity="0.8"/>
          <circle cx="100" cy="100" r="50" opacity="0.7"/>
          <path d="M 100 40 Q 140 100 100 160 Q 60 100 100 40" fill="#DAA520" opacity="0.3"/>
          {[0, 90, 180, 270].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path d="M 100 45 Q 105 55 100 65" stroke="#D4AF37" strokeWidth="1.5"/>
            </g>
          ))}
        </g>
      </svg>
    )
  };

  return illustrations[type] || <div>Unknown illustration: {type}</div>;
}
