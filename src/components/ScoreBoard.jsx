import React from 'react';

const ScoreBoard = ({ score, totalQuestions, onFinish }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="score-board animate-slide-in">
      <div 
        className="score-circle" 
        style={{ '--percentage': percentage }}
      >
        <div className="score-text">{score}/{totalQuestions}</div>
      </div>
      <h2>Quiz Completed!</h2>
      <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
        You scored {percentage}%. {percentage >= 80 ? 'Excellent work!' : 'Keep practicing!'}
      </p>
      <button className="restart-btn" onClick={onFinish}>
        Finish Quiz
      </button>
    </div>
  );
};

export default ScoreBoard;
