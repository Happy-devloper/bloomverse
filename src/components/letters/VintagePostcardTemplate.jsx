import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * VintagePostcardTemplate Component
 * Renders a two-sided vintage postcard with front botanical illustration and back message area
 * 
 * Requirements: 3.1, 3.5, 4.3, 4.4, 4.5, 4.6, 15.1, 15.3
 */
export default function VintagePostcardTemplate({ recipientName, senderName, message, isPreview = false }) {
  const [showBack, setShowBack] = useState(false);

  return (
    <div className="vintage-postcard-container w-full max-w-[700px] mx-auto">
      {/* Desktop: Side by side view */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <PostcardFront />
        <PostcardBack recipientName={recipientName} senderName={senderName} message={message} />
      </div>

      {/* Mobile: Flip card */}
      <div className="md:hidden relative" style={{ aspectRatio: '3/2' }}>
        <motion.div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setShowBack(!showBack)}
          animate={{ rotateY: showBack ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <PostcardFront />
          </div>
          <div 
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <PostcardBack recipientName={recipientName} senderName={senderName} message={message} />
          </div>
        </motion.div>
        
        {/* Tap instruction */}
        <p className="text-center mt-4 text-sm text-gray-500 italic">
          Tap to {showBack ? 'see front' : 'see back'}
        </p>
      </div>
    </div>
  );
}

function PostcardFront() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="postcard-front relative w-full bg-gradient-to-br from-[#FFF9F5] to-[#F5E8DC] rounded-lg overflow-hidden"
      style={{
        aspectRatio: '3/2',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 0 0 8px #D4A373',
      }}
    >
      {/* Decorative border */}
      <div className="absolute inset-2 border-4 border-double border-[#C19A6B] rounded" />

      {/* Botanical illustration */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        {/* Vintage flower bouquet SVG */}
        <svg viewBox="0 0 200 240" className="w-full h-full opacity-80" fill="none">
          {/* Stems */}
          <path d="M100,220 L100,100" stroke="#6B8E23" strokeWidth="3" strokeLinecap="round"/>
          <path d="M80,200 L90,120" stroke="#6B8E23" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M120,200 L110,130" stroke="#6B8E23" strokeWidth="2.5" strokeLinecap="round"/>
          
          {/* Main rose */}
          <circle cx="100" cy="80" r="25" fill="#E85D75" opacity="0.7"/>
          <circle cx="90" cy="75" r="15" fill="#FF69B4" opacity="0.6"/>
          <circle cx="110" cy="75" r="15" fill="#FF1493" opacity="0.6"/>
          <circle cx="100" cy="65" r="12" fill="#FFB6C1" opacity="0.8"/>
          
          {/* Side flowers */}
          <circle cx="70" cy="100" r="18" fill="#DDA0DD" opacity="0.7"/>
          <circle cx="65" cy="95" r="10" fill="#EE82EE" opacity="0.6"/>
          
          <circle cx="130" cy="110" r="16" fill="#FFD700" opacity="0.7"/>
          <circle cx="135" cy="105" r="9" fill="#FFA500" opacity="0.6"/>
          
          {/* Leaves */}
          <ellipse cx="85" cy="140" rx="12" ry="20" fill="#90EE90" opacity="0.6" transform="rotate(-20 85 140)"/>
          <ellipse cx="115" cy="150" rx="12" ry="20" fill="#90EE90" opacity="0.6" transform="rotate(20 115 150)"/>
          <ellipse cx="95" cy="170" rx="10" ry="18" fill="#90EE90" opacity="0.5" transform="rotate(-10 95 170)"/>
        </svg>
      </div>

      {/* "Greetings from Bloomverse" text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p 
          className="text-sm tracking-widest"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#8B7355',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }}
        >
          GREETINGS FROM BLOOMVERSE
        </p>
      </div>
    </motion.div>
  );
}

function PostcardBack({ recipientName, senderName, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="postcard-back relative w-full bg-gradient-to-br from-[#FFFAF0] to-[#F5E8DC] rounded-lg overflow-hidden"
      style={{
        aspectRatio: '3/2',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 0 0 8px #D4A373',
      }}
    >
      {/* Decorative border */}
      <div className="absolute inset-2 border-2 border-dashed border-[#C19A6B] rounded" />

      <div className="relative h-full flex">
        {/* Message section (left 60%) */}
        <div className="w-[60%] p-6 flex flex-col justify-center">
          <div className="space-y-3">
            <p 
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{
                fontFamily: "'Merriweather', serif",
                color: '#4E342E',
                lineHeight: '1.6',
              }}
            >
              {message || 'Your message here...'}
            </p>
            
            <p 
              className="text-xs text-right italic mt-4"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#6B5345',
              }}
            >
              {senderName ? `- ${senderName}` : ''}
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div 
          className="w-px bg-gradient-to-b from-transparent via-[#C19A6B] to-transparent"
        />

        {/* Address section (right 40%) */}
        <div className="w-[40%] p-4 flex flex-col">
          {/* Stamp area */}
          <div className="flex justify-end mb-3">
            <div 
              className="w-12 h-12 border-2 border-[#8B7355] border-dashed rounded flex items-center justify-center"
              style={{ transform: 'rotate(2deg)' }}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#E85D75">
                <circle cx="12" cy="10" r="3"/>
                <path d="M12,14 L8,18 L12,16 L16,18 Z"/>
              </svg>
            </div>
          </div>

          {/* Address lines */}
          <div className="flex-1 flex flex-col justify-center space-y-3">
            <div>
              <p 
                className="text-sm font-semibold mb-2"
                style={{
                  fontFamily: "'Merriweather', serif",
                  color: '#3E2723',
                }}
              >
                {recipientName || 'Recipient Name'}
              </p>
              <div className="space-y-1">
                <div className="h-px bg-[#C19A6B] opacity-40"/>
                <div className="h-px bg-[#C19A6B] opacity-40"/>
                <div className="h-px bg-[#C19A6B] opacity-40"/>
              </div>
            </div>
          </div>

          {/* Postmark decoration */}
          <div className="mt-auto flex justify-end">
            <svg viewBox="0 0 60 30" className="w-16 opacity-30">
              <circle cx="30" cy="15" r="14" fill="none" stroke="#8B7355" strokeWidth="1" strokeDasharray="2,2"/>
              <text x="30" y="18" textAnchor="middle" fontSize="8" fill="#8B7355" fontFamily="serif">
                SENT
              </text>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}