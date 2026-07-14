import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { quizList } from '../data/quizList';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* Faint Background Icon */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vmin',
          height: '60vmin',
          backgroundImage: 'url("/app-icon.svg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.15,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="quiz-header">
        <h1>QuizBrains</h1>
        <p>Select a quiz to test your knowledge</p>
        <button 
          className="next-btn" 
          style={{ marginTop: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}
          onClick={() => navigate('/history')}
        >
          View Quiz History
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {quizList.map((quiz) => (
          <div key={quiz.id} className="glass-panel animate-slide-in" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{quiz.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Quiz {quiz.id} • {quiz.dateUploaded} • {quiz.questions.length} Questions
              </p>
            </div>
            <button 
              className="next-btn" 
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', color: 'white', padding: '0.75rem 1.5rem', transform: 'translateX(10px)' }}
              onClick={() => navigate(`/quiz${quiz.id}`)}
            >
              Select Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
