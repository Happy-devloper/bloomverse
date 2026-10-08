import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetCanvas from '../components/bouquet/BouquetCanvas';
import ThemeCoverPage from '../components/letters/ThemeCoverPage';
import ThemedLetterPage from '../components/letters/ThemedLetterPage';
import AdBanner from '../components/AdBanner';
import { downloadBouquetCard } from '../utils/cardDownloader';

// Heart Sparkle Particle Burst
const HeartBurst = () => {
  const hearts = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const distance = 40 + (i % 4) * 10;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 14 + (i % 3) * 6,
      delay: (i % 4) * 0.04,
    };
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-rose-pink"
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: h.x,
            y: h.y,
            scale: [0, 1.3, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.1,
            delay: h.delay,
            ease: 'easeOut',
          }}
          style={{
            fontSize: h.size,
            lineHeight: 1,
            marginTop: -h.size / 2,
            marginLeft: -h.size / 2,
          }}
        >
          🌸
        </motion.span>
      ))}
    </div>
  );
};

export default function SharedContentPage({ contentData }) {
  const [step, setStep] = useState(1); // 1: Reveal, 2: Card slide, 3: Text reveal, 4: Sparkle
  const [downloading, setDownloading] = useState(false);
  const [showCover, setShowCover] = useState(true);

  const isBouquet = contentData?.type === 'bouquet';
  const isLetter = contentData?.type === 'letter';

  useEffect(() => {
    // Phase timings for recipient reveal flow
    const cardTimer = setTimeout(() => setStep(2), isLetter ? 1000 : 2400);
    const textTimer = setTimeout(() => setStep(3), isLetter ? 1600 : 3200);
    const burstTimer = setTimeout(() => setStep(4), isLetter ? 2200 : 3800);

    return () => {
      clearTimeout(cardTimer);
      clearTimeout(textTimer);
      clearTimeout(burstTimer);
    };
  }, [isLetter]);

  if (!contentData) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#FFEBE5]/60">
          <h1 className="text-3xl font-display font-bold text-charcoal mb-4">
            Invalid Link
          </h1>
          <p className="text-gray-600 mb-8">This link is no longer valid or is broken.</p>
          <a
            href="/"
            className="inline-block w-full bg-rose-pink hover:bg-[#E04D66] active:scale-95 text-white font-semibold py-4 rounded-full text-center transition-all duration-200 min-h-[48px] flex items-center justify-center shadow-md"
          >
            Create Your Own
          </a>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadBouquetCard(contentData);
    } catch (err) {
      console.error(err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] py-10 px-4 overflow-hidden flex flex-col items-center">
      {/* Blurred background bokeh lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-30, 30, -30],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#FFD6E0]/20 blur-[80px]"
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [30, -30, 30],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#C8B6FF]/15 blur-[90px]"
        />
        <motion.div
          animate={{
            y: [-40, 40, -40],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#FFF0E0]/30 blur-[70px]"
        />
      </div>

      <div className="relative w-full max-w-[800px] flex flex-col items-center z-10">
        
        {/* Recipient Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-xs tracking-[4px] text-rose-pink font-semibold uppercase block mb-1">
            Bloomverse Gift
          </span>
          <h2 className="text-lg font-body text-gray-500 italic">
            {isBouquet ? 'A special bouquet has bloomed for you' : 'A romantic letter awaits you'}
          </h2>
        </motion.div>

        {/* Content Display */}
        <div className="w-full mb-6">
          {isBouquet ? (
            <BouquetCanvas
              selectedFlowers={contentData.flowers}
              layout={contentData.layout}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Toggle for letter - show cover first, then letter */}
              {isLetter && contentData.coverPageVisible && (
                <div className="mb-4 flex justify-center gap-2">
                  <button
                    onClick={() => setShowCover(true)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      showCover 
                        ? 'bg-rose-pink text-white' 
                        : 'bg-white text-gray-600 border border-gray-300'
                    }`}
                  >
                    📄 Cover
                  </button>
                  <button
                    onClick={() => setShowCover(false)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      !showCover 
                        ? 'bg-rose-pink text-white' 
                        : 'bg-white text-gray-600 border border-gray-300'
                    }`}
                  >
                    💌 Letter
                  </button>
                </div>
              )}
              
              {showCover && contentData.coverPageVisible ? (
                <div style={{ maxHeight: '70vh', overflow: 'auto', borderRadius: '15px' }}>
                  <ThemeCoverPage
                    themeId={contentData.themeId || 'vintage-love'}
                    recipientName={contentData.recipientName}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ThemedLetterPage
                    themeId={contentData.themeId || 'vintage-love'}
                    handwritingStyle={contentData.handwritingStyle || 'Dancing Script'}
                    content={{
                      recipientName: contentData.recipientName,
                      senderName: contentData.senderName,
                      message: contentData.message
                    }}
                    scale={0.85}
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Glassmorphism Message Card (Slides Up) */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full bg-white/90 backdrop-blur-md rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-white/80 p-8 mb-8 text-center"
            >
              {/* Heart burst triggers in step 4 */}
              {step >= 4 && <HeartBurst />}

              <p className="text-xs text-rose-pink/70 tracking-[2px] font-semibold uppercase mb-3 block">
                For You
              </p>

              <h1 className="text-3xl font-display font-bold text-charcoal mb-4">
                {contentData.recipientName}
              </h1>

              <div className="h-[2px] w-12 bg-rose-pink/20 mx-auto mb-6" />

              {/* Message text fades in */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 3 ? 1 : 0 }}
                transition={{ duration: 1.2 }}
                className="text-lg text-charcoal font-body leading-relaxed mb-6 whitespace-pre-wrap font-light"
              >
                "{contentData.message}"
              </motion.p>

              <div className="h-[2px] w-12 bg-rose-pink/20 mx-auto mb-6" />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 3 ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-sm text-gray-500 font-display italic"
              >
                With love from <span className="font-semibold text-charcoal not-italic font-body ml-1">{contentData.senderName}</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full space-y-4 mb-10"
        >
          {/* Download Card Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full bg-rose-pink hover:bg-[#E04D66] active:scale-98 disabled:opacity-70 text-white font-semibold rounded-full min-h-[48px] flex items-center justify-center shadow-[0_4px_14px_rgba(232,93,117,0.3)] transition-all duration-200"
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              `⬇️ Save ${isBouquet ? 'Card' : 'Letter'} to Device`
            )}
          </button>
        </motion.div>

        {/* Advertisement Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full"
        >
          <AdBanner />
        </motion.div>

        {/* Create Your Own CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full bg-gradient-to-tr from-rose-pink to-[#FFA6B9] rounded-[24px] p-8 text-center shadow-[0_10px_30px_rgba(232,93,117,0.15)] mb-12 border border-white/20"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            {isBouquet ? 'Create a Bouquet' : 'Send a Love Letter'}
          </h3>
          <p className="text-white/90 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
            {isBouquet 
              ? 'Send someone special a personalized digital flower bouquet with a luxury animation.'
              : 'Create your own romantic themed letter and share memories with loved ones.'}
          </p>
          <a
            href="/"
            className="inline-block bg-white hover:bg-rose-50 text-rose-pink font-semibold px-8 py-3.5 rounded-full shadow-md active:scale-95 transition-all duration-200 min-h-[48px] flex items-center justify-center"
          >
            Start Designing
          </a>
        </motion.div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mb-12">
          <p className="font-display font-bold tracking-[2px] text-gray-500 mb-1">BLOOMVERSE</p>
          <p>© {new Date().getFullYear()} • Premium Romantic Greetings & Love Letters</p>
        </footer>
      </div>
    </div>
  );
}
