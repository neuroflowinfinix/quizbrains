import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all quiz history?")) {
      localStorage.removeItem('quizHistory');
      setHistory([]);
    }
  };

  const deleteEntry = (indexToRemove) => {
    if (window.confirm("Delete this quiz attempt?")) {
      const updatedHistory = history.filter((_, i) => i !== indexToRemove);
      localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    }
  };

  return (
    <div className="app-container">
      <div className="quiz-header">
        <h1>Quiz History</h1>
        <p>Review your past attempts and mistakes</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {history.length === 0 ? (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No quiz history found yet. Take a quiz to see your results here!</p>
          </div>
        ) : (
          history.slice().reverse().map((attempt, index) => {
            const originalIndex = history.length - 1 - index;
            return (
              <HistoryCard 
                key={originalIndex} 
                attempt={attempt} 
                onDelete={() => deleteEntry(originalIndex)} 
              />
            );
          })
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="next-btn" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
        {history.length > 0 && (
          <button 
            className="next-btn" 
            style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }} 
            onClick={clearHistory}
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

const HistoryCard = ({ attempt, onDelete }) => {
  const [showMistakes, setShowMistakes] = useState(false);
  const wrongAnswers = attempt.answers.filter(a => !a.isCorrect);

  return (
    <div className="glass-panel animate-slide-in" style={{ padding: '1.5rem', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            {attempt.quizTitle} (Quiz {attempt.quizId})
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Attempted on: {attempt.date}
          </p>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 600 }}>
          Score: {attempt.score} / {attempt.total}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          style={{ background: 'none', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}
          onClick={() => setShowMistakes(!showMistakes)}
        >
          {showMistakes ? 'Hide Mistakes' : 'Review Mistakes'}
        </button>

        <button 
          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>

      {showMistakes && (
        <div style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>
          {wrongAnswers.length === 0 ? (
            <p style={{ color: 'var(--success)', fontWeight: 600 }}>Perfect score! No mistakes to review.</p>
          ) : (
            wrongAnswers.map((a, i) => (
              <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Q: {a.question}</p>
                <p style={{ color: 'var(--danger)' }}>Your Answer: {a.selected}</p>
                <p style={{ color: 'var(--success)' }}>Correct Answer: {a.correct}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
