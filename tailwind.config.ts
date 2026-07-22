import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          saffron: '#F4A024',
          'saffron-dark': '#D87E0A',
          'saffron-light': '#FBE3B6',
          maroon: '#6B1F2E',
          'maroon-deep': '#4A1320',
          'maroon-soft': '#8A3A4A',
          gold: '#C9A961',
          'gold-light': '#E6D5A6',
          cream: '#FBF6EC',
          'cream-deep': '#F4EBD7',
          ink: '#1F1A18',
          muted: '#6B5F58',
          line: '#E8DCC8',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(74, 19, 32, 0.08)',
        'soft-lg': '0 20px 60px rgba(74, 19, 32, 0.12)',
        'gold-glow': '0 8px 30px rgba(201, 169, 97, 0.35)',
      },
      backgroundImage: {
        'gold-divider': 'linear-gradient(90deg, transparent 0%, #C9A961 50%, transparent 100%)',
        'maroon-radial': 'radial-gradient(ellipse at top, #6B1F2E 0%, #4A1320 100%)',
        'cream-radial': 'radial-gradient(ellipse at top, #FBF6EC 0%, #F4EBD7 100%)',
      },
      animation: {
        'ken-burns': 'kenBurns 18s ease-out infinite alternate',
        'fade-in-up': 'fadeInUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-1%, -1%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
