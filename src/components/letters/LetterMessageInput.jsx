import React, { useState, useEffect } from 'react';
import ThemedLetterPage from './ThemedLetterPage';
import '../../styles/letter-flow.css';

/**
 * Letter Message Input - Step 3: Write the love letter
 */
export default function LetterMessageInput({ 
  themeId, 
  handwritingStyle, 
  initialData = {},
  onBack, 
  onNext 
}) {
  const [recipientName, setRecipientName] = useState(initialData.recipientName || '');
  const [senderName, setSenderName] = useState(initialData.senderName || '');
  const [message, setMessage] = useState(initialData.message || '');
  
  const isValid = recipientName.trim() && senderName.trim() && message.trim();
  
  const handleSubmit = () => {
    if (isValid) {
      onNext({ recipientName, senderName, message });
    }
  };
  
  return (
    <div className="message-input-container">
      <div className="input-panel">
        <h2>Write Your Love Letter</h2>
        
        <div className="input-group">
          <label>To (Recipient's Name)</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="My darling..."
          />
        </div>
        
        <div className="input-group">
          <label>Your Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pour your heart out..."
            rows={12}
          />
          <span className="char-count">{message.length} characters</span>
        </div>
        
        <div className="input-group">
          <label>From (Your Name)</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Forever yours..."
          />
        </div>
        
        <div className="nav-buttons">
          <button onClick={onBack} className="back-button">Back</button>
          <button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="next-button"
          >
            Preview Letter
          </button>
        </div>
      </div>
      
      <div className="preview-panel">
        <div className="live-preview-label">Live Preview</div>
        <div className="preview-scroll">
          <ThemedLetterPage
            themeId={themeId}
            handwritingStyle={handwritingStyle}
            content={{ recipientName, senderName, message }}
            scale={0.5}
          />
        </div>
      </div>
    </div>
  );
}
