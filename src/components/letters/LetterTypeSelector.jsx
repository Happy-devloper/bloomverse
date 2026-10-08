import { motion } from 'framer-motion';

// Letter template definitions
export const letterTemplates = [
  {
    id: 'classic-letter',
    name: 'Classic Letter',
    description: 'Full-page vintage letter with decorative borders',
  },
  {
    id: 'vintage-postcard',
    name: 'Vintage Postcard',
    description: 'Traditional postcard with front and back panels',
  }
];

export default function LetterTypeSelector({ selectedTemplate, onTemplateChange }) {
  // Visual icons for letter templates
  const LetterIcon = ({ type, isSelected }) => {
    const color = isSelected ? '#E85D75' : '#D1D5DB';

    const icons = {
      'classic-letter': (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          {/* Paper with decorative corners */}
          <rect x="4" y="3" width="16" height="18" rx="1" stroke={color} strokeWidth="1.5" />
          {/* Corner flourishes */}
          <path d="M6 5 L8 5 L8 7" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 5 L16 5 L16 7" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          {/* Text lines */}
          <line x1="7" y1="10" x2="17" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="7" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <line x1="7" y1="16" x2="14" y2="16" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
      'vintage-postcard': (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          {/* Postcard outline */}
          <rect x="3" y="6" width="18" height="12" rx="1" stroke={color} strokeWidth="1.5" />
          {/* Vertical divider */}
          <line x1="13" y1="6" x2="13" y2="18" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          {/* Stamp in top right */}
          <rect x="16" y="8" width="3" height="3" rx="0.5" stroke={color} strokeWidth="1" />
          {/* Address lines */}
          <line x1="14" y1="13" x2="19" y2="13" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
          <line x1="14" y1="15" x2="19" y2="15" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
          {/* Message lines on left */}
          <line x1="5" y1="10" x2="11" y2="10" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
          <line x1="5" y1="12" x2="11" y2="12" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
          <line x1="5" y1="14" x2="9" y2="14" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-charcoal mb-1">
          Select Letter Type
        </h2>
        <p className="text-xs text-gray-400 font-light">
          Choose the style for your vintage letter
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {letterTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <motion.button
              key={template.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTemplateChange(template.id)}
              className={`relative p-4 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center text-center cursor-pointer group ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4] shadow-sm'
                  : 'border-stone-100 bg-white hover:border-rose-pink/20'
              }`}
            >
              <div className={`mb-3 p-3 rounded-2xl transition-colors duration-200 ${
                isSelected ? 'bg-white' : 'bg-stone-50 group-hover:bg-rose-pink/5'
              }`}>
                <LetterIcon type={template.id} isSelected={isSelected} />
              </div>

              <div className="flex flex-col">
                <span className={`text-[13px] font-bold mb-0.5 transition-colors duration-200 ${
                  isSelected ? 'text-rose-pink' : 'text-charcoal'
                }`}>
                  {template.name}
                </span>
                <span className="text-[9px] text-gray-400 font-light leading-tight">
                  {template.description}
                </span>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeLetterTemplate"
                  transition={{ duration: 0.2 }}
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
