import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  HelpCircle, 
  ExternalLink, 
  BookMarked,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

export default function ArticleCard({ 
  article, 
  isGhana = true, 
  isBookmarked, 
  onToggleBookmark,
  onSpeechPlay,
  isPlayingAudio
}) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activeTerm, setActiveTerm] = useState(null);

  const isCritical = article.importance?.includes('CRITICAL');

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <article className="glass-panel animate-fade-in" style={{
      padding: '1.6rem',
      position: 'relative',
      overflow: 'hidden',
      borderLeft: isGhana ? '4px solid #10b981' : '4px solid #3b82f6',
      marginBottom: '1.4rem'
    }}>
      {/* Top Meta Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.6rem',
        marginBottom: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {isGhana ? (
            <span className="badge-ghana">🇬🇭 Ghana Governance</span>
          ) : (
            <span className="badge-intl">🌐 International Diplomacy</span>
          )}

          {article.importance && (
            <span className={isCritical ? 'badge-danger' : 'badge-gold'}>
              {article.importance}
            </span>
          )}

          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            {article.category}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>
            {article.source}
          </span>
          <span style={{ color: 'rgba(212, 175, 55, 0.4)' }}>•</span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            {article.time}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(article)}
            style={{
              background: isBookmarked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isBookmarked ? '#ef4444' : 'rgba(255, 255, 255, 0.15)'}`,
              color: isBookmarked ? '#fca5a5' : '#cbd5e1',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '0.25rem',
              transition: 'all 0.2s ease'
            }}
            title={isBookmarked ? 'Remove from High-Priority Revision' : 'Save to High-Priority Revision'}
          >
            {isBookmarked ? <BookmarkCheck size={16} color="#ef4444" /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>

      {/* Main Headline */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.35rem',
        fontWeight: 700,
        color: '#f8fafc',
        lineHeight: 1.4,
        marginBottom: '0.9rem'
      }}>
        {article.title}
      </h3>

      {/* Detailed Executive Summary */}
      <div style={{
        color: '#cbd5e1',
        fontSize: '0.93rem',
        lineHeight: 1.68,
        marginBottom: '1.25rem'
      }}>
        {article.fullSummary || article.lead}
      </div>

      {/* Diplomatic Angle / Exam Brief Box */}
      {article.diplomaticAngle && (
        <div style={{
          background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.08) 0%, rgba(15, 32, 56, 0.6) 100%)',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '12px',
          padding: '1.1rem 1.25rem',
          marginBottom: '1.25rem',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fae498',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.45rem',
            fontFamily: 'var(--font-crest)'
          }}>
            <Award size={16} color="#d4af37" />
            <span>Diplomatic Angle • Exam Repertoire</span>
          </div>
          <p style={{
            color: '#f1f5f9',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            fontWeight: 450
          }}>
            {article.diplomaticAngle}
          </p>
        </div>
      )}

      {/* Key Diplomatic Terminology Chips */}
      {article.keyTerms && article.keyTerms.length > 0 && (
        <div style={{ marginBottom: '1.15rem' }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            letterSpacing: '0.05em',
            marginBottom: '0.4rem'
          }}>
            Core Foreign Policy Concepts:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {article.keyTerms.map((kt, i) => (
              <button
                key={i}
                onClick={() => setActiveTerm(activeTerm?.term === kt.term ? null : kt)}
                style={{
                  background: activeTerm?.term === kt.term ? 'rgba(212, 175, 55, 0.25)' : 'rgba(15, 32, 56, 0.8)',
                  border: `1px solid ${activeTerm?.term === kt.term ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.2)'}`,
                  color: activeTerm?.term === kt.term ? '#ffffff' : '#fae498',
                  borderRadius: '6px',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>🏷️ {kt.term}</span>
              </button>
            ))}
          </div>

          {/* Expanded Term Definition Popover */}
          {activeTerm && (
            <div style={{
              marginTop: '0.65rem',
              background: 'rgba(6, 14, 26, 0.95)',
              border: '1px solid var(--gold-primary)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              fontSize: '0.82rem',
              color: '#f8fafc',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <strong style={{ color: '#fae498', display: 'block', marginBottom: '0.2rem' }}>
                Definition: {activeTerm.term}
              </strong>
              {activeTerm.def}
            </div>
          )}
        </div>
      )}

      {/* Action Footer: Audio TTS + Mini Quiz Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        paddingTop: '0.85rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Left: Audio Read-Aloud */}
        <button
          onClick={() => onSpeechPlay(article)}
          style={{
            background: isPlayingAudio ? 'rgba(239, 68, 68, 0.2)' : 'rgba(212, 175, 55, 0.12)',
            border: `1px solid ${isPlayingAudio ? '#ef4444' : 'rgba(212, 175, 55, 0.35)'}`,
            color: isPlayingAudio ? '#fca5a5' : '#fae498',
            padding: '0.35rem 0.85rem',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'all 0.2s ease'
          }}
        >
          {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isPlayingAudio ? 'Stop Narration' : 'Read Aloud Briefing'}</span>
        </button>

        {/* Right: Mini Quiz Toggle */}
        {article.quiz && (
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            style={{
              background: showQuiz ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 32, 56, 0.8)',
              border: `1px solid ${showQuiz ? '#10b981' : 'rgba(212, 175, 55, 0.25)'}`,
              color: showQuiz ? '#6ee7b7' : '#cbd5e1',
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <HelpCircle size={14} color="#fae498" />
            <span>{showQuiz ? 'Hide Story Quiz' : 'Test Yourself on This'}</span>
            {showQuiz ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {/* Embedded Mini-Quiz Container */}
      {showQuiz && article.quiz && (
        <div style={{
          marginTop: '1.25rem',
          background: 'rgba(6, 14, 26, 0.9)',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '12px',
          padding: '1.2rem',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#10b981',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.45rem',
            fontFamily: 'var(--font-crest)'
          }}>
            Exam Practice Question:
          </div>

          <h4 style={{
            color: '#ffffff',
            fontSize: '0.92rem',
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '0.9rem'
          }}>
            {article.quiz.question}
          </h4>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.9rem' }}>
            {article.quiz.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === article.quiz.answer;
              let btnStyle = {
                background: 'rgba(15, 32, 56, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                padding: '0.6rem 0.9rem',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '0.84rem',
                cursor: isAnswered ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease'
              };

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle.background = 'rgba(16, 185, 129, 0.25)';
                  btnStyle.border = '1px solid #10b981';
                  btnStyle.color = '#a7f3d0';
                } else if (isSelected && !isCorrect) {
                  btnStyle.background = 'rgba(239, 68, 68, 0.25)';
                  btnStyle.border = '1px solid #ef4444';
                  btnStyle.color = '#fca5a5';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  style={btnStyle}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 size={16} color="#10b981" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={16} color="#ef4444" />}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation */}
          {isAnswered && (
            <div style={{
              background: 'rgba(15, 32, 56, 0.95)',
              borderLeft: `4px solid ${selectedOption === article.quiz.answer ? '#10b981' : '#ef4444'}`,
              padding: '0.75rem 1rem',
              borderRadius: '0 8px 8px 0',
              fontSize: '0.82rem',
              color: '#cbd5e1'
            }}>
              <div style={{
                fontWeight: 700,
                color: selectedOption === article.quiz.answer ? '#6ee7b7' : '#fca5a5',
                marginBottom: '0.2rem'
              }}>
                {selectedOption === article.quiz.answer ? '✓ Outstanding! Correct Answer.' : '✗ Not quite. See exam rationale:'}
              </div>
              <p>{article.quiz.explanation}</p>
              <button
                onClick={handleResetQuiz}
                style={{
                  marginTop: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#fae498',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
