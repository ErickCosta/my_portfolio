import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import Page from '@/app/page';
import Work from '../Work';
import Contact from '../Contact';
import { renderWithI18n } from '@/test/renderWithI18n';

describe('Scenario 8 / FR05: Capabilities, no invented projects', () => {
  it('labels the section Capabilities, lists only capability tiles and no links or metrics', () => {
    const { container } = renderWithI18n(<Work />);
    expect(screen.getByRole('heading', { name: 'Selected Capabilities' })).toBeInTheDocument();
    const list = screen.getByRole('list', { name: 'Capabilities' });
    expect(list).toHaveAttribute('data-kind', 'capabilities');
    expect(within(list).getAllByRole('article')).toHaveLength(6);
    expect(container.querySelectorAll('a')).toHaveLength(0);
    expect(container.textContent).toMatch(/not a project list/);
    expect(container.textContent).not.toMatch(/\d/);
  });
});

describe('FR06: contact by email and LinkedIn only', () => {
  it('shows email and LinkedIn, no GitHub or CV link', () => {
    renderWithI18n(<Contact />);
    expect(screen.getAllByRole('link', { name: /erick\.costa\.ti@gmail\.com|Contact Me/ })[0]).toHaveAttribute(
      'href',
      'mailto:erick.costa.ti@gmail.com',
    );
    expect(screen.getByRole('link', { name: /LinkedIn profile/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/erickjfcosta');
    expect(screen.queryByRole('link', { name: /github/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /^cv$|résumé|currículo|download/i })).toBeNull();
    expect(screen.queryByText(/hire me|available for|open to work|disponível/i)).toBeNull();
  });
});

describe('Whole page structure (FR01, FR06, FR07, NFR02)', () => {
  it('has one h1, landmarks, the section anchors in order and the sticky header first', () => {
    const { container } = renderWithI18n(<Page />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    const ids = Array.from(container.querySelectorAll('main > section')).map((s) => s.id);
    expect(ids).toEqual(['home', 'about', 'expertise', 'experience', 'work', 'research', 'services', 'contact']);
    // every section is labelled by its heading
    for (const s of Array.from(container.querySelectorAll('main > section'))) {
      expect(document.getElementById(s.getAttribute('aria-labelledby')!), s.id).not.toBeNull();
    }
  });

  it('never exposes a link other than anchors, mailto and the LinkedIn profile', () => {
    renderWithI18n(<Page />);
    for (const a of Array.from(document.querySelectorAll('a[href]'))) {
      expect(a.getAttribute('href'), a.textContent ?? '').toMatch(
        /^(#[\w-]+|mailto:erick\.costa\.ti@gmail\.com|https:\/\/www\.linkedin\.com\/in\/erickjfcosta)$/,
      );
    }
  });

  it('keeps Software, Data, AI in that order in the hero, the expertise cards and the services', () => {
    const { container } = renderWithI18n(<Page />);
    const order = (selector: string) => Array.from(container.querySelectorAll(selector)).map((n) => n.textContent);
    expect(order('#expertise article h3')).toEqual(['Software', 'Data', 'AI']);
    expect(order('#services ul > li > article > h3').slice(0, 3)).toEqual([
      'Software Engineering & Product Development',
      'Data Engineering, Architecture & Governance',
      'Artificial Intelligence (ML, NLP, LLMs & GenAI)',
    ]);
  });

  it('shows leadership as a supporting strength, not as a fourth pillar', () => {
    const { container } = renderWithI18n(<Page />);
    expect(container.querySelectorAll('#expertise article')).toHaveLength(3);
    expect(container.querySelector('#services')).toHaveTextContent('Supporting strength, across all three areas');
  });

  it('uses no stock or raster images', () => {
    const { container } = renderWithI18n(<Page />);
    expect(container.querySelectorAll('img')).toHaveLength(0);
  });
});
