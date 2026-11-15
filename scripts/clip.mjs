// Per-section screenshots for visual review. Usage: node scripts/clip.mjs <width> <locale> <outDir> [base]
import { chromium } from 'playwright';
import fs from 'node:fs';

const [width = '1440', locale = 'en', outDir = 'docs/screenshots/sections', base = 'http://localhost:4400'] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: Number(width), height: 900 } });
const page = await ctx.newPage();
await page.addInitScript((l) => localStorage.setItem('locale', l), locale);
await page.goto(base, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < h; y += 400) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(50); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);
for (const id of ['home', 'about', 'expertise', 'experience', 'work', 'research', 'services', 'contact']) {
  const el = page.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await el.screenshot({ path: `${outDir}/${locale === 'en' ? 'en' : 'pt'}-${width}-${id}.png` });
}
await browser.close();
