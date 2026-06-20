type TileColor = 'red' | 'blue' | 'yellow' | 'black';

const colorMap: Record<TileColor, string> = {
  red: '#C8312A',
  blue: '#1F4E91',
  yellow: '#D4A024',
  black: '#1A1A1A',
};

interface Props {
  color: TileColor;
  number: string | number;
  className?: string;
  size?: number;
}

/**
 * Okey tasi gorunumlu SVG. Krem zemin, alttan gomulu nokta, koyu kenar.
 */
export default function TileIcon({ color, number, className, size = 56 }: Props) {
  const fill = colorMap[color];
  const w = size;
  const h = size * 1.35;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 56 76"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5EBD4" />
          <stop offset="60%" stopColor="#EADBB8" />
          <stop offset="100%" stopColor="#D9C69A" />
        </linearGradient>
        <filter id={`s-${color}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="2"
        y="2"
        width="52"
        height="72"
        rx="6"
        fill={`url(#g-${color})`}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
        filter={`url(#s-${color})`}
      />
      {/* taşın altındaki gömülü nokta */}
      <circle cx="28" cy="62" r="5" fill="rgba(0,0,0,0.18)" />
      <circle cx="28" cy="61" r="4" fill="rgba(0,0,0,0.06)" />

      <text
        x="28"
        y="40"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        fill={fill}
        style={{ letterSpacing: '-0.02em' }}
      >
        {number}
      </text>
    </svg>
  );
}
