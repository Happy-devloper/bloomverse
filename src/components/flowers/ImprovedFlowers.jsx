// 20 Enhanced Premium Botanical Flower Illustrations
// High-quality realistic flowers with detailed stems, leaves, and petals

export const Rose = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <radialGradient id="rose-center-grad" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#FFE5EB" />
        <stop offset="50%" stopColor="#F0A8C8" />
        <stop offset="100%" stopColor="#C85A75" />
      </radialGradient>
      <filter id="rose-shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Stem - curved botanical style */}
    <path d="M 0,42 Q -3,25 -2,8 Q -1,0 0,-8" stroke="#5A8C5E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Left Leaf - detailed with veining */}
    <ellipse cx="-10" cy="28" rx="5" ry="14" fill="#7BA55B" opacity="0.75" />
    <path d="M -10,14 L -10,42" stroke="#5A8C5E" strokeWidth="0.5" opacity="0.4" />
    {/* Right Leaf */}
    <ellipse cx="10" cy="24" rx="5" ry="13" fill="#7BA55B" opacity="0.75" />
    <path d="M 10,11 L 10,37" stroke="#5A8C5E" strokeWidth="0.5" opacity="0.4" />
    {/* Outer loose petals */}
    {[0, 72, 144, 216, 288].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <ellipse key={`petal-${angle}`} cx={Math.cos(rad) * 36} cy={Math.sin(rad) * 36} rx="19" ry="27" fill="#D64E6B" opacity="0.75" transform={`rotate(${angle})`} filter="url(#rose-shadow)" />
      );
    })}
    {/* Middle layer petals */}
    {[36, 108, 180, 252, 324].map((angle) => (
      <ellipse key={`mid-${angle}`} cx={Math.cos((angle * Math.PI) / 180) * 22} cy={Math.sin((angle * Math.PI) / 180) * 22} rx="15" ry="21" fill="#E85D75" opacity="0.88" transform={`rotate(${angle})`} />
    ))}
    {/* Center */}
    <circle cx="0" cy="0" r="13" fill="url(#rose-center-grad)" />
  </g>
);

export const Camellia = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <radialGradient id="camellia-center">
        <stop offset="0%" stopColor="#FFF5F7" />
        <stop offset="100%" stopColor="#FFC700" />
      </radialGradient>
    </defs>
    <path d="M 0,40 Q -2,20 0,-6" stroke="#5A8C5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-8" cy="26" rx="4" ry="12" fill="#7BA55B" opacity="0.7" />
    <ellipse cx="8" cy="24" rx="4" ry="12" fill="#7BA55B" opacity="0.7" />
    {[0, 60, 120, 180, 240, 300].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={angle} cx={Math.cos(rad) * 30} cy={Math.sin(rad) * 30} rx="15" ry="24" fill="#E8949F" opacity="0.8" transform={`rotate(${angle})`} />;
    })}
    {[30, 90, 150, 210, 270, 330].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={angle} cx={Math.cos(rad) * 18} cy={Math.sin(rad) * 18} rx="11" ry="16" fill="#FFB6D9" opacity="0.85" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="11" fill="url(#camellia-center)" />
  </g>
);

export const Peony = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,42 Q -2,20 0,-8" stroke="#4A7C4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="28" rx="4" ry="13" fill="#7BA55B" opacity="0.75" />
    <ellipse cx="7" cy="26" rx="4" ry="13" fill="#7BA55B" opacity="0.75" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = i * 30;
      const rad = (angle * Math.PI) / 180;
      return <circle key={`o-${i}`} cx={Math.cos(rad) * 40} cy={Math.sin(rad) * 40} r="17" fill="#E8869F" opacity="0.78" />;
    })}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = i * 30 + 15;
      const rad = (angle * Math.PI) / 180;
      return <circle key={`m-${i}`} cx={Math.cos(rad) * 26} cy={Math.sin(rad) * 26} r="13" fill="#E85D75" opacity="0.85" />;
    })}
    <circle cx="0" cy="0" r="11" fill="#FFB6C7" opacity="0.9" />
  </g>
);

