import React, { useState } from 'react';
import { Printer, Download, X, FileText, CheckCircle2 } from 'lucide-react';

export default function PrintDossierModal({ newsData, selectedDate, onClose }) {
  const [printScope, setPrintScope] = useState('day'); // 'day' or 'all'

  const activeDays = printScope === 'day' 
    ? (newsData?.days?.[selectedDate] ? [newsData.days[selectedDate]] : []) 
    : Object.values(newsData?.days || {});

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'rgba(3, 7, 13, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '920px',
        width: '100%',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Top Bar with Print Controls */}
        <div className="no-print" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          paddingBottom: '1.2rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.4rem', color: '#fae498' }}>
              Print / Export Diplomatic Dossier
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
              Optimized for clean black-and-white printing or PDF export for offline revision
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', background: 'rgba(15, 32, 56, 0.8)', borderRadius: '8px', padding: '0.2rem', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <button
                onClick={() => setPrintScope('day')}
                style={{
                  background: printScope === 'day' ? 'var(--gold-primary)' : 'transparent',
                  color: printScope === 'day' ? '#060e1a' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Current Day
              </button>
              <button
                onClick={() => setPrintScope('all')}
                style={{
                  background: printScope === 'all' ? 'var(--gold-primary)' : 'transparent',
                  color: printScope === 'all' ? '#060e1a' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Entire Week (Sept 26 - Oct 3)
              </button>
            </div>

            <button onClick={handleTriggerPrint} className="btn-gold" style={{ padding: '0.5rem 1.25rem' }}>
              <Printer size={16} /> Print / Save as PDF
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#cbd5e1',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Paper Document Container */}
        <div id="printable-dossier" style={{
          backgroundColor: '#ffffff',
          color: '#111827',
          padding: '2.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          fontFamily: "'Times New Roman', Times, serif"
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px double #1f2937', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
              NEWSLET • FOREIGN AFFAIRS DIPLOMATIC DOSSIER
            </h1>
            <div style={{ fontSize: '1rem', fontStyle: 'italic', color: '#4b5563', marginBottom: '0.4rem' }}>
              Executive Briefing on Ghana Governance & International Geopolitics
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
              Target Period: 26th September 2026 – 3rd October 2026 • Prepared for Foreign Service Examination
            </div>
          </div>

          {/* Days Loop */}
          {activeDays.map((day) => {
            const hasArticles = (day.ghanaNews?.length || 0) + (day.internationalNews?.length || 0) > 0;
            if (!hasArticles) return null;

            return (
              <div key={day.date} style={{ marginBottom: '2.5rem', pageBreakAfter: 'always' }}>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '0.6rem 1rem',
                  borderLeft: '5px solid #1f2937',
                  marginBottom: '1.5rem',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  {day.displayDate || day.dayName}
                </div>

                {/* Ghana Section */}
                {day.ghanaNews && day.ghanaNews.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, borderBottom: '1px solid #9ca3af', paddingBottom: '0.3rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                      I. Local Ghanaian Politics & Governance
                    </h3>

                    {day.ghanaNews.map((art, idx) => (
                      <div key={idx} style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px dotted #e5e7eb' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                          {art.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                          Source: {art.source} | Category: {art.category} | Time: {art.time}
                        </div>
                        <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.6rem', textAlign: 'justify' }}>
                          {art.fullSummary || art.lead}
                        </p>
                        {art.diplomaticAngle && (
                          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '0.6rem 0.8rem', fontSize: '0.86rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                            <strong>Diplomatic Takeaway:</strong> {art.diplomaticAngle}
                          </div>
                        )}
                        {art.quiz && (
                          <div style={{ fontSize: '0.85rem', color: '#1f2937', background: '#f9fafb', padding: '0.5rem 0.8rem', borderLeft: '3px solid #10b981' }}>
                            <strong>Exam Question:</strong> {art.quiz.question}<br />
                            <strong>Answer:</strong> {art.quiz.answer} ({art.quiz.explanation})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* International Section */}
                {day.internationalNews && day.internationalNews.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, borderBottom: '1px solid #9ca3af', paddingBottom: '0.3rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                      II. International Diplomacy & Multilateral Relations
                    </h3>

                    {day.internationalNews.map((art, idx) => (
                      <div key={idx} style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px dotted #e5e7eb' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                          {art.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                          Source: {art.source} | Category: {art.category} | Time: {art.time}
                        </div>
                        <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.6rem', textAlign: 'justify' }}>
                          {art.fullSummary || art.lead}
                        </p>
                        {art.diplomaticAngle && (
                          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.6rem 0.8rem', fontSize: '0.86rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                            <strong>Diplomatic Takeaway:</strong> {art.diplomaticAngle}
                          </div>
                        )}
                        {art.quiz && (
                          <div style={{ fontSize: '0.85rem', color: '#1f2937', background: '#f9fafb', padding: '0.5rem 0.8rem', borderLeft: '3px solid #3b82f6' }}>
                            <strong>Exam Question:</strong> {art.quiz.question}<br />
                            <strong>Answer:</strong> {art.quiz.answer} ({art.quiz.explanation})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
