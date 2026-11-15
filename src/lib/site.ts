// OPEN QUESTION: the production domain is not decided (spec §13). Placeholder fallback.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com').replace(
  /\/$/,
  '',
);
