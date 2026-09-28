import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2026-09-28');
  const [days, setDays] = useState([]);
  const [dayData, setDayData] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'ghana', 'international'
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeUntil10PM, setTimeUntil10PM] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Audio speech synthesis
  const [activeSpeechId, setActiveSpeechId] = useState(null);
  const [isPlayingFullDay, setIsPlayingFullDay] = useState(false);

  // Initial load
  useEffect(() => {
    async function init() {
      await fetchDays();
      await fetchDayNews('2026-09-28');
      setLoading(false);
    }
    init();
  }, []);

  // Update on date switch
  useEffect(() => {
    if (selectedDate) {
      fetchDayNews(selectedDate);
    }
  }, [selectedDate]);

  // Live countdown to 10:00 PM
  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      let target = new Date();
      target.setHours(22, 0, 0, 0); // 10:00 PM
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

  // Stop speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  async function fetchDays() {
    try {
      const res = await fetch('/api/days');
      const data = await res.json();
      if (data.success && data.days) {
        setDays(data.days);
      }
    } catch (err) {
      console.error('Error fetching days:', err);
    }
  }

  async function fetchDayNews(date) {
    try {
      const res = await fetch(`/api/news?date=${date}`);
      const data = await res.json();
      if (data.success && data.day) {
        setDayData(data.day);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  }

  async function handleRefreshNews() {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate })
      });
      const data = await res.json();
      if (data.success) {
        await fetchDayNews(selectedDate);
        await fetchDays();
      }
    } catch (err) {
      console.error('Error triggering scrape:', err);
    } finally {
      setIsRefreshing(false);
    }
  }

  // Available voices state
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load and pick the best natural female voice on mount and onvoiceschanged
  useEffect(() => {
    function loadVoices() {
      if (!('speechSynthesis' in window)) return;
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // Tier 1: Microsoft Natural Online Female Voices (Edge & Chrome)
      const tier1 = voices.find(v => {
        const n = v.name.toLowerCase();
        return (n.includes('natural') || n.includes('online')) && 
          (n.includes('jenny') || n.includes('aria') || n.includes('sonia') || n.includes('libby') || n.includes('ava') || n.includes('female'));
      });

      // Tier 2: Google & Apple Natural Female Voices
      const tier2 = voices.find(v => {
        const n = v.name.toLowerCase();
        return (
          n.includes('google uk english female') ||
          n.includes('google us english') ||
          n.includes('samantha') ||
          n.includes('victoria') ||
          n.includes('karen') ||
          n.includes('serena') ||
          n.includes('fiona')
        );
      });

      // Tier 3: Standard Windows Female (Microsoft Zira or any English voice with 'female')
      const tier3 = voices.find(v => {
        const n = v.name.toLowerCase();
        return (n.includes('zira') || n.includes('female')) && v.lang.startsWith('en');
      });

      // Fallback: any English non-male voice
      const nonMale = voices.find(v => {
        const n = v.name.toLowerCase();
        return v.lang.startsWith('en') && !n.includes('david') && !n.includes('mark') && !n.includes('george') && !n.includes('guy') && !n.includes('male');
      });

      const best = tier1 || tier2 || tier3 || nonMale || voices[0];
      setSelectedVoice(best);
    }

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Audio Speech Handler for single article with human-like female voice
  function handlePlaySpeech(art) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (activeSpeechId === art.id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingFullDay(false);

    // Natural conversational text structure with cadence pauses
    let textToRead = `${art.title}. ... Reported by ${art.source}. ... ${art.summary} ... `;
    if (art.keyPoints && art.keyPoints.length > 0) {
      textToRead += `Here are the key takeaways: ... ${art.keyPoints.join('. ... ')}.`;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    // Fine-tuned human speech parameters
    utterance.rate = 0.94; // slightly slower, conversational tempo
    utterance.pitch = 1.06; // warm, natural female pitch
    utterance.volume = 1.0;

    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(art.id);
    window.speechSynthesis.speak(utterance);
  }

  // Full Day Audio Briefing with human-like female voice
  function handlePlayFullDay() {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingFullDay) {
      window.speechSynthesis.cancel();
      setIsPlayingFullDay(false);
      return;
    }

    window.speechSynthesis.cancel();
    setActiveSpeechId(null);

    const ghanaList = dayData?.ghanaNews || [];
    const intlList = dayData?.internationalNews || [];
    const all = [...ghanaList, ...intlList];

    if (all.length === 0) {
      alert('No news available to play for this day.');
      return;
    }

    let script = `Hello Eyram. Here is your newslet briefing for ${dayData?.displayDate || selectedDate}. ... `;
    if (ghanaList.length > 0) {
      script += `First, local Ghana politics and governance. ... `;
      ghanaList.forEach((item, i) => {
        script += `Story ${i + 1}: ${item.title}. ... ${item.summary} ... `;
      });
    }
    if (intlList.length > 0) {
      script += `Next, international politics and foreign affairs. ... `;
      intlList.forEach((item, i) => {
        script += `Story ${i + 1}: ${item.title}. ... ${item.summary} ... `;
      });
    }
    script += `This concludes your daily newslet intelligence briefing. Have a wonderful day, Eyram.`;

    const utterance = new SpeechSynthesisUtterance(script);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 0.94;
    utterance.pitch = 1.06;
    utterance.volume = 1.0;

    utterance.onend = () => setIsPlayingFullDay(false);
    utterance.onerror = () => setIsPlayingFullDay(false);

    setIsPlayingFullDay(true);
    window.speechSynthesis.speak(utterance);
  }

  // Copy Summary to clipboard
  function handleCopy(art) {
    const text = `${art.title}\nSource: ${art.source} (${art.time})\n\n${art.summary}\n\nKey Points:\n${art.keyPoints ? art.keyPoints.map(p => `• ${p}`).join('\n') : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Filter articles
  const rawGhana = dayData?.ghanaNews || [];
  const rawIntl = dayData?.internationalNews || [];

  const matchesSearch = (item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.summary?.toLowerCase().includes(q) ||
      item.source?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.keyPoints?.some(p => p.toLowerCase().includes(q))
    );
  };

  const filteredGhana = rawGhana.filter(matchesSearch);
  const filteredIntl = rawIntl.filter(matchesSearch);

  if (loading) {
    return (
      <div className="simple-loader-overlay">
        <div className="simple-spinner" />
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
          newslet<span className="brand-dot">.</span>
        </div>
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#2563eb',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.35rem'
        }}>
          Curated for Eyram
        </div>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Preparing your daily Ghana & international politics digest...
        </p>
      </div>
    );
  }

  return (
    <div className="newslet-app">
      {/* Top Header */}
      <header className="newslet-header">
        <div className="header-inner">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="brand-title">newslet<span className="brand-dot">.</span></span>
              <span style={{
                background: '#0f172a',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.15rem 0.55rem',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}>
                FOR EYRAM
              </span>
              <span style={{
                background: '#f1f5f9',
                color: '#334155',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                Politics & Foreign Affairs
              </span>
            </div>
            <div className="brand-tagline">
              Concise, detailed daily intelligence for Eyram • Sept 26 to Oct 3, 2026
            </div>
          </div>

          {/* Schedule Indicator & Refresh Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: '#475569',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#16a34a',
                display: 'inline-block'
              }} />
              <span>Updates 10:00 PM Daily</span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0f172a' }}>
                {timeUntil10PM}
              </span>
            </div>

            <button
              onClick={handleRefreshNews}
              disabled={isRefreshing}
              className="btn-ghost"
              title="Scrape and synthesize latest news"
            >
              <RotateCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
              <span>{isRefreshing ? 'Updating...' : 'Check Updates'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="newslet-main">
        {/* Date Selector Navigation */}
        <section style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              <Calendar size={16} color="#0f172a" />
              <span>Select Date</span>
            </div>

            {/* Listen to Day Audio */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{
                fontSize: '0.72rem',
                color: '#64748b',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                fontWeight: 600
              }}>
                🎙️ Natural Female Voice
              </span>
              <button
                onClick={handlePlayFullDay}
                style={{
                  background: isPlayingFullDay ? '#fee2e2' : '#f8fafc',
                  border: `1px solid ${isPlayingFullDay ? '#ef4444' : '#e2e8f0'}`,
                  color: isPlayingFullDay ? '#b91c1c' : '#334155',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {isPlayingFullDay ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isPlayingFullDay ? 'Stop Day Audio' : 'Listen to Full Day Audio'}</span>
              </button>
            </div>
          </div>

          {/* Date Carousel Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
            gap: '0.5rem'
          }}>
            {days.map((item) => {
              const isSelected = item.date === selectedDate;
              const isToday = item.date === '2026-09-28' || item.isToday;

              return (
                <button
                  key={item.date}
                  onClick={() => setSelectedDate(item.date)}
                  style={{
                    backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    border: `1px solid ${isSelected ? '#0f172a' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    padding: '0.65rem 0.6rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 6px rgba(15, 23, 42, 0.15)' : 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: isSelected ? '#94a3b8' : '#64748b'
                    }}>
                      {item.dayName.slice(0, 3)}
                    </span>
                    {isToday && (
                      <span style={{
                        backgroundColor: isSelected ? '#ffffff' : '#16a34a',
                        color: isSelected ? '#0f172a' : '#ffffff',
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        padding: '0.05rem 0.35rem',
                        borderRadius: '3px'
                      }}>
                        TODAY
                      </span>
                    )}
                  </div>

                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    marginBottom: '0.2rem'
                  }}>
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>

                  <div style={{
                    fontSize: '0.72rem',
                    color: isSelected ? '#cbd5e1' : '#64748b'
                  }}>
                    {item.hasNews ? `${item.totalCount} stories` : 'Pending 10 PM'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Day Header Banner */}
        {dayData && (
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#0f172a'
              }}>
                {dayData.displayDate || selectedDate}
              </h1>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#1d4ed8',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px'
              }}>
                Eyram's Daily Briefing
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55 }}>
              {dayData.summary || 'Daily curated dispatches from local Ghanaian governance and international politics.'}
            </p>
          </div>
        )}

        {/* Filter Controls: Category Tabs + Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', background: '#e2e8f0', padding: '0.2rem', borderRadius: '8px' }}>
            <button
              onClick={() => setCategoryFilter('all')}
              style={{
                backgroundColor: categoryFilter === 'all' ? '#ffffff' : 'transparent',
                color: categoryFilter === 'all' ? '#0f172a' : '#475569',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              All News ({rawGhana.length + rawIntl.length})
            </button>

            <button
              onClick={() => setCategoryFilter('ghana')}
              style={{
                backgroundColor: categoryFilter === 'ghana' ? '#ffffff' : 'transparent',
                color: categoryFilter === 'ghana' ? '#15803d' : '#475569',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🇬🇭 Ghana Politics ({rawGhana.length})
            </button>

            <button
              onClick={() => setCategoryFilter('international')}
              style={{
                backgroundColor: categoryFilter === 'international' ? '#ffffff' : 'transparent',
                color: categoryFilter === 'international' ? '#1d4ed8' : '#475569',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🌐 International ({rawIntl.length})
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search politics, ministers, strikes..."
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.45rem 1rem 0.45rem 2.2rem',
                fontSize: '0.84rem',
                color: '#0f172a',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* News Stream */}
        {filteredGhana.length === 0 && filteredIntl.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.4rem' }}>
              No articles found
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              {dayData?.hasNews === false 
                ? 'This date is scheduled to update tonight at 10:00 PM.' 
                : 'Try adjusting your search terms or filter.'}
            </p>
          </div>
        ) : (
          <div>
            {/* 1. Ghana Politics Section */}
            {(categoryFilter === 'all' || categoryFilter === 'ghana') && filteredGhana.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.1rem' }}>🇬🇭</span>
                  <h2 style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.01em'
                  }}>
                    Ghana Politics & Governance
                  </h2>
                </div>

                {filteredGhana.map((art) => (
                  <article key={art.id} className="news-card">
                    {/* Meta Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge-ghana">{art.category}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{art.source}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        {art.time} • {art.readTime || '3 min read'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="news-title">{art.title}</h3>

                    {/* Summary */}
                    <p className="news-summary">{art.summary}</p>

                    {/* Key Points */}
                    {art.keyPoints && art.keyPoints.length > 0 && (
                      <div className="key-points-box">
                        <div className="key-points-title">Key Facts & Developments</div>
                        {art.keyPoints.map((kp, idx) => (
                          <div key={idx} className="key-point-item">
                            <span style={{ color: '#0f172a', fontWeight: 800 }}>•</span>
                            <span>{kp}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '0.75rem',
                      marginTop: '0.75rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handlePlaySpeech(art)}
                        style={{
                          background: activeSpeechId === art.id ? '#fee2e2' : '#f8fafc',
                          border: `1px solid ${activeSpeechId === art.id ? '#ef4444' : '#e2e8f0'}`,
                          color: activeSpeechId === art.id ? '#b91c1c' : '#334155',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {activeSpeechId === art.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span>{activeSpeechId === art.id ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(art)}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          color: copiedId === art.id ? '#15803d' : '#64748b',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {copiedId === art.id ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedId === art.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* 2. International Politics Section */}
            {(categoryFilter === 'all' || categoryFilter === 'international') && filteredIntl.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.1rem' }}>🌐</span>
                  <h2 style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.01em'
                  }}>
                    International Politics & Foreign Affairs
                  </h2>
                </div>

                {filteredIntl.map((art) => (
                  <article key={art.id} className="news-card">
                    {/* Meta Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge-intl">{art.category}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{art.source}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        {art.time} • {art.readTime || '3 min read'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="news-title">{art.title}</h3>

                    {/* Summary */}
                    <p className="news-summary">{art.summary}</p>

                    {/* Key Points */}
                    {art.keyPoints && art.keyPoints.length > 0 && (
                      <div className="key-points-box" style={{ borderLeftColor: '#2563eb' }}>
                        <div className="key-points-title">Key Facts & Developments</div>
                        {art.keyPoints.map((kp, idx) => (
                          <div key={idx} className="key-point-item">
                            <span style={{ color: '#2563eb', fontWeight: 800 }}>•</span>
                            <span>{kp}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '0.75rem',
                      marginTop: '0.75rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handlePlaySpeech(art)}
                        style={{
                          background: activeSpeechId === art.id ? '#fee2e2' : '#f8fafc',
                          border: `1px solid ${activeSpeechId === art.id ? '#ef4444' : '#e2e8f0'}`,
                          color: activeSpeechId === art.id ? '#b91c1c' : '#334155',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {activeSpeechId === art.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span>{activeSpeechId === art.id ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(art)}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          color: copiedId === art.id ? '#15803d' : '#64748b',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {copiedId === art.id ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedId === art.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
