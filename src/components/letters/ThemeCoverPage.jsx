import React from 'react';
import { getThemeById } from '../../data/letterThemes';
import CoverIllustration from './decorations/CoverIllustration';
import CoverFrame from './decorations/CoverFrame';
import '../../styles/cover-pages.css';
import '../../styles/responsive-letter.css';

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
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(20px, 5vw, 40px)'
      }}
    >
      {/* Ambient Background Layer */}
      <div 
        className="ambient-background"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          background: `radial-gradient(circle at 30% 40%, ${coverPage.text.color}33 0%, transparent 50%),
                       radial-gradient(circle at 70% 60%, ${coverPage.text.color}22 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
      />
      
      {/* Decorative corner elements */}
      <div className="corner-decorations">
        <div 
          className="corner-top-left"
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 100,
            height: 100,
            opacity: 0.3,
            background: `radial-gradient(circle, ${coverPage.text.color} 0%, transparent 70%)`
          }}
        />
        <div 
          className="corner-bottom-right"
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 100,
            height: 100,
            opacity: 0.3,
            background: `radial-gradient(circle, ${coverPage.text.color} 0%, transparent 70%)`
          }}
        />
      </div>
      
      {/* Enhanced Frame with shadow */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <CoverFrame 
          type={coverPage.frame} 
          color={coverPage.text.color}
          thickness={3}
          shadow={true}
        />
      </div>
      
      {/* Centerpiece with glow effect */}
      <div 
        className="cover-centerpiece" 
        style={{ 
          marginBottom: 'clamp(30px, 8vw, 50px)',
          position: 'relative',
          zIndex: 10,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))',
          maxWidth: '90vw'
        }}
      >
        <CoverIllustration 
          type={coverPage.centerpiece}
          size={280}
          enhancedQuality={true}
        />
      </div>
      
      {/* Enhanced Typography */}
      <div 
        className="cover-text"
        style={{
          color: coverPage.text.color,
          textAlign: 'center',
          textShadow: coverPage.text.shadow 
            ? '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)' 
            : 'none',
          zIndex: 10,
          maxWidth: '80%'
        }}
      >
        <h1 
          style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '0.02em'
          }}
        >
          A Love Letter
        </h1>
        <div 
          style={{
            width: 80,
            height: 3,
            background: coverPage.text.color,
            margin: '0 auto 1.5rem',
            opacity: 0.6
          }}
        />
        <p 
          style={{ 
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontFamily: 'Dancing Script, cursive',
            fontStyle: 'italic',
            fontWeight: 500
          }}
        >
          For {recipientName || 'You'}
        </p>
      </div>
      
      {/* Subtle bottom decoration */}
      <div 
        style={{
          position: 'absolute',
          bottom: 40,
          fontSize: '0.875rem',
          opacity: 0.5,
          color: coverPage.text.color,
          fontFamily: 'serif',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          zIndex: 10
        }}
      >
        With All My Heart
      </div>
    </div>
  );
}

