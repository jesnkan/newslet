import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadNewsData, scrapeDailyNews, getScraperStatus } from './scraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Nightly cron job: scheduled for 10:00 PM every night (22:00)
cron.schedule('0 22 * * *', async () => {
  console.log('[Scheduler] 10:00 PM Trigger: Commencing daily news scrape and summarization...');
  try {
    const today = new Date().toISOString().split('T')[0];
    await scrapeDailyNews(today);
    console.log('[Scheduler] 10:00 PM update completed successfully.');
  } catch (err) {
    console.error('[Scheduler] 10:00 PM update error:', err);
  }
});

// GET /api/news
app.get('/api/news', (req, res) => {
  try {
    const data = loadNewsData();
    const { date, search, category } = req.query;

    if (date && data.days[date]) {
      let dayData = { ...data.days[date] };
      let ghana = dayData.ghanaNews || [];
      let intl = dayData.internationalNews || [];

      if (search && search.trim() !== '') {
        const q = search.toLowerCase();
        ghana = ghana.filter(item =>
          item.title?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
        );
        intl = intl.filter(item =>
          item.title?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
        );
      }

      if (category === 'ghana') intl = [];
      if (category === 'international') ghana = [];

      return res.json({
        success: true,
        date,
        day: {
          ...dayData,
          ghanaNews: ghana,
          internationalNews: intl,
          headlineCount: ghana.length + intl.length
        },
        allDays: Object.keys(data.days).sort(),
        lastUpdated: data.lastUpdated
      });
    }

    res.json({
      success: true,
      data,
      allDays: Object.keys(data.days).sort()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/days
app.get('/api/days', (req, res) => {
  try {
    const data = loadNewsData();
    const todayStr = new Date().toISOString().split('T')[0];

    const daysSummary = Object.keys(data.days).sort().map(d => {
      const item = data.days[d];
      const ghanaCount = item.ghanaNews?.length || 0;
      const intlCount = item.internationalNews?.length || 0;
      return {
        date: d,
        dayName: item.dayName,
        displayDate: item.displayDate,
        isToday: d === todayStr || d === '2026-09-28',
        ghanaCount,
        intlCount,
        totalCount: ghanaCount + intlCount,
        hasNews: (ghanaCount + intlCount) > 0,
        status: item.status || 'Updated'
      };
    });

    res.json({ success: true, days: daysSummary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/status
app.get('/api/status', (req, res) => {
  try {
    const status = getScraperStatus();
    res.json({ success: true, status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/scrape
app.post('/api/scrape', async (req, res) => {
  try {
    const targetDate = req.body.date || new Date().toISOString().split('T')[0];
    const result = await scrapeDailyNews(targetDate);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[newslet] Server active on http://localhost:${PORT}`);
});
