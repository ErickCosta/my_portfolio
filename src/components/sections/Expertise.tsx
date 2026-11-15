'use client';

import { useId, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { pillars } from '@/data/pillars';
import type { PillarRecord } from '@/data/pillars';
import { highlights, levelOf, technologies } from '@/data/technologies';
import type { TechTier, Technology } from '@/data/technologies';
import { findRole } from '@/data/experience';
import { siteConfig } from '@/lib/config';
import type { Pillar } from '@/lib/types';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { Brain, Check, CloseIcon, Code, Database, Info, Layers } from '@/components/ui/Icons';

type Filter = 'all' | Pillar;
type View = 'highlights' | 'all';
const TIER_ORDER: TechTier[] = ['core', 'applied', 'earlier'];
const FILTERS: Filter[] = ['all', 'software', 'data', 'ai'];
const PILLAR_ICON = { software: Code, data: Database, ai: Brain } as const;

/** Ask the career section to open a role, then scroll to it. */
export function openRole(id: string) {
  window.dispatchEvent(new CustomEvent('open-role', { detail: id }));
}

function luminance(hex: string): number {
  const c = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/** Brand mark in its own colour; marks too dark for this background fall back to light text. */
function TechIcon({ tech }: { tech: Technology }) {
  if (tech.icon) {
    const color = luminance(tech.icon.hex) < 0.1 ? '#d6e6f5' : `#${tech.icon.hex}`;
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill={color} aria-hidden="true" focusable="false" className="shrink-0">
        <path d={tech.icon.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid size-[22px] shrink-0 place-items-center rounded-md border border-cyan/50 bg-cyan/10 text-[0.65rem] font-bold leading-none text-cyan"
    >
      {tech.name.charAt(0)}
    </span>
  );
}

/** Five cyan segments next to the pill. The pill carries the meaning; the bar repeats it visually. */
function LevelBar({ tech }: { tech: Technology }) {
  const { t } = useI18n();
  const level = levelOf(tech);
  const provisional = tech.level === undefined;
  return (
    <span
      role="img"
      aria-label={t(provisional ? 'expertise.levelLabelProvisional' : 'expertise.levelLabel', { level })}
      data-level={level}
      className="inline-flex shrink-0 items-center gap-1"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 70}ms` }}
          className={`level-seg h-2 w-[1.15rem] shrink-0 -skew-x-[20deg] rounded-sm ${i < level ? 'bg-cyan shadow-[0_0_8px_var(--color-cyan)]' : 'bg-white/10'}`}
        />
      ))}
    </span>
  );
}

function Detail({ tech, id, onClose }: { tech: Technology; id: string; onClose: () => void }) {
  const { t, l } = useI18n();
  return (
    <div id={id} role="region" aria-label={tech.name} className="rise my-3 rounded-xl border border-cyan/40 bg-cyan/[0.07] p-4">
      <div className="flex items-start justify-between gap-3">
        <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <div>
            <dt className="label">{t('expertise.detailCategory')}</dt>
            <dd className="font-medium">{t(`expertise.categories.${tech.category}`)}</dd>
          </div>
          <div>
            <dt className="label">{t('expertise.detailTier')}</dt>
            <dd className="font-medium">{t(`expertise.tiers.${tech.tier}`)}</dd>
          </div>
        </dl>
        <button
          type="button"
          aria-label={t('expertise.close')}
          onClick={onClose}
          className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-lg hover:bg-white/10"
        >
          <CloseIcon />
        </button>
      </div>
      <p className="label mt-3">{t('expertise.detailEvidence')}</p>
      {tech.evidenceRoleIds.length === 0 ? (
        <p className="mt-1 text-muted">{t('expertise.noEvidence')}</p>
      ) : (
        <ul className="m-0 mt-1 flex list-none flex-col p-0">
          {tech.evidenceRoleIds.map((rid) => {
            const found = findRole(rid);
            if (!found) return null;
            return (
              <li key={rid}>
                <a
                  href={`#role-${rid}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openRole(rid);
                  }}
                  className="text-link inline-flex min-h-11 items-center"
                >
                  {l(found.role.title)}, {found.org.name}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PillarCard({
  pillar,
  view,
  wide,
  selected,
  onSelect,
  onHelp,
  helpOpen,
  helpId,
}: {
  pillar: PillarRecord;
  view: View;
  wide: boolean;
  selected: string | null;
  onSelect: (key: string | null) => void;
  onHelp: () => void;
  helpOpen: boolean;
  helpId: string;
}) {
  const { t, l } = useI18n();
  const Icon = PILLAR_ICON[pillar.id];
  const detailId = useId();
  const mine = technologies.filter((x) => x.pillars.includes(pillar.id));
  const byId = (id: string) => technologies.find((x) => x.id === id)!;
  const shown = view === 'highlights' ? highlights[pillar.id].map(byId) : mine;
  const key = (tech: Technology) => `${pillar.id}:${tech.id}`;
  const selectedTech = shown.find((x) => key(x) === selected) ?? null;

  return (
    <article aria-labelledby={`pillar-${pillar.id}-title`} className="glass flex flex-col p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="icon-tile size-16 sm:size-[4.5rem]">
          <Icon width={34} height={34} strokeWidth={1.4} />
        </span>
        <div>
          <h3 id={`pillar-${pillar.id}-title`} className="text-step-3 font-bold leading-none tracking-[-0.02em]">
            {l(pillar.shortLabel)}
          </h3>
          <p className="label mt-2 !normal-case !tracking-normal">{l(pillar.title)}</p>
        </div>
      </div>
      <p className="mt-4 max-w-[46ch] text-muted">{l(pillar.statement)}</p>

      <div className="mt-6 flex items-center justify-between border-b border-white/15 pb-2 text-[0.8125rem] text-muted">
        <span>{t('expertise.colTech')}</span>
        <span className="inline-flex items-center gap-1">
          {t('expertise.colLevel')}
          <button
            type="button"
            aria-label={`${t('expertise.colLevel')}: ${t('expertise.helpButton')}`}
            aria-expanded={helpOpen}
            aria-controls={helpId}
            onClick={onHelp}
            className="grid size-11 -my-3 place-items-center rounded-lg text-cyan hover:bg-white/10"
          >
            <Info width={18} height={18} />
          </button>
        </span>
      </div>

      {view === 'highlights' ? (
        <ul className={`m-0 list-none p-0 ${wide ? 'lg:columns-2 lg:gap-x-10' : ''}`}>
          {shown.map((tech) => {
            const isSel = selected === key(tech);
            return (
              <li key={tech.id} className="break-inside-avoid border-b border-white/10">
                <button
                  type="button"
                  aria-pressed={isSel}
                  aria-controls={isSel ? detailId : undefined}
                  onClick={() => onSelect(isSel ? null : key(tech))}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/5 ${isSel ? 'bg-cyan/[0.08]' : ''}`}
                >
                  <TechIcon tech={tech} />
                  <span className="min-w-0 flex-1 font-semibold">{tech.name}</span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="pill">{t(`expertise.tiers.${tech.tier}`)}</span>
                    {siteConfig.showLevelBars ? <LevelBar tech={tech} /> : null}
                  </span>
                </button>
                {isSel ? <Detail tech={tech} id={detailId} onClose={() => onSelect(null)} /> : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-2">
          {TIER_ORDER.map((tier) => {
            const group = shown.filter((x) => x.tier === tier);
            if (group.length === 0) return null;
            return (
              <div key={tier} className="border-b border-white/10 py-4 last:border-0">
                <h4 className="label">{t(`expertise.tiers.${tier}`)}</h4>
                <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                  {group.map((tech) => (
                    <li key={tech.id}>
                      <button
                        type="button"
                        className="chip"
                        aria-pressed={selected === key(tech)}
                        aria-controls={selected === key(tech) ? detailId : undefined}
                        onClick={() => onSelect(selected === key(tech) ? null : key(tech))}
                      >
                        <TechIcon tech={tech} />
                        {tech.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {selectedTech ? <Detail tech={selectedTech} id={detailId} onClose={() => onSelect(null)} /> : null}
        </div>
      )}

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-cyan/40 bg-bg/40 px-4 py-3 text-[0.875rem]">
          <Layers className="accent shrink-0" />
          <span className="font-bold accent">{t('expertise.highlights')}</span>
          <span className="hidden h-5 w-px bg-white/20 sm:block" aria-hidden="true" />
          <span className="min-w-0 text-muted">
            {highlights[pillar.id]
              .slice(0, 5)
              .map((id) => byId(id).name)
              .join(' • ')}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Expertise() {
  const { t, l } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const [view, setView] = useState<View>('highlights');
  const [selected, setSelected] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpId = useId();

  const visiblePillars = pillars.filter((p) => filter === 'all' || p.id === filter);
  const count = new Set(
    visiblePillars.flatMap((p) => (view === 'highlights' ? highlights[p.id] : technologies.filter((x) => x.pillars.includes(p.id)).map((x) => x.id))),
  ).size;
  const areaLabel = filter === 'all' ? t('expertise.filterAll') : l(pillars.find((p) => p.id === filter)!.shortLabel);
  const status = count === 1 ? t('expertise.statusOne', { area: areaLabel }) : t('expertise.status', { count, area: areaLabel });
  const toggleHelp = () => setHelpOpen((v) => !v);

  return (
    <Section id="expertise" title={t('expertise.title')} titleEm={t('expertise.titleEm')} subtitle={t('expertise.intro')}>
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8">
          <div role="group" aria-label={t('expertise.filterLabel')} className="flex flex-wrap gap-1 rounded-xl border border-cyan/25 bg-bg-2/70 p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="seg-tab inline-flex items-center gap-1.5"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {filter === f ? <Check width={16} height={16} /> : null}
                {f === 'all' ? t('expertise.filterAll') : l(pillars.find((p) => p.id === f)!.shortLabel)}
              </button>
            ))}
          </div>
          <div role="group" aria-label={t('expertise.viewLabel')} className="flex flex-wrap gap-1 rounded-xl border border-cyan/25 bg-bg-2/70 p-1">
            {(['highlights', 'all'] as View[]).map((v) => (
              <button key={v} type="button" className="seg-tab inline-flex items-center gap-1.5" aria-pressed={view === v} onClick={() => setView(v)}>
                {view === v ? <Check width={16} height={16} /> : null}
                {v === 'all' ? t('expertise.viewAll') : t('expertise.viewHighlights')}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={helpOpen}
            aria-controls={helpId}
            onClick={toggleHelp}
            className="text-link inline-flex min-h-11 items-center gap-2 text-[0.95rem]"
          >
            <Info width={18} height={18} />
            {t('expertise.helpButton')}
          </button>
        </div>

        {helpOpen ? (
          <div id={helpId} className="rise glass mt-5 max-w-[72ch] p-5">
            <p className="label !text-cyan">{t('expertise.helpTitle')}</p>
            <p className="mt-2 text-[0.97rem] text-text/90">{t('expertise.helpBody')}</p>
          </div>
        ) : null}

        <p role="status" aria-live="polite" className="mt-5 text-[0.95rem] text-muted">
          {status}
          {selected ? '' : ` · ${t('expertise.hint')}`}
        </p>
      </Reveal>

      <Reveal className={`mt-6 grid items-stretch gap-6 ${filter === 'all' ? 'xl:grid-cols-3' : ''}`}>
        {visiblePillars.map((p) => (
          <PillarCard
            key={p.id}
            pillar={p}
            view={view}
            wide={filter !== 'all'}
            selected={selected}
            onSelect={setSelected}
            onHelp={toggleHelp}
            helpOpen={helpOpen}
            helpId={helpId}
          />
        ))}
      </Reveal>
    </Section>
  );
}
