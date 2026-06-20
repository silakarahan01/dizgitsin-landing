'use client';

import { useEffect, useRef } from 'react';
import { ensureGsap } from '@/lib/gsap-setup';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollSequence } from '@/hooks/useScrollSequence';
import DownloadButton from '@/components/ui/DownloadButton';
import ScrollHint from '@/components/ui/ScrollHint';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const { loaded } = useScrollSequence({
    triggerRef: sectionRef,
    canvasRef,
    isMobile,
    scrub: isMobile ? 0.3 : 0.5,
  });

  // Headline'in scroll ile fade-out olmasi
  useEffect(() => {
    const { gsap } = ensureGsap();
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const hint = hintRef.current;
    if (!section || !headline) return;

    // Reduced motion: hicbir scroll-trigger animasyonu calistirma
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Headline 0 -> 0.45 araligi: yavasca azal
      gsap.to(headline, {
        opacity: 0,
        y: -40,
        scale: 0.96,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '45% top',
          scrub: 0.6,
        },
      });

      // Hint daha erken yok ol
      if (hint) {
        gsap.to(hint, {
          opacity: 0,
          y: 20,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '15% top',
            scrub: 0.5,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] w-full md:h-[380vh]"
      aria-label="Tanıtım"
    >
      {/* Sticky container — viewport boyutunda kalır, içeriği scroll'a göre değişir */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Spotlight + grain layers */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-spotlight" />

        {/* Canvas (frame sequence) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full frame-canvas-mask"
          style={{
            display: 'block',
            imageRendering: 'high-quality' as React.CSSProperties['imageRendering'],
          }}
          role="img"
          aria-label="Ahşap ıstaka üzerine düşerek sıralanan okey taşları"
        />

        {/* JS yokken fallback gorsel (SEO + a11y + sosyal bot'lar) */}
        <noscript>
          <img
            src="/og-image.jpg"
            alt="Ahşap ıstaka üzerine sıralanmış 101 Okey taşları — kırmızı, mavi, sarı ve siyah numaralar"
            className="absolute inset-0 h-full w-full object-cover frame-canvas-mask"
            width={1200}
            height={630}
          />
        </noscript>

        {/* Watermark cover (Veo logosunu maskele) */}
        <div className="watermark-cover" />

        {/* Vignette gradient (kenar koyulastirma) */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-ink-900/20 via-transparent to-ink-900" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink-900/15 via-transparent to-ink-900/15" />

        {/* Headline contrast scrim — metnin oturdugu bolgede koyu radial overlay (WCAG AA icin) */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(15,15,16,0.55) 0%, rgba(15,15,16,0.30) 45%, rgba(15,15,16,0.0) 75%)',
          }}
          aria-hidden="true"
        />
        {/* Mobil-only ekstra scrim (mobilde tas kalabaligindan kontrast korumasi) */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] md:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,15,16,0.55) 0%, rgba(15,15,16,0.35) 50%, rgba(15,15,16,0.7) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Loading state */}
        {!loaded && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-30 flex items-center justify-center bg-ink-900/80"
          >
            <div className="flex items-center gap-3 text-tile-cream/85">
              <div className="h-2 w-2 animate-pulse rounded-full bg-tile-yellow" />
              <span className="text-xs uppercase tracking-[0.32em]">
                Yükleniyor
              </span>
            </div>
          </div>
        )}

        {/* Headline overlay (scrim'in uzerinde z-20) */}
        <div
          ref={headlineRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Mega başlık */}
          <h1 className="font-display font-bold text-mega text-tile-cream">
            <span className="block">101 Okey'de</span>
            <span className="block text-gradient-hero">
              Hesap Derdine Son.
            </span>
          </h1>

          {/* Açıklama */}
          <p className="mt-6 max-w-xl text-base text-tile-cream/90 sm:text-lg">
            Eldeki taşları analiz et, en yüksek puanlı dizilimi anında bul,
            kalan taşları otomatik say. <span className="text-tile-yellow">DizGitsin</span> sayar — sen oyuna odaklan.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <DownloadButton
              href="https://play.google.com/store/apps/details?id=com.ozkanilkay.dizgitsin"
              size="lg"
              variant="primary"
            />
            <a
              href="#features"
              aria-label="Sayfayı kaydırarak özellikler bölümüne git"
              className="text-base font-medium text-tile-cream/80 underline-offset-4 transition hover:text-tile-cream hover:underline decoration-tile-yellow/60"
            >
              Özellikleri keşfet →
            </a>
          </div>

          {/* Güven sinyali */}
          <div className="mt-5 flex items-center gap-2 text-[0.7rem] text-tile-cream/55 font-medium tracking-wide">
            <span>Ücretsiz</span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span>Reklamsız</span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span>101 Okey için</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          aria-hidden="true"
        >
          <ScrollHint />
        </div>
      </div>
    </section>
  );
}
