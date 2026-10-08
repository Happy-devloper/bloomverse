import { motion } from 'framer-motion';

/**
 * CreationModeSelector Component
 * Allows users to choose between creating a flower bouquet or a vintage letter
 * 
 * @param {Object} props
 * @param {'bouquet' | 'letter'} props.selectedMode - Currently selected creation mode
 * @param {Function} props.onModeChange - Callback when mode changes
 */
export default function CreationModeSelector({ selectedMode, onModeChange }) {
  const modes = [
    {
      id: 'bouquet',
      label: 'Flower Bouquet',
      description: 'Create a beautiful digital arrangement',
      icon: (isSelected) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <path
            d="M12 21C12 21 5 15 5 10C5 7.23858 7.23858 5 10 5C10.8642 5 11.6814 5.21038 12.4 5.58657C13.1186 5.21038 13.9358 5 14.8 5C17.5614 5 19.8 7.23858 19.8 10C19.8 15 12.8 21 12.8 21H12Z"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isSelected ? '#FFD6E0' : 'none'}
          />
          <circle
            cx="9"
            cy="8"
            r="2"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            fill={isSelected ? '#E85D75' : 'none'}
          />
          <circle
            cx="15"
            cy="8"
            r="2"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            fill={isSelected ? '#E85D75' : 'none'}
          />
          <circle
            cx="12"
            cy="11"
            r="2"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            fill={isSelected ? '#E85D75' : 'none'}
          />
          <path
            d="M12 15V22"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 'letter',
      label: 'Vintage Letter',
      description: 'Compose a nostalgic greeting card',
      icon: (isSelected) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            fill={isSelected ? '#FFF9F5' : 'none'}
          />
          <path
            d="M7 9H17M7 13H17M7 17H13"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 8L11 13C11.5523 13.3333 12.4477 13.3333 13 13L21 8"
            stroke={isSelected ? '#E85D75' : '#9CA3AF'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-charcoal mb-1">
          What would you like to create?
        </h2>
        <p className="text-xs text-gray-400 font-light">
          Choose between a beautiful bouquet or a heartfelt letter
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modes.map((mode) => {
          const isSelected = selectedMode === mode.id;

          return (
            <motion.button
              key={mode.id}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              onClick={() => onModeChange(mode.id)}
              className={`relative p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center text-center cursor-pointer group ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4] shadow-lg'
                  : 'border-stone-200 bg-white hover:border-rose-pink/30 hover:shadow-md'
              }`}
              transition={{ duration: 0.2 }}
            >
              {/* Icon Container */}
              <div
                className={`mb-4 p-4 rounded-2xl transition-all duration-200 ${
                  isSelected
                    ? 'bg-white shadow-sm'
                    : 'bg-stone-50 group-hover:bg-rose-pink/5'
                }`}
              >
                {mode.icon(isSelected)}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span
                  className={`text-base font-bold mb-1 transition-colors duration-200 ${
                    isSelected ? 'text-rose-pink' : 'text-charcoal'
                  }`}
                >
                  {mode.label}
                </span>
                <span className="text-[10px] text-gray-400 font-light leading-tight">
                  {mode.description}
                </span>
              </div>

              {/* Selected Checkmark */}
              {isSelected && (
                <motion.div
                  layoutId="activeModeIndicator"
                  className="absolute -top-2 -right-2 w-7 h-7 bg-rose-pink text-white rounded-full flex items-center justify-center shadow-md z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
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
