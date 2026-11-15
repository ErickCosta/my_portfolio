'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { profile } from '@/data/profile';
import { ArrowUp } from '@/components/ui/Icons';

export default function Footer() {
  const { t, l } = useI18n();
  return (
    <footer className="border-t border-cyan/15 text-muted">
      <div className="page-x">
        <div className="flex flex-col gap-4 py-6 text-[0.9rem] md:flex-row md:items-center md:justify-between">
          <p>
            <span>{t('footer.copyright')}</span>
            <span aria-hidden="true"> · </span>
            <span>{l(profile.location)}</span>
          </p>
          <p>{t('footer.icons')}</p>
          <a href="#home" className="text-link inline-flex min-h-11 items-center gap-2 text-text">
            {t('contact.top')}
            <ArrowUp width={18} height={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
