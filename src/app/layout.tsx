import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { I18nProvider } from '@/i18n/I18nProvider';
import { SITE_URL } from '@/lib/site';
import en from '@/i18n/messages/en.json';

/** Self-hosted variable font (latin subset), preloaded by Next with a size-adjusted fallback to avoid layout shift. */
const jakarta = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
      style: 'normal',
      weight: '200 800',
    },
    {
      path: '../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-italic.woff2',
      style: 'italic',
      weight: '200 800',
    },
  ],
  display: 'swap',
  variable: '--font-jakarta',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050A14',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: en.meta.title,
  description: en.meta.description,
  authors: [{ name: 'Erick Costa' }],
  icons: { icon: '/icon.svg' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Erick Costa',
    title: en.meta.title,
    description: en.meta.description,
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: en.meta.title,
    description: en.meta.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
