'use client';

import type { ComponentType, SVGProps } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { approvedCaseStudies, capabilities } from '@/data/projects';
import { pillars } from '@/data/pillars';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { Brain, Chip, Code, Database, Layers, Users } from '@/components/ui/Icons';

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'product-engineering': Code,
  'data-pipelines': Database,
  'data-platforms': Layers,
  'applied-ml': Brain,
  'llm-genai': Chip,
  'technical-delivery': Users,
};

/**
 * FR05: case studies appear only when `approvedCaseStudies` has entries (none yet).
 * Until then this section is labelled "Capabilities" and shows no invented projects.
 */
export default function Work() {
  const { t, l } = useI18n();
  const hasCaseStudies = approvedCaseStudies.length > 0;

  return (
    <Section id="work" title={t('work.title')} titleEm={t('work.titleEm')} subtitle={t('work.note')}>
      <Reveal>
        <ul
          aria-label={t('work.listLabel')}
          data-kind={hasCaseStudies ? 'case-studies' : 'capabilities'}
          className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3"
        >
          {capabilities.map((c) => {
            const Icon = ICONS[c.id] ?? Layers;
            return (
              <li key={c.id}>
                <article className="glass flex h-full flex-col p-6 md:p-7">
                  <span className="icon-tile size-14">
                    <Icon width={28} height={28} />
                  </span>
                  <h3 className="text-step-2 mt-5 font-bold">{l(c.title)}</h3>
                  <p className="mt-2 text-muted">{l(c.description)}</p>
                  <ul aria-label={t('hero.pillarsLabel')} className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0 pt-5">
                    {pillars
                      .filter((p) => c.pillars.includes(p.id))
                      .map((p) => (
                        <li key={p.id} className="pill">
                          {l(p.shortLabel)}
                        </li>
                      ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
