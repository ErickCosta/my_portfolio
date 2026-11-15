'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { leadership, pillars } from '@/data/pillars';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { Brain, Check, Code, Database, Users } from '@/components/ui/Icons';

const ICONS = { software: Code, data: Database, ai: Brain } as const;

/** Spec §3 "What I Do": capabilities, not contractual promises. Leadership is transversal. */
export default function Services() {
  const { t, l } = useI18n();

  return (
    <Section id="services" title={t('services.title')} titleEm={t('services.titleEm')} subtitle={t('services.intro')}>
      <Reveal>
        <ul className="m-0 grid list-none gap-5 p-0 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = ICONS[p.id];
            return (
              <li key={p.id}>
                <article className="glass flex h-full flex-col p-6 md:p-7">
                  <span className="icon-tile size-14">
                    <Icon width={28} height={28} />
                  </span>
                  <h3 className="text-step-2 mt-5 font-bold">{l(p.serviceTitle)}</h3>
                  <p className="mt-3 text-muted">{l(p.serviceDescription)}</p>
                  <p className="label mt-5">{t('services.includes')}</p>
                  <ul className="m-0 mt-2 list-none p-0">
                    {p.does.map((d) => (
                      <li key={d.en} className="flex items-start gap-2.5 py-1">
                        <Check width={18} height={18} className="accent mt-1 shrink-0" />
                        <span>{l(d)}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
        <article className="glass mt-5 flex flex-col gap-5 p-6 md:flex-row md:items-center md:p-7">
          <span className="icon-tile size-14">
            <Users width={28} height={28} />
          </span>
          <div>
            <p className="label !text-cyan">{t('services.supporting')}</p>
            <h3 className="text-step-2 mt-1 font-bold">{l(leadership.title)}</h3>
            <p className="mt-2 max-w-[70ch] text-muted">{l(leadership.description)}</p>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
