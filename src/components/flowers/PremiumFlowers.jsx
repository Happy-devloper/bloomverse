/**
 * Premium Illustrated Greenery Collection
 * Designed to match the vintage, hand-etched style of the Bloomverse flowers.
 */

export const WatercolorFilter = () => (
  <defs>
    <filter id="illustrationEdge" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      <feGaussianBlur stdDeviation="0.3" />
    </filter>

    <filter id="premiumIllustration" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="0.5" result="blur" />
      <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated" />
      <feComponentTransfer in="saturated" result="enhanced">
        <feFuncR type="gamma" amplitude="1.1" exponent="0.9" />
        <feFuncG type="gamma" amplitude="1.1" exponent="0.9" />
        <feFuncB type="gamma" amplitude="1.1" exponent="0.9" />
      </feComponentTransfer>
      <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.15" />
    </filter>
  </defs>
);
