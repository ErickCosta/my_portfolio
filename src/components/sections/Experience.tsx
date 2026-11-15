'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { dateValue, findRole, formatPeriod, organizations, orgSpan, parallelOrgs } from '@/data/experience';
import type { Organization } from '@/data/experience';
import { milestones } from '@/data/journey';
import type { JourneyIcon, Milestone } from '@/data/journey';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight, Atom, Brain, Cap, Chevron, Code, Database, Users } from '@/components/ui/Icons';

type IconC = ComponentType<SVGProps<SVGSVGElement>>;
const ICONS: Record<JourneyIcon, IconC> = {
  research: Atom,
  software: Code,
  teaching: Cap,
  data: Database,
  leadership: Users,
  ai: Brain,
};
const LEGEND: [string, IconC][] = [
  ['software', Code],
  ['research', Atom],
  ['data', Database],
  ['ai', Brain],
  ['leadership', Users],
  ['education', Cap],
];

function yearOf(value: string): string {
  return value === 'present' ? '' : value.slice(0, 4);
}

function milestonePeriod(m: Milestone, locale: 'en' | 'pt-BR', present: string): string {
  const roles = m.roleIds.map((id) => findRole(id)!.role);
  const start = roles.reduce((a, r) => (dateValue(r.start) < dateValue(a) ? r.start : a), roles[0].start);
  const end = roles.reduce((a, r) => (dateValue(r.end) > dateValue(a) ? r.end : a), roles[0].end);
  return formatPeriod(start, end, locale, present);
}

/* ---------- horizontal journey (xl and up) ---------- */

