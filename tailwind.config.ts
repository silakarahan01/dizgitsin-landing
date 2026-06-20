import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Karanlık zemin tonları
        ink: {
          950: '#0F0D0B',
          900: '#13110F',  // Ana arka plan
          800: '#1C1916',  // Yükseltilmiş yüzey
          700: '#26221D',  // Kart arka planı
          600: '#2E2924',  // Hover/focus
          500: '#3A332B',  // Border/divider
        },
        // Wood — semantik metin/yüzey katmanları (dark theme)
        wood: {
          50: '#F5EFE4',   // Birincil metin
          100: '#26221D',  // Kart arka planı (eski cream)
          200: '#3A332B',  // Border
          300: '#7C7468',  // Üçüncül metin
          400: '#7C7468',  // Disabled
          500: '#7C7468',  // Eyebrow / küçük label
          600: '#B8AE9E',  // İkincil / body metin
          700: '#F5EFE4',  // Birincil / heading metin
        },
        // Okey taş renkleri (yeni palet)
        tile: {
          black: '#13110F',
          red: '#C0392B',
          blue: '#2E5C8A',
          yellow: '#E0B65C',  // Birincil altın aksan
          cream: '#F5EFE4',   // Sıcak fildişi metin
        },
        // Semantik tokenlar (yeni)
        gold: {
          DEFAULT: '#E0B65C',
          hover: '#C99A3F',
          light: '#F2D38A',
        },
        success: '#4A7C59',
        error: '#C0392B',
        warning: '#D4A04C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cabinet Grotesk', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'mega': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'huge': ['clamp(2.25rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'wood-gradient': 'linear-gradient(135deg, #26221D 0%, #3A332B 50%, #7C7468 100%)',
        'spotlight': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(224, 182, 92, 0.08), transparent 60%)',
      },
      boxShadow: {
        'glow-red': '0 0 40px -8px rgba(192, 57, 43, 0.45)',
        'glow-blue': '0 0 40px -8px rgba(46, 92, 138, 0.45)',
        'glow-yellow': '0 0 40px -8px rgba(224, 182, 92, 0.45)',
        'glow-wood': '0 0 60px -10px rgba(124, 116, 104, 0.4)',
        'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 8px 32px -8px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
