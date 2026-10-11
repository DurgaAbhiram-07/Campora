/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48', // Primary Deep Crimson
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Warm Gold
          600: '#d97706', // Brand Amber Gold
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        accent: {
          500: '#d97706', // Gold Accent
        },
        darkBg: '#000000', // Pure Pitch Black Background
        darkCard: '#121212', // Deep Black Card Surface
        darkBorder: '#222222', // Deep Black Border
        lightBg: '#E8E1D5', // Rich Warm Sand & Linen Canvas (zero white dominance)
        lightCard: '#F5EFE6', // Tactile Warm Ivory Card Surface
        lightBorder: '#CFC4B3', // Defined Sand Border for crisp contrast
        lightMuted: '#DDD4C3', // Rich Sand Secondary Surface & Pills
        lightSection: '#DFD7CB', // Alternating Warm Section Surface
      },
      fontFamily: {
        moniqa: ['Moniqa', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        button: ['Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

