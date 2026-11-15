# Design direction: dark glass, cyan signal

The visual direction is **derived from the owner's mockups in [`design/`](../design/)**. Facts and constraints still come from [SPEC.md](./SPEC.md) (§0, 2–5, 8, 9, 11, 14) and win over the mockups wherever they disagree (see "Where this departs from the mockups"). An earlier paper-and-ink direction was written first and replaced by this one.

## 1. What the references say

| Reference | What it defines | Where it lives in the build |
|---|---|---|
| `Imagem do ChatGPT … 16_24_56-1.png` | **The hero.** Near-black navy page with a cyan glow; italic cyan "E" monogram, divider, name; short cyan bar, huge name, headline with a cyan phrase, muted role line, pitch with a cyan left border, filled cyan CTA with a play icon, outlined CTA with a mail icon. Right: three glass cards (Software `</>`, Data database, AI brain) wired with circuit lines to a glowing isometric "E" platform, over a dotted particle wave. | `Hero.tsx`, `ui/Visuals.tsx` (`HeroVisual`, `ParticleWave`, `Monogram`), `Header.tsx` |
| `…16_24_57-2.png` | **Expertise.** "Tech Stack & Expertise", three equal glass cards, icon tile + title + one-line description, a `Technology | Experience` list of rows (brand icon, name, pill), footer strip "Core Stack: A • B • C". | `Expertise.tsx` |
| `…16_24_58-3.png` | **Career.** "Professional Journey", cyan-bordered intro, six icon legend tiles, a glowing horizontal timeline with an arrow and role cards alternating above and below it, the flow pills Software → Data → AI → Leadership, an "Academic Background" panel with an isometric graduation-cap tile. | `Experience.tsx` (`HorizontalJourney`, legend, flow pills), `Research.tsx` + `ui/Visuals.tsx` (`CapTile`) |
| `Capture.JPG` | Secondary hero mood: big display type with one accent word, a small status pill. | the "Now" status pill in the hero |
| `2Capture.JPG` | Skills-chip style. | the "All technologies" view in `Expertise.tsx` (`.chip`) |
| `3Capture.JPG` | Clean vertical timeline: org and date left, a dot on the line, role and text right. | the per-organization detail in `Experience.tsx` (`OrgRow`), which is also the whole journey on mobile and tablet |

Everything is CSS and inline SVG. There are no raster copies of the mockups, no stock images, no generated images and no fake screenshots.

## 2. Art direction

- **Mood.** A night-time engineering console: near-black navy, one electric cyan signal, translucent glass panels that glow at the edge.
- **Signature: the glowing circuit line.** A 2 px cyan stroke with a soft glow that connects things. It appears in five places: (1) the three hero cards wired to the platform, (2) the glowing horizontal journey line with its arrow and nodes, (3) the node-and-line spine of the vertical timeline, (4) the dotted particle wave under the hero, (5) the cyan bar above every section title.
- **Glass recipe** (`.glass` in `globals.css`): `linear-gradient` surface at 40–60 % opacity, `1px` cyan-tinted border (30 % alpha, 70 % for the "hot" card), outer cyan glow `0 0 34px`, inner top highlight, `backdrop-filter: blur(14px)`, radius 20 px.
- **Rule of one accent.** Cyan carries meaning (links, current section, active filter, the single highlighted milestone). The flow pills use teal, violet and fuchsia only as in the mockup, never to encode data.

## 3. Type

One family, **Plus Jakarta Sans** (variable weight 200–800, normal and italic, latin subset), self-hosted from `@fontsource-variable` through `next/font/local` so it is preloaded and has a size-adjusted fallback (CLS 0). It matches the rounded geometric headings of the mockups. The italic is used only by the "E" monogram.

Fluid scale between 390 and 1440 px (`@theme` in `globals.css`):

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `step--1` | 13 px | 14 px | labels, captions, pills |
| `step-0` | 16 px | 17 px | body (measure ≤ 68 ch) |
| `step-1` | 18 px | 21 px | lead lines, role line, pitch |
| `step-2` | 21 px | 26 px | card titles |
| `step-3` | 28 px | 44 px | sub-headings, hero headline (clamped to 41.6 px) |
| `step-4` | 36 px | 64 px | section titles |
| `step-5` | 50 px | 92 px | the name in the hero |

Headings are weight 650–700 with −0.02 em tracking; body is 400 with 1.65 line height; small labels are uppercase at 0.08 em.

