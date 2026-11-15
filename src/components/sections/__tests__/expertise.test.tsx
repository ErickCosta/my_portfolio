import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { levelOf, technologies } from '@/data/technologies';
import { siteConfig } from '@/lib/config';
import Expertise from '../Expertise';
import Experience from '../Experience';
import { renderWithI18n } from '@/test/renderWithI18n';

const articleNames = () => screen.getAllByRole('article').map((a) => within(a).getByRole('heading', { level: 3 }).textContent);

describe('FR03 three equal pillars and evidence-based technologies', () => {
  it('renders Software, Data and AI cards in that order, with descriptive tier labels and no scores', () => {
    const { container } = renderWithI18n(<Expertise />);
    expect(articleNames()).toEqual(['Software', 'Data', 'AI']);
    const dataCard = screen.getAllByRole('article')[1];
    expect(within(dataCard).getAllByText('Core Expertise').length).toBeGreaterThanOrEqual(5);
    expect(within(dataCard).getByText('Apache Spark')).toBeInTheDocument();
    // no gauges, percentages or invented labels
    expect(container.textContent).not.toMatch(/\d+\s?%/);
    expect(container.textContent).not.toMatch(/\b(Strong|Working|Expert|Beginner)\b/);
    expect(container.querySelector('[role="progressbar"], [role="meter"]')).toBeNull();
  });

  it('shows a Highlights strip per card', () => {
    renderWithI18n(<Expertise />);
    const dataCard = screen.getAllByRole('article')[1];
    expect(within(dataCard).getByText('Python • SQL • Apache Spark • Databricks • AWS')).toBeInTheDocument();
  });
});

