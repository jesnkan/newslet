import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Flame, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Trophy,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ExamQuizView({ questions = [], selectedDate, allDays = [] }) {
  const [filterMode, setFilterMode] = useState('day'); // 'day' or 'all'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  // Filter questions based on filterMode
  const activeQuestions = questions.filter(q => {
    if (filterMode === 'day' && selectedDate) {
      return q.date === selectedDate;
    }
    return true;
  });

  const currentQ = activeQuestions[currentIndex];

  useEffect(() => {
    // Reset when switching filter mode or date
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setIsComplete(false);
  }, [filterMode, selectedDate]);

  const handleSelectOption = (opt) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      question: currentQ.question,
      selected: opt,
      correct: currentQ.answer,
      isCorrect,
      explanation: currentQ.explanation
    }]);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      // Confetti celebration!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setIsComplete(false);
  };

  if (!activeQuestions || activeQuestions.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', margin: '2rem 0' }}>
        <HelpCircle size={44} color="#d4af37" style={{ margin: '0 auto 1rem auto' }} />
        <h3 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.4rem', color: '#f8fafc', marginBottom: '0.6rem' }}>
          No Exam Questions for This Filter
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
          Questions are dynamically synthesized from each day's political developments. Switch to 'All Questions' to practice the full week!
        </p>
        <button
          onClick={() => setFilterMode('all')}
          className="btn-gold"
        >
          View All Week's Questions ({questions.length})
        </button>
      </div>
    );
  }

  // Final Summary Screen
  if (isComplete) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    let title = 'Diplomatic Cadet';
    let subtitle = 'Keep revising the Vienna Convention and Constitutional articles!';
    if (percentage >= 85) {
      title = 'Ambassador Extraordinaire & Plenipotentiary';
      subtitle = 'Brilliant mastery of Foreign Affairs & Public International Law!';
    } else if (percentage >= 70) {
      title = 'Minister-Counsellor of Foreign Affairs';
      subtitle = 'Strong grasp of core diplomatic doctrines and state practice.';
    } else if (percentage >= 50) {
      title = 'First Secretary / Diplomatic Cadre';
      subtitle = 'Good foundation. Review the incorrect answers below to secure top marks!';
    }

    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem 2rem', margin: '2rem 0', maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)',
            border: '2px solid var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: 'var(--gold-glow)'
          }}>
            <Trophy size={36} color="#fae498" />
          </div>

          <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.8rem', color: '#fae498', marginBottom: '0.4rem' }}>
            {title}
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: 'rgba(15, 32, 56, 0.7)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Final Score</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
              {score} / {activeQuestions.length}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 32, 56, 0.7)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Accuracy</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: percentage >= 70 ? '#10b981' : '#f59e0b' }}>
              {percentage}%
            </div>
          </div>

          <div style={{ background: 'rgba(15, 32, 56, 0.7)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Best Streak</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fae498' }}>
              {bestStreak} 🔥
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={handleRestart} className="btn-gold">
            <RotateCcw size={15} /> Retake Quiz Deck
          </button>
          <button onClick={() => setFilterMode(filterMode === 'day' ? 'all' : 'day')} className="btn-outline">
            <Filter size={15} /> {filterMode === 'day' ? 'Switch to All Week Questions' : 'Switch to Day Questions'}
          </button>
        </div>

        {/* Answers Review Accordion */}
        <h3 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem' }}>
          Exam Question Review & Analysis
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {userAnswers.map((ua, idx) => (
            <div key={idx} style={{
              background: 'rgba(6, 14, 26, 0.8)',
              borderLeft: `4px solid ${ua.isCorrect ? '#10b981' : '#ef4444'}`,
              borderRadius: '0 8px 8px 0',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                {ua.isCorrect ? <CheckCircle2 size={16} color="#10b981" /> : <XCircle size={16} color="#ef4444" />}
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>{ua.question}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: '1.5rem', marginBottom: '0.3rem' }}>
                Your Answer: <span style={{ color: ua.isCorrect ? '#6ee7b7' : '#fca5a5' }}>{ua.selected}</span>
                {!ua.isCorrect && (
                  <span style={{ marginLeft: '1rem', color: '#6ee7b7' }}>Correct: {ua.correct}</span>
                )}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginLeft: '1.5rem', background: 'rgba(15, 32, 56, 0.6)', padding: '0.5rem', borderRadius: '6px' }}>
                <strong style={{ color: '#fae498' }}>Exam Rationale: </strong> {ua.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', margin: '2rem auto', maxWidth: '850px' }}>
      {/* Top Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        paddingBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Award size={20} color="var(--gold-primary)" />
          <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.25rem', color: '#f8fafc' }}>
            Foreign Affairs Exam Practice Deck
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Filter Pills */}
          <button
            onClick={() => setFilterMode('day')}
            style={{
              background: filterMode === 'day' ? 'var(--gold-primary)' : 'rgba(15, 32, 56, 0.8)',
              color: filterMode === 'day' ? '#060e1a' : '#cbd5e1',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '9999px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Today's Questions
          </button>

          <button
            onClick={() => setFilterMode('all')}
            style={{
              background: filterMode === 'all' ? 'var(--gold-primary)' : 'rgba(15, 32, 56, 0.8)',
              color: filterMode === 'all' ? '#060e1a' : '#cbd5e1',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '9999px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            All Questions ({questions.length})
          </button>

          {/* Streak indicator */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#f59e0b',
            borderRadius: '9999px',
            padding: '0.25rem 0.65rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <Flame size={14} color="#f59e0b" />
            <span>{streak} Streak</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
          <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
          <span>Score: <strong style={{ color: '#10b981' }}>{score}</strong></span>
        </div>
        <div style={{
          height: '6px',
          background: 'rgba(15, 32, 56, 0.8)',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${((currentIndex + 1) / activeQuestions.length) * 100}%`,
            background: 'linear-gradient(90deg, #10b981 0%, var(--gold-primary) 100%)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          fontSize: '0.75rem',
          color: '#fae498',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
          fontWeight: 700
        }}>
          Source Case: {currentQ.articleTitle}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          color: '#ffffff',
          lineHeight: 1.5,
          marginBottom: '1.25rem'
        }}>
          {currentQ.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQ.answer;

            let cardStyle = {
              background: 'rgba(15, 32, 56, 0.7)',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
              color: '#f1f5f9',
              padding: '0.85rem 1.15rem',
              borderRadius: '10px',
              textAlign: 'left',
              fontSize: '0.9rem',
              cursor: isAnswered ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              lineHeight: 1.45
            };

            if (isAnswered) {
              if (isCorrect) {
                cardStyle.background = 'rgba(16, 185, 129, 0.25)';
                cardStyle.border = '1.5px solid #10b981';
                cardStyle.color = '#a7f3d0';
              } else if (isSelected && !isCorrect) {
                cardStyle.background = 'rgba(239, 68, 68, 0.25)';
                cardStyle.border = '1.5px solid #ef4444';
                cardStyle.color = '#fca5a5';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                style={cardStyle}
                onMouseEnter={(e) => {
                  if (!isAnswered) {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                    e.currentTarget.style.backgroundColor = 'rgba(21, 43, 75, 0.85)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isAnswered) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.backgroundColor = 'rgba(15, 32, 56, 0.7)';
                  }
                }}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Post-Answer Rationale */}
      {isAnswered && (
        <div className="animate-fade-in" style={{
          background: 'rgba(6, 14, 26, 0.95)',
          borderLeft: `4px solid ${selectedOption === currentQ.answer ? '#10b981' : '#ef4444'}`,
          borderRadius: '0 10px 10px 0',
          padding: '1.1rem 1.25rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: '0.88rem',
            color: selectedOption === currentQ.answer ? '#6ee7b7' : '#fca5a5',
            marginBottom: '0.35rem'
          }}>
            {selectedOption === currentQ.answer ? '✓ Excellent Diplomatic Analysis!' : '✗ Exam Review Needed:'}
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.6 }}>
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNext}
            className="btn-gold"
            style={{ padding: '0.7rem 1.6rem', fontSize: '0.9rem' }}
          >
            <span>{currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'View Final Results'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
