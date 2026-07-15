import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

const QuestionCard = ({ questionData, currentQuestion, totalQuestions, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displayOptions, setDisplayOptions] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const { autoNext } = useSettings();
  
  useEffect(() => {
    setImageLoaded(false);
    
    // Unconditionally shuffle all options for all questions
    const shuffled = [...questionData.options].sort(() => Math.random() - 0.5);
    setDisplayOptions(shuffled);
  }, [questionData.id, questionData.options]);

  useEffect(() => {
    if (autoNext && selectedOption !== null) {
      const timer = setTimeout(() => {
        onAnswer(selectedOption);
        setSelectedOption(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, autoNext, onAnswer]);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
  };

  const handleNext = () => {
    onAnswer(selectedOption);
    setSelectedOption(null);
  };

  return (
    <div className="animate-slide-in question-layout" key={questionData.id}>
      <div className="question-content-left">
        <span className="question-count">Question {currentQuestion} of {totalQuestions}</span>
        <h2 className="question-text">{questionData.question}</h2>
        
        <div className="options-grid">
        {displayOptions.map((option, index) => {
          let btnClass = 'option-btn';
          if (selectedOption) {
            if (option === questionData.answer) {
              btnClass += ' correct';
            } else if (option === selectedOption) {
              btnClass += ' wrong';
            }
          }

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="next-btn-container animate-slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {questionData.explanation && (
            <div className="explanation-box" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '4px solid var(--primary)', textAlign: 'left' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Explanation</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{questionData.explanation}</p>
            </div>
          )}
          <button className="next-btn" onClick={handleNext} style={{ alignSelf: 'center' }}>
            {currentQuestion === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
      </div>
      
      <div className="question-content-right" style={{ position: 'relative', minHeight: '300px', width: '100%' }}>
        {questionData.image && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              {!imageLoaded && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <span className="pulse-text">Loading image...</span>
                </div>
              )}
              <img 
                src={questionData.image} 
                alt="Question visualization" 
                style={{ 
                  width: '100%', 
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px -5px var(--glass-shadow)',
                  display: imageLoaded ? 'block' : 'none',
                  background: 'var(--bg-secondary)',
                  cursor: 'zoom-in'
                }} 
                onClick={() => setIsImageModalOpen(true)}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            {imageLoaded && (
              <button 
                className="next-btn"
                style={{ fontSize: '0.9rem', padding: '0.5rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setIsImageModalOpen(true)}
                title="View image full screen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                View Full Image
              </button>
            )}
          </div>
        )}
      </div>

      {isImageModalOpen && questionData.image && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: isZoomed ? 'flex-start' : 'center',
            alignItems: isZoomed ? 'flex-start' : 'center',
            overflow: 'auto',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => {
            if (isZoomed) {
              setIsZoomed(false);
            } else {
              setIsImageModalOpen(false);
              setIsZoomed(false);
            }
          }}
        >
          <button
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onClick={(e) => {
              e.stopPropagation();
              setIsImageModalOpen(false);
              setIsZoomed(false);
            }}
            title="Close"
          >
            ✕
          </button>
          <img 
            src={questionData.image}
            alt="Full screen view"
            style={{
              cursor: isZoomed ? 'zoom-out' : 'zoom-in',
              width: isZoomed ? 'auto' : '100%',
              height: isZoomed ? 'auto' : '100%',
              maxWidth: isZoomed ? 'none' : '90vw',
              maxHeight: isZoomed ? 'none' : '90vh',
              objectFit: 'contain',
              transition: 'all 0.3s ease-in-out'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
