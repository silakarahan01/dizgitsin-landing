'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ensureGsap } from '@/lib/gsap-setup';

const SCREENSHOTS = [
  {
    src: '/images/mainscreencropped.png',
    title: 'Ana Ekran',
    desc: 'Analizör ve yazboz — 101 Okey için ihtiyacın olan her şey.',
    mode: 'light' as const,
  },
  {
    src: '/images/tespitedilenelcropped.png',
    title: 'Okey Analizörü',
    desc: 'Istakanın fotoğrafını çek, uygulama en değerli kombinasyonu bulsun.',
    mode: 'dark' as const,
  },
  {
    src: '/images/yazbozcropped.png',
    title: 'Yazboz',
    desc: 'Dijital skor tablosu ile turları kaydet, kazananı anında gör.',
    mode: 'light' as const,
  },
  {
    src: '/images/degerodaklielacmacropped.png',
    title: 'Strateji Analizi',
    desc: 'Değer odaklı ve el açma stratejilerini yan yana karşılaştır.',
    mode: 'dark' as const,
  },
];

export default function Screenshots() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-screenshot]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.from(els, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: true,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="screenshots"
      className="relative w-full overflow-hidden px-6 py-28 md:py-40 lg:px-12"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-tile-cream">
            Uygulama İçi Görünüm
          </p>
          <h2 className="font-display text-huge font-bold tracking-tight text-tile-cream">
            Her ekran, <span className="text-gradient-warm">düşünülmüş.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {SCREENSHOTS.map((shot) => (
            <div key={shot.src} data-screenshot className="flex flex-col items-center gap-4">
              {/* Telefon çerçevesi */}
              <div className="relative w-full">
                <div
                  className={`relative overflow-hidden rounded-[2.5rem] border-[6px] ${
                    shot.mode === 'dark'
                      ? 'border-[#2a2a2a] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'border-[#d0c8b8] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.6)]'
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={390}
                    height={844}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className={`absolute right-[-9px] top-20 h-10 w-1.5 rounded-r-full ${shot.mode === 'dark' ? 'bg-[#222]' : 'bg-[#c0b8a8]'}`} />
                <div className={`absolute left-[-9px] top-16 h-8 w-1.5 rounded-l-full ${shot.mode === 'dark' ? 'bg-[#222]' : 'bg-[#c0b8a8]'}`} />
                <div className={`absolute left-[-9px] top-28 h-8 w-1.5 rounded-l-full ${shot.mode === 'dark' ? 'bg-[#222]' : 'bg-[#c0b8a8]'}`} />
              </div>
              <div className="text-center">
                <div className="mb-1 flex items-center justify-center gap-1.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      shot.mode === 'dark' ? 'bg-tile-yellow' : 'bg-wood-300'
                    }`}
                  />
                  <span lang="en" className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-tile-cream">
                    {shot.mode === 'dark' ? 'DARK' : 'LIGHT'}
                  </span>
                </div>
                <p className="font-display font-semibold text-sm text-tile-cream">{shot.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-tile-cream">{shot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
