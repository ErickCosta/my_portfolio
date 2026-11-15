'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section crossing a band near the top of the viewport,
 * or null while the hero (#home) is there.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).id;
          setActive(id === 'home' ? null : id);
        }
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    for (const id of ['home', ...ids]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);

  return active;
}
