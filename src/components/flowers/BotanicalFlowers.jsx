// Detailed botanical-style SVG flowers
// Each flower has realistic petals, leaves, and stems

export const PeonyFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="45" stroke="#3d5c3d" strokeWidth="2.5" opacity="0.8" />
    
    {/* Leaves */}
    <path
      d="M -8 15 Q -12 20 -10 28 Q -8 32 -4 30"
      fill="#5a8c5e"
      opacity="0.7"
    />
    <path
      d="M 8 15 Q 12 20 10 28 Q 8 32 4 30"
      fill="#5a8c5e"
      opacity="0.7"
    />
    
    {/* Outer petals - larger, lighter */}
    <ellipse cx="0" cy="-18" rx="12" ry="15" fill="#ffc0d9" opacity="0.8" />
    <ellipse cx="16" cy="-10" rx="11" ry="14" fill="#ffb6d0" opacity="0.8" />
    <ellipse cx="16" cy="8" rx="11" ry="14" fill="#ffb6d0" opacity="0.8" />
    <ellipse cx="0" cy="18" rx="12" ry="15" fill="#ffc0d9" opacity="0.8" />
    <ellipse cx="-16" cy="8" rx="11" ry="14" fill="#ffb6d0" opacity="0.8" />
    <ellipse cx="-16" cy="-10" rx="11" ry="14" fill="#ffb6d0" opacity="0.8" />
    
    {/* Middle petals */}
    <ellipse cx="0" cy="-14" rx="9" ry="12" fill="#ffa8c5" opacity="0.9" />
    <ellipse cx="12" cy="-7" rx="8" ry="11" fill="#ff9db8" opacity="0.9" />
    <ellipse cx="12" cy="7" rx="8" ry="11" fill="#ff9db8" opacity="0.9" />
    <ellipse cx="0" cy="14" rx="9" ry="12" fill="#ffa8c5" opacity="0.9" />
    <ellipse cx="-12" cy="7" rx="8" ry="11" fill="#ff9db8" opacity="0.9" />
    <ellipse cx="-12" cy="-7" rx="8" ry="11" fill="#ff9db8" opacity="0.9" />
    
    {/* Inner petals - deeper color */}
    <ellipse cx="0" cy="-10" rx="7" ry="10" fill="#ff8fb3" opacity="0.95" />
    <ellipse cx="8" cy="-5" rx="6" ry="9" fill="#ff7aab" opacity="0.95" />
    <ellipse cx="8" cy="5" rx="6" ry="9" fill="#ff7aab" opacity="0.95" />
    <ellipse cx="0" cy="10" rx="7" ry="10" fill="#ff8fb3" opacity="0.95" />
    <ellipse cx="-8" cy="5" rx="6" ry="9" fill="#ff7aab" opacity="0.95" />
    <ellipse cx="-8" cy="-5" rx="6" ry="9" fill="#ff7aab" opacity="0.95" />
    
    {/* Center */}
    <circle cx="0" cy="0" r="5" fill="#fff9c4" opacity="0.95" />
    <circle cx="0" cy="0" r="3" fill="#ffeb3b" opacity="0.8" />
  </g>
);

