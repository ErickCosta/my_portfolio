import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Work from '../Work';
import { renderWithI18n } from '@/test/renderWithI18n';

const css = fs.readFileSync(path.resolve(__dirname, '../../../app/globals.css'), 'utf8');

/** Removes the first `@media (...) { ... }` block starting with the given query, brace-matched. */
function stripBlock(source: string, query: string): string {
  const start = source.indexOf(query);
  if (start < 0) return source;
  let depth = 0;
  let i = source.indexOf('{', start);
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++;
    if (source[i] === '}' && --depth === 0) break;
  }
  return source.slice(0, start) + source.slice(i + 1);
}

describe('Scenario 7 / FR07: reduced motion', () => {
  afterEach(() => vi.restoreAllMocks());

  it('puts every animation and transition-driven reveal inside prefers-reduced-motion: no-preference', () => {
    let rest = stripBlock(css, '@media (prefers-reduced-motion: no-preference)');
    rest = stripBlock(rest, '@media (prefers-reduced-motion: reduce)');
    // hover transitions on controls are allowed (state feedback), looping or entrance animations are not
    expect(rest).not.toMatch(/animation\s*:/);
    expect(rest).not.toMatch(/\[data-reveal/);
  });

  it('has a reduce branch that removes animation, transitions and reveal offsets and smooth scrolling', () => {
    const start = css.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(start).toBeGreaterThan(0);
    const block = css.slice(start);
    expect(block).toMatch(/animation:\s*none\s*!important/);
    expect(block).toMatch(/transition:\s*none\s*!important/);
    expect(block).toMatch(/\[data-reveal\][^}]*opacity:\s*1\s*!important/);
    expect(block).toMatch(/scroll-behavior:\s*auto/);
  });

  function mockViewport(reduce: boolean) {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({ matches: reduce && query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false, onchange: null }) as MediaQueryList,
    );
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top: 5000, bottom: 5100, left: 0, right: 0, width: 0, height: 100, x: 0, y: 5000, toJSON() {} });
  }

  it('does not hide any content when the user prefers reduced motion', () => {
    mockViewport(true);
    const { container } = renderWithI18n(<Work />);
    expect(container.querySelectorAll('[data-reveal]')).toHaveLength(0);
    expect(screen.getByText('Product engineering')).toBeVisible();
  });

  it('only defers blocks below the fold when motion is allowed, and content stays in the DOM', () => {
    mockViewport(false);
    const { container } = renderWithI18n(<Work />);
    expect(container.querySelectorAll('[data-reveal="pending"]').length).toBeGreaterThan(0);
    expect(screen.getByText('Product engineering')).toBeInTheDocument();
  });
});
