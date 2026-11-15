'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { L10n, Locale } from '@/lib/types';
import en from './messages/en.json';
import ptBR from './messages/pt-BR.json';

type Tree = { [k: string]: string | Tree };
export type Vars = Record<string, string | number>;

export const messages: Record<Locale, Tree> = { en: en as Tree, 'pt-BR': ptBR as Tree };

export const STORAGE_KEY = 'locale';

export function translate(locale: Locale, key: string, vars?: Vars): string {
  let node: string | Tree | undefined = messages[locale];
  for (const part of key.split('.')) {
    if (node === undefined || typeof node === 'string') return key;
    node = node[part];
  }
  if (typeof node !== 'string') return key;
  if (!vars) return node;
  return node.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m));
}

export interface I18nContextValue {
  locale: Locale;
  setLocale(l: Locale): void;
  t(key: string, vars?: Vars): string;
  l(v: L10n): string;
}

const defaultValue: I18nContextValue = {
  locale: 'en',
  setLocale: () => {},
  t: (key, vars) => translate('en', key, vars),
  l: (v) => v.en,
};

const I18nContext = createContext<I18nContextValue>(defaultValue);

function setMeta(selector: string, attr: string, name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? 'en');

  // Restore the stored preference after hydration (the static export renders 'en').
  useEffect(() => {
    if (initialLocale) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'pt-BR') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(stored);
      }
    } catch {
      /* storage unavailable */
    }
  }, [initialLocale]);

  // Keep <html lang>, title and descriptions in sync. No navigation or scroll change.
  useEffect(() => {
    document.documentElement.lang = locale;
    const title = translate(locale, 'meta.title');
    const description = translate(locale, 'meta.description');
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', locale === 'pt-BR' ? 'pt_BR' : 'en_US');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, vars) => translate(locale, key, vars),
      l: (v) => v[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
