import React from 'react';
import { getThemeById } from '../../data/letterThemes';
import ThemeDecoration from './decorations/ThemeDecoration';
import '../../styles/letter-themes.css';

/**
 * Themed Letter Page Component - Renders letter with theme styling
 */
export default function ThemedLetterPage({ 
  themeId, 
  handwritingStyle, 
  content,
  scale = 1 
}) {
  const theme = getThemeById(themeId);
  
  if (!theme) {
    return <div>Theme not found</div>;
  }
  
  const { letterPage } = theme;
  const { recipientName, senderName, message } = content;
  
  return (
    <div 
      className={`themed-letter-page ${theme.id}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : 'none',
        transformOrigin: 'top center',
        background: letterPage.paperColor,
        color: letterPage.textColor,
        padding: '60px',
        minHeight: '800px',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        clipPath: letterPage.edgeStyle === 'torn' 
          ? 'polygon(0 0, 98% 0, 100% 2%, 100% 100%, 2% 100%, 0 98%)'
          : 'none'
      }}
    >
      {/* Render decorations */}
      {letterPage.decorations.map((decoration, index) => (
        <ThemeDecoration
          key={index}
          type={decoration.type}
          position={decoration.position}
          opacity={decoration.opacity}
          color={decoration.color}
          size={decoration.size}
        />
      ))}
      
      {/* Letter content */}
      <div className="letter-content" style={{ position: 'relative', zIndex: 5 }}>
        {/* Recipient */}
        <div style={{ 
          fontSize: '1.3rem',
          marginBottom: '2rem',
          fontFamily: handwritingStyle || 'Dancing Script, cursive'
        }}>
          To {recipientName},
        </div>
        
        {/* Message */}
        <div style={{ 
          fontSize: '1.1rem',
          lineHeight: '2',
          whiteSpace: 'pre-wrap',
          fontFamily: handwritingStyle || 'Dancing Script, cursive',
          marginBottom: '3rem'
        }}>
          {message}
        </div>
        
        {/* Sender */}
        <div style={{ 
          fontSize: '1.3rem',
          textAlign: 'right',
          fontFamily: handwritingStyle || 'Dancing Script, cursive'
        }}>
          Love,<br />
          {senderName}
        </div>
      </div>
    </div>
  );
}
