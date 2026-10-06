import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerSelector from '../components/flowers/FlowerSelector';
import LayoutSelector from '../components/bouquet/LayoutSelector';
import MessageEditor from '../components/bouquet/MessageEditor';
import BouquetCanvas from '../components/bouquet/BouquetCanvas';

export default function BouquetBuilder({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState('classic');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const prevCountRef = useRef(selectedFlowers.length);
  useEffect(() => {
    // Only scroll the preview into view the first time flowers are added
    if (selectedFlowers.length > 0 && prevCountRef.current === 0) {
      const el = document.querySelector('canvas');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    prevCountRef.current = selectedFlowers.length;
  }, [selectedFlowers]);

  const stepNames = ['Choose Flowers', 'Pick A Style', 'Add A Message'];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        flowers: selectedFlowers,
        layout: selectedLayout,
        recipientName,
        senderName,
        message,
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return selectedFlowers.length > 0;
    if (step === 2) return true;
    if (step === 3) return recipientName.trim() && senderName.trim() && message.trim();
    return false;
  };

  return (
    <div className="min-h-screen bg-[#fffaf8] px-4 py-6">
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-4">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-pink">Bloomverse</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-800">Build a simple bouquet</h1>
          <p className="mt-1 text-sm text-slate-500">Pick flowers, preview the look, and keep it clean.</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Step {step} of 3</p>
            <p className="text-sm font-medium text-slate-600">{stepNames[step - 1]}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <FlowerSelector
                  selectedFlowers={selectedFlowers}
                  onFlowerToggle={setSelectedFlowers}
                />
              )}
              {step === 2 && (
                <LayoutSelector
                  selectedLayout={selectedLayout}
                  onLayoutChange={setSelectedLayout}
                />
              )}
              {step === 3 && (
                <MessageEditor
                  recipientName={recipientName}
                  senderName={senderName}
                  message={message}
                  onRecipientNameChange={setRecipientName}
                  onSenderNameChange={setSenderName}
                  onMessageChange={setMessage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {selectedFlowers.length > 0 && (
          <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
            <h3 className="mb-2 text-center text-[11px] uppercase tracking-[0.25em] text-slate-400">Live Preview</h3>
            <BouquetCanvas selectedFlowers={selectedFlowers} layout={selectedLayout} />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 rounded-full bg-rose-pink px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 3 ? 'Review Card' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

// (auto-scroll implemented inside the component)