export const Magnolia = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q 1,18 0,-8" stroke="#5A8C5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="26" rx="4" ry="12" fill="#7BA55B" opacity="0.7" />
    <ellipse cx="7" cy="24" rx="4" ry="12" fill="#7BA55B" opacity="0.7" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <path key={angle} d={`M 0,0 Q ${Math.cos(rad) * 16},${Math.sin(rad) * 16} ${Math.cos(rad) * 34},${Math.sin(rad) * 34}`} stroke="#F5E8D4" strokeWidth="7" fill="none" opacity="0.92" />;
    })}
    <circle cx="0" cy="0" r="12" fill="#E8D4A0" opacity="0.85" />
  </g>
);

export const Hydrangea = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,42 Q -1.5,20 0,-6" stroke="#4A7C4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="28" rx="4" ry="12" fill="#7BA55B" opacity="0.75" />
    {Array.from({ length: 18 }).map((_, i) => {
      const angle = i * 20;
      const rad = (angle * Math.PI) / 180;
      return <circle key={i} cx={Math.cos(rad) * 30} cy={Math.sin(rad) * 30} r="8" fill="#B8A8E8" opacity="0.82" />;
    })}
  </g>
);

export const Chrysanthemum = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q 0.5,18 0,-6" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-6" cy="24" rx="3" ry="10" fill="#7BA55B" opacity="0.7" />
    {Array.from({ length: 22 }).map((_, i) => {
      const angle = i * 16.4;
      const rad = (angle * Math.PI) / 180;
      return <path key={i} d={`M 0,0 L ${Math.cos(rad) * 34},${Math.sin(rad) * 34}`} stroke="#FFB347" strokeWidth="3" opacity="0.92" />;
    })}
    <circle cx="0" cy="0" r="8" fill="#FFA500" opacity="0.85" />
  </g>
);

export const Tulip = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,42 Q 1,20 0,-8" stroke="#5A8C5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-8" cy="28" rx="3.5" ry="11" fill="#7BA55B" opacity="0.7" />
    <path d="M -16,38 Q -18,16 -12,-10 Q -10,-14 -8,-12 Q -12,14 -12,38 Z" fill="#FF99BB" opacity="0.88" />
    <path d="M 0,40 Q -6,16 -2,-12 Q 0,-16 2,-12 Q 6,16 0,40 Z" fill="#E85D75" opacity="0.95" />
    <path d="M 16,38 Q 18,16 12,-10 Q 10,-14 8,-12 Q 12,14 12,38 Z" fill="#FF99BB" opacity="0.88" />
  </g>
);

export const Hibiscus = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q -1.5,18 0,-6" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="26" rx="3.5" ry="11" fill="#7BA55B" opacity="0.7" />
    {[0, 72, 144, 216, 288].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={angle} cx={Math.cos(rad) * 34} cy={Math.sin(rad) * 34} rx="17" ry="25" fill="#FF6B9D" opacity="0.85" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="8" fill="#FFF9E6" opacity="0.92" />
    <line x1="0" y1="0" x2="0" y2="16" stroke="#E85D75" strokeWidth="1.5" opacity="0.6" />
  </g>
);

export const Cosmos = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q 1,18 0,-4" stroke="#4A7C4E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="6" cy="26" rx="3" ry="9" fill="#7BA55B" opacity="0.7" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = i * 45;
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={i} cx={Math.cos(rad) * 30} cy={Math.sin(rad) * 30} rx="11" ry="19" fill="#FF99BB" opacity="0.85" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="8" fill="#FFC700" opacity="0.82" />
  </g>
);

export const Poppy = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,38 Q -1,16 0,-8" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-8" cy="24" rx="3.5" ry="11" fill="#7BA55B" opacity="0.7" />
    {[0, 90, 180, 270].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={angle} cx={Math.cos(rad) * 32} cy={Math.sin(rad) * 32} rx="18" ry="27" fill="#FF4444" opacity="0.85" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="10" fill="#000000" opacity="0.65" />
  </g>
);

