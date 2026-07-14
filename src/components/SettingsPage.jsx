import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme, fontSize, setFontSize } = useSettings();

  return (
    <div className="app-container">
      <div className="quiz-header">
        <h1>Settings</h1>
        <p>Customize your QuizBrains experience</p>
      </div>

      <div 
        className="glass-panel animate-slide-in"
        style={{
          padding: '3rem',
          textAlign: 'left',
          background: 'var(--bg-secondary)', // Make it fully opaque
          backdropFilter: 'none' // Remove transparency
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Theme</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className={`next-btn ${theme === 'light' ? 'active' : ''}`}
              style={{ flex: 1, padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'light' ? 'var(--accent-primary)' : 'transparent', color: theme === 'light' ? 'white' : 'var(--text-primary)', border: `1px solid ${theme === 'light' ? 'var(--accent-primary)' : 'var(--glass-border)'}` }}
              onClick={() => setTheme('light')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              Light
            </button>
            <button 
              className={`next-btn ${theme === 'dark' ? 'active' : ''}`}
              style={{ flex: 1, padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? 'var(--accent-primary)' : 'transparent', color: theme === 'dark' ? 'white' : 'var(--text-primary)', border: `1px solid ${theme === 'dark' ? 'var(--accent-primary)' : 'var(--glass-border)'}` }}
              onClick={() => setTheme('dark')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              Dark
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Font Size</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['small', 'medium', 'large'].map(size => (
              <button 
                key={size}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  textTransform: 'capitalize',
                  borderRadius: '12px',
                  background: fontSize === size ? 'var(--accent-primary)' : 'transparent',
                  color: fontSize === size ? 'white' : 'var(--text-primary)',
                  border: `1px solid ${fontSize === size ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onClick={() => setFontSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <button className="next-btn" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
