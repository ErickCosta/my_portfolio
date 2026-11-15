import { describe, expect, it } from 'vitest';
import en from '../messages/en.json';
import ptBR from '../messages/pt-BR.json';
import { translate } from '../I18nProvider';

function flatten(obj: unknown, prefix = ''): [string, string][] {
  if (typeof obj === 'string') return [[prefix, obj]];
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}

const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();

describe('EN / PT-BR message parity (FR02, spec §14)', () => {
  const enFlat = flatten(en);
  const ptFlat = flatten(ptBR);
  const ptMap = new Map(ptFlat);

  it('has the same keys in both locales', () => {
    expect(ptFlat.map(([k]) => k).sort()).toEqual(enFlat.map(([k]) => k).sort());
  });

  it('has no empty strings and the same {placeholders}', () => {
    for (const [key, value] of enFlat) {
      expect(value.trim(), key).not.toBe('');
      expect((ptMap.get(key) ?? '').trim(), key).not.toBe('');
      expect(placeholders(ptMap.get(key)!), key).toEqual(placeholders(value));
    }
  });

  it('translates and interpolates, falling back to the key', () => {
    expect(translate('en', 'hero.ctaContact')).toBe('Contact Me');
    expect(translate('pt-BR', 'hero.ctaContact')).toBe('Fale comigo');
    expect(translate('en', 'experience.roleMany', { count: 3 })).toBe('3 roles');
    expect(translate('en', 'does.not.exist')).toBe('does.not.exist');
  });

  it('does not leave English copy in the Portuguese file for the main strings', () => {
    for (const key of ['hero.pitch', 'about.p1', 'about.p2', 'work.note', 'contact.lead', 'expertise.helpBody']) {
      expect(ptMap.get(key), key).not.toBe(enFlat.find(([k]) => k === key)![1]);
    }
  });
});
