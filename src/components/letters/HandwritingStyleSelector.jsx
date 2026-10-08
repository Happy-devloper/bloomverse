import { motion } from 'framer-motion';
import { handwritingStyles } from '../../data/letterTemplates';

/**
 * HandwritingStyleSelector Component
 * Allows users to choose their preferred handwriting style for the letter
 */
export default function HandwritingStyleSelector({ selectedStyle, onStyleChange }) {
  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h2 className="text-xl font-display font-bold text-charcoal mb-1">
          Choose Handwriting Style
        </h2>
        <p className="text-xs text-gray-400 font-light">
          Select the writing style for your vintage letter
        </p>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {handwritingStyles.map((style) => {
          const isSelected = selectedStyle === style.id;

          return (
            <motion.button
              key={style.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStyleChange(style.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4] shadow-sm'
                  : 'border-stone-100 bg-white hover:border-rose-pink/20'
              }`}
            >
              {/* Sample text in the font */}
              <div className="flex-1">
                <p 
                  className="text-xl mb-1"
                  style={{ 
                    fontFamily: style.fontFamily,
                    color: isSelected ? '#E85D75' : '#3E2723',
                  }}
                >
                  Dear Friend,
                </p>
                <p className="text-xs text-gray-500">{style.description}</p>
              </div>

              {/* Checkmark */}
              {isSelected && (
                <motion.div
                  layoutId="activeHandwritingStyle"
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 bg-rose-pink text-white rounded-full flex items-center justify-center flex-shrink-0"
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