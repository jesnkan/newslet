import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import app from './app.js';
import { scrapeDailyNews } from './scraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;

// Nightly cron job: scheduled for 10:00 PM every night (22:00 UTC / Ghana Time)
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

// Serve frontend in local/standalone production mode
const distPath = path.join(__dirname, '..', 'dist');
import express from 'express';
app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[newslet] Server active on http://localhost:${PORT}`);
});
