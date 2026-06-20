'use client';

import { HTMLAttributes, ReactNode, useRef } from 'react';
import clsx from 'clsx';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  description: string;
  icon: ReactNode;
  accent: 'red' | 'blue' | 'yellow' | 'black';
  size?: 'sm' | 'md' | 'lg';
}

const accentBorder: Record<Props['accent'], string> = {
  red: 'hover:border-tile-red/40 hover:shadow-glow-red',
  blue: 'hover:border-tile-blue/40 hover:shadow-glow-blue',
  yellow: 'hover:border-tile-yellow/50 hover:shadow-glow-yellow',
  black: 'hover:border-wood-400/50 hover:shadow-glow-wood',
};

const accentBadge: Record<Props['accent'], string> = {
  red: 'bg-tile-red/10 text-tile-red ring-tile-red/30',
  blue: 'bg-tile-blue/10 text-tile-blue ring-tile-blue/30',
  yellow: 'bg-tile-yellow/10 text-tile-yellow ring-tile-yellow/30',
  black: 'bg-wood-500/10 text-tile-cream ring-wood-400/30',
};

export default function FeatureCard({
  title,
  description,
  icon,
  accent,
  className,
  size = 'md',
  ...rest
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      {...rest}
      ref={cardRef}
      onMouseMove={onMouseMove}
      className={clsx(
        'group relative isolate overflow-hidden rounded-2xl transition-all duration-500 ease-out h-full',
        'glass',
        accentBorder[accent],
        'hover:-translate-y-1',
        size === 'lg' && 'p-8 md:p-10',
        size === 'md' && 'p-6 md:p-8',
        size === 'sm' && 'p-5 md:p-6',
        className
      )}
      style={
        {
          '--mx': '50%',
          '--my': '50%',
        } as React.CSSProperties
      }
    >
      {/* Pointer light */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), rgba(212,160,36,0.10), transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="shrink-0">{icon}</div>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-tile-cream md:text-3xl">
          {title}
        </h3>

        <p className="mt-3 text-base leading-relaxed text-tile-cream/70">
          {description}
        </p>
      </div>
    </div>
  );
}
