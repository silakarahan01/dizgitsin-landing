'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { ensureGsap, gsap, ScrollTrigger } from '@/lib/gsap-setup';

// Navbar yuksekligi (fixed) — hash scroll yaparken hedefin altta gizlenmemesi icin offset
const NAV_OFFSET = 80;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureGsap();

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lenis: Lenis | null = null;
    let cleanupLenis: (() => void) | null = null;

    if (!prefersReduced) {
      const lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      lenis = lenisInstance;

      // Lenis -> ScrollTrigger entegrasyonu
      lenisInstance.on('scroll', ScrollTrigger.update);

      // GSAP ticker ile RAF
      const tick = (time: number) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanupLenis = () => {
        gsap.ticker.remove(tick);
        lenisInstance.destroy();
      };
    }

    // Hash linklere global click handler — tum sayfadaki <a href="#xxx"> baglantilari
    // Lenis ile (veya prefers-reduced-motion durumunda instant jump ile) smooth scroll yapar
    const onHashClick = (e: MouseEvent) => {
      // Modifier key'lerle (yeni sekmede aç) tiklama default'a kalsin
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      // Logo / "#" / "#top" → sayfa en ustune git
      const goToTop = href === '#' || href === '#top';
      const dest = goToTop ? null : document.querySelector(href);
      if (!goToTop && !dest) return;

      e.preventDefault();

      // Hedef Y koordinati
      const targetY = goToTop
        ? 0
        : (dest as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          NAV_OFFSET;
      const distance = Math.abs(targetY - window.scrollY);

      // Duration:
      // - Logo (yukari, en uste): 2.7s (uste yakin) -> 3.6s (en altta), sayfa
      //   yuksekligine oranla LINEAR INTERPOLE.
      // - Diger hash linkler (asagi): 1.4s -> 3.5s, mesafeye orantili (~650 px/sn).
      //   Hero canvas (260vh ~ 2000px) Features'a gecerken yaklasik 3s surer.
      let duration: number;
      if (goToTop) {
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const ratio = Math.min(1, window.scrollY / maxScroll);
        duration = 2.7 + (3.6 - 2.7) * ratio;
      } else {
        duration = Math.max(1.4, Math.min(3.5, distance / 650));
      }

      if (lenis) {
        // Mesafeye oranli duration: hero (260vh) gibi uzun mesafelerde animasyon
        // bir cirpida bitmesin, sabit hizla (~1300 px/sn) aksin.
        lenis.scrollTo(goToTop ? 0 : (dest as HTMLElement), {
          offset: goToTop ? 0 : -NAV_OFFSET,
          duration,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Reduced motion: instant jump
        window.scrollTo({ top: targetY, behavior: 'auto' });
      }
    };

    document.addEventListener('click', onHashClick);

    return () => {
      document.removeEventListener('click', onHashClick);
      cleanupLenis?.();
    };
  }, []);

  return <>{children}</>;
}
