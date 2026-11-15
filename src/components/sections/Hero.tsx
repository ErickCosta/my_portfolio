'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { profile } from '@/data/profile';
import { pillars } from '@/data/pillars';
import { findRole, formatPeriod } from '@/data/experience';
import { HeroVisual, ParticleWave } from '@/components/ui/Visuals';
import { ArrowUpRight, Mail, Play } from '@/components/ui/Icons';

export default function Hero() {
  const { t, l, locale } = useI18n();
  const current = findRole('borborema-founder');

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-24 pt-10 md:pb-32 md:pt-14 lg:pt-14">
      <ParticleWave />
      <div className="page-x relative">
        <div className="grid items-center gap-x-10 gap-y-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span aria-hidden="true" className="eyebrow-bar" />
            <h1 id="hero-title" className="text-step-5 mt-6 font-bold tracking-[-0.03em]">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-[30ch] text-[clamp(1.75rem,1.1rem+1.9vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.015em]">
              {t('hero.headlineA')} <span className="accent">{t('hero.headlineEm')}</span> {t('hero.headlineB')}
            </p>
            <p className="text-step-1 mt-6 max-w-[60ch] text-muted">{t('hero.tagline')}</p>
            <p className="text-step-1 mt-6 max-w-[44ch] border-l-4 border-cyan pl-5 text-text/90">{t('hero.pitch')}</p>

            <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <a href="#work" className="btn btn-primary">
                <Play width={16} height={16} />
                {t('hero.ctaWork')}
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                <Mail />
                {t('hero.ctaContact')}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link inline-flex min-h-11 items-center gap-1.5 font-medium"
              >
                {t('hero.linkedin')}
                <ArrowUpRight width={16} height={16} />
              </a>
              {current ? (
                <p className="inline-flex items-start gap-2.5 rounded-2xl border border-cyan/30 bg-cyan/[0.06] px-4 py-2 text-[0.9rem] text-muted">
                  <span aria-hidden="true" className="relative mt-[0.5rem] inline-block size-2 shrink-0 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]">
                    <span className="pulse-ring" />
                  </span>
                  <span>
                    <span className="mr-1.5 font-semibold text-text">{t('hero.now')}</span>
                    {l(current.role.title)} · {current.org.name} ·{' '}
                    <span className="tnum">
                      {formatPeriod(current.role.start, current.role.end, locale, t('experience.present'))}
                    </span>
                  </span>
                </p>
              ) : null}
            </div>
          </div>

          <HeroVisual
            alt={t('hero.visualAlt')}
            cards={pillars.map((p) => ({ id: p.id, title: l(p.shortLabel), text: l(p.heroLine) }))}
          />
        </div>
      </div>
    </section>
  );
}
