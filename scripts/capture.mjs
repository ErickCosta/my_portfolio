// Screenshots + horizontal-overflow measurement. Usage: node scripts/capture.mjs http://localhost:4400
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4400';
const outDir = 'docs/screenshots';
fs.mkdirSync(outDir, { recursive: true });

const runs = [
  ['en', 390], ['en', 768], ['en', 1440], ['pt-BR', 1440],
];
const results = [];
const browser = await chromium.launch();
for (const [locale, width] of runs) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : width < 1000 ? 1024 : 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.addInitScript((l) => localStorage.setItem('locale', l), locale);
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1600);
  const tag = `${locale === 'en' ? 'en' : 'pt'}-${width}`;
  await page.screenshot({ path: `${outDir}/${tag}-fold.png` });
  // scroll through so reveal blocks enter
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(60); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${tag}-full.png`, fullPage: true });
  const m = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    height: document.documentElement.scrollHeight,
    lang: document.documentElement.lang,
    h1: document.querySelector('h1')?.textContent,
  }));
  results.push({ tag, ...m, ok: m.scrollWidth <= m.innerWidth, consoleErrors: errors });
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outDir}/measurements.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
