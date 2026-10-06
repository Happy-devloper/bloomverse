import { useEffect } from 'react';

const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID?.trim();
const slotId = import.meta.env.VITE_ADSENSE_SLOT_ID?.trim();
const hasValidConfig = /^ca-pub-\d{16}$/.test(clientId || '') && /^\d{1,20}$/.test(slotId || '');
let adsenseScriptPromise;

if ((clientId || slotId) && !hasValidConfig) {
  console.error('Configure both VITE_ADSENSE_CLIENT_ID and VITE_ADSENSE_SLOT_ID with valid public values.');
}

const loadAdsenseScript = () => {
  if (!adsenseScriptPromise) {
    adsenseScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Unable to load the AdSense script.'));
      document.head.append(script);
    });
  }
  return adsenseScriptPromise;
};

export default function AdBanner() {
  useEffect(() => {
    if (!hasValidConfig) return undefined;

    let isMounted = true;
    loadAdsenseScript()
      .then(() => {
        if (isMounted) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      })
      .catch((error) => {
        console.error('AdSense could not be initialized:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!hasValidConfig) return null;

  return (
    <div className="w-full my-8">
      <div className="text-center text-sm text-gray-500 mb-2">
        <p>Advertisement</p>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