export const Anemone = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,38 Q 0.5,16 0,-6" stroke="#4A7C4E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="6" cy="24" rx="3" ry="9" fill="#7BA55B" opacity="0.7" />
    {[0, 60, 120, 180, 240, 300].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={angle} cx={Math.cos(rad) * 28} cy={Math.sin(rad) * 28} rx="12" ry="21" fill="#E8B4D4" opacity="0.85" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="10" fill="#000000" opacity="0.68" />
  </g>
);

export const Sunflower = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,42 Q -1,20 0,-6" stroke="#5A8C3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="28" rx="4" ry="11" fill="#7BA55B" opacity="0.75" />
    {Array.from({ length: 20 }).map((_, i) => {
      const angle = i * 18;
      const rad = (angle * Math.PI) / 180;
      return <path key={i} d={`M 0,0 L ${Math.cos(rad) * 40},${Math.sin(rad) * 40}`} stroke="#FFC107" strokeWidth="5" opacity="0.94" />;
    })}
    <circle cx="0" cy="0" r="17" fill="#D68C1F" opacity="0.9" />
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = i * 25.7;
      const rad = (angle * Math.PI) / 180;
      return <circle key={i} cx={Math.cos(rad) * 6.5} cy={Math.sin(rad) * 6.5} r="1.2" fill="#8B5A00" opacity="0.6" />;
    })}
  </g>
);

export const Iris = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <linearGradient id="iris-grad">
        <stop offset="0%" stopColor="#F5F0FF" />
        <stop offset="100%" stopColor="#D4B5FF" />
      </linearGradient>
    </defs>
    <path d="M 0,40 Q 0.5,18 0,-6" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="24" rx="3.5" ry="10" fill="#7BA55B" opacity="0.7" />
    {[0, 120, 240].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <path key={`up-${angle}`} d={`M 0,0 Q ${Math.cos(rad) * 14},${Math.sin(rad) * 14} ${Math.cos(rad) * 30},${Math.sin(rad) * 30}`} fill="url(#iris-grad)" opacity="0.85" />;
    })}
    {[60, 180, 300].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <path key={`dwn-${angle}`} d={`M 0,0 Q ${Math.cos(rad) * 14},${Math.sin(rad) * 14} ${Math.cos(rad) * 26},${Math.sin(rad) * 34}`} fill="#D4B5FF" opacity="0.72" />;
    })}
    <circle cx="0" cy="0" r="5" fill="#FFC700" opacity="0.65" />
  </g>
);

export const SweetPea = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q -1.5,18 -2,-4" stroke="#4A7C4E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="-8" cy="26" rx="3" ry="9" fill="#7BA55B" opacity="0.7" />
    {[0, 90, 180, 270].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <circle key={`p-${angle}`} cx={Math.cos(rad) * 24} cy={Math.sin(rad) * 24 - 4} r="9" fill="#E8A8D4" opacity="0.8" />;
    })}
    {[45, 135, 225, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <circle key={`m-${angle}`} cx={Math.cos(rad) * 15} cy={Math.sin(rad) * 15} r="6" fill="#FFB6D9" opacity="0.72" />;
    })}
  </g>
);

export const Lily = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,42 Q 1,20 0,-8" stroke="#5A8C5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="28" rx="4" ry="11" fill="#7BA55B" opacity="0.75" />
    <ellipse cx="7" cy="26" rx="4" ry="11" fill="#7BA55B" opacity="0.75" />
    {[0, 120, 240].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <path key={`b-${angle}`} d={`M 0,-6 Q ${Math.cos(rad) * 15},${Math.sin(rad) * 15} ${Math.cos(rad) * 34},${Math.sin(rad) * 34}`} fill="#E8D4FF" opacity="0.68" />;
    })}
    {[60, 180, 300].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <path key={`f-${angle}`} d={`M 0,0 Q ${Math.cos(rad) * 15},${Math.sin(rad) * 15} ${Math.cos(rad) * 32},${Math.sin(rad) * 32}`} fill="#D4B5FF" opacity="0.92" />;
    })}
    {[0, 120, 240].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const xPos = Math.cos(rad) * 6;
      const yPos = Math.sin(rad) * 6;
      return (
        <g key={`st-${i}`}>
          <line x1={xPos} y1={yPos} x2={xPos * 3} y2={yPos * 3} stroke="#E85D75" strokeWidth="1.5" opacity="0.65" />
          <circle cx={xPos * 3} cy={yPos * 3} r="1.8" fill="#FF6B7F" opacity="0.8" />
        </g>
      );
    })}
  </g>
);

