# Requirements traceability

Source of truth: [SPEC.md](./SPEC.md). Visual direction: [DESIGN.md](./DESIGN.md), derived from the mockups in `design/`. Paths are relative to `src/`; component tests live in `components/sections/__tests__/`.

## Functional requirements

| ID | Requirement | Component(s) | Test(s) |
|---|---|---|---|
| FR01 | Sticky responsive header, active anchors | `components/sections/Header.tsx`, `hooks/useActiveSection.ts` | `header.test.tsx`: sticky class, links in page order with `#` hrefs, `aria-current` driven by an IntersectionObserver stub, Contact button, skip link |
| FR02 | EN / PT-BR toggle, translated content, accessible labels | `i18n/I18nProvider.tsx`, `Header.tsx` (toggle), `i18n/messages/{en,pt-BR}.json` | `locale.test.tsx`; `i18n/__tests__/parity.test.ts` (same keys, no empty strings, same `{placeholders}`, Portuguese differs from English) |
| FR03 | Three equal pillars, technology rows with icon, category, descriptive tier and evidence; keyboard filters | `Expertise.tsx`, `data/technologies.ts`, `data/pillars.ts`, `lib/config.ts` | `expertise.test.tsx` (order, filter by click and keyboard, status text, chip view, evidence panel and links, no scores/percentages/bars); `data/__tests__/data.test.ts` (evidence ids valid, no numeric level field, `showLevelBars` off) |
| FR04 | Expandable career timeline, nested roles at one employer | `Experience.tsx`, `data/experience.ts`, `data/journey.ts` | `experience.test.tsx` (14 organizations newest first, all 17 roles, milestones on the line, expand/collapse by click and keyboard, expand all, parallel marking, Portuguese dates); `data.test.ts` (exact Techlead dates, every role covered by a milestone) |
| FR05 | Selected work only when approved; no fabricated placeholders | `Work.tsx`, `data/projects.ts` | `page.test.tsx` (Capabilities label, six tiles, no links, no digits); `data.test.ts` (no approved case studies) |
| FR06 | Email and LinkedIn work; GitHub and CV never live placeholders | `Hero.tsx`, `Contact.tsx`, `data/profile.ts` (`github`, `cvUrl` = `null`) | `hero.test.tsx` (mailto, LinkedIn with `noopener`); `page.test.tsx` (every link on the page is `#`, the mailto or the LinkedIn URL; no GitHub, CV or availability text); `data.test.ts` |
| FR07 | Responsive layout and reduced motion | all sections (mobile-first Tailwind), `app/globals.css`, `ui/Reveal.tsx` | `motion.test.tsx`; `header.test.tsx` (mobile menu); viewport proof in `docs/screenshots/` |
| FR08 | Open Graph metadata, descriptive title, recruiter-friendly structure | `app/layout.tsx`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/` icon in `public/icon.svg` | `npm run build` (emits `out/index.html`, `opengraph-image`, `sitemap.xml`, `robots.txt`); `page.test.tsx` (one `h1`, landmarks, labelled sections); Lighthouse SEO 100 |
| FR09 | Content editable via typed data records | `data/profile.ts`, `experience.ts`, `technologies.ts`, `pillars.ts`, `projects.ts`, `education.ts`, `journey.ts`, `lib/config.ts`, message files | `data/__tests__/data.test.ts` (both locales filled for every record, ids resolve) |

## Non-functional requirements

| ID | Mechanism | Verification |
|---|---|---|
| NFR01 type safety, reusability | TypeScript strict, `lib/types.ts`, typed data modules, shared `ui/` components | `npm run typecheck` |
| NFR02 WCAG 2.2 AA | skip link, landmarks, `aria-*`, visible focus ring, text pills for tiers, contrast table in DESIGN.md §4 | `header`, `expertise`, `locale` and `page` tests; `npm run lint`; Lighthouse accessibility 100 (desktop and mobile) |
| NFR03 responsive, performance-aware | static export, self-hosted preloaded variable font, no client data fetching, SVG/CSS visuals | `npm run build`; no horizontal overflow at 390, 768, 1440 (`docs/screenshots/measurements.json`); Lighthouse in `docs/screenshots/lighthouse.md` |
| NFR04 search-friendly, localized metadata | `layout.tsx` metadata, `I18nProvider` updates `<html lang>`, title, description, `og:*` | `locale.test.tsx`; build output |
| NFR05 privacy | no analytics, no cookies, no third-party requests; only `localStorage['locale']` | code review; `locale.test.tsx` covers the only storage key |
| NFR06 asset licence, no confidential data | Simple Icons (CC0) credited in the footer; no raster assets; no employer data beyond spec §4 | `page.test.tsx` (no `<img>`); footer credit rendered |

## Acceptance scenarios (spec §11)

| # | Scenario | Component(s) | Test(s) |
|---|---|---|---|
| 1 | New English visitor: introduction, specialization and contact action in the first viewport | `Hero.tsx` | `hero.test.tsx` "Scenario 1" (h1, headline, role line, three cards in order, mailto, LinkedIn); screenshots `en-*-fold.png` |
| 2 | Mobile visitor opens and closes the menu by touch and keyboard, no overflow | `Header.tsx` | `header.test.tsx` "Scenario 2" (click, Enter, Escape returns focus, link tap closes); `measurements.json` (scrollWidth 390 = innerWidth 390) |
| 3 | Choosing "Data" shows only Data, with keyboard-accessible filter status | `Expertise.tsx` | `expertise.test.tsx` "Scenario 3" (click, keyboard Enter and Space, `aria-pressed`, status line) |
| 4 | "Core Expertise" help explains the non-quantitative rubric and its limits | `Expertise.tsx` | `expertise.test.tsx` "Scenario 4" (English and Portuguese) |
| 5 | Expanding Techlead IT Solutions shows distinct Data Team Leader and Data & AI Manager roles with correct dates | `Experience.tsx` | `experience.test.tsx` "Scenario 5" (Apr 2023 – Jun 2024, Jun 2024 – Dec 2025; Portuguese months) |
| 6 | Switching locale adapts visible text and metadata without losing place | `I18nProvider.tsx`, `Header.tsx` | `locale.test.tsx` "Scenario 6" (lang, title, description, `og:*`, storage, hash and scroll unchanged) |
| 7 | Reduced motion: content not dependent on motion, nonessential effects disabled | `ui/Reveal.tsx`, `globals.css`, `ui/Visuals.tsx` | `motion.test.tsx` "Scenario 7" (every animation sits in a `no-preference` block; the reduce block disables them; no hidden content under reduce) |
| 8 | Release build: no invented clients, dates, metrics or working links in project cards | `Work.tsx`, `data/projects.ts` | `page.test.tsx` "Scenario 8" and "never exposes a link"; `data.test.ts` |

## Section 14: expertise parity

| Criterion | Component(s) | Test(s) |
|---|---|---|
| Software, Data and AI identified as three equally prominent areas in the first viewport, in that order | `Hero.tsx` (three cards), `Expertise.tsx` (three cards) | `hero.test.tsx`; `expertise.test.tsx`; `page.test.tsx` "keeps Software, Data, AI in that order" |
| Leadership and research shown as supporting strengths, not pillars | `Services.tsx` ("Supporting strength" card), `About.tsx` | `page.test.tsx` "leadership as a supporting strength" (three pillar articles only) |
| EN / PT-BR content parity | message files, data records | `parity.test.ts`; `data.test.ts` |
| Mobile stacks the pillar cards in order | `Expertise.tsx` (single column below 1280), `HeroVisual` | `page.test.tsx` (order); `en-390-*` screenshots |
