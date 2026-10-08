import React from 'react';
import { letterThemes } from '../../data/letterThemes';
import '../../styles/letter-flow.css';

/**
 * Theme Cover Selector - Step 1: Choose romantic theme
 */
export default function ThemeCoverSelector({ selectedTheme, onThemeSelect, onNext }) {
  return (
    <div className="theme-selector-container">
      <div className="step-header">
        <h1>Choose Your Love Letter Theme</h1>
        <p className="subtitle">Select the perfect romantic style for your message</p>
      </div>
      
      <div className="theme-grid">
        {letterThemes.map(theme => (
          <div
            key={theme.id}
            className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''}`}
            onClick={() => onThemeSelect(theme.id)}
          >
            {/* Preview with proper background */}
            <div 
              className="theme-preview"
              style={{
                background: theme.coverPage.background,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <div style={{ textAlign: 'center', color: theme.coverPage.text.color }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontFamily: 'Playfair Display, serif',
                  marginBottom: '0.5rem',
                  textShadow: theme.coverPage.text.shadow ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                }}>
                  {theme.name}
                </h3>
                <p style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.9 }}>
                  A Love Letter
                </p>
              </div>
            </div>
            
            <div className="theme-info">
              <h3>{theme.name}</h3>
              <p>{theme.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="nav-buttons" style={{ justifyContent: 'center' }}>
        <button 
          className="next-button"
          disabled={!selectedTheme}
          onClick={onNext}
        >
          Next: Choose Handwriting
        </button>
      </div>
    </div>
  );
}
