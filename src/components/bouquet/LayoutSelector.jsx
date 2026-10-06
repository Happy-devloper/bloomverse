import { layouts } from '../../data/flowers';
import { motion } from 'framer-motion';

export default function LayoutSelector({ selectedLayout, onLayoutChange }) {
  // Visual icons for layouts
  const LayoutIcon = ({ type, isSelected }) => {
    const color = isSelected ? '#E85D75' : '#D1D5DB';

    const icons = {
      classic: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <circle cx="12" cy="10" r="7" stroke={color} strokeWidth="1.5" />
          <path d="M12 17V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 19L12 17L15 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      cascade: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M7 6C7 6 9 4 12 4C15 4 17 6 17 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 10C6 10 9 8 12 8C15 8 18 10 18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 14C8 14 10 13 12 13C14 13 16 14 16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 18C10 18 11 17.5 12 17.5C13 17.5 14 18 14 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 4V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      ),
      modern: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <rect x="10" y="4" width="4" height="12" rx="2" stroke={color} strokeWidth="1.5" />
          <path d="M7 8L10 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17 12L14 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 16V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      heart: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M12 21L10.55 19.7C5.4 15.07 2 12 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12 18.6 15.07 13.45 19.71L12 21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 15V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  const layoutDetails = {
    classic: 'Rounded cluster of flowers.',
    cascade: 'Flowing waterfall arrangement.',
    modern: 'Minimalist vertical style.',
    heart: 'Heart-shaped romantic bunch.',
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-charcoal mb-1">
          Select Arrangement
        </h2>
        <p className="text-xs text-gray-400 font-light">
          How should your flowers be gathered?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {layouts.map((layout) => {
          const isSelected = selectedLayout === layout.id;

          return (
            <motion.button
              key={layout.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onLayoutChange(layout.id)}
              className={`relative p-4 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4] shadow-sm'
                  : 'border-stone-100 bg-white hover:border-rose-pink/20'
              }`}
            >
              <div className={`mb-3 p-3 rounded-2xl transition-colors ${
                isSelected ? 'bg-white' : 'bg-stone-50 group-hover:bg-rose-pink/5'
              }`}>
                <LayoutIcon type={layout.id} isSelected={isSelected} />
              </div>

              <div className="flex flex-col">
                <span className={`text-[13px] font-bold mb-0.5 transition-colors ${
                  isSelected ? 'text-rose-pink' : 'text-charcoal'
                }`}>
                  {layout.name}
                </span>
                <span className="text-[9px] text-gray-400 font-light leading-tight">
                  {layoutDetails[layout.id]}
                </span>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeLayout"
                  className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-rose-pink text-white rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
