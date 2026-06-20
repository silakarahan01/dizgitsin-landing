import Image from 'next/image';
import DownloadButton from '@/components/ui/DownloadButton';
import { Mail } from 'lucide-react';

const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.ozkanilkay.dizgitsin';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-ink-500/60 bg-[#1C1916] px-6 pb-12 pt-20 lg:px-12">
      {/* Üst CTA bandı */}
      <div className="mx-auto mb-16 max-w-6xl rounded-3xl border border-ink-500/60 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-700 p-8 md:p-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-tile-cream/60">
              Hazır mısın?
            </p>
            <h3 className="font-display text-3xl font-bold tracking-tight text-tile-cream md:text-5xl">
              Bir sonraki oyunda{' '}
              <span className="text-gradient-warm">en hızlı sen</span> ol.
            </h3>
          </div>
          <DownloadButton href={PLAY_URL} size="lg" variant="primary" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 pl-12 md:grid-cols-12 md:gap-8 md:pl-24">
        {/* Marka */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/a%C3%A7%C4%B1kD%C4%B0ZG%C4%B0TS%C4%B0N.png"
              alt="DizGitsin logo"
              width={200}
              height={200}
              className="h-28 w-auto object-contain"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm text-tile-cream/65 leading-relaxed">
            101 Okey'in tüm hesap ve dizilim derdini cebine alan, hızlı ve sade
            bir asistan.
          </p>
        </div>

        {/* Site linkleri */}
        <div className="md:col-span-3 md:mt-6">
          <h4 className="text-lg font-bold tracking-tight text-tile-cream/85">
            Site
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="#features" className="text-tile-cream/75 transition hover:text-tile-cream">
                Özellikler
              </a>
            </li>
            <li>
              <a href="#screenshots" className="text-tile-cream/75 transition hover:text-tile-cream">
                Ekranlar
              </a>
            </li>
            <li>
              <a href="#about" className="text-tile-cream/75 transition hover:text-tile-cream">
                Ekibimiz
              </a>
            </li>
            <li>
              <a
                href={PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tile-cream/75 transition hover:text-tile-cream"
              >
                Google Play
              </a>
            </li>
          </ul>
        </div>

        {/* İletişim */}
        <div className="md:col-span-4 md:mt-6">
          <h4 className="text-lg font-bold tracking-tight text-tile-cream/85">
            İletişim
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href="mailto:dizgitsin@gmail.com"
                className="inline-flex items-center gap-2 text-tile-cream/75 transition hover:text-tile-cream"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                dizgitsin@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-ink-500/60 pt-8 text-xs text-tile-cream/50">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} DizGitsin. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="https://ozkanjava.github.io/dizgitsin-privacy-policy/" target="_blank" rel="noopener noreferrer" className="transition hover:text-tile-cream underline-offset-2 hover:underline">Gizlilik Politikası</a>
            <span className="h-0.5 w-0.5 rounded-full bg-tile-cream/30" aria-hidden="true" />
            <a href="https://ozkanjava.github.io/dizgitsin-privacy-policy/" target="_blank" rel="noopener noreferrer" className="transition hover:text-tile-cream underline-offset-2 hover:underline">Kullanım Koşulları</a>
            <span className="h-0.5 w-0.5 rounded-full bg-tile-cream/30" aria-hidden="true" />
            <a href="https://ozkanjava.github.io/dizgitsin-privacy-policy/" target="_blank" rel="noopener noreferrer" className="transition hover:text-tile-cream underline-offset-2 hover:underline">KVKK</a>
          </div>
        </div>
        <p className="mt-3 text-center text-tile-cream/40 md:text-right">
          Made with care in İstanbul
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
          Web design by Sıla Karahan
        </p>
      </div>
    </footer>
  );
}
