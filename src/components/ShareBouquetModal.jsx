import { useState } from 'react';
import { copyToClipboard, generateShareLinks } from '../utils/urlShortener';

export default function ShareBouquetModal({ bouquetData, onClose }) {
  const [shareLinks, setShareLinks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  const generateLinks = async () => {
    setLoading(true);
    try {
      const links = await generateShareLinks(bouquetData);
      setShareLinks(links);
    } catch (error) {
      console.error('Error generating share links:', error);
    }
    setLoading(false);
  };

  const handleCopyLink = async (link, linkType) => {
    const success = await copyToClipboard(link);
    if (success) {
      setCopiedLink(linkType);
      setTimeout(() => setCopiedLink(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
        <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Share Your Bouquet</h2>
        <p className="text-gray-500 text-sm mb-6">Choose how to share this beautiful gift</p>

        {!shareLinks ? (
          <button
            onClick={generateLinks}
            disabled={loading}
            className="w-full bg-rose-pink hover:bg-[#E04D66] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Links...' : 'Generate Share Links'}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Compact link is generated locally to keep bouquet details private from link-shortening services. */}
            <div className="border border-rose-pink/20 rounded-lg p-4 bg-gradient-to-br from-rose-pink/5 to-purple-pink/5">
              <p className="text-xs font-semibold text-rose-pink uppercase tracking-wide mb-2">🔗 Compact Share Link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareLinks.shortened || 'Generating...'}
                  className="flex-1 text-sm bg-white border border-gray-200 rounded px-3 py-2 truncate cursor-pointer hover:border-rose-pink/50"
                  onClick={(e) => e.target.select()}
                />
                <button
                  onClick={() => handleCopyLink(shareLinks.shortened, 'short')}
                  className="px-4 py-2 bg-rose-pink hover:bg-[#E04D66] text-white rounded font-semibold text-sm transition-all duration-200"
                >
                  {copiedLink === 'short' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {shareLinks.shortUrlLength} characters ({Math.round((1 - shareLinks.shortUrlLength / shareLinks.fullUrlLength) * 100)}% shorter)
              </p>
            </div>

            {/* Social Share Buttons */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">📱 Share On</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLinks.shortened)}&text=Check out this beautiful digital bouquet I created!`, '_blank', 'noopener,noreferrer')}
                  className="py-2 px-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all"
                >
                  𝕏
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLinks.shortened)}`, '_blank', 'noopener,noreferrer')}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all"
                >
                  f
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Check out this beautiful digital bouquet: ' + shareLinks.shortened)}`, '_blank', 'noopener,noreferrer')}
                  className="py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-all"
                >
                  💬
                </button>
              </div>
            </div>

            {/* Copy to Clipboard Feedback */}
            {copiedLink && (
              <p className="text-center text-sm text-green-600 font-semibold">✓ Copied to clipboard!</p>
            )}

            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