export const RoseFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="45" stroke="#2d5a2d" strokeWidth="2.5" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -6 10 Q -10 15 -8 25 Q -6 30 -2 28" fill="#4a7c4e" opacity="0.75" />
    <path d="M 6 10 Q 10 15 8 25 Q 6 30 2 28" fill="#4a7c4e" opacity="0.75" />
    
    {/* Outer petals - gradient from orange to pink */}
    <circle cx="0" cy="-16" r="10" fill="#ff9966" opacity="0.8" />
    <circle cx="14" cy="-8" r="9" fill="#ff9966" opacity="0.8" />
    <circle cx="14" cy="8" r="9" fill="#ffb366" opacity="0.8" />
    <circle cx="0" cy="16" r="10" fill="#ffb366" opacity="0.8" />
    <circle cx="-14" cy="8" r="9" fill="#ff9966" opacity="0.8" />
    <circle cx="-14" cy="-8" r="9" fill="#ff9966" opacity="0.8" />
    
    {/* Middle petals - deeper */}
    <circle cx="0" cy="-12" r="8" fill="#ff8855" opacity="0.9" />
    <circle cx="10" cy="-6" r="7" fill="#ff8855" opacity="0.9" />
    <circle cx="10" cy="6" r="7" fill="#ff8855" opacity="0.9" />
    <circle cx="0" cy="12" r="8" fill="#ff8855" opacity="0.9" />
    <circle cx="-10" cy="6" r="7" fill="#ff8855" opacity="0.9" />
    <circle cx="-10" cy="-6" r="7" fill="#ff8855" opacity="0.9" />
    
    {/* Inner petals - deep red */}
    <circle cx="0" cy="-8" r="6" fill="#e85d75" opacity="0.95" />
    <circle cx="6" cy="-4" r="5" fill="#e85d75" opacity="0.95" />
    <circle cx="6" cy="4" r="5" fill="#e85d75" opacity="0.95" />
    <circle cx="0" cy="8" r="6" fill="#e85d75" opacity="0.95" />
    <circle cx="-6" cy="4" r="5" fill="#e85d75" opacity="0.95" />
    <circle cx="-6" cy="-4" r="5" fill="#e85d75" opacity="0.95" />
    
    {/* Center */}
    <circle cx="0" cy="0" r="4" fill="#d4543a" opacity="0.95" />
  </g>
);

export const TulipFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="50" stroke="#2d5a2d" strokeWidth="2" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -4 12 Q -8 18 -6 32 Q -4 38 0 35" fill="#4a7c4e" opacity="0.7" />
    <path d="M 4 12 Q 8 18 6 32 Q 4 38 0 35" fill="#4a7c4e" opacity="0.7" />
    
    {/* Outer petals - cup shape */}
    <path d="M -10 -2 Q -14 -8 -12 -18 Q -8 -22 0 -20" fill="#ff9966" opacity="0.85" />
    <path d="M 10 -2 Q 14 -8 12 -18 Q 8 -22 0 -20" fill="#ffb366" opacity="0.85" />
    <path d="M 0 0 L -10 -2 Q -8 -22 0 -20 L 10 -2 Q 8 -22 0 -20" fill="#ff8855" opacity="0.9" />
    
    {/* Middle petals */}
    <path d="M -8 2 Q -11 -4 -10 -14 Q -7 -18 0 -16" fill="#ff7744" opacity="0.92" />
    <path d="M 8 2 Q 11 -4 10 -14 Q 7 -18 0 -16" fill="#ff9955" opacity="0.92" />
    
    {/* Inner petal */}
    <path d="M -4 4 Q -6 0 -5 -10 Q -3 -13 0 -12 Q 3 -13 5 -10 Q 6 0 4 4" fill="#ff6633" opacity="0.95" />
    
    {/* Center */}
    <ellipse cx="0" cy="-4" rx="3" ry="4" fill="#ffdd66" opacity="0.9" />
  </g>
);

export const SunflowerFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="50" stroke="#2d5a2d" strokeWidth="2.5" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -6 15 Q -12 22 -10 35 Q -8 40 -2 38" fill="#4a7c4e" opacity="0.7" />
    <path d="M 6 15 Q 12 22 10 35 Q 8 40 2 38" fill="#4a7c4e" opacity="0.7" />
    
    {/* Outer ray petals - yellow */}
    <g opacity="0.85">
      <ellipse cx="0" cy="-18" rx="5" ry="13" fill="#ffd700" />
      <ellipse cx="16" cy="-9" rx="5" ry="13" fill="#ffd700" transform="rotate(60 16 -9)" />
      <ellipse cx="16" cy="9" rx="5" ry="13" fill="#ffd700" transform="rotate(120 16 9)" />
      <ellipse cx="0" cy="18" rx="5" ry="13" fill="#ffd700" />
      <ellipse cx="-16" cy="9" rx="5" ry="13" fill="#ffd700" transform="rotate(-120 -16 9)" />
      <ellipse cx="-16" cy="-9" rx="5" ry="13" fill="#ffd700" transform="rotate(-60 -16 -9)" />
    </g>
    
    {/* Secondary ray petals */}
    <g opacity="0.8">
      <ellipse cx="12" cy="-15" rx="4" ry="11" fill="#ffcc00" transform="rotate(30 12 -15)" />
      <ellipse cx="18" cy="0" rx="4" ry="11" fill="#ffcc00" transform="rotate(90 18 0)" />
      <ellipse cx="12" cy="15" rx="4" ry="11" fill="#ffcc00" transform="rotate(150 12 15)" />
      <ellipse cx="-12" cy="15" rx="4" ry="11" fill="#ffcc00" transform="rotate(-150 -12 15)" />
      <ellipse cx="-18" cy="0" rx="4" ry="11" fill="#ffcc00" transform="rotate(-90 -18 0)" />
      <ellipse cx="-12" cy="-15" rx="4" ry="11" fill="#ffcc00" transform="rotate(-30 -12 -15)" />
    </g>
    
    {/* Center disk - brown */}
    <circle cx="0" cy="0" r="8" fill="#8b6914" opacity="0.9" />
    <circle cx="0" cy="0" r="6" fill="#a0791a" opacity="0.85" />
  </g>
);