export const Snapdragon = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q 1,18 0,-4" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="6" cy="24" rx="3" ry="9" fill="#7BA55B" opacity="0.7" />
    {Array.from({ length: 9 }).map((_, i) => {
      const offsetY = 36 - i * 6.5;
      return (
        <g key={i}>
          <ellipse cx="-7" cy={offsetY} rx="10" ry="5" fill="#FF6B7F" opacity={0.95 - i * 0.09} />
          <ellipse cx="7" cy={offsetY} rx="10" ry="5" fill="#FF6B7F" opacity={0.95 - i * 0.09} />
        </g>
      );
    })}
  </g>
);

export const GerberaDaisy = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q 0.5,18 0,-6" stroke="#5A8C5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="7" cy="26" rx="4" ry="10" fill="#7BA55B" opacity="0.75" />
    {Array.from({ length: 18 }).map((_, i) => {
      const angle = i * 20;
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={i} cx={Math.cos(rad) * 34} cy={Math.sin(rad) * 34} rx="10" ry="19" fill="#FF8C42" opacity="0.9" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="13" fill="#FFC700" opacity="0.85" />
    <circle cx="0" cy="0" r="9" fill="#FFD700" opacity="0.6" />
  </g>
);

export const Carnation = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,40 Q -1,17 0,-8" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-8" cy="24" rx="3.5" ry="11" fill="#7BA55B" opacity="0.7" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <circle key={`p-${angle}`} cx={Math.cos(rad) * 28} cy={Math.sin(rad) * 28} r="11" fill="#E85D75" opacity="0.8" />;
    })}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      return <circle key={`m-${angle}`} cx={Math.cos(rad) * 18} cy={Math.sin(rad) * 18} r="8" fill="#FFB6C7" opacity="0.75" />;
    })}
    <circle cx="0" cy="0" r="8" fill="#FFD4E5" opacity="0.75" />
  </g>
);

export const Ranunculus = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,38 Q -1,16 0,-6" stroke="#4A7C4E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="22" rx="3.5" ry="10" fill="#7BA55B" opacity="0.7" />
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = i * 25.7;
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={i} cx={Math.cos(rad) * 32} cy={Math.sin(rad) * 32} rx="12" ry="21" fill="#FFB347" opacity="0.85" transform={`rotate(${angle})`} />;
    })}
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = i * 25.7 + 12.8;
      const rad = (angle * Math.PI) / 180;
      return <ellipse key={`i-${i}`} cx={Math.cos(rad) * 20} cy={Math.sin(rad) * 20} rx="9" ry="15" fill="#FFD699" opacity="0.8" transform={`rotate(${angle})`} />;
    })}
    <circle cx="0" cy="0" r="9" fill="#FFC700" opacity="0.85" />
  </g>
);

export const Orchid = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,42 Q 2,20 1,-4" stroke="#5A8C5E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="-7" cy="28" rx="3.5" ry="10" fill="#7BA55B" opacity="0.7" />
    <ellipse cx="0" cy="-24" rx="7" ry="17" fill="#D4B5FF" opacity="0.82" />
    <path d="M -16,-8 Q -18,4 -13,12" fill="#C98FFF" opacity="0.75" />
    <path d="M 16,-8 Q 18,4 13,12" fill="#C98FFF" opacity="0.75" />
    <ellipse cx="-11" cy="8" rx="7.5" ry="12" fill="#D4B5FF" opacity="0.88" />
    <ellipse cx="11" cy="8" rx="7.5" ry="12" fill="#D4B5FF" opacity="0.88" />
    <path d="M -10,18 Q 0,26 10,18 Q 8,22 0,24 Q -8,22 -10,18" fill="#A855F7" opacity="0.92" />
    <circle cx="0" cy="20" r="2.5" fill="#8B5C99" opacity="0.65" />
  </g>
);
