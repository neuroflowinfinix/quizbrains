import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import ScoreBoard from './ScoreBoard';
import { quizList } from '../data/quizList';

const QuizEngine = () => {
  const { quizSlug } = useParams();
  const navigate = useNavigate();
  
  if (!quizSlug || !quizSlug.startsWith('quiz')) {
    return <Navigate to="/" replace />;
  }
  
  const quizId = quizSlug.replace('quiz', '');
  const activeQuiz = quizList.find(q => q.id === parseInt(quizId));
  
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    setScore(0);
    setUserAnswers([]);
  }, [quizSlug]);

  if (!activeQuiz) return <Navigate to="/" replace />;
  const questions = activeQuiz.questions;

  const handleStart = () => {
    setScore(0);
    setUserAnswers([]);
    navigate(`/${quizSlug}/q1`);
  };

  const handleAnswer = (selectedOption, qIndexStr) => {
    const qIndex = parseInt(qIndexStr.replace('q', '')) - 1;
    const isCorrect = selectedOption === questions[qIndex].answer;
    
    const newAnswers = [...userAnswers, {
      question: questions[qIndex].question,
      selected: selectedOption,
      correct: questions[qIndex].answer,
      isCorrect
    }];
    
    setUserAnswers(newAnswers);
    
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    
    const nextQuestionNum = qIndex + 2;
    if (nextQuestionNum <= questions.length) {
      navigate(`/${quizSlug}/q${nextQuestionNum}`);
    } else {
      // Save attempt to global history array
      const historyItem = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score: newScore,
        total: questions.length,
        date: new Date().toLocaleString(),
        answers: newAnswers
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      existingHistory.push(historyItem);
      localStorage.setItem('quizHistory', JSON.stringify(existingHistory));
      
      navigate(`/${quizSlug}/score`);
    }
  };

  return (
    <div className="app-container glass-panel">
      <div className="quiz-header">
        <span className="question-count" style={{ marginBottom: '0.5rem' }}>Quiz {activeQuiz.id}</span>
        <h1 style={{ marginTop: '0' }}>{activeQuiz.title}</h1>
        <p>Test your knowledge</p>
      </div>

      <Routes>
        <Route path="/" element={<Welcome activeQuiz={activeQuiz} onStart={handleStart} />} />
        
        <Route path="/:qParam" element={
          <QuestionRoute 
            questions={questions} 
            userAnswers={userAnswers}
            onAnswer={handleAnswer} 
            quizSlug={quizSlug}
          />
        } />
        
        <Route path="/score" element={
          <ScoreRoute 
            score={score} 
            total={questions.length} 
            userAnswers={userAnswers}
            quizSlug={quizSlug}
          />
        } />
      </Routes>
    </div>
  );
};

const Welcome = ({ activeQuiz, onStart }) => {
  return (
    <div className="animate-slide-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: 600 }}>Welcome to {activeQuiz.title}</h2>
      <div style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'left', display: 'inline-block' }}>
        <p><strong>Quiz Number:</strong> {activeQuiz.id}</p>
        <p><strong>Date Uploaded:</strong> {activeQuiz.dateUploaded}</p>
        <p><strong>Total Questions:</strong> {activeQuiz.questions.length}</p>
      </div>
      <br />
      <button className="restart-btn" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  );
};

const QuestionRoute = ({ questions, userAnswers, onAnswer, quizSlug }) => {
  const { qParam } = useParams();
  
  if (!qParam || !qParam.startsWith('q')) {
    return <Navigate to={`/${quizSlug}`} replace />;
  }
  
  const qIndex = parseInt(qParam.replace('q', '')) - 1;

  // Protect against skipping ahead or refreshing mid-quiz
  if (qIndex > userAnswers.length) {
    return <Navigate to={`/${quizSlug}`} replace />;
  }

  const questionData = questions[qIndex];
  if (!questionData) return <Navigate to={`/${quizSlug}`} replace />;

  return (
    <QuestionCard 
      questionData={questionData}
      currentQuestion={qIndex + 1}
      totalQuestions={questions.length}
      onAnswer={(opt) => onAnswer(opt, qParam)}
    />
  );
};

const ScoreRoute = ({ score, total, userAnswers, quizSlug }) => {
  const navigate = useNavigate();

  // Protect against refreshing on score page
  if (userAnswers.length === 0) {
    return <Navigate to={`/${quizSlug}`} replace />;
  }

  return (
    <ScoreBoard 
      score={score} 
      totalQuestions={total} 
      onFinish={() => navigate('/')} 
    />
  );
};

export default QuizEngine;
