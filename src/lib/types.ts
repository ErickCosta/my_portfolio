export type Locale = 'en' | 'pt-BR';
export type L10n = Record<Locale, string>;
export type Pillar = 'software' | 'data' | 'ai';

export const LOCALES: readonly Locale[] = ['en', 'pt-BR'];
export const PILLARS: readonly Pillar[] = ['software', 'data', 'ai'];
