/**
 * BouquetWrapper - SVG-based wrapper element
 * Renders paper/fabric wrapper around bouquet stems
 */
export default function BouquetWrapper({ 
  centerX = 400, 
  centerY = 400, 
  width = 800, 
  color = '#F5E6D3',
  opacity = 0.9 
}) {
  return (
    <svg 
      className="absolute inset-0 pointer-events-none"
      viewBox="0 0 800 1066"
      preserveAspectRatio="xMidYMid meet"
      style={{ zIndex: 1 }}
    >
      <defs>
        {/* Paper texture gradient */}
        <linearGradient id="wrapperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity * 0.8} />
          <stop offset="50%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity={opacity * 0.9} />
        </linearGradient>
        
        {/* Subtle fold lines filter */}
        <filter id="paperTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0.05" />
          </feComponentTransfer>
        </filter>
      </defs>
      
      {/* Left wrapper fold */}
      <path
        d={`M ${centerX - 120} ${centerY + 200}
            Q ${centerX - 150} ${centerY + 350}, ${centerX - 100} ${centerY + 500}
            L ${centerX - 80} ${centerY + 650}
            L ${centerX - 60} ${centerY + 500}
            Q ${centerX - 90} ${centerY + 350}, ${centerX - 100} ${centerY + 200}
            Z`}
        fill="url(#wrapperGradient)"
        stroke="#D4C4A8"
        strokeWidth="2"
        filter="url(#paperTexture)"
      />
      
      {/* Right wrapper fold */}
      <path
        d={`M ${centerX + 120} ${centerY + 200}
            Q ${centerX + 150} ${centerY + 350}, ${centerX + 100} ${centerY + 500}
            L ${centerX + 80} ${centerY + 650}
            L ${centerX + 60} ${centerY + 500}
            Q ${centerX + 90} ${centerY + 350}, ${centerX + 100} ${centerY + 200}
            Z`}
        fill="url(#wrapperGradient)"
        stroke="#D4C4A8"
        strokeWidth="2"
        filter="url(#paperTexture)"
      />
      
      {/* Back wrapper piece (behind stems) */}
      <ellipse
        cx={centerX}
        cy={centerY + 400}
        rx="140"
        ry="80"
        fill={color}
        opacity={opacity * 0.7}
        stroke="#D4C4A8"
        strokeWidth="2"
      />
    </svg>
  );
}