const WAVE_W = 1000;
const WAVE_H = 96;
const waveY = (x: number) => 48 + 7 * Math.sin(x / 85);
const WAVE_PATH = Array.from({ length: 101 }, (_, i) => {
  const x = (i / 100) * (WAVE_W - 22);
  return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${waveY(x).toFixed(1)}`;
}).join(' ');

function MilestoneCard({ m }: { m: Milestone }) {
  const { l, locale, t } = useI18n();
  const Icon = ICONS[m.icon];
  return (
    <article className={`glass flex h-full flex-col p-5 ${m.highlight ? 'glass-hot' : ''}`}>
      <div className="flex items-start gap-3">
        <span className="icon-tile size-11 !rounded-xl">
          <Icon width={24} height={24} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[1rem] font-bold leading-snug">{l(m.title)}</h3>
          <p className="mt-0.5 text-[0.875rem] text-muted">{l(m.org)}</p>
        </div>
      </div>
      <p className="mt-3">
        <span className="pill tnum">{milestonePeriod(m, locale, t('experience.present'))}</span>
      </p>
      <p className="mt-3 text-[0.875rem] leading-snug text-muted">{l(m.text)}</p>
    </article>
  );
}

function HorizontalJourney() {
  const { t } = useI18n();
  const n = milestones.length;
  return (
    <div
      role="list"
      aria-label={t('experience.journeyLabel')}
      className="relative mt-12 hidden gap-x-0 xl:grid"
      style={{ gridTemplateColumns: `repeat(${n * 2 + 2}, minmax(0, 1fr))`, gridTemplateRows: 'auto 96px auto' }}
    >
      {/* the glowing line, with an arrow, spans the middle row */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${WAVE_W} ${WAVE_H}`}
        preserveAspectRatio="none"
        className="col-span-full row-start-2 h-full w-full overflow-visible"
      >
        <path className="glow-line" style={{ vectorEffect: 'non-scaling-stroke' }} d={WAVE_PATH} />
        <path
          className="glow-line"
          style={{ vectorEffect: 'non-scaling-stroke' }}
          d={`M${WAVE_W - 34} ${waveY(WAVE_W - 22) - 12} L${WAVE_W - 22} ${waveY(WAVE_W - 22)} L${WAVE_W - 34} ${waveY(WAVE_W - 22) + 12}`}
        />
      </svg>
      {milestones.map((m, i) => {
        const top = (n - 1 - i) % 2 === 0; // newest on top, then alternate
        const xPct = ((2 * i + 2) / (n * 2 + 2)) * 100;
        const xUnits = xPct * (WAVE_W / 100);
        const yPct = (waveY(xUnits) / WAVE_H) * 100;
        return (
          <div key={m.id} role="listitem" className="contents">
            <div
              className={`px-2 ${top ? 'self-end' : 'self-start'}`}
              style={{ gridColumn: `${2 * i + 1} / span 4`, gridRow: top ? 1 : 3 }}
            >
              <MilestoneCard m={m} />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none relative z-10 row-start-2 block"
              style={{ gridColumn: '1 / -1' }}
            >
              <span
                className="absolute w-px bg-cyan/80 shadow-[0_0_8px_var(--color-cyan)]"
                style={{
                  left: `${xPct}%`,
                  top: top ? 0 : `${yPct}%`,
                  height: top ? `${yPct}%` : `${100 - yPct}%`,
                }}
              />
              <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]"
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
              >
                {m.highlight ? <span className="pulse-ring" /> : null}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- vertical, expandable per-organization timeline (all sizes) ---------- */

function OrgRow({ org, open, onToggle }: { org: Organization; open: boolean; onToggle: () => void }) {
  const { t, l, locale } = useI18n();
  const span = orgSpan(org);
  const isCurrent = span.end === 'present';
  const startYear = yearOf(span.start);
  const endYear = isCurrent ? t('experience.present') : yearOf(span.end);
  const years = startYear === endYear ? startYear : `${startYear} – ${endYear}`;
  const hasParallel = org.roles.some((r) => r.concurrent);
  const panelId = `org-panel-${org.id}`;
  const headId = `org-head-${org.id}`;
  const btnTextId = `org-btn-${org.id}`;

  return (
    <li id={`org-${org.id}`} className="grid grid-cols-[1.25rem_1fr] gap-x-4 md:grid-cols-[13rem_1.5rem_1fr] md:gap-x-5">
      <div className="relative col-start-1 row-span-3 row-start-1 md:col-start-2">
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cyan/25" />
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-[1.65rem] size-3.5 -translate-x-1/2 rounded-full border-2 ${
            isCurrent ? 'border-cyan bg-cyan shadow-[0_0_14px_var(--color-cyan)]' : 'border-cyan bg-bg'
          }`}
        >
          {isCurrent ? <span className="pulse-ring" /> : null}
        </span>
      </div>

      <div id={headId} className="col-start-2 row-start-1 pt-5 md:col-start-1 md:pr-1 md:text-right">
        <h4 className="text-step-1 font-bold leading-tight">{org.name}</h4>
        <p className="tnum mt-0.5 text-[0.875rem] text-muted">{years}</p>
      </div>

      <div className="col-start-2 row-start-2 pb-5 md:col-start-3 md:row-start-1 md:pt-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-labelledby={`${headId} ${btnTextId}`}
          onClick={onToggle}
          className="flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-cyan/50 hover:bg-cyan/[0.06]"
        >
          <span id={btnTextId} className="min-w-0">
            <span className="block font-semibold">{org.roles.map((r) => l(r.title)).join(' · ')}</span>
            <span className="mt-1 flex flex-wrap items-center gap-2 text-[0.8125rem] text-muted">
              <span>{org.roles.length === 1 ? t('experience.roleOne') : t('experience.roleMany', { count: org.roles.length })}</span>
              {hasParallel ? <span className="tag">{t('experience.parallelBadge')}</span> : null}
            </span>
          </span>
          <span aria-hidden="true" className={`grid size-9 shrink-0 place-items-center text-cyan transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
            <Chevron />
          </span>
        </button>
      </div>

      {open ? (
        <div id={panelId} className="rise col-start-2 row-start-3 pb-6 md:col-start-3 md:row-start-2">
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {org.roles.map((role) => {
              const partners = parallelOrgs(role.concurrent, org.id);
              return (
                <li key={role.id} id={`role-${role.id}`} className="scroll-mt-24 rounded-xl border-l-2 border-cyan/70 bg-white/[0.03] px-5 py-4">
                  <h5 className="text-[1.05rem] font-bold leading-snug">{l(role.title)}</h5>
                  <p className="tnum mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-cyan">
                    <span>{formatPeriod(role.start, role.end, locale, t('experience.present'))}</span>
                    <span aria-hidden="true" className="text-muted">·</span>
                    <span className="text-muted">{t(`experience.kinds.${role.kind}`)}</span>
                  </p>
                  <p className="mt-2 max-w-[60ch] text-muted">{l(role.summary)}</p>
                  {partners.length > 0 ? (
                    <p className="mt-2 text-[0.875rem] text-muted">
                      <span className="font-semibold text-text">{t('experience.parallel')}:</span> {partners.map((o) => o.name).join(', ')}
                    </p>
                  ) : null}
                  {role.technologies.length > 0 ? (
                    <ul aria-label={t('experience.technologies')} className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                      {role.technologies.map((name) => (
                        <li key={name} className="tag">
                          {name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/* ---------- section ---------- */

export default function Experience() {
  const { t } = useI18n();
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Evidence links elsewhere on the page open the matching employer and scroll to the role.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const roleId = (e as CustomEvent<string>).detail;
      const found = findRole(roleId);
      if (!found) return;
      setOpenIds((prev) => new Set(prev).add(found.org.id));
      window.setTimeout(() => {
        document.getElementById(`role-${roleId}`)?.scrollIntoView({ block: 'center' });
      }, 30);
    };
    window.addEventListener('open-role', onOpen);
    return () => window.removeEventListener('open-role', onOpen);
  }, []);

  const allOpen = openIds.size === organizations.length;
  const flow: [string, string][] = [
    [t('experience.flowSoftware'), 'border-cyan/70 from-cyan/20'],
    [t('experience.flowData'), 'border-teal-300/70 from-teal-300/20'],
    [t('experience.flowAi'), 'border-violet/70 from-violet/25'],
    [t('experience.flowLeadership'), 'border-fuchsia-400/70 from-fuchsia-400/25'],
  ];

  return (
    <Section id="experience" title={t('experience.title')} titleEm={t('experience.titleEm')} subtitle={t('experience.subtitle')}>
      <Reveal className="-mt-4 mb-2 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        <p className="text-step-0 max-w-[52ch] border-l-4 border-cyan pl-5 text-text/90">{t('experience.intro')}</p>
      </Reveal>

      <Reveal>
        <ul aria-label={t('experience.legendLabel')} className="m-0 hidden list-none grid-cols-6 gap-3 p-0 lg:grid">
          {LEGEND.map(([id, Icon]) => (
            <li key={id} className="glass flex flex-col items-center px-3 py-4 text-center !rounded-2xl">
              <Icon className="accent" width={26} height={26} />
              <p className="mt-2 font-bold">{t(`experience.legend.${id}.title`)}</p>
              <p className="mt-1 text-[0.75rem] leading-snug text-muted">{t(`experience.legend.${id}.text`)}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <HorizontalJourney />
      </Reveal>

      <Reveal className="mt-14 md:mt-20">
        <p className="sr-only">{t('experience.flowLabel')}</p>
        <ol aria-label={t('experience.flowLabel')} className="m-0 flex list-none flex-wrap items-center justify-center gap-x-3 gap-y-3 p-0">
          {flow.map(([label, cls], i) => (
            <li key={label} className="flex items-center gap-3">
              <span className={`inline-flex min-h-12 items-center rounded-full border bg-gradient-to-r to-transparent px-7 font-bold ${cls}`}>{label}</span>
              {i < flow.length - 1 ? <ArrowRight aria-hidden="true" className="accent hidden sm:block" /> : null}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-16 md:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-4">
          <div>
            <h3 className="text-step-2 font-bold">{t('experience.allTitle')}</h3>
            <p className="mt-2 max-w-[68ch] text-[0.95rem] text-muted">{t('experience.allIntro', { count: organizations.length })}</p>
          </div>
          <button
            type="button"
            className="text-link inline-flex min-h-11 items-center text-[0.95rem]"
            onClick={() => setOpenIds(allOpen ? new Set() : new Set(organizations.map((o) => o.id)))}
          >
            {allOpen ? t('experience.collapseAll') : t('experience.expandAll')}
          </button>
        </div>
        <ol className="m-0 mt-2 list-none p-0">
          {organizations.map((org) => (
            <OrgRow key={org.id} org={org} open={openIds.has(org.id)} onToggle={() => toggle(org.id)} />
          ))}
        </ol>
        <p className="mt-6">
          <a href="#research" className="text-link inline-flex min-h-11 items-center gap-2 font-medium">
            {t('experience.toEducation')}
            <ArrowRight width={18} height={18} />
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
