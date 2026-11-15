import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import Hero from '../Hero';
import { renderWithI18n } from '@/test/renderWithI18n';

describe('Scenario 1: English visitor sees the introduction, specialization and contact in the first screen', () => {
  it('shows the name as the single h1 and the headline', () => {
    const { container } = renderWithI18n(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Erick Costa');
    const text = container.textContent!.replace(/\s+/g, ' ');
    expect(text).toContain('Building Software, Data & AI Solutions for Real-World Impact.');
    expect(text).toContain('Software Engineer · Data & AI Specialist · PhD in Computer Science');
  });

  it('shows Software, Data and AI as three cards in that order', () => {
    renderWithI18n(<Hero />);
    const group = screen.getByRole('group');
    const titles = within(group)
      .getAllByRole('listitem')
      .map((li) => li.querySelector('p')!.textContent);
    expect(titles).toEqual(['Software', 'Data', 'AI']);
  });

  it('has a working mailto action and a LinkedIn link', () => {
    renderWithI18n(<Hero />);
    expect(screen.getByRole('link', { name: /Contact Me/ })).toHaveAttribute('href', 'mailto:erick.costa.ti@gmail.com');
    const linkedin = screen.getByRole('link', { name: /LinkedIn/ });
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/erickjfcosta');
    expect(linkedin).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(screen.getByRole('link', { name: /Explore My Work/ })).toHaveAttribute('href', '#work');
  });

  it('describes the illustration for assistive tech and states the current role from the data', () => {
    renderWithI18n(<Hero />);
    expect(screen.getByRole('group', { name: /three cards, Software, Data and AI/ })).toBeInTheDocument();
    expect(screen.getByText(/Founder & Data & AI Strategist/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 2026 – Present/)).toBeInTheDocument();
  });

  it('renders in Portuguese with native copy', () => {
    const { container } = renderWithI18n(<Hero />, { locale: 'pt-BR' });
    const text = container.textContent!.replace(/\s+/g, ' ');
    expect(text).toContain('Construindo soluções de Software, Dados e IA com impacto no mundo real.');
    expect(screen.getByRole('link', { name: /Fale comigo/ })).toBeInTheDocument();
  });
});
