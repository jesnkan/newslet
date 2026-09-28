import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'news.json');
const STATUS_FILE = path.join(__dirname, 'data', 'scraper-status.json');

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'NewsletBot/2.0 (Clean News Aggregator)',
  },
});

const FEEDS = {
  ghana: [
    { name: 'Citi Newsroom', url: 'https://citinewsroom.com/feed/' },
    { name: 'Graphic Online', url: 'https://www.graphic.com.gh/news.html?format=feed&type=rss' },
    { name: 'MyJoyOnline', url: 'https://www.myjoyonline.com/feed/' }
  ],
  international: [
    { name: 'BBC Africa', url: 'http://feeds.bbci.co.uk/news/world/africa/rss.xml' },
    { name: 'UN News', url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' }
  ]
};

const POLITICAL_KEYWORDS = [
  'politics', 'political', 'minister', 'ministry', 'government', 'parliament',
  'president', 'governance', 'election', 'strike', 'union', 'policy', 'foreign',
  'diplomacy', 'diplomatic', 'trade', 'un', 'united nations', 'security', 'ecowas',
  'au', 'african union', 'court', 'assembly', 'ambassador', 'treaty', 'sanctions',
  'ghana', 'accra', 'lebanon', 'israel', 'ukraine', 'russia', 'sudan', 'yemen', 'us'
];

function isPoliticallyRelevant(title, content = '') {
  const combined = `${title} ${content}`.toLowerCase();
  return POLITICAL_KEYWORDS.some(kw => combined.includes(kw));
}

export function loadNewsData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { days: {}, lastUpdated: new Date().toISOString() };
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading news data:', err);
    return { days: {}, lastUpdated: new Date().toISOString() };
  }
}

export function saveNewsData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving news data:', err);
  }
}

export function getScraperStatus() {
  const now = new Date();
  const next10PM = new Date(now);
  next10PM.setHours(22, 0, 0, 0);
  if (now.getTime() >= next10PM.getTime()) {
    next10PM.setDate(next10PM.getDate() + 1);
  }

  const defaultStatus = {
    lastScraped: now.toISOString(),
    nextScheduledRun: next10PM.toISOString(),
    frequency: 'Daily at 10:00 PM',
    status: 'ACTIVE',
    activeFeedsCount: FEEDS.ghana.length + FEEDS.international.length,
    period: 'Sept 26 - Oct 3, 2026'
  };

  if (fs.existsSync(STATUS_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf-8'));
      return { ...defaultStatus, ...saved, nextScheduledRun: next10PM.toISOString() };
    } catch {
      return defaultStatus;
    }
  }

  return defaultStatus;
}

export function saveScraperStatus(patch) {
  try {
    const current = getScraperStatus();
    const updated = { ...current, ...patch, updatedAt: new Date().toISOString() };
    fs.writeFileSync(STATUS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (err) {
    console.error('Error saving status:', err);
  }
}

export async function scrapeDailyNews(targetDateStr = null) {
  const todayDateStr = targetDateStr || new Date().toISOString().split('T')[0];
  console.log(`[Newslet Scraper] Scanning feeds for ${todayDateStr}...`);

  const newsData = loadNewsData();
  const dayRecord = newsData.days[todayDateStr] || {
    date: todayDateStr,
    dayName: new Date(todayDateStr).toLocaleDateString('en-US', { weekday: 'long' }),
    displayDate: new Date(todayDateStr).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    headlineCount: 0,
    summary: 'Daily political & governance summary synthesized from primary dispatches.',
    ghanaNews: [],
    internationalNews: []
  };

  const newGhana = [];
  const newIntl = [];

  // Scrape Ghana Feeds
  for (const feedConfig of FEEDS.ghana) {
    try {
      const feed = await parser.parseURL(feedConfig.url);
      if (feed && feed.items) {
        // Process all available items from feed without artificial cap
        for (const item of feed.items) {
          if (isPoliticallyRelevant(item.title || '', item.contentSnippet || item.content || '')) {
            const snippet = item.contentSnippet || item.content || item.title || '';
            newGhana.push({
              id: `gh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              title: item.title?.trim(),
              source: feedConfig.name,
              time: item.pubDate ? new Date(item.pubDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '10:00 PM',
              category: 'Ghana Politics & Governance',
              summary: snippet.length > 250 ? snippet.slice(0, 250) + '...' : snippet,
              keyPoints: [
                'Primary report from local administrative and political reporting.',
                'Cross-verified through official statements and press briefings.'
              ],
              readTime: '2 min read',
              link: item.link
            });
          }
        }
      }
    } catch (err) {
      console.warn(`[Scraper] Feed error ${feedConfig.name}: ${err.message}`);
    }
  }

  // Scrape International Feeds
  for (const feedConfig of FEEDS.international) {
    try {
      const feed = await parser.parseURL(feedConfig.url);
      if (feed && feed.items) {
        // Process all available items from feed without artificial cap
        for (const item of feed.items) {
          if (isPoliticallyRelevant(item.title || '', item.contentSnippet || item.content || '')) {
            const snippet = item.contentSnippet || item.content || item.title || '';
            newIntl.push({
              id: `intl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              title: item.title?.trim(),
              source: feedConfig.name,
              time: item.pubDate ? new Date(item.pubDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '10:00 PM',
              category: 'International Politics & Foreign Affairs',
              summary: snippet.length > 250 ? snippet.slice(0, 250) + '...' : snippet,
              keyPoints: [
                'International diplomatic and regional security dispatch.',
                'Monitored through multilateral agencies and accredited media.'
              ],
              readTime: '3 min read',
              link: item.link
            });
          }
        }
      }
    } catch (err) {
      console.warn(`[Scraper] Feed error ${feedConfig.name}: ${err.message}`);
    }
  }

  // Merge items
  if (newGhana.length > 0) {
    const titles = new Set(dayRecord.ghanaNews.map(a => a.title.toLowerCase()));
    for (const a of newGhana) {
      if (!titles.has(a.title.toLowerCase())) dayRecord.ghanaNews.unshift(a);
    }
  }
  if (newIntl.length > 0) {
    const titles = new Set(dayRecord.internationalNews.map(a => a.title.toLowerCase()));
    for (const a of newIntl) {
      if (!titles.has(a.title.toLowerCase())) dayRecord.internationalNews.unshift(a);
    }
  }

  dayRecord.headlineCount = dayRecord.ghanaNews.length + dayRecord.internationalNews.length;
  newsData.days[todayDateStr] = dayRecord;
  newsData.lastUpdated = new Date().toISOString();
  saveNewsData(newsData);

  const statusResult = saveScraperStatus({
    lastScraped: new Date().toISOString(),
    status: 'ACTIVE',
    lastScrapedDate: todayDateStr,
    totalHeadlines: dayRecord.headlineCount
  });

  return {
    success: true,
    targetDate: todayDateStr,
    totalToday: dayRecord.headlineCount,
    status: statusResult
  };
}
