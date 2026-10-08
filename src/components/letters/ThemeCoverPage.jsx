import React from 'react';
import { getThemeById } from '../../data/letterThemes';
import CoverIllustration from './decorations/CoverIllustration';
import CoverFrame from './decorations/CoverFrame';
import '../../styles/cover-pages.css';

/**
 * Theme Cover Page Component - Full-screen romantic cover page
 */
export default function ThemeCoverPage({ themeId, recipientName }) {
  const theme = getThemeById(themeId);
  
  if (!theme) {
    return <div>Theme not found</div>;
  }
  
  const { coverPage } = theme;
  
  return (
    <div 
      className="cover-page"
      style={{ 
        background: coverPage.background,
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Frame */}
      <CoverFrame 
        type={coverPage.frame} 
        color={coverPage.text.color}
        thickness={2}
      />
      
      {/* Centerpiece Illustration */}
      <div className="cover-centerpiece" style={{ marginBottom: '40px' }}>
        <CoverIllustration 
          type={coverPage.centerpiece}
          size={250}
        />
      </div>
      
      {/* Text Overlay */}
      <div 
        className="cover-text"
        style={{
          color: coverPage.text.color,
          textAlign: 'center',
          textShadow: coverPage.text.shadow ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
          zIndex: 10
        }}
      >
        <h1 style={{ 
          fontSize: '3rem', 
          fontFamily: 'Playfair Display, serif',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          A Love Letter
        </h1>
        <p style={{ 
          fontSize: '1.8rem',
          fontFamily: 'Dancing Script, cursive',
          fontStyle: 'italic'
        }}>
          For {recipientName || 'You'}
        </p>
      </div>
    </div>
  );
}