export const DahliaFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="45" stroke="#2d5a2d" strokeWidth="2.5" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -6 12 Q -11 18 -9 28 Q -7 33 -2 31" fill="#4a7c4e" opacity="0.75" />
    <path d="M 6 12 Q 11 18 9 28 Q 7 33 2 31" fill="#4a7c4e" opacity="0.75" />
    
    {/* Outer petals - many layered */}
    <circle cx="0" cy="-16" r="7" fill="#ffb6d9" opacity="0.8" />
    <circle cx="11" cy="-11" r="6.5" fill="#ffb6d9" opacity="0.8" />
    <circle cx="14" cy="0" r="6.5" fill="#ffb6d9" opacity="0.8" />
    <circle cx="11" cy="11" r="7" fill="#ffb6d9" opacity="0.8" />
    <circle cx="0" cy="16" r="7" fill="#ffb6d9" opacity="0.8" />
    <circle cx="-11" cy="11" r="6.5" fill="#ffb6d9" opacity="0.8" />
    <circle cx="-14" cy="0" r="6.5" fill="#ffb6d9" opacity="0.8" />
    <circle cx="-11" cy="-11" r="7" fill="#ffb6d9" opacity="0.8" />
    
    {/* Middle petals */}
    <circle cx="0" cy="-12" r="6" fill="#ff9db8" opacity="0.88" />
    <circle cx="8" cy="-8" r="5.5" fill="#ff9db8" opacity="0.88" />
    <circle cx="10" cy="0" r="5.5" fill="#ff9db8" opacity="0.88" />
    <circle cx="8" cy="8" r="6" fill="#ff9db8" opacity="0.88" />
    <circle cx="0" cy="12" r="6" fill="#ff9db8" opacity="0.88" />
    <circle cx="-8" cy="8" r="5.5" fill="#ff9db8" opacity="0.88" />
    <circle cx="-10" cy="0" r="5.5" fill="#ff9db8" opacity="0.88" />
    <circle cx="-8" cy="-8" r="6" fill="#ff9db8" opacity="0.88" />
    
    {/* Inner petals */}
    <circle cx="0" cy="-8" r="5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="5.5" cy="-5.5" r="4.5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="7" cy="0" r="4.5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="5.5" cy="5.5" r="5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="0" cy="8" r="5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="-5.5" cy="5.5" r="4.5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="-7" cy="0" r="4.5" fill="#ff7aaa" opacity="0.95" />
    <circle cx="-5.5" cy="-5.5" r="5" fill="#ff7aaa" opacity="0.95" />
    
    {/* Center */}
    <circle cx="0" cy="0" r="4" fill="#fff0a0" opacity="0.95" />
    <circle cx="0" cy="0" r="2" fill="#ffdd00" opacity="0.9" />
  </g>
);

