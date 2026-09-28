import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  RotateCw, 
  Heart, 
  BookOpen, 
  FileText, 
  Award, 
  Bookmark, 
  Printer, 
  Clock, 
  Sparkles,
  CheckCircle,
  Globe2
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  onTriggerScrape, 
  isScraping, 
  status, 
  onOpenLetter,
  bookmarkedCount,
  quizCount
}) {
  const [timeUntil10PM, setTimeUntil10PM] = useState('');

  // Live countdown to next 10:00 PM
  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      let target = new Date();
      target.setHours(22, 0, 0, 0); // 10:00 PM tonight
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      const diffMs = target - now;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeUntil10PM(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'rgba(6, 14, 26, 0.92)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Top Utility & Schedule Notice Bar */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(15, 32, 56, 0.95) 0%, rgba(21, 43, 75, 0.95) 50%, rgba(15, 32, 56, 0.95) 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        padding: '0.45rem 1.5rem',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block'
            }} />
            <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Daily Auto-Scrape:</span>
            <span style={{ color: '#fae498', fontWeight: 700 }}>10:00 PM Every Night</span>
          </div>

          <span style={{ color: 'rgba(212, 175, 55, 0.4)' }}>•</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
            <Clock size={13} color="#d4af37" />
            <span>Next 10:00 PM Sync in:</span>
            <span style={{ color: '#f8fafc', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              {timeUntil10PM || 'Calculating...'}
            </span>
          </div>
        </div>

        {/* Sync Now & Best Friend trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onTriggerScrape}
            disabled={isScraping}
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: '#fae498',
              padding: '0.25rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: isScraping ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
            title="Scan live news feeds and update daily dossier now"
          >
            <RotateCw size={12} className={isScraping ? 'animate-spin' : ''} />
            <span>{isScraping ? 'Scanning Feeds...' : 'Sync & Scrape Now'}</span>
          </button>

          <button
            onClick={onOpenLetter}
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(212, 175, 55, 0.2) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              padding: '0.25rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Heart size={12} fill="#ef4444" color="#ef4444" />
            <span>For My Best Friend</span>
          </button>
        </div>
      </div>

      {/* Main Navigation & Brand Area */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0.9rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0d1f38 0%, #152b4b 100%)',
            border: '1.5px solid var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--gold-glow)'
          }}>
            <Compass size={24} color="#fae498" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-crest)',
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#f8fafc'
              }}>
                newslet
              </span>
              <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                FOREIGN AFFAIRS DOSSIER
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>Ghana & International Political Intelligence</span>
              <span style={{ color: 'var(--gold-primary)' }}>•</span>
              <span style={{ color: '#cbd5e1' }}>Sept 26 – Oct 3, 2026</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentTab('dossier')}
            className={`btn-outline ${currentTab === 'dossier' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
          >
            <BookOpen size={15} />
            <span>Daily Intelligence</span>
          </button>

          <button
            onClick={() => setCurrentTab('quiz')}
            className={`btn-outline ${currentTab === 'quiz' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', position: 'relative' }}
          >
            <Award size={15} color="#fae498" />
            <span>Exam Quiz Deck</span>
            {quizCount > 0 && (
              <span style={{
                background: 'var(--gold-primary)',
                color: '#060e1a',
                fontSize: '0.68rem',
                fontWeight: 800,
                borderRadius: '9999px',
                padding: '0.1rem 0.45rem',
                marginLeft: '0.2rem'
              }}>
                {quizCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('cheatsheet')}
            className={`btn-outline ${currentTab === 'cheatsheet' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
          >
            <FileText size={15} />
            <span>Diplomatic Cheat-Sheet</span>
          </button>

          <button
            onClick={() => setCurrentTab('saved')}
            className={`btn-outline ${currentTab === 'saved' ? 'active' : ''}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
          >
            <Bookmark size={15} />
            <span>High-Priority</span>
            {bookmarkedCount > 0 && (
              <span style={{
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 800,
                borderRadius: '9999px',
                padding: '0.1rem 0.45rem',
                marginLeft: '0.2rem'
              }}>
                {bookmarkedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('print')}
            className="btn-gold"
            style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
          >
            <Printer size={15} />
            <span>Export Dossier</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
