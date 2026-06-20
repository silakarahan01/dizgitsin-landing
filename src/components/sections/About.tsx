'use client';

import { useEffect, useRef } from 'react';
import { ensureGsap } from '@/lib/gsap-setup';
import { Code2, Palette, Linkedin, BrainCircuit } from 'lucide-react';

interface PersonProps {
  role: string;
  name: string;
  bio: string;
  accent: 'wood' | 'yellow' | 'blue';
  links?: { label: string; href: string }[];
}

function PersonCard({ role, name, bio, accent, links }: PersonProps) {
  const Icon = accent === 'wood' ? Code2 : accent === 'blue' ? BrainCircuit : Palette;
  return (
    <div
      data-person-card
      className="glass group relative overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Üst dekoratif çizgi */}
      <div
        className={`absolute left-0 top-0 h-px w-full ${
          accent === 'wood'
            ? 'bg-gradient-to-r from-transparent via-wood-300/50 to-transparent'
            : accent === 'blue'
            ? 'bg-gradient-to-r from-transparent via-tile-blue/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-tile-yellow/50 to-transparent'
        }`}
      />

      {/* Sağ alt köşe — rol rozeti */}
      <div className="absolute right-5 bottom-5 md:right-6 md:bottom-6">
        <div
          lang="en"
          className="inline-flex items-center gap-2"
        >
          <span
            className="inline-flex h-5 w-5 items-center justify-center rounded-md"
            style={
              accent === 'wood'
                ? { background: '#D4A024', color: '#fff' }
                : accent === 'blue'
                ? { background: '#2E5C8A', color: '#fff' }
                : {
                    background:
                      'linear-gradient(135deg, #E84040 0%, #F5A623 30%, #4A90D9 65%, #9B59B6 100%)',
                    color: '#fff',
                  }
            }
            aria-hidden="true"
          >
            <Icon className="h-3 w-3" strokeWidth={2} />
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-tile-cream/80">
            {role}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-display text-3xl font-semibold tracking-tight text-tile-cream md:text-4xl">
          {name}
        </h3>
      </div>

      <p className="mt-5 max-w-md text-base leading-relaxed text-tile-cream/75">
        {bio}
      </p>

      {links && links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 pr-32 md:pr-40">
          {links.map((link) => {
            const isLinkedIn = link.href.includes('linkedin.com');
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} profili (yeni sekmede açılır)`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/[0.06] px-4 py-1.5 text-xs text-[#0A66C2] transition hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/15"
              >
                {isLinkedIn && <Linkedin className="h-3.5 w-3.5 shrink-0" />}
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Sadece y-translate, opacity yok, bir kere — kartlar tam parlaklikta sabit kalir
      ScrollTrigger.batch('[data-person-card]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.from(els, {
            y: 32,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden px-6 py-28 md:py-40 lg:px-12"
    >
      {/* Dekoratif arka plan grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-tile-cream">
            Arkasındaki Ekip
          </p>
          <h2 className="font-display text-huge font-bold tracking-tight text-tile-cream">
            Birlikte yapıldı, <span className="text-gradient-warm">özenle.</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Üçgenin tepesi — İlkay */}
          <div className="w-full md:max-w-xl">
            <PersonCard
              role="Founder & Lead Developer"
              name="İlkay Özkan"
              bio="DizGitsin'in kurucusu ve baş geliştiricisi. Uygulamanın fikrini, mimarisini ve mobil geliştirmesini baştan sona hayata geçirdi; oyun mantığının arkasındaki algoritmaları ve kullanıcı deneyimini şekillendirdi."
              accent="wood"
              links={[{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilkayozkan/' }]}
            />
          </div>

          {/* Üçgenin tabanı — sol: Ahmet, sağ: Sıla */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <PersonCard
              role="AI / ML Developer"
              name="Ahmet Koç"
              bio="DizGitsin'in görüntü işleme ve yapay zekâ modelleri tarafında bir AI/ML developer olarak fikir ve yönlendirmeleriyle yaklaşımı şekillendirip taş tanıma akışına küçük ama etkili dokunuşlar yaptı."
              accent="blue"
              links={[{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetk00/' }]}
            />
            <PersonCard
              role="UI/UX & Web Designer"
              name="Sıla Karahan"
              bio="DizGitsin mobil uygulamasının iç tasarımını ve UI/UX akışını kurguladı; bu landing page'i de baştan sona tasarlayıp geliştirdi — Apple-tarzı sinematik scroll, glassmorphism kartlar ve premium estetik."
              accent="yellow"
              links={[{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/sila-karahan/' }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
