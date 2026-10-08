import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerSelector from '../components/flowers/FlowerSelector';
import LayoutSelector from '../components/bouquet/LayoutSelector';
import MessageEditor from '../components/bouquet/MessageEditor';
import BouquetCanvas from '../components/bouquet/BouquetCanvas';
import CreationModeSelector from '../components/shared/CreationModeSelector';
import HandwritingStyleSelector from '../components/letters/HandwritingStyleSelector';
import LetterCanvas from '../components/letters/LetterCanvas';

export default function BouquetBuilder({ onComplete }) {
  // Creation mode state
  const [creationMode, setCreationMode] = useState('bouquet');
  
  // Bouquet state
  const [step, setStep] = useState(1);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState('classic');
  
  // Letter state - only handwriting style, no template selection
  const [handwritingStyle, setHandwritingStyle] = useState('elegant-script');
  
  // Shared state (used by both modes)
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const prevCountRef = useRef(selectedFlowers.length);
  useEffect(() => {
    if (selectedFlowers.length > 0 && prevCountRef.current === 0) {
      const el = document.querySelector('canvas');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    prevCountRef.current = selectedFlowers.length;
  }, [selectedFlowers]);

  const handleModeChange = (newMode) => {
    setCreationMode(newMode);
    setStep(1);
  };

  const stepNames = creationMode === 'bouquet' 
    ? ['Choose Flowers', 'Pick A Style', 'Add A Message']
    : ['Choose Handwriting', 'Add A Message'];

  const maxSteps = creationMode === 'bouquet' ? 3 : 2;

  const handleNext = () => {
    if (step < maxSteps) {
      setStep(step + 1);
    } else {
      if (creationMode === 'bouquet') {
        onComplete({
          type: 'bouquet',
          flowers: selectedFlowers,
          layout: selectedLayout,
          recipientName,
          senderName,
          message,
        });
      } else {
        onComplete({
          type: 'letter',
          handwritingStyle,
          recipientName,
          senderName,
          message,
        });
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (creationMode === 'bouquet') {
      if (step === 1) return selectedFlowers.length > 0;
      if (step === 2) return true;
      if (step === 3) return recipientName.trim() && senderName.trim() && message.trim();
    } else {
      if (step === 1) return true;
      if (step === 2) return recipientName.trim() && senderName.trim() && message.trim();
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#fffaf8] px-4 py-6">
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-4">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-pink">Bloomverse</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-800">
            {creationMode === 'bouquet' ? 'Build a simple bouquet' : 'Compose a vintage letter'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {creationMode === 'bouquet' 
              ? 'Pick flowers, preview the look, and keep it clean.'
              : 'Choose your handwriting style and write from the heart.'}
          </p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            <CreationModeSelector
              selectedMode={creationMode}
              onModeChange={handleModeChange}
            />
          </motion.div>
        )}

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
              Step {step} of {maxSteps}
            </p>
            <p className="text-sm font-medium text-slate-600">{stepNames[step - 1]}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${creationMode}-${step}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {creationMode === 'bouquet' ? (
                <>
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
                </>
              ) : (
                <>
                  {step === 1 && (
                    <HandwritingStyleSelector
                      selectedStyle={handwritingStyle}
                      onStyleChange={setHandwritingStyle}
                    />
                  )}
                  {step === 2 && (
                    <MessageEditor
                      recipientName={recipientName}
                      senderName={senderName}
                      message={message}
                      onRecipientNameChange={setRecipientName}
                      onSenderNameChange={setSenderName}
                      onMessageChange={setMessage}
                      maxLength={500}
                    />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {creationMode === 'bouquet' && selectedFlowers.length > 0 && (
          <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
            <h3 className="mb-2 text-center text-[11px] uppercase tracking-[0.25em] text-slate-400">Live Preview</h3>
            <BouquetCanvas selectedFlowers={selectedFlowers} layout={selectedLayout} />
          </div>
        )}

        {creationMode === 'letter' && step === 2 && (
          <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
            <h3 className="mb-2 text-center text-[11px] uppercase tracking-[0.25em] text-slate-400">Letter Preview</h3>
            <LetterCanvas
              recipientName={recipientName}
              senderName={senderName}
              message={message}
              handwritingStyle={handwritingStyle}
              isPreview={true}
            />
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
            {step === maxSteps ? 'Review Card' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}