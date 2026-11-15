import type { ReactNode } from 'react';
import Reveal from './Reveal';

/** Section opener from the mockups: short cyan bar, large title with one cyan word, quiet subtitle. */
export function SectionHeading({
  id,
  title,
  titleEm,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  titleEm: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="max-w-3xl">
      <span aria-hidden="true" className="eyebrow-bar" />
      <h2 id={id} className="text-step-4 mt-5 font-bold tracking-[-0.02em]">
        {title} <span className="accent">{titleEm}</span>
      </h2>
      {subtitle ? <p className="text-step-1 mt-4 max-w-[60ch] text-muted">{subtitle}</p> : null}
      {children}
    </Reveal>
  );
}

export default function Section({
  id,
  title,
  titleEm,
  subtitle,
  intro,
  children,
  className = '',
}: {
  id: string;
  title: string;
  titleEm: string;
  subtitle?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section-y relative scroll-mt-16 ${className}`}>
      <div className="page-x">
        <SectionHeading id={`${id}-title`} title={title} titleEm={titleEm} subtitle={subtitle}>
          {intro}
        </SectionHeading>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
