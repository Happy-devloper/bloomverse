import React, { useState } from 'react';
import ThemeCoverSelector from './ThemeCoverSelector';
import HandwritingStyleSelector from './HandwritingStyleSelector';
import LetterMessageInput from './LetterMessageInput';
import ThemeCoverPage from './ThemeCoverPage';
import ThemedLetterPage from './ThemedLetterPage';
import { encodeContent } from '../../utils/urlEncoding';
import '../../styles/letter-flow.css';

/**
 * Letter Creation Flow - 4-step guided process with back navigation
 */
export default function LetterCreationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [themeId, setThemeId] = useState('');
  const [handwritingStyle, setHandwritingStyle] = useState('Dancing Script');
  const [letterContent, setLetterContent] = useState({
    recipientName: '',
    senderName: '',
    message: ''
  });
  const [showCover, setShowCover] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  
  const handleThemeSelect = (theme) => {
    setThemeId(theme);
  };
  
  const handleHandwritingSelect = (style) => {
    setHandwritingStyle(style);
  };
  
  const handleMessageSubmit = (content) => {
    setLetterContent(content);
    setCurrentStep(4);
  };
  
  const generateShareLink = () => {
    const contentData = {
      type: 'letter',
      themeId,
      handwritingStyle,
      ...letterContent,
      coverPageVisible: true
    };
    
    const encoded = encodeContent(contentData);
    const url = `${window.location.origin}/?c=${encoded}`;
    setShareUrl(url);
    
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };
  
  const handleCreateAnother = () => {
    setCurrentStep(1);
    setThemeId('');
    setHandwritingStyle('Dancing Script');
    setLetterContent({ recipientName: '', senderName: '', message: '' });
    setShowCover(true);
    setShareUrl('');
  };
  
  return (
    <div className="letter-creation-flow">
      {/* Progress indicator */}
      <div className="step-progress">
        <span className={currentStep >= 1 ? 'active' : ''}>1</span>
        <div className="progress-line" />
        <span className={currentStep >= 2 ? 'active' : ''}>2</span>
        <div className="progress-line" />
        <span className={currentStep >= 3 ? 'active' : ''}>3</span>
        <div className="progress-line" />
        <span className={currentStep >= 4 ? 'active' : ''}>4</span>
      </div>
      
      <div className="step-label">
        Step {currentStep} of 4: {
          currentStep === 1 ? 'Choose Theme' :
          currentStep === 2 ? 'Choose Handwriting' :
          currentStep === 3 ? 'Write Message' :
          'Preview & Share'
        }
      </div>
      
      {/* Step 1: Theme Selection */}
      {currentStep === 1 && (
        <ThemeCoverSelector
          selectedTheme={themeId}
          onThemeSelect={handleThemeSelect}
          onNext={() => setCurrentStep(2)}
        />
      )}
      
      {/* Step 2: Handwriting Selection */}
      {currentStep === 2 && (
        <div className="handwriting-step">
          <h2>Choose Your Handwriting Style</h2>
          <p className="subtitle">Select how your words will appear on the letter</p>
          
          <HandwritingStyleSelector
            value={handwritingStyle}
            onChange={handleHandwritingSelect}
          />
          
          <div className="nav-buttons">
            <button onClick={() => setCurrentStep(1)} className="back-button">
              ← Back to Themes
            </button>
            <button onClick={() => setCurrentStep(3)} className="next-button">
              Next: Write Message →
            </button>
          </div>
        </div>
      )}
      
      {/* Step 3: Message Input */}
      {currentStep === 3 && (
        <LetterMessageInput
          themeId={themeId}
          handwritingStyle={handwritingStyle}
          initialData={letterContent}
          onBack={() => setCurrentStep(2)}
          onNext={handleMessageSubmit}
        />
      )}
      
      {/* Step 4: Preview & Share */}
      {currentStep === 4 && (
        <div className="preview-step">
          <div className="preview-header">
            <h2>Your Love Letter is Ready!</h2>
            <p className="subtitle">Preview and share your romantic message</p>
          </div>
          
          <div className="view-toggle">
            <button 
              className={showCover ? 'active' : ''}
              onClick={() => setShowCover(true)}
            >
              📄 Cover Page
            </button>
            <button 
              className={!showCover ? 'active' : ''}
              onClick={() => setShowCover(false)}
            >
              💌 Letter
            </button>
          </div>
          
          <div className="preview-display">
            {showCover ? (
              <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
                <ThemeCoverPage 
                  themeId={themeId} 
                  recipientName={letterContent.recipientName} 
                />
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ThemedLetterPage
                  themeId={themeId}
                  handwritingStyle={handwritingStyle}
                  content={letterContent}
                  scale={0.8}
                />
              </div>
            )}
          </div>
          
          <div className="action-buttons">
            <button onClick={() => setCurrentStep(3)} className="back-button">
              ← Edit Message
            </button>
            <button onClick={generateShareLink} className="share-button">
              🔗 Share Love Letter
            </button>
            <button onClick={handleCreateAnother} className="secondary-button">
              ✨ Create Another
            </button>
          </div>
          
          {shareUrl && (
            <div className="share-url-display">
              <input readOnly value={shareUrl} onClick={(e) => e.target.select()} />
              <button onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Link copied again!');
              }}>
                📋 Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