describe('Scenario 3: choosing "Data" shows only Data, keyboard accessible', () => {
  it('filters with a click and announces the status', async () => {
    const { user } = renderWithI18n(<Expertise />);
    await user.click(screen.getByRole('button', { name: 'Data' }));
    expect(articleNames()).toEqual(['Data']);
    expect(screen.getByRole('button', { name: 'Data' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Showing 6 technologies · Data');
  });

  it('filters with the keyboard only', async () => {
    const { user } = renderWithI18n(<Expertise />);
    screen.getByRole('button', { name: 'AI' }).focus();
    await user.keyboard('{Enter}');
    expect(articleNames()).toEqual(['AI']);
    screen.getByRole('button', { name: 'All' }).focus();
    await user.keyboard(' ');
    expect(articleNames()).toEqual(['Software', 'Data', 'AI']);
  });

  it('switches to the chip view with every technology of the area', async () => {
    const { user } = renderWithI18n(<Expertise />);
    await user.click(screen.getByRole('button', { name: 'Data' }));
    await user.click(screen.getByRole('button', { name: 'All technologies' }));
    const card = screen.getByRole('article');
    expect(within(card).getByRole('button', { name: 'Data lakes' })).toBeInTheDocument();
    expect(within(card).getByRole('button', { name: 'Lakehouses' })).toBeInTheDocument();
    expect(within(card).getByText('Core Expertise')).toBeInTheDocument();
    expect(within(card).getByText('Project Experience')).toBeInTheDocument();
  });

  it('shows category, group and linked evidence when a technology is selected', async () => {
    const { user } = renderWithI18n(<Expertise />);
    const dataCard = screen.getAllByRole('article')[1];
    await user.click(within(dataCard).getByRole('button', { name: /Databricks/ }));
    const detail = within(dataCard).getByRole('region', { name: 'Databricks' });
    expect(within(detail).getByText('Data platform')).toBeInTheDocument();
    expect(within(detail).getByRole('link', { name: 'Data Team Leader, Techlead IT Solutions' })).toHaveAttribute(
      'href',
      '#role-techlead-leader',
    );
  });

  it('opens the matching employer in the career section from an evidence link', async () => {
    const { user } = renderWithI18n(
      <>
        <Expertise />
        <Experience />
      </>,
    );
    const dataCard = screen.getAllByRole('article')[1];
    await user.click(within(dataCard).getByRole('button', { name: /Databricks/ }));
    expect(document.getElementById('role-techlead-leader')).toBeNull();
    await user.click(within(dataCard).getByRole('link', { name: 'Data Team Leader, Techlead IT Solutions' }));
    expect(document.getElementById('role-techlead-leader')).not.toBeNull();
  });
});

describe('Scenario 4: the help explains the non-quantitative rubric', () => {
  it('opens by keyboard and states the limits, in both locales', async () => {
    const { user } = renderWithI18n(<Expertise />);
    const help = screen.getByRole('button', { name: 'How to read this' });
    expect(help).toHaveAttribute('aria-expanded', 'false');
    help.focus();
    await user.keyboard('{Enter}');
    expect(help).toHaveAttribute('aria-expanded', 'true');
    const panel = document.getElementById(help.getAttribute('aria-controls')!)!;
    expect(panel).toHaveTextContent(/not a measured mastery score or a ranking of ability/);
    expect(panel).toHaveTextContent(/Core Expertise/);
    expect(panel).toHaveTextContent(/provisional and derived from my LinkedIn profile until I set individual levels/);
  });

  it('has the same help in Portuguese', async () => {
    const { user } = renderWithI18n(<Expertise />, { locale: 'pt-BR' });
    await user.click(screen.getByRole('button', { name: 'Como ler esta seção' }));
    expect(screen.getByText(/não uma nota de domínio medida nem um ranking de habilidade/)).toBeInTheDocument();
  });
});

describe('Experience-level bars (owner-approved, provisional)', () => {
  const bar = (row: HTMLElement) => row.querySelector('[role="img"][data-level]') as HTMLElement;
  const filled = (b: HTMLElement) => b.querySelectorAll('.bg-cyan').length;

  it('is switched on and every highlighted row shows 5 segments next to its pill', () => {
    expect(siteConfig.showLevelBars).toBe(true);
    renderWithI18n(<Expertise />);
    const rows = screen.getAllByRole('article').flatMap((a) => within(a).getAllByRole('button', { pressed: false }).filter((b) => bar(b)));
    expect(rows.length).toBe(18);
    for (const row of rows) {
      expect(bar(row).children).toHaveLength(5);
      expect(row.querySelector('.pill')).not.toBeNull();
    }
  });

  it('derives the segment count from the tier: core 5, project 4, earlier 3', () => {
    expect(levelOf({ tier: 'core' })).toBe(5);
    expect(levelOf({ tier: 'applied' })).toBe(4);
    expect(levelOf({ tier: 'earlier' })).toBe(3);
    renderWithI18n(<Expertise />);
    const data = screen.getAllByRole('article')[1];
    const spark = within(data).getByRole('button', { name: /Apache Spark/ });
    expect(filled(bar(spark))).toBe(5);
    const pg = within(data).getByRole('button', { name: /PostgreSQL/ });
    expect(filled(bar(pg))).toBe(4);
  });

  it('lets an explicit level override the tier', () => {
    expect(levelOf({ tier: 'core', level: 2 })).toBe(2);
    expect(levelOf({ tier: 'earlier', level: 5 })).toBe(5);
    expect(technologies.every((t) => t.level === undefined)).toBe(true);
  });

  it('labels the bar for assistive tech as provisional, in both locales, and keeps the pill text', () => {
    const { unmount } = renderWithI18n(<Expertise />);
    const data = screen.getAllByRole('article')[1];
    expect(within(data).getAllByRole('img', { name: 'Level 5 of 5 (provisional)' }).length).toBeGreaterThanOrEqual(5);
    expect(within(data).getAllByRole('img', { name: 'Level 4 of 5 (provisional)' }).length).toBeGreaterThanOrEqual(1);
    expect(within(data).getAllByText('Core Expertise').length).toBeGreaterThanOrEqual(5);
    unmount();
    renderWithI18n(<Expertise />, { locale: 'pt-BR' });
    expect(screen.getAllByRole('img', { name: 'Nível 5 de 5 (provisório)' }).length).toBeGreaterThan(0);
  });

  it('puts the fill animation behind prefers-reduced-motion: no-preference', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../../../app/globals.css'), 'utf8');
    const i = css.indexOf('.level-seg');
    const before = css.slice(0, i);
    expect(before.lastIndexOf('@media (prefers-reduced-motion: no-preference)')).toBeGreaterThan(before.lastIndexOf('@media (prefers-reduced-motion: reduce)'));
  });
});
