'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { profile } from '@/data/profile';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

export default function About() {
  const { t, l } = useI18n();
  const facts: [string, string][] = [
    [t('about.factBased'), l(profile.location)],
    [t('about.factEducation'), t('about.factEducationValue')],
    [t('about.factNow'), t('about.factNowValue')],
  ];

  return (
    <Section id="about" title={t('about.title')} titleEm={t('about.titleEm')}>
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-step-2 max-w-[30ch] border-l-4 border-cyan pl-5 font-semibold tracking-[-0.01em]">
            {t('about.lead')}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
            <p className="text-muted">{t('about.p1')}</p>
            <p className="text-muted">{t('about.p2')}</p>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5">
          <div className="glass p-6 md:p-8">
            <h3 className="label">{t('about.factsLabel')}</h3>
            <dl className="mt-4 divide-y divide-white/10">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="label self-center">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
