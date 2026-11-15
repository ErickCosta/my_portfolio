# Erick Costa — Portfolio

Single-page EN / PT-BR portfolio: Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4, exported as static files. The specification is in [docs/SPEC.md](docs/SPEC.md); requirement-to-test mapping is in [docs/TRACEABILITY.md](docs/TRACEABILITY.md); unresolved content is in [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md).

## Commands

```bash
npm install
npm run dev        # dev server on http://localhost:3000
npm run build      # static export into out/
npm test           # vitest (jsdom)
npm run lint       # eslint (next config)
npm run typecheck  # tsc --noEmit
npm start          # serve out/ locally (after build)
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.tld`) before building for production; it feeds the sitemap, robots and Open Graph URLs.

## Editing content

No layout component needs to change for content updates.

- **Typed data** in `src/data/`: `profile.ts` (name, contact, GitHub/CV), `experience.ts`, `journey.ts` (milestones on the journey line), `education.ts`, `technologies.ts` (+ `highlights`), `pillars.ts` (+ leadership), `projects.ts`; switches in `src/lib/config.ts` (`showLevelBars`). Every translatable value is an `L10n` object `{ en, 'pt-BR' }`.
- **UI text** in `src/i18n/messages/`: `en.json` and `pt-BR.json`, one tree per locale; a test fails if the keys or the `{placeholders}` differ.
- Keys are read as `t('file.path.to.key')`, for example `t('common.hero.ctaWork')`.
- `github` and `cvUrl` in `profile.ts` are `null` on purpose: set them to a verified URL and the links appear. Leave them `null` otherwise.
- Do not add projects, metrics or links that are not verified (see the evidence policy in spec §0).

## Structure

```
src/app/               layout, page, sitemap, robots, opengraph-image, globals.css (design tokens)
src/components/sections/  one component per section (+ __tests__); ui/ holds shared visuals
src/i18n/              I18nProvider, messages/
src/data/              typed content
src/test/              renderWithI18n test helper
```

No analytics and no cookies. The only browser storage is `localStorage['locale']`. Fonts are self-hosted (Plus Jakarta Sans, via `next/font/local`). Design reference: `design/` mockups, explained in docs/DESIGN.md. `scripts/capture.mjs` and `scripts/clip.mjs` take the review screenshots (Playwright). Icons: Simple Icons (CC0).

## How to edit levels

Each technology row shows a descriptive pill and a five-segment bar (`showLevelBars` in `src/lib/config.ts`, `true` by default; set `false` to hide the bars). In `src/data/technologies.ts`, add an optional `level` to a record to set its bar:

```ts
{ id: 'python', name: 'Python', /* ... */ tier: 'core', level: 4 },
```

`level` is 1 to 5. When it is missing, the level is derived from the tier: `core` = 5, `applied` (Project Experience) = 4, `earlier` = 3. Derived bars are announced as "Level N of 5 (provisional)"; an explicit `level` is announced without "provisional". The pill text stays either way.
