# Lighthouse results

Run against the production export served locally (`npm run build`, then `npx serve out -l 4400`), headless Chromium, no extensions.

Command: `CHROME_PATH=<chromium> npx lighthouse http://localhost:4400 [--preset=desktop] --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo`

| Form factor | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Desktop preset | 100 | 100 | 100 | 100 | 0.6 s | 30 ms | 0 |
| Mobile (default throttling) | 88 | 100 | 100 | 100 | 2.8 s | 350 ms | 0 |

The spec (§8) treats the 90+ goals as aspirational. Accessibility, Best Practices and SEO are at or near 100; mobile Performance is below 90 only on simulated-throttling LCP/TBT.
