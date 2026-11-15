'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { useActiveSection } from '@/hooks/useActiveSection';
import { profile } from '@/data/profile';
import { LOCALES } from '@/lib/types';
import type { Locale } from '@/lib/types';
import { CloseIcon, MenuIcon } from '@/components/ui/Icons';
import { Monogram } from '@/components/ui/Visuals';

/** Nav order follows the page order. "Work" is the Capabilities section. */
export const NAV_ITEMS = ['about', 'expertise', 'experience', 'work', 'research', 'services'] as const;

const LOCALE_SHORT: Record<Locale, string> = { en: 'EN', 'pt-BR': 'PT' };

export default function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection([...NAV_ITEMS, 'contact']);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan focus:px-5 focus:py-3 focus:font-semibold focus:text-cyan-ink"
      >
        {t('skip')}
      </a>
      <header className="sticky top-0 z-40 border-b border-cyan/15 bg-bg/80 backdrop-blur-xl">
        <div className="page-x flex h-16 items-center justify-between gap-3 md:h-[72px]">
          <a href="#home" className="flex min-h-11 items-center gap-3 no-underline">
            <Monogram className="text-[2rem]" />
            <span aria-hidden="true" className="h-7 w-px bg-white/20" />
            <span className="sr-only text-[1.15rem] font-semibold xs:not-sr-only">{profile.name}</span>
          </a>

          <nav
            id="site-nav"
            aria-label={t('nav.label')}
            data-open={open}
            className={`${
              open ? 'flex' : 'hidden'
            } fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-b border-cyan/20 bg-bg/97 px-5 pb-8 pt-2 backdrop-blur-xl md:top-[72px] md:px-8 xl:static xl:z-auto xl:flex xl:max-h-none xl:flex-row xl:items-center xl:overflow-visible xl:border-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none`}
          >
            <ul className="m-0 flex list-none flex-col p-0 xl:flex-row xl:gap-1">
              {NAV_ITEMS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className={`relative flex min-h-12 items-center border-b border-white/10 py-3 text-[1.15rem] font-medium no-underline transition-colors hover:text-cyan xl:min-h-11 xl:border-0 xl:px-3 xl:py-2 xl:text-[0.95rem] ${
                      active === id ? 'text-cyan' : 'text-text'
                    }`}
                  >
                    {t(`nav.${id}`)}
                    {active === id ? (
                      <span aria-hidden="true" className="absolute inset-x-3 bottom-1 hidden h-0.5 rounded bg-cyan shadow-[0_0_8px_var(--color-cyan)] xl:block" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div role="group" aria-label={t('lang.label')} className="flex overflow-hidden rounded-lg border border-line-strong">
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  lang={loc}
                  aria-pressed={locale === loc}
                  aria-label={`${LOCALE_SHORT[loc]}, ${t(`lang.${loc}`)}`}
                  onClick={() => setLocale(loc)}
                  className={`min-h-11 min-w-11 px-2 text-[0.8125rem] font-bold tracking-[0.06em] transition-colors ${
                    locale === loc ? 'bg-cyan text-cyan-ink' : 'text-text hover:bg-white/10'
                  }`}
                >
                  {LOCALE_SHORT[loc]}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              aria-current={active === 'contact' ? 'true' : undefined}
              className="hidden min-h-11 items-center rounded-lg border border-cyan/60 bg-bg-2/60 px-5 text-[0.95rem] font-semibold no-underline transition-all hover:bg-cyan/15 hover:shadow-[0_0_24px_rgb(34_211_238/0.3)] md:inline-flex"
            >
              {t('nav.contact')}
            </a>
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-lg border border-line-strong xl:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
