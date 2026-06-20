import clsx from 'clsx';

interface Props {
  href?: string;
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'ghost';
  className?: string;
}

export default function DownloadButton({
  href = '#',
  size = 'lg',
  variant = 'primary',
  className,
}: Props) {
  const isExternal = /^https?:\/\//.test(href);
  const externalProps = isExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      aria-label="Google Play'den DizGitsin'i indir (yeni sekmede açılır)"
      {...externalProps}
      className={clsx(
        'group relative inline-flex items-center gap-3 rounded-full font-medium transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900',
        size === 'lg' && 'px-7 py-4 text-base',
        size === 'sm' && 'px-5 py-2.5 text-sm',
        variant === 'primary' &&
          'bg-white text-[#1a1a1a] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 active:translate-y-0',
        variant === 'ghost' &&
          'glass text-tile-cream hover:bg-ink-600 hover:-translate-y-0.5',
        className
      )}
    >
      {/* Official Google Play icon — 4-segment multicolor triangle */}
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <linearGradient id="gp-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00CFFF" />
            <stop offset="100%" stopColor="#00A8E0" />
          </linearGradient>
          <linearGradient id="gp-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E270" />
            <stop offset="100%" stopColor="#00C85A" />
          </linearGradient>
          <linearGradient id="gp-yellow" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD000" />
            <stop offset="100%" stopColor="#FFBC00" />
          </linearGradient>
          <linearGradient id="gp-red" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF5252" />
            <stop offset="100%" stopColor="#FF1744" />
          </linearGradient>
        </defs>

        {/* Top-left: cyan */}
        <path d="M0 0 L7 11 L0 11 Z" fill="url(#gp-cyan)" />
        {/* Bottom-left: green */}
        <path d="M0 11 L7 11 L0 22 Z" fill="url(#gp-green)" />
        {/* Top-right: yellow */}
        <path d="M0 0 L20 11 L7 11 Z" fill="url(#gp-yellow)" />
        {/* Bottom-right: red */}
        <path d="M7 11 L20 11 L0 22 Z" fill="url(#gp-red)" />
      </svg>

      <span className="font-display font-bold tracking-tight leading-none">
        Google Play&apos;den İndir
      </span>
    </a>
  );
}
