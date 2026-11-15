import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import Experience from '../Experience';
import { organizations } from '@/data/experience';
import { milestones } from '@/data/journey';
import { renderWithI18n } from '@/test/renderWithI18n';

const orgButton = (name: RegExp) => screen.getByRole('button', { name });

describe('FR04 expandable career grouped by employer', () => {
  it('lists every organization newest first, collapsed', () => {
    renderWithI18n(<Experience />);
    const ids = Array.from(document.querySelectorAll('li[id^="org-"]')).map((li) => li.id.replace('org-', ''));
    expect(ids).toEqual(organizations.map((o) => o.id));
    expect(ids).toHaveLength(14);
    expect(document.querySelectorAll('[id^="role-"]')).toHaveLength(0);
    expect(orgButton(/Techlead IT Solutions/)).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows the key milestones on the journey line, oldest to newest, with exact dates', () => {
    renderWithI18n(<Experience />);
    const list = screen.getByRole('list', { name: 'Key milestones, oldest to newest' });
    const cards = within(list).getAllByRole('article');
    expect(cards).toHaveLength(milestones.length);
    expect(within(cards[0]).getByText('Early research & software development')).toBeInTheDocument();
    expect(within(cards[0]).getByText('2009 – 2016')).toBeInTheDocument();
    expect(within(cards[5]).getByText('Data Team Leader')).toBeInTheDocument();
    expect(within(cards[5]).getByText('Apr 2023 – Jun 2024')).toBeInTheDocument();
    expect(within(cards[6]).getByText('Data & AI Manager')).toBeInTheDocument();
    expect(within(cards[6]).getByText('Jun 2024 – Dec 2025')).toBeInTheDocument();
    expect(within(cards[7]).getByText('Founder & Data & AI Strategist')).toBeInTheDocument();
    expect(within(cards[7]).getByText('Jan 2026 – Present')).toBeInTheDocument();
  });

  it('has the flow Software, Data, AI, Leadership', () => {
    renderWithI18n(<Experience />);
    const flow = screen.getByRole('list', { name: 'Career flow' });
    expect(within(flow).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Software', 'Data', 'AI', 'Leadership']);
  });
});

describe('Scenario 5: expanding Techlead IT Solutions', () => {
  it('shows distinct Data Team Leader and Data & AI Manager roles with correct dates', async () => {
    const { user } = renderWithI18n(<Experience />);
    const button = orgButton(/Techlead IT Solutions/);
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    const panel = document.getElementById(button.getAttribute('aria-controls')!)!;
    const roles = Array.from(panel.querySelectorAll('li[id^="role-"]'));
    expect(roles.map((r) => r.id)).toEqual(['role-techlead-manager', 'role-techlead-leader']);
    expect(within(roles[0] as HTMLElement).getByText('Data & AI Manager')).toBeInTheDocument();
    expect(within(roles[0] as HTMLElement).getByText('Jun 2024 – Dec 2025')).toBeInTheDocument();
    expect(within(roles[1] as HTMLElement).getByText('Data Team Leader')).toBeInTheDocument();
    expect(within(roles[1] as HTMLElement).getByText('Apr 2023 – Jun 2024')).toBeInTheDocument();
    expect(within(roles[1] as HTMLElement).getByText('Databricks')).toBeInTheDocument();
  });

  it('is operable by keyboard and collapses again', async () => {
    const { user } = renderWithI18n(<Experience />);
    const button = orgButton(/Gria/);
    button.focus();
    await user.keyboard('{Enter}');
    expect(document.getElementById('role-gria-tpo')).not.toBeNull();
    await user.keyboard('{Enter}');
    expect(document.getElementById('role-gria-tpo')).toBeNull();
  });

  it('expands and collapses all', async () => {
    const { user } = renderWithI18n(<Experience />);
    await user.click(screen.getByRole('button', { name: 'Expand all' }));
    expect(document.querySelectorAll('li[id^="role-"]')).toHaveLength(17);
    await user.click(screen.getByRole('button', { name: 'Collapse all' }));
    expect(document.querySelectorAll('li[id^="role-"]')).toHaveLength(0);
  });

  it('marks overlapping roles as parallel work, not sequential', async () => {
    const { user } = renderWithI18n(<Experience />);
    expect(screen.getAllByText('Parallel work').length).toBeGreaterThanOrEqual(8);
    await user.click(orgButton(/LACINA/));
    const lacina = document.getElementById('role-lacina-data-scientist')!;
    expect(lacina).toHaveTextContent('In parallel with: IFPB');
    expect(within(lacina).getByText('2019 – 2021')).toBeInTheDocument();
  });

  it('uses Portuguese month names and labels', async () => {
    const { user } = renderWithI18n(<Experience />, { locale: 'pt-BR' });
    await user.click(orgButton(/Techlead IT Solutions/));
    const org = within(document.getElementById('org-techlead')!);
    expect(org.getByText('jun 2024 – dez 2025')).toBeInTheDocument();
    expect(org.getByText('abr 2023 – jun 2024')).toBeInTheDocument();
    expect(org.getByText('Gerente de Dados e IA', { selector: 'h5' })).toBeInTheDocument();
  });
});
