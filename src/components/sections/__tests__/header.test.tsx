import { describe, expect, it, vi } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import Header, { NAV_ITEMS } from '../Header';
import { renderWithI18n } from '@/test/renderWithI18n';

describe('FR01 sticky header with active anchors', () => {
  it('is sticky and lists the sections in page order with anchor hrefs', () => {
    const { container } = renderWithI18n(<Header />);
    expect(container.querySelector('header')!.className).toContain('sticky');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual(NAV_ITEMS.map((id) => `#${id}`));
    expect(links.map((a) => a.textContent)).toEqual(['About', 'Expertise', 'Experience', 'Work', 'Research', 'What I do']);
  });

  it('has a Contact button to #contact and a skip link', () => {
    renderWithI18n(<Header />);
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
  });

  it('marks the section crossing the viewport band with aria-current', () => {
    let callback: IntersectionObserverCallback = () => {};
    class IO {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    vi.stubGlobal('IntersectionObserver', IO);
    renderWithI18n(<Header />);
    act(() => {
      callback([{ isIntersecting: true, target: { id: 'experience' } } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
    vi.unstubAllGlobals();
  });
});

describe('Scenario 2: mobile menu by touch and keyboard', () => {
  it('opens and closes with the button, with Escape and after choosing a link', async () => {
    const { user } = renderWithI18n(<Header />);
    const button = screen.getByRole('button', { name: 'Open menu' });
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(nav).toHaveAttribute('data-open', 'false');

    await user.click(button);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(nav).toHaveAttribute('data-open', 'true');

    await user.keyboard('{Escape}');
    expect(nav).toHaveAttribute('data-open', 'false');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();

    screen.getByRole('button', { name: 'Open menu' }).focus();
    await user.keyboard('{Enter}');
    expect(nav).toHaveAttribute('data-open', 'true');
    await user.click(within(nav).getByRole('link', { name: 'Work' }));
    expect(nav).toHaveAttribute('data-open', 'false');
  });
});
