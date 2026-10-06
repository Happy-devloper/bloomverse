import { useState } from 'react';
import BouquetCanvas from '../components/bouquet/BouquetCanvas';
import { generateShareLink } from '../utils/urlEncoding';
import { downloadBouquetCard } from '../utils/cardDownloader';

export default function PreviewScreen({ bouquetData, onBack, onShare }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const shareLink = generateShareLink(bouquetData);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy share link:', error);
      alert('Unable to copy the link. Please copy it from the link below.');
    }
  };

  const shareOnWhatsApp = () => {
    const text = `I created a digital flower bouquet for you on Bloomverse! 🌸 Open this link to watch it bloom:`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + shareLink)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Wait for animations to complete (bouquet animation takes ~2.5 seconds)
      // Adding extra time to ensure flowers are fully settled
      await new Promise(resolve => setTimeout(resolve, 3000));
      await downloadBouquetCard(bouquetData);
    } catch (err) {
      console.error(err);
      alert('Failed to generate card image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] py-10 px-4 flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#FFD6E0]/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[390px] flex flex-col items-center z-10">
        <div className="text-center mb-6">
          <span className="text-xs tracking-[4px] text-rose-pink font-semibold uppercase block mb-1">
            Creation Complete
          </span>
          <h1 className="text-3xl font-display font-bold text-charcoal">
            Your Bouquet is Ready!
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-light">
            Preview your luxury greeting card and share it.
          </p>
        </div>

        {/* Live Preview Container */}
        <div className="w-full bg-white/70 backdrop-blur-sm rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#FFEBE5]/40 p-4 mb-6">
          <BouquetCanvas
            selectedFlowers={bouquetData.flowers}
            layout={bouquetData.layout}
          />
          <p className="text-xs text-gray-400 text-center mt-3 italic">
            💡 Tip: Let the bouquet bloom fully before downloading for best results
          </p>
        </div>

        {/* Message Card Preview */}
        <div className="w-full bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-8 mb-6 text-center">
          <p className="text-xs text-rose-pink/60 tracking-[2px] font-semibold uppercase mb-2">
            Card Preview
          </p>
          <h2 className="text-2xl font-display font-semibold text-charcoal mb-4">
            To: {bouquetData.recipientName}
          </h2>
          <div className="h-[1px] w-8 bg-rose-pink/15 mx-auto mb-4" />
          <p className="text-charcoal font-body leading-relaxed mb-4 text-base font-light italic">
            "{bouquetData.message}"
          </p>
          <div className="h-[1px] w-8 bg-rose-pink/15 mx-auto mb-4" />
          <p className="text-xs text-gray-400">
            From: <span className="font-semibold text-charcoal not-italic font-body ml-1">{bouquetData.senderName}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="w-full space-y-3 mb-6">
          {/* Copy Link Button */}
          <button
            onClick={copyToClipboard}
            className={`w-full font-semibold rounded-full min-h-[48px] flex items-center justify-center transition-all duration-250 ${
              copied
                ? 'bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]'
                : 'bg-rose-pink hover:bg-[#E04D66] text-white shadow-[0_4px_14px_rgba(232,93,117,0.3)]'
            }`}
          >
            {copied ? '✓ Link Copied!' : '📋 Copy Share Link'}
          </button>
          
          {/* Share on WhatsApp */}
          <button
            onClick={shareOnWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-semibold rounded-full min-h-[48px] flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.25)] transition-all duration-200"
          >
            💬 Share on WhatsApp
          </button>

          {/* Download Image Card */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full bg-white hover:bg-gray-50 active:scale-98 disabled:opacity-75 border-2 border-rose-pink/20 text-rose-pink font-semibold rounded-full min-h-[48px] flex items-center justify-center transition-all duration-200"
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-rose-pink" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Capturing bouquet...
              </span>
            ) : (
              '⬇️ Download Photo Card'
            )}
          </button>
        </div>

        {/* Share Link Display Panel */}
        <div className="w-full bg-[#FFD6E0]/20 rounded-[20px] p-4 mb-8 border border-[#FFD6E0]/45">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-[1px] mb-1.5">
            Recipients can view it at:
          </p>
          <p className="text-[11px] break-all text-gray-600 font-mono select-all bg-white/50 p-2 rounded-lg border border-white">
            {shareLink}
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="w-full flex gap-3 mb-12">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-charcoal font-semibold rounded-full min-h-[48px] transition active:scale-95"
          >
            ← Back to Editor
          </button>
          
          <button
            onClick={onShare}
            className="flex-1 px-4 py-3 bg-charcoal hover:bg-gray-800 text-white font-semibold rounded-full min-h-[48px] transition active:scale-95 shadow-md"
          >
            Create Another
          </button>
        </div>
      </div>
    </div>
  );
}
