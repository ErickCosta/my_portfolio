import { describe, expect, it } from 'vitest';
import { profile } from '../profile';
import { allRoles, findRole, organizations, parallelOrgs } from '../experience';
import { milestones } from '../journey';
import { highlights, technologies } from '../technologies';
import { pillars } from '../pillars';
import { approvedCaseStudies, capabilities } from '../projects';
import { degrees } from '../education';
import { siteConfig } from '@/lib/config';
import { LOCALES } from '@/lib/types';

function collectL10n(obj: unknown, path = ''): [string, Record<string, unknown>][] {
  if (!obj || typeof obj !== 'object') return [];
  const rec = obj as Record<string, unknown>;
  if ('en' in rec && 'pt-BR' in rec) return [[path, rec]];
  return Object.entries(rec).flatMap(([k, v]) => collectL10n(v, path ? `${path}.${k}` : k));
}

describe('profile facts and contact (FR06, FR09)', () => {
  it('matches the spec', () => {
    expect(profile.name).toBe('Erick Costa');
    expect(profile.location.en).toBe('Campina Grande, Brazil');
    expect(profile.email).toBe('erick.costa.ti@gmail.com');
    expect(profile.linkedin).toBe('https://www.linkedin.com/in/erickjfcosta');
  });

  it('keeps GitHub and CV null until supplied', () => {
    expect(profile.github).toBeNull();
    expect(profile.cvUrl).toBeNull();
  });
});

describe('content records', () => {
  it('has non-empty text in both locales for every L10n field', () => {
    const all = [
      ...collectL10n(profile),
      ...collectL10n(pillars),
      ...collectL10n(capabilities),
      ...collectL10n(organizations),
      ...collectL10n(milestones),
      ...collectL10n(degrees),
    ];
    expect(all.length).toBeGreaterThan(60);
    for (const [path, v] of all) {
      for (const loc of LOCALES) {
        expect((v[loc] as string)?.trim().length, `${path}.${loc}`).toBeGreaterThan(0);
      }
    }
  });

  it('orders the three equal pillars Software, Data, AI', () => {
    expect(pillars.map((p) => p.id)).toEqual(['software', 'data', 'ai']);
  });
});

describe('career (FR04, spec §4)', () => {
  it('has the 17 roles of the spec across 14 organizations', () => {
    expect(allRoles).toHaveLength(17);
    expect(organizations).toHaveLength(14);
    expect(new Set(allRoles.map((r) => r.id)).size).toBe(17);
  });

  it('keeps the exact Techlead dates', () => {
    const manager = findRole('techlead-manager')!.role;
    const leader = findRole('techlead-leader')!.role;
    expect([manager.start, manager.end]).toEqual(['2024-06', '2025-12']);
    expect([leader.start, leader.end]).toEqual(['2023-04', '2024-06']);
    expect(findRole('borborema-founder')!.role.end).toBe('present');
  });

  it('marks parallel work with the other organizations of the same group', () => {
    expect(parallelOrgs('g2018', 'lacina').map((o) => o.id)).toEqual(['ifpb']);
    expect(parallelOrgs('g2017', 'virtus').map((o) => o.id).sort()).toEqual(['nassau', 'unipe']);
  });

  it('covers every role in a journey milestone, with valid ids', () => {
    const ids = milestones.flatMap((m) => m.roleIds);
    for (const id of ids) expect(findRole(id), id).toBeDefined();
    expect(new Set(ids)).toEqual(new Set(allRoles.map((r) => r.id)));
  });
});

describe('technologies (FR03)', () => {
  it('only references real roles as evidence', () => {
    for (const t of technologies) for (const id of t.evidenceRoleIds) expect(findRole(id), `${t.id}:${id}`).toBeDefined();
    for (const p of pillars) for (const id of p.evidenceRoleIds) expect(findRole(id), `${p.id}:${id}`).toBeDefined();
  });

  it('has valid highlight ids that belong to their pillar', () => {
    for (const [pillar, ids] of Object.entries(highlights)) {
      for (const id of ids) {
        const tech = technologies.find((t) => t.id === id);
        expect(tech, id).toBeDefined();
        expect(tech!.pillars, `${id} in ${pillar}`).toContain(pillar);
      }
    }
  });

  it('has only the optional 1-5 level, no scores or percentages', () => {
    for (const t of technologies) {
      expect(Object.keys(t).sort()).toEqual(['category', 'evidenceRoleIds', 'icon', 'id', 'name', 'pillars', 'tier']);
      expect(t.level).toBeUndefined();
    }
  });

  it('ships the level bars switched on (owner approved)', () => {
    expect(siteConfig.showLevelBars).toBe(true);
  });
});

describe('selected work (FR05)', () => {
  it('has no approved case studies yet and no metric-like digits in capabilities', () => {
    expect(approvedCaseStudies).toHaveLength(0);
    for (const c of capabilities) {
      for (const loc of LOCALES) {
        expect(c.title[loc] + c.description[loc]).not.toMatch(/\d/);
      }
    }
  });
});
