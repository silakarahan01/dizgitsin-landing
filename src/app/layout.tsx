import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Bricolage_Grotesque, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const SITE_URL = 'https://dizgitsin.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'DizGitsin — 101 Okey Asistanı',
  description:
    "101 Okey'in tüm hesap derdine son. Eldeki taşları en iyi diziliş ile puanla, kalan taşları otomatik say, dijital yazboz ile turları kaydet.",
  keywords: ['101 okey', 'okey hesaplama', 'okey yazboz', 'okey asistanı', 'dizgitsin'],
  authors: [
    { name: 'İlkay Özkan' },
    { name: 'Sıla Karahan', url: 'https://silakarahan.com' },
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DizGitsin — 101 Okey Asistanı',
    description:
      'Taşları diz, puanı gör, kazananı bir dokunuşla belirle. 101 Okey için modern asistan.',
    url: SITE_URL,
    siteName: 'DizGitsin',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DizGitsin — 101 Okey için ahşap ıstaka üzerinde sıralanmış taşlar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DizGitsin — 101 Okey Asistanı',
    description: 'Taşları diz, puanı gör, kazananı bir dokunuşla belirle.',
    site: '@dizgitsin',
    images: ['/og-image.jpg'],
  },
};

// maximum-scale=1 KALDIRILDI: WCAG 1.4.4 ihlali
// Kullanici sayfayi zoom yapabilmeli (low-vision erisilebilirligi).
export const viewport: Viewport = {
  themeColor: '#0F0F10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink-900 text-tile-cream antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-tile-yellow focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-900"
        >
          Ana içeriğe atla
        </a>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
