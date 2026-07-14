import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import QuizEngine from './components/QuizEngine';
import QuizHistory from './components/QuizHistory';
import SettingsPage from './components/SettingsPage';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<QuizHistory />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/:quizSlug/*" element={<QuizEngine />} />
      </Routes>
      
      <Link 
        to="/settings"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '30px',
          padding: '0.6rem 1.2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          boxShadow: '0 4px 6px -1px var(--glass-shadow)',
          zIndex: 1000,
          cursor: 'pointer',
          textDecoration: 'none'
        }}
        title="Settings"
      >
        <span>Settings</span>
        ⚙️
      </Link>
      
      <div className="brand-footer">
      built for you by /loading_brains
      </div>
    </>
  );
}

export default App;
