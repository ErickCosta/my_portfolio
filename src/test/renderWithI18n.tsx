import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from '@/i18n/I18nProvider';
import type { Locale } from '@/lib/types';

export function renderWithI18n(ui: ReactElement, opts: { locale?: Locale } = {}) {
  const user = userEvent.setup();
  const result = render(<I18nProvider initialLocale={opts.locale ?? 'en'}>{ui}</I18nProvider>);
  return { ...result, user };
}
