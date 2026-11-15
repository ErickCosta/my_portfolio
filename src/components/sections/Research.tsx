'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { degrees, rdCooperations, teaching } from '@/data/education';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { CapTile } from '@/components/ui/Visuals';

export default function Research() {
  const { t, l } = useI18n();

  return (
    <Section id="research" title={t('research.title')} titleEm={t('research.titleEm')} subtitle={t('research.intro')}>
      <Reveal>
        <div className="glass flex flex-col items-center gap-6 p-6 md:flex-row md:gap-10 md:p-8">
          <CapTile className="h-auto w-44 shrink-0 md:w-52" />
          <div className="w-full">
            <h3 className="text-step-2 font-bold">{t('research.academicTitle')}</h3>
            <ul className="m-0 mt-4 list-none divide-y divide-white/10 p-0">
              {degrees.map((d) => (
                <li key={d.id} className="grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline">
                  <p className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.6rem] size-2 shrink-0 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
                    <span>
                      <span className="font-bold">{t('research.degreeIn', { degree: l(d.degree), field: l(d.field) })}</span>
                      <span className="block text-[0.9rem] text-muted">{d.institution}</span>
                    </span>
                  </p>
                  <p className="tnum pl-5 text-[0.95rem] text-cyan sm:pl-0">
                    {d.start}–{d.end}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass p-6 md:p-7">
          <h3 className="text-step-1 font-bold">{t('research.rdTitle')}</h3>
          <ul className="m-0 mt-3 list-none divide-y divide-white/10 p-0">
            {rdCooperations.map((r) => (
              <li key={r.id} className="py-3">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-semibold">{r.partner}</span>
                  <span className="tnum text-[0.875rem] text-cyan">{r.period}</span>
                </p>
                <p className="mt-0.5 text-[0.9rem] text-muted">
                  {r.lab} · {l(r.topic)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass p-6 md:p-7">
          <h3 className="text-step-1 font-bold">{t('research.teachingTitle')}</h3>
          <ul className="m-0 mt-3 list-none divide-y divide-white/10 p-0">
            {teaching.map((x) => (
              <li key={x.id} className="py-3">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-semibold">{x.institution}</span>
                  <span className="tnum text-[0.875rem] text-cyan">{x.period}</span>
                </p>
                <p className="mt-0.5 text-[0.9rem] text-muted">
                  {l(x.title)} · {l(x.topics)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
