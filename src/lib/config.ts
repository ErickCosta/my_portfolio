/**
 * Presentation switches.
 *
 * showLevelBars: the owner-approved segmented "Experience Level" bar (5 cyan
 * segments) next to the descriptive pill. The level comes from `level` on each
 * technology record, or is derived from the tier (core 5, applied 4, earlier 3).
 * Derived levels are provisional; the bar is labelled as such for assistive tech.
 * Set to false to remove the bars everywhere.
 */
export const siteConfig = {
  showLevelBars: true,
} as const;
