import React from 'react';
import { Calendar, Volume2, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export default function DayNavigator({ 
  days, 
  selectedDate, 
  onSelectDate, 
  onPlayDayAudio,
  isPlayingDayAudio
}) {
  return (
    <div style={{ margin: '1.75rem 0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.85rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calendar size={18} color="var(--gold-primary)" />
          <h2 style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#f8fafc',
            fontFamily: 'var(--font-crest)'
          }}>
            Select Daily Intelligence Dossier
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            (Sept 26 – Oct 3, 2026)
          </span>
        </div>

        {onPlayDayAudio && (
          <button
            onClick={onPlayDayAudio}
            style={{
              background: isPlayingDayAudio ? 'rgba(239, 68, 68, 0.2)' : 'rgba(212, 175, 55, 0.12)',
              border: `1px solid ${isPlayingDayAudio ? '#ef4444' : 'var(--gold-primary)'}`,
              color: isPlayingDayAudio ? '#fca5a5' : '#fae498',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Volume2 size={14} className={isPlayingDayAudio ? 'animate-pulse' : ''} />
            <span>{isPlayingDayAudio ? 'Stop Day Audio Briefing' : 'Listen to Full Day Briefing'}</span>
          </button>
        )}
      </div>

      {/* Date Carousel / Pill Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
        gap: '0.65rem'
      }}>
        {days.map((item) => {
          const isSelected = item.date === selectedDate;
          const isToday = item.date === '2026-09-28' || item.isToday;
          const isExamDay = item.date === '2026-10-03';

          return (
            <button
              key={item.date}
              onClick={() => onSelectDate(item.date)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(145deg, rgba(21, 43, 75, 0.95) 0%, rgba(15, 32, 56, 0.98) 100%)' 
                  : 'rgba(11, 24, 43, 0.65)',
                border: isSelected 
                  ? '2px solid var(--gold-primary)' 
                  : isToday 
                    ? '1.5px solid rgba(16, 185, 129, 0.6)' 
                    : '1px solid rgba(212, 175, 55, 0.14)',
                borderRadius: '12px',
                padding: '0.75rem 0.65rem',
                textAlign: 'left',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? 'var(--gold-glow)' : 'none',
                transform: isSelected ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(21, 43, 75, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = isToday ? 'rgba(16, 185, 129, 0.6)' : 'rgba(212, 175, 55, 0.14)';
                  e.currentTarget.style.backgroundColor = 'rgba(11, 24, 43, 0.65)';
                }
              }}
            >
              {/* Badges on Top */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: isSelected ? '#fae498' : '#94a3b8'
                }}>
                  {item.dayName.slice(0, 3)}
                </span>

                {isToday && (
                  <span style={{
                    backgroundColor: '#10b981',
                    color: '#060e1a',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    letterSpacing: '0.05em'
                  }}>
                    TODAY
                  </span>
                )}

                {isExamDay && (
                  <span style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.35rem',
                    borderRadius: '4px'
                  }}>
                    EXAM
                  </span>
                )}
              </div>

              {/* Date String */}
              <div style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: isSelected ? '#ffffff' : '#e2e8f0',
                fontFamily: 'var(--font-crest)',
                marginBottom: '0.4rem'
              }}>
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>

              {/* Article Counts */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#94a3b8' }}>
                {item.hasNews ? (
                  <>
                    <span style={{ color: '#6ee7b7', fontWeight: 600 }}>🇬🇭 {item.ghanaCount}</span>
                    <span>•</span>
                    <span style={{ color: '#93c5fd', fontWeight: 600 }}>🌐 {item.intlCount}</span>
                  </>
                ) : (
                  <span style={{ color: '#64748b', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Clock size={11} /> 10 PM Scan
                  </span>
                )}
              </div>

              {/* Bottom active indicator line */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--gold-gradient)'
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
