'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { profile } from '@/data/profile';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { ArrowUpRight, Mail } from '@/components/ui/Icons';

/**
 * FR06: email and LinkedIn only. GitHub and CV render only if a verified URL is
 * supplied in `profile` (both are null today).
 */
export default function Contact() {
  const { t } = useI18n();

  return (
    <Section id="contact" title={t('contact.title')} titleEm={t('contact.titleEm')} subtitle={t('contact.lead')}>
      <Reveal>
        <div className="glass glass-hot p-6 md:p-10">
          <p className="label">{t('contact.email')}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 block break-words text-[clamp(1.45rem,0.7rem+3.4vw,3.5rem)] font-bold leading-tight tracking-[-0.02em] text-text no-underline transition-colors hover:text-cyan"
          >
            {profile.email}
          </a>
          <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0 xs:flex-row xs:flex-wrap">
            <li>
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <Mail />
                {t('hero.ctaContact')}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {t('contact.linkedin')}
                <ArrowUpRight />
              </a>
            </li>
            {profile.github ? (
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  GitHub
                  <ArrowUpRight />
                </a>
              </li>
            ) : null}
            {profile.cvUrl ? (
              <li>
                <a href={profile.cvUrl} className="btn btn-ghost">
                  CV
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