## 4. Colour and contrast (WCAG 2.2, computed from the hex values)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#050A14` | page |
| `--color-bg-2` | `#08111F` | segmented controls, status pills |
| `--color-glass-solid` | `#0D2036` | worst-case flattened colour of a glass card (used for the ratios below) |
| `--color-text` | `#EEF5FC` | text |
| `--color-muted` | `#9DB2C9` | secondary text |
| `--color-line-strong` | `#4A7A99` | borders of controls |
| `--color-cyan` | `#22D3EE` | accent, links, current state |
| `--color-cyan-ink` | `#031018` | text on cyan buttons |

| Pair | Ratio | Needed | Result |
|---|---|---|---|
| text on bg | 18.02 : 1 | 4.5 | pass (AAA) |
| text on glass | 14.96 : 1 | 4.5 | pass (AAA) |
| muted on bg | 9.10 : 1 | 4.5 | pass (AAA) |
| muted on glass | 7.55 : 1 | 4.5 | pass (AAA) |
| cyan on bg | 10.96 : 1 | 4.5 | pass (AAA) |
| cyan on glass | 9.10 : 1 | 4.5 | pass (AAA) |
| cyan-ink on cyan (filled button) | 10.65 : 1 | 4.5 | pass (AAA) |
| line-strong on bg (control border) | 4.28 : 1 | 3 | pass |
| line-strong on glass | 3.55 : 1 | 3 | pass |

Colour is never the only signal: the active filter has `aria-pressed`, a fill and a check mark; the current nav item has an underline as well as the colour; tiers are written words in a pill. Technology marks are Simple Icons in their brand colour; marks too dark for the background (luminance < 0.1) fall back to a light tint.

## 5. Grid and space

12-column logic, container max **1280 px**, page margins 20 / 32 / 48 px (390 / 768 / 1440). Section rhythm 80 / 104 / 128 px. Touch targets ≥ 44 px (buttons 52 px, chips 44 px, tabs 44 px). z-index: header 40, menu 50, skip link 60.

## 6. Motion

All of it is `transform`, `opacity`, `stroke-dashoffset` or `filter`, behind `@media (prefers-reduced-motion: no-preference)`, and none of it is needed to read anything.

| Where | Motion |
|---|---|
| Hero cards | slow float, 7 s, ±7 px, staggered |
| Circuit lines | a dashed overlay flows toward the platform, 1.6 s loop |
| Platform glow | opacity breathing, 4.5 s |
| Particle wave | slow horizontal drift, 14 s |
| "Now" dot and current-role node | one soft pulse ring, 2.4 s |
| Section blocks below the fold | rise 14 px and fade in on first entry, 550 ms (set by script only on blocks that start below the fold) |
| Accordion panels, help, details | 220 ms rise |
| Buttons, chips, tabs | 150–180 ms colour and glow |

`prefers-reduced-motion: reduce` sets `animation: none` and `transition: none` on everything, forces reveal blocks to opacity 1 with no offset, turns smooth scrolling off and renders the pulse as a static ring. Verified in `motion.test.tsx`.

## 7. Layout by viewport

### Header (sticky, 64 / 72 px)
- **1440 and 1280**: cyan italic "E" + divider + name; six links in page order (About, Expertise, Experience, Work, Research, What I do) with a cyan underline on the current one; EN | PT segmented toggle; outlined **Contact** button (→ `#contact`).
- **≤ 1279**: links collapse into a menu button (44 px) that opens a full-width sheet; Escape and link taps close it and return focus to the button. The name stays as screen-reader text below 480 px.

### Hero `#home`
- **1440**: two columns (1.15 : 0.85). Left: cyan bar, "Erick Costa" at 92 px, headline "Building **Software, Data & AI** Solutions for Real-World Impact.", muted role line, pitch with a cyan left border, filled "Explore My Work" and outlined "Contact Me", LinkedIn link and the "Now" status pill. Right: three glass cards on circuit lines to the glowing isometric platform; dotted wave at the bottom.
- **768**: single column; the visual sits under the copy at full width (cards keep three columns).
- **390**: name 50 px; buttons stack full width; cards become icon + title only (descriptions hidden), still connected to the platform.

### About `#about`
Title "About Me", the one-sentence lead with a cyan border, two paragraphs, and a glass "At a glance" panel (location, education, now). 7 / 5 columns on desktop, stacked below.

### Expertise `#expertise`
Title "Tech Stack & Expertise". A control bar (area filter, view toggle, help link), a live status line, then three equal glass cards (stacked below 1280). Each card: icon tile, title, full title, one sentence, `Technology | Experience` header with an info button, rows (brand icon, name, descriptive pill), and the "Highlights" strip. Choosing an area filter hides the other cards. "All technologies" switches the card body to grouped chips (the `2Capture` style). Selecting a row or chip opens a small panel with category, group and evidence links that open the matching employer in the journey.