export const LilyFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="48" stroke="#2d5a2d" strokeWidth="2" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -5 10 Q -10 16 -8 28 Q -6 33 -1 31" fill="#4a7c4e" opacity="0.7" />
    <path d="M 5 10 Q 10 16 8 28 Q 6 33 1 31" fill="#4a7c4e" opacity="0.7" />
    
    {/* Petals - 6 star-like petals */}
    <path d="M 0,-16 Q 4,-8 3,8 Q 0,14 -1,8 Q -4,-8 0,-16" fill="#ffe4e1" opacity="0.9" stroke="#ffccd5" strokeWidth="0.5" />
    <path d="M 14,-8 Q 12,0 4,12 Q 0,14 -3,8 Q 4,-6 14,-8" fill="#ffe4e1" opacity="0.9" stroke="#ffccd5" strokeWidth="0.5" />
    <path d="M 14,8 Q 12,2 3,10 Q 0,14 -4,10 Q 4,6 14,8" fill="#ffe4e1" opacity="0.9" stroke="#ffccd5" strokeWidth="0.5" />
    <path d="M 0,16 Q 3,8 4,0 Q 2,-12 0,-16 Q -2,-12 -4,0 Q -3,8 0,16" fill="#ffe4e1" opacity="0.9" stroke="#ffccd5" strokeWidth="0.5" />
    <path d="M -14,8 Q -12,2 -3,10 Q 0,14 4,10 Q -4,6 -14,8" fill="#ffe4e1" opacity="0.9" stroke="#ffccd5" strokeWidth="0.5" />
    <path d="M -14,-8 Q -12,0 -4,12 Q 0,14 3,8 Q -4,-6 -14,-8" fill="#ffe4e1" opacity="0.9" stroke="#ffccd5" strokeWidth="0.5" />
    
    {/* Petal centers - lighter */}
    <path d="M 0,-13 Q 2,-7 2,5 L 0,10 Q -2,0 0,-13" fill="#fff5f0" opacity="0.8" />
    <path d="M 11,-6 Q 9,2 2,10 L -2,7 Q 5,-2 11,-6" fill="#fff5f0" opacity="0.8" />
    <path d="M 11,6 Q 9,0 2,8 L -2,7 Q 5,2 11,6" fill="#fff5f0" opacity="0.8" />
    <path d="M 0,13 Q 2,5 2,-7 L 0,-10 Q -2,-2 0,13" fill="#fff5f0" opacity="0.8" />
    <path d="M -11,6 Q -9,0 -2,8 L 2,7 Q -5,2 -11,6" fill="#fff5f0" opacity="0.8" />
    <path d="M -11,-6 Q -9,2 -2,10 L 2,7 Q -5,-2 -11,-6" fill="#fff5f0" opacity="0.8" />
    
    {/* Stamen - center */}
    <circle cx="0" cy="0" r="4" fill="#ffcc99" opacity="0.9" />
    <circle cx="-2" cy="-1" r="1.5" fill="#ff9966" opacity="0.8" />
    <circle cx="2" cy="-1" r="1.5" fill="#ff9966" opacity="0.8" />
    <circle cx="0" cy="2.5" r="1.5" fill="#ff9966" opacity="0.8" />
  </g>
);

export const HydrangeaFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="50" stroke="#2d5a2d" strokeWidth="2.5" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -7 12 Q -13 20 -11 32 Q -9 38 -3 36" fill="#4a7c4e" opacity="0.75" />
    <path d="M 7 12 Q 13 20 11 32 Q 9 38 3 36" fill="#4a7c4e" opacity="0.75" />
    
    {/* Many small clustered petals - hydrangea effect */}
    <g opacity="0.85">
      <circle cx="-8" cy="-10" r="4" fill="#c8a2d0" />
      <circle cx="-4" cy="-14" r="4" fill="#d4b0dd" />
      <circle cx="0" cy="-16" r="4" fill="#c8a2d0" />
      <circle cx="4" cy="-14" r="4" fill="#d4b0dd" />
      <circle cx="8" cy="-10" r="4" fill="#c8a2d0" />
      
      <circle cx="-12" cy="-4" r="4" fill="#d4b0dd" />
      <circle cx="-8" cy="-6" r="4" fill="#c8a2d0" />
      <circle cx="-4" cy="-8" r="4" fill="#d4b0dd" />
      <circle cx="0" cy="-10" r="4" fill="#c8a2d0" />
      <circle cx="4" cy="-8" r="4" fill="#d4b0dd" />
      <circle cx="8" cy="-6" r="4" fill="#c8a2d0" />
      <circle cx="12" cy="-4" r="4" fill="#d4b0dd" />
      
      <circle cx="-14" cy="4" r="4" fill="#c8a2d0" />
      <circle cx="-10" cy="0" r="4" fill="#d4b0dd" />
      <circle cx="-6" cy="-2" r="4" fill="#c8a2d0" />
      <circle cx="-2" cy="-4" r="4" fill="#d4b0dd" />
      <circle cx="2" cy="-4" r="4" fill="#c8a2d0" />
      <circle cx="6" cy="-2" r="4" fill="#d4b0dd" />
      <circle cx="10" cy="0" r="4" fill="#c8a2d0" />
      <circle cx="14" cy="4" r="4" fill="#d4b0dd" />
      
      <circle cx="-12" cy="10" r="4" fill="#d4b0dd" />
      <circle cx="-8" cy="8" r="4" fill="#c8a2d0" />
      <circle cx="-4" cy="6" r="4" fill="#d4b0dd" />
      <circle cx="0" cy="4" r="4" fill="#c8a2d0" />
      <circle cx="4" cy="6" r="4" fill="#d4b0dd" />
      <circle cx="8" cy="8" r="4" fill="#c8a2d0" />
      <circle cx="12" cy="10" r="4" fill="#d4b0dd" />
      
      <circle cx="-8" cy="16" r="4" fill="#c8a2d0" />
      <circle cx="-4" cy="12" r="4" fill="#d4b0dd" />
      <circle cx="0" cy="14" r="4" fill="#c8a2d0" />
      <circle cx="4" cy="12" r="4" fill="#d4b0dd" />
      <circle cx="8" cy="16" r="4" fill="#c8a2d0" />
    </g>
  </g>
);

