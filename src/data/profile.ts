import type { L10n } from '@/lib/types';

export interface Profile {
  name: string;
  /** Short monogram used in the header mark. */
  monogram: string;
  location: L10n;
  email: string;
  linkedin: string;
  /** Not supplied/verified yet: must never render as a link (FR06). */
  github: string | null;
  /** Not supplied yet: must never render as a link (FR06). */
  cvUrl: string | null;
}

/** Facts and contact fields. Presentation copy lives in `src/i18n/messages`. */
export const profile: Profile = {
  name: 'Erick Costa',
  monogram: 'EC',
  location: { en: 'Campina Grande, Brazil', 'pt-BR': 'Campina Grande, Brasil' },
  email: 'erick.costa.ti@gmail.com',
  linkedin: 'https://www.linkedin.com/in/erickjfcosta',
  github: null,
  cvUrl: null,
};
