import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * ClassicLetterTemplate Component
 * Authentic vintage letter with torn edges, watercolor stains, and dried flowers
 */
export default function ClassicLetterTemplate({ 
  recipientName, 
  senderName, 
  message, 
  handwritingStyle = 'elegant-script',
  isPreview = false 
}) {
  const fontStyles = {
    'elegant-script': "'Dancing Script', cursive",
    'casual-cursive': "'Shadows Into Light', cursive",
    'classic-pen': "'Cedarville Cursive', cursive",
    'modern-hand': "'Patrick Hand', cursive",
    'vintage-ink': "'Reenie Beanie', cursive",
  };

  const selectedFont = fontStyles[handwritingStyle] || fontStyles['elegant-script'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, rotateZ: -1 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="vintage-letter-realistic relative w-full max-w-[420px] mx-auto"
      style={{ aspectRatio: '3/4.2' }}
    >
      {/* Background surface (table/wall) */}
      <div className="absolute -inset-12 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 -z-20 blur-sm" />

      {/* Paper shadow */}
      <div 
        className="absolute inset-0 blur-2xl -z-10 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)',
          transform: 'translateY(8px) scale(0.95)',
        }}
      />

      {/* Main paper with torn edges */}
      <div 
        className="relative w-full h-full"
        style={{
          background: 'linear-gradient(165deg, #F5E6D3 0%, #E8D5B7 25%, #F0DFC5 50%, #E5D4BA 75%, #F2E3CE 100%)',
          clipPath: `polygon(
            2% 1%, 5% 0.5%, 10% 1.5%, 15% 0.8%, 20% 2%, 25% 1%, 30% 1.8%, 35% 0.5%, 
            40% 1.2%, 45% 0.8%, 50% 2%, 55% 1%, 60% 1.5%, 65% 0.8%, 70% 2%, 75% 1.2%, 
            80% 1.8%, 85% 1%, 90% 2%, 95% 1.2%, 98% 1.5%,
            99% 5%, 99.5% 10%, 99% 15%, 99.5% 20%, 99% 25%, 99.5% 30%, 99% 35%, 
            99.5% 40%, 99% 45%, 99.5% 50%, 99% 55%, 99.5% 60%, 99% 65%, 99.5% 70%, 
            99% 75%, 99.5% 80%, 99% 85%, 99.5% 90%, 99% 95%, 98.5% 98%,
            95% 99%, 90% 98.5%, 85% 99%, 80% 98.5%, 75% 99.2%, 70% 98.5%, 65% 99%, 
            60% 98.8%, 55% 99.2%, 50% 98.5%, 45% 99%, 40% 98.5%, 35% 99.2%, 30% 98.5%, 
            25% 99%, 20% 98.8%, 15% 99%, 10% 98.5%, 5% 99%, 2% 98.5%,
            1% 95%, 0.5% 90%, 1.2% 85%, 0.5% 80%, 1% 75%, 0.8% 70%, 1.2% 65%, 
            0.5% 60%, 1% 55%, 0.8% 50%, 1.2% 45%, 0.5% 40%, 1% 35%, 0.8% 30%, 
            1.2% 25%, 0.5% 20%, 1% 15%, 0.5% 10%, 1.2% 5%
          )`,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        }}
      >
        {/* Realistic paper texture */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 119, 101, 0.03) 2px, rgba(139, 119, 101, 0.03) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 119, 101, 0.02) 2px, rgba(139, 119, 101, 0.02) 4px)
            `,
          }}
        />

        {/* Watercolor stains - large */}
        <div 
          className="absolute top-[8%] right-[12%] w-32 h-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(205, 133, 63, 0.4) 0%, rgba(210, 145, 82, 0.25) 40%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
        <div 
          className="absolute bottom-[15%] left-[8%] w-40 h-28 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(188, 143, 108, 0.35) 0%, rgba(194, 154, 120, 0.2) 50%, transparent 75%)',
            filter: 'blur(18px)',
          }}
        />
        <div 
          className="absolute top-[35%] left-[5%] w-24 h-24 rounded-full opacity-12"
          style={{
            background: 'radial-gradient(circle, rgba(210, 180, 140, 0.3) 0%, transparent 65%)',
            filter: 'blur(12px)',
          }}
        />

        {/* Small watercolor spots */}
        <div className="absolute top-[18%] left-[15%] w-8 h-8 rounded-full bg-amber-900/10 blur-sm" />
        <div className="absolute top-[62%] right-[22%] w-6 h-6 rounded-full bg-amber-800/8 blur-sm" />
        <div className="absolute bottom-[28%] right-[8%] w-10 h-10 rounded-full bg-amber-900/12 blur-md" />

        {/* Coffee ring stain */}
        <div 
          className="absolute top-[5%] left-[6%] w-16 h-16 rounded-full border-2 opacity-15"
          style={{
            borderColor: 'rgba(139, 90, 43, 0.3)',
            background: 'radial-gradient(circle, transparent 45%, rgba(139, 90, 43, 0.08) 45%, rgba(139, 90, 43, 0.05) 55%, transparent 55%)',
            transform: 'rotate(-8deg)',
          }}
        />

        {/* Burn/scorch marks on edges */}
        <div className="absolute top-0 right-[8%] w-20 h-12 bg-gradient-to-b from-amber-900/15 to-transparent blur-md" />
        <div className="absolute bottom-0 left-[12%] w-24 h-16 bg-gradient-to-t from-amber-900/12 to-transparent blur-lg" />

        {/* Content area */}
        <div className="relative h-full p-8 md:p-10 flex flex-col">
          
          {/* Recipient */}
          <div className="mb-6">
            <p 
              className="text-xl md:text-2xl"
              style={{
                fontFamily: selectedFont,
                color: '#2B1810',
                lineHeight: '1.6',
              }}
            >
              Dear {recipientName || 'Self'},
            </p>
          </div>

          {/* Message body */}
          <div className="flex-1 mb-6">
            <p 
              className="text-base md:text-lg whitespace-pre-wrap"
              style={{
                fontFamily: selectedFont,
                color: '#2B1810',
                lineHeight: '2.2',
                letterSpacing: '0.01em',
              }}
            >
              {message || 'I don\'t need roses or little conversations hearts to let you know just how amazing you are...'}
            </p>
          </div>

          {/* Signature */}
          <div className="mt-auto">
            <p 
              className="text-lg md:text-xl"
              style={{
                fontFamily: selectedFont,
                color: '#2B1810',
              }}
            >
              Love,
            </p>
            <p 
              className="text-xl md:text-2xl flex items-center gap-1"
              style={{
                fontFamily: selectedFont,
                color: '#2B1810',
              }}
            >
              {senderName || 'Me'}
              <span className="text-red-600">♡</span>
            </p>
          </div>
        </div>

        {/* Dried flower decoration (right side) */}
        <div className="absolute right-[8%] top-[15%] bottom-[25%]">
          {/* Flower stem */}
          <svg 
            viewBox="0 0 40 200" 
            className="h-full w-auto opacity-60"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          >
            {/* Main stem */}
            <path 
              d="M20,200 Q18,150 20,100 Q22,50 20,0" 
              stroke="#5C4033" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Side branches */}
            <path d="M20,40 Q25,35 28,32" stroke="#5C4033" strokeWidth="1.5" fill="none" />
            <path d="M20,80 Q15,75 12,70" stroke="#5C4033" strokeWidth="1.5" fill="none" />
            <path d="M20,120 Q26,115 30,110" stroke="#5C4033" strokeWidth="1.5" fill="none" />
            
            {/* Dried flower heads */}
            <g transform="translate(14, 15)">
              <ellipse cx="6" cy="0" rx="5" ry="7" fill="#8B7355" opacity="0.7" transform="rotate(-15 6 0)" />
              <ellipse cx="6" cy="0" rx="4" ry="6" fill="#A0826D" opacity="0.6" transform="rotate(-25 6 0)" />
              <ellipse cx="6" cy="0" rx="3" ry="5" fill="#B8956B" opacity="0.5" transform="rotate(10 6 0)" />
            </g>
            
            <g transform="translate(22, 60)">
              <ellipse cx="6" cy="0" rx="4" ry="6" fill="#8B7355" opacity="0.6" transform="rotate(20 6 0)" />
              <ellipse cx="6" cy="0" rx="3" ry="5" fill="#9A7D5F" opacity="0.5" transform="rotate(35 6 0)" />
            </g>
            
            <g transform="translate(18, 100)">
              <ellipse cx="0" cy="0" rx="5" ry="7" fill="#8B7355" opacity="0.65" transform="rotate(-20 0 0)" />
              <ellipse cx="0" cy="0" rx="4" ry="6" fill="#A68B6A" opacity="0.55" transform="rotate(-35 0 0)" />
            </g>

            {/* Small leaves */}
            <ellipse cx="25" cy="45" rx="3" ry="8" fill="#9B8B7E" opacity="0.4" transform="rotate(25 25 45)" />
            <ellipse cx="15" cy="85" rx="3" ry="7" fill="#9B8B7E" opacity="0.35" transform="rotate(-30 15 85)" />
            <ellipse cx="26" cy="125" rx="3" ry="8" fill="#9B8B7E" opacity="0.4" transform="rotate(20 26 125)" />
          </svg>
        </div>

        {/* Tape pieces on corners (holding the paper) */}
        <div 
          className="absolute -top-2 left-[15%] w-16 h-8 bg-yellow-50/40 backdrop-blur-sm"
          style={{
            transform: 'rotate(-5deg)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
            border: '0.5px solid rgba(255,255,255,0.3)',
          }}
        />
        <div 
          className="absolute -top-2 right-[15%] w-16 h-8 bg-yellow-50/40 backdrop-blur-sm"
          style={{
            transform: 'rotate(8deg)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
            border: '0.5px solid rgba(255,255,255,0.3)',
          }}
        />
      </div>
    </motion.div>
  );
}