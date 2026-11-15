import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '../Header';
import Hero from '../Hero';
import { I18nProvider } from '@/i18n/I18nProvider';
import { renderWithI18n } from '@/test/renderWithI18n';

function setMetaCheck() {
  return {
    description: document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
    ogTitle: document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogLocale: document.head.querySelector('meta[property="og:locale"]')?.getAttribute('content'),
  };
}

describe('Scenario 6 / FR02: switching the locale', () => {
  it('switches visible text, html lang, title and metadata, and persists the choice', async () => {
    window.location.hash = '#experience';
    const scrollBefore = window.scrollY;
    const { user } = renderWithI18n(
      <>
        <Header />
        <Hero />
      </>,
    );
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Erick Costa · Software, Data & AI');
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Português \(Brasil\)/ }));

    expect(document.documentElement.lang).toBe('pt-BR');
    expect(document.title).toBe('Erick Costa · Software, Dados e IA');
    expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fale comigo/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Erick Costa');
    expect(localStorage.getItem('locale')).toBe('pt-BR');
    const meta = setMetaCheck();
    expect(meta.description).toMatch(/Doutor em Ciência da Computação/);
    expect(meta.ogTitle).toBe('Erick Costa · Software, Dados e IA');
    expect(meta.ogLocale).toBe('pt_BR');
    // location in the page is unchanged
    expect(window.location.hash).toBe('#experience');
    expect(window.scrollY).toBe(scrollBefore);

    await user.click(screen.getByRole('button', { name: /English/ }));
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('marks the toggle state and gives each language its own lang attribute', () => {
    renderWithI18n(<Header />);
    const en = screen.getByRole('button', { name: /English/ });
    const pt = screen.getByRole('button', { name: /Português \(Brasil\)/ });
    expect(en).toHaveAttribute('aria-pressed', 'true');
    expect(pt).toHaveAttribute('aria-pressed', 'false');
    expect(pt).toHaveAttribute('lang', 'pt-BR');
  });

  it('restores the stored preference after load', async () => {
    localStorage.setItem('locale', 'pt-BR');
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    await waitFor(() => expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument());
    expect(document.documentElement.lang).toBe('pt-BR');
  });
});
