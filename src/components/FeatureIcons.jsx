// Beautiful SVG Icons to replace emoji
export const InstantIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-pink" fill="currentColor">
    <path d="M32 4C17.64 4 6 15.64 6 30c0 14.36 11.64 26 26 26s26-11.64 26-26S46.36 4 32 4zm0 48c-12.15 0-22-9.85-22-22s9.85-22 22-22 22 9.85 22 22-9.85 22-22 22z" />
    <path d="M32 14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2s2-.9 2-2V16c0-1.1-.9-2-2-2z" />
    <path d="M32 40c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <circle cx="44" cy="30" r="2" />
    <circle cx="20" cy="30" r="2" />
  </svg>
);

export const PersonalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-pink" fill="currentColor">
    {/* Heart shape with subtle petals */}
    <path d="M32 52L8.5 33c-6-5-8.5-11-8.5-16 0-9 7-16 16-16 5 0 10 2.5 13.5 6.5C24 5.5 29 4 34 4c9 0 16 7 16 16 0 5-2.5 11-8.5 16L32 52z" />
    <circle cx="20" cy="20" r="3" opacity="0.7" fill="white" />
    <circle cx="44" cy="20" r="3" opacity="0.7" fill="white" />
  </svg>
);

export const MagicalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-pink" fill="currentColor">
    {/* Wand with sparkles */}
    <path d="M16 50c-1.66 0-3-1.34-3-3V28c0-1.66 1.34-3 3-3h32c1.66 0 3 1.34 3 3v19c0 1.66-1.34 3-3 3H16z" opacity="0.5" />
    {/* Sparkles around */}
    <circle cx="12" cy="16" r="2" />
    <circle cx="22" cy="8" r="2" />
    <circle cx="32" cy="4" r="2.5" />
    <circle cx="42" cy="8" r="2" />
    <circle cx="52" cy="16" r="2" />
    <path d="M20 12l4-2 2 4 2-4 4 2" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M44 12l4-2 2 4 2-4 4 2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

export const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="text-center bg-gradient-to-br from-rose-pink/8 to-purple-pink/8 p-6 rounded-2xl border border-rose-pink/20 hover:border-rose-pink/40 transition-all duration-300 hover:shadow-lg hover:shadow-rose-pink/10">
    <div className="flex justify-center mb-3">
      <Icon />
    </div>
    <h3 className="font-display font-semibold text-charcoal text-sm mb-1">{title}</h3>
    <p className="text-xs text-gray-400 font-light leading-relaxed">{description}</p>
  </div>
);
