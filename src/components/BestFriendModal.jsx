import React from 'react';
import { Heart, X, Sparkles, Award, Star, CheckCircle, BookOpen } from 'lucide-react';

export default function BestFriendModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'rgba(3, 7, 13, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '650px',
        width: '100%',
        padding: '2.2rem',
        position: 'relative',
        border: '2px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#cbd5e1',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Heart & Crest Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(212, 175, 55, 0.25) 100%)',
            border: '2px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.35)'
          }}>
            <Heart size={32} fill="#ef4444" color="#ef4444" />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-crest)',
            fontSize: '1.65rem',
            color: '#fae498',
            marginBottom: '0.35rem'
          }}>
            To My Best Friend & Future Diplomat
          </h2>
          <p style={{ color: '#fca5a5', fontSize: '0.88rem', fontWeight: 600 }}>
            A custom briefing system made with love so you conquer this Foreign Affairs Exam!
          </p>
        </div>

        {/* Note Body */}
        <div style={{
          background: 'rgba(15, 32, 56, 0.75)',
          borderLeft: '4px solid var(--gold-primary)',
          borderRadius: '0 12px 12px 0',
          padding: '1.25rem',
          color: '#e2e8f0',
          fontSize: '0.92rem',
          lineHeight: 1.7,
          marginBottom: '1.5rem'
        }}>
          <p style={{ marginBottom: '0.85rem' }}>
            Hey bestie! You told me you needed help tracking the news from <strong>Saturday, September 26th</strong> straight through to <strong>Saturday, October 3rd</strong>.
          </p>
          <p style={{ marginBottom: '0.85rem' }}>
            Instead of you getting overwhelmed scrolling through endless feeds, I built <strong>newslet</strong> just for you. Every night at <strong>10:00 PM</strong>, it automatically digests both 🇬🇭 <em>Ghanaian Politics</em> and 🌐 <em>International Geopolitics</em>, extracts the legal/diplomatic angles, and creates exam practice questions for you!
          </p>
          <p style={{ color: '#fae498', fontWeight: 600 }}>
            You are brilliant, dedicated, and more than capable of passing this exam with flying colors. I believe in you 100%!
          </p>
        </div>

        {/* Foreign Affairs Essay Formula Guide */}
        <div style={{
          background: 'rgba(6, 14, 26, 0.85)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '12px',
          padding: '1.2rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#d4af37',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-crest)'
          }}>
            <Award size={16} />
            <span>Winning Diplomatic Exam Essay Structure</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.83rem', color: '#cbd5e1' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#fae498', fontWeight: 700 }}>1. The Hook:</span>
              <span>Define the issue and cite the constitutional/treaty baseline (e.g. Article 40 of 1992 Constitution or 1961 Vienna Convention).</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#fae498', fontWeight: 700 }}>2. Ghana's Core Interests:</span>
              <span>Explain how it impacts national sovereignty, economic diplomacy (AfCFTA), or regional stability (ECOWAS).</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#fae498', fontWeight: 700 }}>3. Theoretical Lens:</span>
              <span>Contrast Realist national interest with Liberal Institutionalism (multilateral consensus via the UN/AU).</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#fae498', fontWeight: 700 }}>4. Strategic Recommendation:</span>
              <span>Provide actionable foreign policy advice (bilateral dialogue, joint border policing, or multilateral resolution).</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-gold"
          style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
        >
          <span>Let's Study & Win This Exam! 🚀</span>
        </button>
      </div>
    </div>
  );
}
