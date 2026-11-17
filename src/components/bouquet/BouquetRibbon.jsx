/**
 * BouquetRibbon - Decorative ribbon tied around wrapper
 */
export default function BouquetRibbon({ 
  centerX = 400, 
  centerY = 400, 
  color = '#E85D75',
  style = 'bow' // 'bow' | 'simple' | 'trailing'
}) {
  if (style === 'bow') {
    return (
      <svg 
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 800 1066"
        preserveAspectRatio="xMidYMid meet"
        style={{ zIndex: 3 }}
      >
        {/* Ribbon wrap around stems */}
        <path
          d={`M ${centerX - 100} ${centerY + 350}
              Q ${centerX} ${centerY + 370}, ${centerX + 100} ${centerY + 350}`}
          stroke={color}
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Bow center knot */}
        <circle
          cx={centerX}
          cy={centerY + 360}
          r="15"
          fill={color}
        />
        
        {/* Left bow loop */}
        <path
          d={`M ${centerX - 15} ${centerY + 360}
              Q ${centerX - 50} ${centerY + 330}, ${centerX - 60} ${centerY + 360}
              Q ${centerX - 50} ${centerY + 390}, ${centerX - 15} ${centerY + 360}
              Z`}
          fill={color}
          opacity="0.9"
        />
        
        {/* Right bow loop */}
        <path
          d={`M ${centerX + 15} ${centerY + 360}
              Q ${centerX + 50} ${centerY + 330}, ${centerX + 60} ${centerY + 360}
              Q ${centerX + 50} ${centerY + 390}, ${centerX + 15} ${centerY + 360}
              Z`}
          fill={color}
          opacity="0.9"
        />
        
        {/* Trailing ribbons */}
        <path
          d={`M ${centerX - 5} ${centerY + 375}
              Q ${centerX - 30} ${centerY + 450}, ${centerX - 20} ${centerY + 520}`}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d={`M ${centerX + 5} ${centerY + 375}
              Q ${centerX + 30} ${centerY + 450}, ${centerX + 20} ${centerY + 520}`}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    );
  }
  
  // Additional styles can be added (simple, trailing)
  return null;
}
