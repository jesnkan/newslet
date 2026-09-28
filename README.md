# newslet

A clean, minimalist daily intelligence website curating local Ghanaian politics, governance, and international foreign affairs news from September 26 to October 3, 2026.

## How the Automatic 10:00 PM Update Works
1. **Built-in Cron Engine**: In `server/index.js`, `node-cron` is scheduled for `0 22 * * *` (10:00 PM GMT/UTC every single night).
2. **Scraper Engine**: At 10:00 PM, `server/scraper.js` fetches live feeds from Graphic Online, Citi Newsroom, MyJoyOnline, BBC Africa, UN News, and Al Jazeera, filters for politics and governance, extracts key takeaways, and updates that day's news slot.
3. **Instant Sync Button**: The website includes a "Check Updates" button to trigger a live refresh on demand anytime.

---

## Free Hosting Guide

### Option 1: Render.com (Recommended — 100% Free Full-Stack)
Render hosts both the Node.js backend scraper and the React frontend together under a free HTTPS link (e.g., `https://newslet.onrender.com`).

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial newslet release"
   git remote add origin https://github.com/YOUR_USERNAME/newslet.git
   git push -u origin main
   ```
2. Go to [render.com](https://render.com) and sign up with GitHub (free).
3. Click **New +** -> **Web Service**.
4. Connect your `newslet` GitHub repository.
5. Fill in the settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
6. Click **Create Web Service**. Within 2 minutes, Render will give you a public URL (e.g. `https://newslet-xxxx.onrender.com`) that you can send directly to your best friend!

### Keeping Free Tier Awake at 10:00 PM:
Free Render instances spin down after 15 minutes of inactivity. To ensure the 10:00 PM scraper fires without fail:
- Set up a free ping at [cron-job.org](https://cron-job.org):
  - URL: `https://your-app.onrender.com/api/scrape`
  - Schedule: Daily at 22:00 UTC (10:00 PM GMT)
  - Method: POST

---

### Option 2: GitHub Actions (Automated Scraping) + Vercel / GitHub Pages
If you prefer static hosting on Vercel:
1. Push to GitHub.
2. The included `.github/workflows/daily-scrape.yml` file will automatically run the scraper every night at 10:00 PM GMT via GitHub's free runners, update `server/data/news.json`, and commit it to your repo.
3. Vercel automatically detects the new commit and redeploys the site instantly.