export const CarnationFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="45" stroke="#2d5a2d" strokeWidth="2" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -5 12 Q -10 18 -8 28 Q -6 33 -1 31" fill="#4a7c4e" opacity="0.7" />
    <path d="M 5 12 Q 10 18 8 28 Q 6 33 1 31" fill="#4a7c4e" opacity="0.7" />
    
    {/* Ruffled petals - layered circles with slight rotation */}
    <g opacity="0.85">
      <circle cx="0" cy="-12" r="6" fill="#ffc0e0" />
      <circle cx="10" cy="-6" r="6" fill="#ffc0e0" />
      <circle cx="10" cy="6" r="6" fill="#ffc0e0" />
      <circle cx="0" cy="12" r="6" fill="#ffc0e0" />
      <circle cx="-10" cy="6" r="6" fill="#ffc0e0" />
      <circle cx="-10" cy="-6" r="6" fill="#ffc0e0" />
    </g>
    
    <g opacity="0.9">
      <circle cx="0" cy="-9" r="5" fill="#ffb0d0" />
      <circle cx="7.5" cy="-4.5" r="5" fill="#ffb0d0" />
      <circle cx="7.5" cy="4.5" r="5" fill="#ffb0d0" />
      <circle cx="0" cy="9" r="5" fill="#ffb0d0" />
      <circle cx="-7.5" cy="4.5" r="5" fill="#ffb0d0" />
      <circle cx="-7.5" cy="-4.5" r="5" fill="#ffb0d0" />
    </g>
    
    <g opacity="0.95">
      <circle cx="0" cy="-6" r="4" fill="#ffa0c0" />
      <circle cx="5" cy="-3" r="4" fill="#ffa0c0" />
      <circle cx="5" cy="3" r="4" fill="#ffa0c0" />
      <circle cx="0" cy="6" r="4" fill="#ffa0c0" />
      <circle cx="-5" cy="3" r="4" fill="#ffa0c0" />
      <circle cx="-5" cy="-3" r="4" fill="#ffa0c0" />
    </g>
    
    {/* Center */}
    <circle cx="0" cy="0" r="3" fill="#ffdd99" opacity="0.9" />
  </g>
);

