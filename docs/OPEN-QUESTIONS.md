# Open questions and assumptions

## Unresolved content (spec §13)

- Professional portrait, or approval to keep the abstract hero graphic only. **Assumed: abstract SVG graphic (the three cards and the "E" platform from the mockup), no portrait.**
- GitHub, Google Scholar and publication URLs; an up-to-date CV file. **Not supplied: `github` and `cvUrl` are `null` in `src/data/profile.ts` and render nothing (FR06).**
- 3–5 publicly describable projects with context, stack, contribution, outcomes and confidentiality approval. **Work section shows only labelled "Capabilities", no projects. The nav label is "Work", not "Projects".**
- Honest hands-on skill tiers for technologies, and recent tools not in the PDF. **Tiers are provisional, recency-based descriptive labels, not scores.**
- Approval of the exact public positioning, and whether "Founder" is used prominently. **Assumed: Founder shown in the hero status pill, the About facts and the journey; the headline is the spec's draft.**
- Domain, hosting, final language choices and contact method. **Assumed: mailto only, no form.**
- Whether to mention current employers or contracts not in the LinkedIn PDF. **None included.**
- Whether AI agents may be labelled hands-on (they appear only in managerial scope in the PDF). **Not labelled hands-on; "agent initiatives" appears only in the Data & AI Manager role.**

## Decisions for the owner

1. **Experience-level bars (mockup `…57-2.png`): ON, approved by the owner.** Each row shows the descriptive pill plus five cyan segments. The level is `level` (1 to 5) on the technology record when set, otherwise derived from the tier: Core Expertise 5, Project Experience 4, Earlier Experience 3. **Still to do by the owner: set individual `level` values in `src/data/technologies.ts`.** Until then every bar is derived, labelled "Level N of 5 (provisional)" for assistive tech, and the help text says the bars reflect the provisional grouping from the LinkedIn profile, not a measured mastery score. Set `siteConfig.showLevelBars = false` in `src/lib/config.ts` to remove them.
2. **Tier labels.** The mockup says "Core / Strong / Working"; the build uses the spec's "Core Expertise / Project Experience / Earlier Experience". Because the tiers follow the recency grouping of spec §5, the Software card shows "Project Experience" for JavaScript, Node.js and React, whereas the mockup shows JavaScript as "Core". Say if you want a different grouping.
3. **"Highlights" view.** The default view of each card shows six technologies chosen in `src/data/technologies.ts` (`highlights`), not a ranking. Confirm or change the selection.
4. **Hero line "Software Engineer · Data & AI Specialist · PhD in Computer Science"** comes from the mockup; "Data & AI Specialist" was approved as a tagline. "Software Engineer" is supported by the roles in §4.
5. **Hero headline** is the spec's draft ("Building Software, Data & AI Solutions for Real-World Impact."). Portuguese: "Construindo soluções de Software, Dados e IA com impacto no mundo real." Approval pending.
6. **Journey milestone grouping.** The eight milestones on the horizontal line group the 17 roles (e.g. "Early research & software development" covers UFPB, LAVID, LDMI, UFCG and Software Practices Lab, 2009 – 2016). Their dates are computed from the role records. The milestone wording is mine, from spec §4 only; review it.
7. **"Monitoria".** The spec says "monitoring" for the UFPB role; the English text reads "teaching assistance (monitoria)". Confirm the meaning.
8. **Academic Background panel** is in the Research section, not inside the journey as in the mockup.

## Assumptions made by this build

1. **Site URL**: `NEXT_PUBLIC_SITE_URL` is unset, so `src/lib/site.ts` falls back to the placeholder `https://example.com`. Sitemap, robots and Open Graph absolute URLs use it. Set the real domain before launch.
2. **Portuguese text** was written natively by the build, not translated word for word, but it is not owner-reviewed. Terms kept in English on purpose: machine learning, deep learning, backlog, Product Owner, pipelines, lakehouse.
3. **About and services copy** is first person and uses only facts from §4 and §5. Services are phrased as capabilities, not promises. The English "I design and build…" sentences are paraphrases of the §5 pillar definitions.
4. **Open Graph image** is generated at build time (`app/opengraph-image.tsx`, dark card with the cyan accent). A designed image can replace it.
5. **Locale on a static export**: HTML is always rendered in English and the stored locale is applied after hydration, so Portuguese visitors briefly see English text. Per-locale metadata in the initial HTML is English only.
6. **Icons**: Simple Icons (CC0) is credited in the footer. Technologies without a Simple Icons mark show a neutral letter tile (SQL, AWS, Java, NLP and others).
7. **What I Do (`#services`)**: kept as its own section, as in spec §3, written as capability cards. Technical leadership is a full-width "supporting strength" card.
8. **Footer** shows "© Erick Costa" with no year, to avoid an invented or time-dependent date.
9. **Verified (2026-11-15)**: `npm run typecheck`, `lint`, `test`, `build` pass; no horizontal overflow at 390, 768 and 1440 (EN) and 1440 (PT); Lighthouse in `docs/screenshots/lighthouse.md`. **Not verified**: a manual screen-reader pass and real-device touch testing.
