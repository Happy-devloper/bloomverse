import React from 'react';

/**
 * Theme Decoration Component - Small decorative elements for letter pages
 */
export default function ThemeDecoration({ type, position, opacity = 0.3, color, size = 'medium' }) {
  const sizeMap = { small: 40, medium: 60, large: 80 };
  const s = sizeMap[size] || 60;
  
  // Position mapping
  const positions = {
    'top-right': { top: '5%', right: '5%' },
    'top-left': { top: '5%', left: '5%' },
    'bottom-right': { bottom: '5%', right: '5%' },
    'bottom-left': { bottom: '5%', left: '5%' }
  };
  
  const style = {
    position: 'absolute',
    ...positions[position],
    opacity,
    pointerEvents: 'none'
  };
  
  const decorations = {
    'rose-petals': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        {[{x: 20, y: 15}, {x: 35, y: 25}, {x: 15, y: 35}].map((petal, i) => (
          <ellipse key={i} cx={petal.x} cy={petal.y} rx="8" ry="12" 
                   fill={color} transform={`rotate(${i*45} ${petal.x} ${petal.y})`}/>
        ))}
      </svg>
    ),
    
    'stars-scattered': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        {[{x: 15, y: 15}, {x: 45, y: 20}, {x: 30, y: 45}].map((star, i) => (
          <g key={i}>
            <polygon points={`${star.x},${star.y-6} ${star.x+2},${star.y-2} ${star.x+6},${star.y} ${star.x+2},${star.y+2} ${star.x},${star.y+6} ${star.x-2},${star.y+2} ${star.x-6},${star.y} ${star.x-2},${star.y-2}`}
                     fill={color}/>
          </g>
        ))}
      </svg>
    ),
    
    'watercolor-stain': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="25" fill={color} opacity="0.2"/>
        <circle cx="25" cy="25" r="15" fill={color} opacity="0.15"/>
        <circle cx="35" cy="35" r="18" fill={color} opacity="0.1"/>
      </svg>
    ),
    
    'constellation': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        {[[15,15], [45,20], [30,40], [20,50]].map((pt, i) => (
          <circle key={i} cx={pt[0]} cy={pt[1]} r="2" fill={color}/>
        ))}
        <path d="M 15 15 L 45 20 L 30 40 L 20 50" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
      </svg>
    ),
    
    'crescent-moon': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M 35 10 A 20 20 0 1 0 35 50 A 15 15 0 1 1 35 10" fill={color}/>
      </svg>
    ),
    
    'rose-corner': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <circle cx="25" cy="25" r="12" fill={color} opacity="0.8"/>
        <circle cx="40" cy="30" r="10" fill={color} opacity="0.7"/>
        <circle cx="30" cy="40" r="10" fill={color} opacity="0.7"/>
      </svg>
    ),
    
    'dried-flower-corner': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M 10 50 Q 15 35 20 20" stroke={color} strokeWidth="2" fill="none"/>
        {[...Array(5)].map((_, i) => (
          <ellipse key={i} cx="20" cy={22 + i*6} rx="3" ry="1.5" fill={color} opacity="0.6"/>
        ))}
      </svg>
    ),
    
    'wildflower-cluster': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        {[[20,20], [35,25], [25,35]].map((pt, i) => (
          <g key={i}>
            <circle cx={pt[0]} cy={pt[1]} r="5" fill={color} opacity="0.7"/>
            <circle cx={pt[0]} cy={pt[1]} r="2" fill="#FFEB3B"/>
          </g>
        ))}
      </svg>
    ),
    
    'gold-leaf': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <ellipse cx="30" cy="30" rx="15" ry="8" fill={color} opacity="0.6" 
                 transform="rotate(45 30 30)"/>
        <path d="M 30 30 Q 20 35 15 45" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    
    'ornate-corner': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M 10 10 Q 30 15 50 10 Q 45 30 50 50" 
              stroke={color} strokeWidth="2" fill="none"/>
        <circle cx="10" cy="10" r="3" fill={color}/>
        <circle cx="50" cy="50" r="3" fill={color}/>
      </svg>
    ),
    
    'baroque-flourish': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M 15 30 Q 25 20 35 30 Q 45 40 35 50" 
              stroke={color} strokeWidth="2.5" fill="none"/>
      </svg>
    ),
    
    'sepia-flourish': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M 20 40 Q 30 25 40 40" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
        <circle cx="30" cy="30" r="4" fill={color} opacity="0.4"/>
      </svg>
    ),
    
    'botanical-illustration': (
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M 30 10 L 30 50" stroke={color} strokeWidth="2"/>
        {[{y: 20, angle: -30}, {y: 30, angle: 30}, {y: 40, angle: -30}].map((leaf, i) => (
          <ellipse key={i} cx="30" cy={leaf.y} rx="8" ry="4" fill={color} opacity="0.6"
                   transform={`rotate(${leaf.angle} 30 ${leaf.y})`}/>
        ))}
      </svg>
    ),
    
    'watercolor-wash': (
      <svg width={s*1.5} height={s*1.5} viewBox="0 0 90 90">
        <ellipse cx="45" cy="45" rx="40" ry="30" fill={color} opacity="0.1"/>
        <ellipse cx="45" cy="45" rx="30" ry="25" fill={color} opacity="0.08"/>
      </svg>
    )
  };
  
  return (
    <div style={style} className="theme-decoration">
      {decorations[type] || null}
    </div>
  );
}
