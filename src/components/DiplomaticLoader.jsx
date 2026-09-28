import React, { useState, useEffect } from 'react';
import { Compass, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DiplomaticLoader({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    'Initializing Secure Diplomatic Network...',
    'Fetching Ghana Ministry of Foreign Affairs Dispatches...',
    'Aggregating ECOWAS & Regional Security Cables...',
    'Synthesizing UN General Assembly Multilateral Debates...',
    'Extracting High-Yield Exam Anchors & Vienna Convention Notes...',
    'Briefing Ready for Future Ambassador.'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
      setProgress((prev) => Math.min(100, prev + 18));
    }, 450);

    const finishTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimeout);
    };
  }, [onComplete, steps.length]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#03070d',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundImage: `
        radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.12) 0%, transparent 60%),
        radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
      `
    }}>
      {/* Central Rotating Diplomatic Compass Device */}
      <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '2.5rem' }}>
        {/* Outer Orbit */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px dashed rgba(212, 175, 55, 0.35)',
          animation: 'spin-slow 20s linear infinite'
        }} />

        {/* Middle Ring with Cardinal Ticks */}
        <div style={{
          position: 'absolute',
          inset: '14px',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          boxShadow: '0 0 35px rgba(212, 175, 55, 0.2)',
          animation: 'spin-reverse 15s linear infinite'
        }} />

        {/* Golden Concentric Rings */}
        <div style={{
          position: 'absolute',
          inset: '32px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15, 32, 56, 0.9) 0%, rgba(6, 14, 26, 0.95) 100%)',
          border: '2px solid rgba(212, 175, 55, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(212, 175, 55, 0.35)'
        }}>
          {/* Ghana Black Star & Diplomatic Emblem */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={54} color="#fae498" style={{ animation: 'pulse-subtle 2.5s ease-in-out infinite' }} />
            <div style={{
              marginTop: '4px',
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              color: '#d4af37',
              fontFamily: 'Cinzel, serif'
            }}>
              NEWSLET
            </div>
          </div>
        </div>

        {/* Orbiting Satellite Dots */}
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          boxShadow: '0 0 12px #10b981'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          boxShadow: '0 0 12px #3b82f6'
        }} />
      </div>

      {/* Brand & Purpose Title */}
      <h1 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '2rem',
        letterSpacing: '0.12em',
        color: '#f8fafc',
        marginBottom: '0.4rem',
        textAlign: 'center'
      }}>
        newslet <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>•</span> <span style={{ color: '#fae498', fontSize: '1.4rem' }}>DIPLOMATIC BRIEFING</span>
      </h1>
      
      <p style={{
        color: '#94a3b8',
        fontSize: '0.92rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '520px',
        fontWeight: 400
      }}>
        Foreign Affairs & Governance Exam Intelligence Dossier • Sept 26 - Oct 3, 2026
      </p>

      {/* Progress Bar Container */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(15, 32, 56, 0.8)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '9999px',
        height: '8px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #10b981 0%, #d4af37 50%, #fae498 100%)',
          transition: 'width 0.4s ease-out',
          boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)'
        }} />
      </div>

      {/* Status Stream */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        color: '#cbd5e1',
        fontSize: '0.85rem',
        fontFamily: "'JetBrains Mono', monospace",
        minHeight: '26px'
      }}>
        {progress >= 100 ? (
          <CheckCircle2 size={16} color="#10b981" />
        ) : (
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#d4af37',
            boxShadow: '0 0 8px #d4af37',
            animation: 'pulse-subtle 1s infinite'
          }} />
        )}
        <span>{steps[stepIndex]}</span>
      </div>

      {/* Manual Skip Button */}
      <button
        onClick={onComplete}
        style={{
          marginTop: '2.5rem',
          background: 'transparent',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: '#fae498',
          padding: '0.45rem 1.4rem',
          borderRadius: '9999px',
          fontSize: '0.78rem',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.05em',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#d4af37';
          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        Skip Directly to Briefing &rarr;
      </button>
    </div>
  );
}
