'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#features', label: 'Özellikler' },
  { href: '#screenshots', label: 'Ekranlar' },
  { href: '#about', label: 'Ekibimiz' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ease-out',
        scrolled
          ? 'border-ink-500/60 bg-[#1C1916]/95 backdrop-blur-md shadow-[0_2px_20px_-4px_rgba(0,0,0,0.4)]'
          : 'border-transparent bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12"
        aria-label="Ana navigasyon"
      >
        {/* Marka — sabit yükseklik, logo container'a sığar */}
        <a
          href="#"
          onClick={closeMenu}
          className="relative flex h-full items-center"
          aria-label="DizGitsin ana sayfa"
        >
          <Image
            src="/images/a%C3%A7%C4%B1kD%C4%B0ZG%C4%B0TS%C4%B0N.png"
            alt="DizGitsin"
            width={380}
            height={380}
            priority
            className="block h-[110%] w-auto object-contain"
          />
        </a>

        {/* Desktop links — mutlak ortalı */}
        <ul className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-sm font-medium text-tile-cream/80 transition-colors hover:text-tile-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop sağda denge için boşluk — logo ile aynı yer kaplar */}
        <div className="hidden md:block w-12" aria-hidden="true" />

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-tile-cream/30 bg-tile-cream/10 text-tile-cream transition hover:bg-tile-cream/20 md:hidden"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={clsx(
          'fixed inset-x-0 top-[68px] z-40 overflow-hidden border-b border-ink-500/60 bg-[#1C1916]/98 backdrop-blur-xl transition-[max-height,opacity] duration-400 ease-out md:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="font-display font-medium block rounded-lg px-3 py-3 text-base text-tile-cream/80 transition hover:bg-ink-600 hover:text-tile-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
