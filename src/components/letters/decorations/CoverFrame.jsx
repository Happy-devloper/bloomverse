import React from 'react';

/**
 * Cover Frame Component - Decorative borders for cover pages
 */
export default function CoverFrame({ type, color = '#DAA520', thickness = 2 }) {
  const frames = {
    'ornate-gold': (
      <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none" 
           style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
        <rect x="20" y="20" width="360" height="560" 
              fill="none" stroke={color} strokeWidth={thickness*2} rx="10"/>
        <rect x="30" y="30" width="340" height="540" 
              fill="none" stroke={color} strokeWidth={thickness} rx="8"/>
        {/* Corner ornaments */}
        {[{x: 40, y: 40}, {x: 360, y: 40}, {x: 40, y: 560}, {x: 360, y: 560}].map((corner, i) => (
          <circle key={i} cx={corner.x} cy={corner.y} r="5" fill={color}/>
        ))}
      </svg>
    ),
    
    'simple-border': (
      <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none"
           style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
        <rect x="30" y="30" width="340" height="540" 
              fill="none" stroke={color} strokeWidth={thickness} rx="5"/>
      </svg>
    ),
    
    'baroque': (
      <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none"
           style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
        <rect x="25" y="25" width="350" height="550" 
              fill="none" stroke={color} strokeWidth={thickness*3}/>
        <rect x="35" y="35" width="330" height="530" 
              fill="none" stroke={color} strokeWidth={thickness}/>
        {/* Baroque flourishes in corners */}
        {[[40,40], [360,40], [40,560], [360,560]].map(([x,y], i) => (
          <g key={i}>
            <path d={`M ${x} ${y} Q ${x+10} ${y+5} ${x+15} ${y+15}`} 
                  stroke={color} strokeWidth={thickness} fill="none"/>
          </g>
        ))}
      </svg>
    ),
    
    'botanical': (
      <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none"
           style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
        <rect x="30" y="30" width="340" height="540" 
              fill="none" stroke={color} strokeWidth={thickness} rx="3"/>
        {/* Leaf decorations */}
        {[50, 150, 250, 350].map((y, i) => (
          <g key={i}>
            <ellipse cx="40" cy={y} rx="8" ry="12" fill={color} opacity="0.3"/>
            <ellipse cx="360" cy={y} rx="8" ry="12" fill={color} opacity="0.3"/>
          </g>
        ))}
      </svg>
    )
  };

  return frames[type] || null;
}
