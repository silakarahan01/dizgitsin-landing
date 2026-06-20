'use client';

import { useEffect, useRef } from 'react';
import { ensureGsap } from '@/lib/gsap-setup';
import FeatureCard from '@/components/ui/FeatureCard';
import { Sparkles, Calculator, BookOpen, Trophy } from 'lucide-react';

function FeatureIcon({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl"
      style={{ background: `${color}18`, color }}
    >
      {children}
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-feature-eyebrow]', {
        y: 24, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });
      gsap.from('[data-feature-title]', {
        y: 32, duration: 0.8, ease: 'power3.out', delay: 0.05,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });
      ScrollTrigger.batch('[data-feature-card]', {
        start: 'top 90%', once: true,
        onEnter: (els) =>
          gsap.from(els, { y: 32, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full overflow-hidden px-6 py-28 md:py-40 lg:px-12"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-tile-yellow/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl md:mb-24">
          <p
            data-feature-eyebrow
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.32em] text-tile-cream"
          >
            <span className="h-px w-8 bg-tile-yellow/60" />
            Neler Yapar
          </p>
          <h2
            data-feature-title
            className="font-display text-huge font-bold tracking-tight text-tile-cream"
          >
            Oyununuza odaklanın,{' '}
            <span className="text-gradient-warm">hesabı bize bırakın.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base text-tile-cream/80 md:text-lg">
            101 Okey'de en çok zaman kaybettiren dört işi cebinizdeki
            asistanınıza yaptırın. Hızlı, doğru ve gözünüzün önünde.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 items-stretch">
          <FeatureCard
            data-feature-card
            className="min-h-[300px]"
            accent="red"
            size="md"
            icon={<FeatureIcon color="#C0392B"><Sparkles size={26} strokeWidth={1.8} /></FeatureIcon>}
            title="En İyi Dizilim ve Puanlama"
            description="Eldeki taşları analiz eder, en yüksek puanlı dizilimi anında bulur. Hangi taş nereye gidecek, bir bakışta görürsünüz."
          />
          <FeatureCard
            data-feature-card
            className="min-h-[300px]"
            accent="blue"
            size="md"
            icon={<FeatureIcon color="#2E5C8A"><Calculator size={26} strokeWidth={1.8} /></FeatureIcon>}
            title="Kalan Taş Hesabı"
            description="Oyun bitiminde ıstakada kalan taşların toplamını otomatik hesaplar. Tek tek toplama derdi yok."
          />
          <FeatureCard
            data-feature-card
            className="min-h-[300px]"
            accent="yellow"
            size="md"
            icon={<FeatureIcon color="#E0B65C"><BookOpen size={26} strokeWidth={1.8} /></FeatureIcon>}
            title="Dijital Yazboz"
            description="Kağıt-kalem yok mu? Tur tur skorları kaydet, geçmişe dön, baştan başla. Her şey cebinde."
          />
          <FeatureCard
            data-feature-card
            className="min-h-[300px]"
            accent="black"
            size="md"
            icon={<FeatureIcon color="#F2D38A"><Trophy size={26} strokeWidth={1.8} /></FeatureIcon>}
            title="Hızlı Kazanan Belirleme"
            description="Tek dokunuşla tüm puanları topla, kazananı saniyede ilan et. Tartışma yok, oyun bitti."
          />
        </div>
      </div>
    </section>
  );
}
