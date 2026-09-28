import React from 'react';
import { Bookmark, Sparkles, BookOpen } from 'lucide-react';
import ArticleCard from './ArticleCard';

export default function SavedArticlesView({ 
  bookmarkedArticles = [], 
  onToggleBookmark, 
  onSpeechPlay, 
  activeAudioId 
}) {
  if (bookmarkedArticles.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', margin: '2rem auto', maxWidth: '750px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1.5px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <Bookmark size={28} color="#ef4444" />
        </div>
        <h3 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.4rem', color: '#f8fafc', marginBottom: '0.6rem' }}>
          No High-Priority Articles Bookmarked Yet
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
          As you read through daily intelligence briefs, click the bookmark icon on any story to save it to your personal exam revision deck!
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        paddingBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Bookmark size={22} color="#ef4444" />
          <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.3rem', color: '#f8fafc' }}>
            My High-Priority Exam Revision Deck ({bookmarkedArticles.length})
          </h2>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Star key stories to prioritize your revision before the exam
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {bookmarkedArticles.map((art) => (
          <ArticleCard
            key={art.id}
            article={art}
            isGhana={art.category?.toLowerCase().includes('ghana') || art.source?.toLowerCase().includes('graphic') || art.source?.toLowerCase().includes('citi')}
            isBookmarked={true}
            onToggleBookmark={onToggleBookmark}
            onSpeechPlay={onSpeechPlay}
            isPlayingAudio={activeAudioId === art.id}
          />
        ))}
      </div>
    </div>
  );
}
