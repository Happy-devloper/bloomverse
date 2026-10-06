// Beautiful 2D Flower Illustrations - Enhanced SVG Flowers
// More cohesive, eye-pleasing, and modern designs

export const EnhancedFlowers = {
  // Beautiful Rose with layered petals
  Rose: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <defs>
        <radialGradient id="rose-gradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#FFB6C7" />
          <stop offset="50%" stopColor="#E85D75" />
          <stop offset="100%" stopColor="#C73860" />
        </radialGradient>
      </defs>
      
      {/* Outer petals (larger, darker) */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={`outer-${i}`}
          cx={Math.cos((angle - 90) * Math.PI / 180) * 35}
          cy={Math.sin((angle - 90) * Math.PI / 180) * 35}
          rx={28}
          ry={20}
          fill="#D64E6B"
          opacity="0.8"
          transform={`rotate(${angle})`}
        />
      ))}
      
      {/* Middle petals */}
      {[36, 108, 180, 252, 324].map((angle, i) => (
        <ellipse
          key={`mid-${i}`}
          cx={Math.cos((angle - 90) * Math.PI / 180) * 22}
          cy={Math.sin((angle - 90) * Math.PI / 180) * 22}
          rx={22}
          ry={16}
          fill="#E85D75"
          opacity="0.9"
          transform={`rotate(${angle})`}
        />
      ))}
      
      {/* Inner core */}
      <circle cx={0} cy={0} r={16} fill="url(#rose-gradient)" />
      <circle cx={0} cy={0} r={12} fill="#FFB6C7" opacity="0.6" />
      
      {/* Center dark detail */}
      <circle cx={0} cy={0} r={6} fill="#A63050" opacity="0.8" />
    </g>
  ),

  // Elegant Tulip with cup shape
  Tulip: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <defs>
        <linearGradient id="tulip-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF69B4" />
          <stop offset="100%" stopColor="#FFB6D9" />
        </linearGradient>
      </defs>
      
      {/* Left petal */}
      <path
        d="M -15 30 Q -25 10 -20 -25 Q -15 5 -15 30"
        fill="#FFB6D9"
        stroke="#FF69B4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Right petal */}
      <path
        d="M 15 30 Q 25 10 20 -25 Q 15 5 15 30"
        fill="#FFB6D9"
        stroke="#FF69B4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Center petal (front) */}
      <path
        d="M 0 30 Q -18 15 -15 -30 Q 0 -5 15 -30 Q 18 15 0 30 Z"
        fill="url(#tulip-gradient)"
        stroke="#FF69B4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Inner highlight */}
      <path
        d="M -8 20 Q -8 0 -5 -20"
        fill="none"
        stroke="#FFE0ED"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
      />
    </g>
  ),

  // Cheerful Sunflower
  Sunflower: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {/* Petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <ellipse
            key={i}
            cx={Math.cos(rad) * 32}
            cy={Math.sin(rad) * 32}
            rx={18}
            ry={12}
            fill="#FFD700"
            stroke="#F4A600"
            strokeWidth="1"
            transform={`rotate(${angle} ${Math.cos(rad) * 32} ${Math.sin(rad) * 32})`}
          />
        );
      })}
      
      {/* Petal outlines for definition */}
      <circle cx={0} cy={0} r={42} fill="none" stroke="#E6B800" strokeWidth="1" opacity="0.5" />
      
      {/* Center dark core */}
      <circle cx={0} cy={0} r={20} fill="#8B5A00" />
      
      {/* Brown spots on center */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <circle
            key={`spot-${i}`}
            cx={Math.cos(rad) * 10}
            cy={Math.sin(rad) * 10}
            r={2}
            fill="#5C3D00"
            opacity="0.7"
          />
        );
      })}
    </g>
  ),

  // Romantic Peony with ruffled petals
  Peony: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <defs>
        <radialGradient id="peony-gradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#FFDDEC" />
          <stop offset="70%" stopColor="#FFB6D9" />
          <stop offset="100%" stopColor="#FF99C8" />
        </radialGradient>
      </defs>
      
      {/* Outer ruffled layers */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <ellipse
            key={`ruff-${i}`}
            cx={Math.cos(rad) * 28}
            cy={Math.sin(rad) * 28}
            rx={24}
            ry={18}
            fill="#FF99C8"
            opacity="0.7"
            transform={`rotate(${angle} ${Math.cos(rad) * 28} ${Math.sin(rad) * 28})`}
          />
        );
      })}
      
      {/* Middle petals */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * 360 + 30;
        const rad = angle * Math.PI / 180;
        return (
          <ellipse
            key={`mid-${i}`}
            cx={Math.cos(rad) * 18}
            cy={Math.sin(rad) * 18}
            rx={18}
            ry={15}
            fill="#FFB6D9"
            opacity="0.85"
            transform={`rotate(${angle} ${Math.cos(rad) * 18} ${Math.sin(rad) * 18})`}
          />
        );
      })}
      
      {/* Inner center */}
      <circle cx={0} cy={0} r={18} fill="url(#peony-gradient)" />
      <circle cx={0} cy={0} r={10} fill="#FFDDEC" opacity="0.8" />
    </g>
  ),

  // Graceful Lily
  Lily: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <defs>
        <linearGradient id="lily-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0E6FF" />
        </linearGradient>
      </defs>
      
      {/* Petals - 6 pointed star */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <path
            key={i}
            d={`M 0 0 Q ${Math.cos(rad) * 25} ${Math.sin(rad) * 25} ${Math.cos(rad) * 35} ${Math.sin(rad) * 35}`}
            fill="none"
            stroke="#E8E0F0"
            strokeWidth="3"
            opacity="0.9"
            strokeLinecap="round"
          />
        );
      })}
      
      {/* Petal shapes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <ellipse
            key={`petal-${i}`}
            cx={Math.cos(rad) * 28}
            cy={Math.sin(rad) * 28}
            rx={16}
            ry={24}
            fill="url(#lily-gradient)"
            stroke="#D9D0E8"
            strokeWidth="1"
            opacity="0.95"
            transform={`rotate(${angle} ${Math.cos(rad) * 28} ${Math.sin(rad) * 28})`}
          />
        );
      })}
      
      {/* Center stamen */}
      <circle cx={0} cy={0} r={12} fill="#FFE4B5" opacity="0.8" />
      
      {/* Stamen details */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <circle
            key={`stamen-${i}`}
            cx={Math.cos(rad) * 6}
            cy={Math.sin(rad) * 6}
            r={2}
            fill="#FF8C00"
            opacity="0.7"
          />
        );
      })}
    </g>
  ),

  // Dainty Daisy
  Daisy: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {/* White petals */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <ellipse
            key={i}
            cx={Math.cos(rad) * 24}
            cy={Math.sin(rad) * 24}
            rx={12}
            ry={8}
            fill="#FFFAF0"
            stroke="#E0E0E0"
            strokeWidth="0.8"
            transform={`rotate(${angle} ${Math.cos(rad) * 24} ${Math.sin(rad) * 24})`}
          />
        );
      })}
      
      {/* Yellow center */}
      <circle cx={0} cy={0} r={14} fill="#FFE680" stroke="#FFD700" strokeWidth="1" />
      
      {/* Center texture */}
      <circle cx={0} cy={0} r={10} fill="#FFED4E" opacity="0.6" />
    </g>
  ),

  // Mystical Orchid
  Orchid: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <defs>
        <radialGradient id="orchid-gradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FFB0FF" />
          <stop offset="100%" stopColor="#DA70D6" />
        </radialGradient>
      </defs>
      
      {/* Upper sepals */}
      <ellipse cx={0} cy={-18} rx={14} ry={18} fill="#E699FF" stroke="#DA70D6" strokeWidth="1" />
      
      {/* Side petals */}
      <ellipse cx={-22} cy={-8} rx={12} ry={16} fill="#F0B0FF" stroke="#DA70D6" strokeWidth="1" />
      <ellipse cx={22} cy={-8} rx={12} ry={16} fill="#F0B0FF" stroke="#DA70D6" strokeWidth="1" />
      
      {/* Lower sepals */}
      <ellipse cx={-16} cy={16} rx={10} ry={14} fill="#E699FF" stroke="#DA70D6" strokeWidth="1" />
      <ellipse cx={16} cy={16} rx={10} ry={14} fill="#E699FF" stroke="#DA70D6" strokeWidth="1" />
      
      {/* Labellum (lip) - distinctive orchid feature */}
      <path
        d="M -12 12 Q 0 28 12 12 Q 6 18 0 16 Q -6 18 -12 12 Z"
        fill="url(#orchid-gradient)"
        stroke="#DA70D6"
        strokeWidth="1"
      />
      
      {/* Center column */}
      <circle cx={0} cy={4} r={8} fill="#FFD9FF" opacity="0.8" />
      <circle cx={0} cy={4} r={4} fill="#DA70D6" opacity="0.6" />
    </g>
  ),

  // Delicate Lavender
  Lavender: ({ x, y, scale = 1, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {/* Stem */}
      <line x1={0} y1={30} x2={0} y2={-15} stroke="#7B68A6" strokeWidth="1.5" opacity="0.7" />
      
      {/* Flower clusters - small florets */}
      {Array.from({ length: 4 }).map((_, i) => {
        const yOffset = 15 - i * 12;
        return (
          <g key={`cluster-${i}`}>
            {Array.from({ length: 5 }).map((_, j) => {
              const angle = (j / 5) * 360;
              const rad = angle * Math.PI / 180;
              return (
                <circle
                  key={j}
                  cx={Math.cos(rad) * 10}
                  cy={yOffset + Math.sin(rad) * 8}
                  r={3.5}
                  fill="#C8B6FF"
                  stroke="#9B7FD9"
                  strokeWidth="0.8"
                  opacity="0.85"
                />
              );
            })}
          </g>
        );
      })}
      
      {/* Bottom cluster */}
      {Array.from({ length: 6 }).map((_, j) => {
        const angle = (j / 6) * 360;
        const rad = angle * Math.PI / 180;
        return (
          <circle
            key={`bottom-${j}`}
            cx={Math.cos(rad) * 12}
            cy={-15 + Math.sin(rad) * 10}
            r={4}
            fill="#B89FE8"
            stroke="#9B7FD9"
            strokeWidth="0.8"
            opacity="0.9"
          />
        );
      })}
    </g>
  ),
};