### Journey `#experience`
- **≥ 1280**: six legend tiles, then the glowing horizontal line. Eight milestone cards alternate below and above it (oldest bottom-left, newest top-right, highlighted Founder card). Flow pills below. Under them, "Every role, by organization": the vertical timeline with an accordion per organization.
- **< 1280** (tablet and mobile): the milestone line and legend are not rendered; the vertical timeline (org and dates on the left, dot on the line, roles on the right; stacked on mobile) is the journey, with all 14 organizations and 17 roles, expandable, with exact dates and a "Parallel work" marker.

### Work `#work` (Capabilities)
An honest note, then six glass tiles (icon tile, title, one sentence, area pills) in 3 / 2 / 1 columns. No projects, no links, no numbers.

### Research `#research`
Glass "Academic Background" panel with the isometric cap tile and the three degrees, then two glass lists: R&D with industry, Teaching. 2 columns on desktop, stacked below.

### What I do `#services`
Three glass cards (service name, one sentence, "Includes" list) and a full-width "Supporting strength" card for technical leadership.

### Contact `#contact`
A glowing glass card with the address at up to 56 px, a filled "Contact Me" mailto button and an outlined LinkedIn button. Nothing else. Footer: copyright, location, icon credit, back to top.

## 8. Where this departs from the mockups, and why

| Mockup | Build | Why |
|---|---|---|
| Segmented "Experience Level" bars, and the labels Strong / Working | **Bars kept** (5 cyan glowing skewed segments next to the pill; owner approved), but the labels Strong / Working are replaced by the spec's descriptive pill (**Core Expertise / Project Experience / Earlier Experience**), so meaning is never colour-only. The bar is `role="img"` with a localized "Level N of 5 (provisional)" label, fills in with a motion-safe animation, and sits under the pill, right-aligned, at every width. Level = optional `level` on the technology, else core 5 / project 4 / earlier 3. Switch: `siteConfig.showLevelBars`. The help panel says the bars are provisional and not a measured mastery score | Spec §0 and §5 forbid unbacked proficiency claims; the owner accepted a provisional, tier-derived bar. |
| JavaScript, Node.js, React, Java, Spring shown as "Core" | Pills follow the spec's recency tiers, so Software shows "Project Experience" and a 4-segment bar | The spec lists Python, SQL, Spark, Databricks, AWS as the recent core. |
| Card footer "Core Stack" | "Highlights" | Software has no technology in the core tier; the strip lists the first five highlights. |
| Nav: About, Experience, Expertise, Projects | About, Expertise, Experience, Work, Research, What I do, plus a Contact button | Nav follows the page order; "Projects" would imply projects, and the spec requires "Capabilities" until projects are approved. The spec also lists Research and What I Do. |
| CTA "View Projects" | "Explore My Work" | Spec §2 label; there are no projects. |
| Role text such as "Led the data team, delivering data platforms…", "Research in data, AI and intelligent systems", "BSc" | Role, degree and milestone text written only from spec §4; the bachelor's is "Teaching degree (Licenciatura)" | Mockup copy is not evidence. |
| Journey cards: 8 role cards including "Early Research & Software Development 2009–2015" and "Software Engineering Analyst 2016–2018" | Eight milestones that together cover all 17 roles, dates computed from the role data (e.g. Early research 2009 – 2016, Gria 2021 – Mar 2023); Techlead split into its two roles with the exact dates | The brief requires every role, exact dates and parallel marking. |
| Journey legend tiles with copy such as "mentoring" | Same tiles with copy limited to the spec ("Teaching and academic work") | Same. |
| Academic Background panel inside the journey page | The same panel opens the Research section | The site is one page; the panel sits in the section that is about education. |
| Isometric platform with a photographic-style gloss | Flat-shaded SVG slabs with strokes and a glow filter | CSS/SVG only. |
| Dotted wave across the whole hero background | Same, clipped to the bottom 220–300 px and masked | Keeps contrast under the buttons and the status pill. |
| Capture.JPG "Available for…" pill and "Hire Me" button | The pill states the current role; no availability claim, no Hire Me | Brief: no availability claims. |

## 9. Accessibility and performance commitments

Skip link; one `h1` (the name); ordered headings; landmarks (`header`, `nav`, `main`, `footer`); visible 2 px cyan focus ring; `aria-pressed` on filters and the language toggle; `aria-expanded` and `aria-controls` on disclosures; `aria-current` on the active section; labels contain their visible text; `lang` and `<title>` update with the locale; no third-party requests; fonts preloaded with a fallback adjusted to avoid layout shift. Lighthouse scores are in `docs/screenshots/lighthouse.md`.