export const IrisFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="48" stroke="#2d5a2d" strokeWidth="2" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -4 12 Q -9 19 -7 30 Q -5 35 0 32" fill="#4a7c4e" opacity="0.7" />
    <path d="M 4 12 Q 9 19 7 30 Q 5 35 0 32" fill="#4a7c4e" opacity="0.7" />
    
    {/* Upper petals (standards) */}
    <path d="M -4,-16 Q -6,-8 -5,2 Q -3,6 0,4 Q 3,6 5,2 Q 6,-8 4,-16 Q 2,-18 0,-18 Q -2,-18 -4,-16" fill="#9370db" opacity="0.9" stroke="#8050d0" strokeWidth="0.5" />
    <path d="M -8,-10 Q -10,0 -8,8 Q -6,10 -4,8 Q -5,0 -6,-10 Q -7,-10 -8,-10" fill="#8050d0" opacity="0.88" />
    <path d="M 8,-10 Q 10,0 8,8 Q 6,10 4,8 Q 5,0 6,-10 Q 7,-10 8,-10" fill="#8050d0" opacity="0.88" />
    
    {/* Lower petals (falls) */}
    <path d="M -6,4 Q -8,8 -6,16 Q -4,18 0,16 Q 4,18 6,16 Q 8,8 6,4 Q 4,4 0,5 Q -4,4 -6,4" fill="#9370db" opacity="0.85" stroke="#8050d0" strokeWidth="0.5" />
    <path d="M -8,6 Q -9,10 -7,14 Q -5,15 -3,13 Q -6,10 -8,6" fill="#b090ff" opacity="0.8" />
    <path d="M 8,6 Q 9,10 7,14 Q 5,15 3,13 Q 6,10 8,6" fill="#b090ff" opacity="0.8" />
    
    {/* Beard/crest - fuzzy center */}
    <ellipse cx="0" cy="6" rx="3" ry="2" fill="#ffcc99" opacity="0.85" />
    <ellipse cx="-2" cy="5" rx="1.5" ry="1" fill="#ff9966" opacity="0.8" />
    <ellipse cx="2" cy="5" rx="1.5" ry="1" fill="#ff9966" opacity="0.8" />
    
    {/* Center */}
    <circle cx="0" cy="0" r="2" fill="#fff5e6" opacity="0.9" />
  </g>
);

export const MagnoliaFlower = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Stem */}
    <line x1="0" y1="0" x2="0" y2="45" stroke="#2d5a2d" strokeWidth="2" opacity="0.8" />
    
    {/* Leaves */}
    <path d="M -6 12 Q -12 20 -10 32 Q -8 37 -2 35" fill="#4a7c4e" opacity="0.75" />
    <path d="M 6 12 Q 12 20 10 32 Q 8 37 2 35" fill="#4a7c4e" opacity="0.75" />
    
    {/* Large smooth petals - 6 */}
    <path d="M 0,-18 Q 8,-12 10,0 Q 8,10 0,14 Q -8,10 -10,0 Q -8,-12 0,-18" fill="#f5e8d4" opacity="0.9" stroke="#e8d9c3" strokeWidth="0.5" />
    <path d="M 15,-6 Q 16,2 12,12 Q 4,16 -4,12 Q 0,8 8,-4 Q 14,-8 15,-6" fill="#f5e8d4" opacity="0.9" stroke="#e8d9c3" strokeWidth="0.5" />
    <path d="M 15,6 Q 16,-2 12,-12 Q 4,-16 -4,-12 Q 0,-8 8,4 Q 14,8 15,6" fill="#f5e8d4" opacity="0.9" stroke="#e8d9c3" strokeWidth="0.5" />
    <path d="M 0,18 Q -8,12 -10,0 Q -8,-10 0,-14 Q 8,-10 10,0 Q 8,12 0,18" fill="#f5e8d4" opacity="0.88" stroke="#e8d9c3" strokeWidth="0.5" />
    <path d="M -15,6 Q -16,-2 -12,-12 Q -4,-16 4,-12 Q 0,-8 -8,4 Q -14,8 -15,6" fill="#f5e8d4" opacity="0.88" stroke="#e8d9c3" strokeWidth="0.5" />
    <path d="M -15,-6 Q -16,2 -12,12 Q -4,16 4,12 Q 0,8 -8,-4 Q -14,-8 -15,-6" fill="#f5e8d4" opacity="0.88" stroke="#e8d9c3" strokeWidth="0.5" />
    
    {/* Center - stamens */}
    <circle cx="0" cy="0" r="5" fill="#ffdd99" opacity="0.9" />
    <circle cx="-2" cy="-1" r="1.5" fill="#ff9966" opacity="0.8" />
    <circle cx="2" cy="-1" r="1.5" fill="#ff9966" opacity="0.8" />
    <circle cx="0" cy="2.5" r="1.5" fill="#ff9966" opacity="0.8" />
  </g>
);
