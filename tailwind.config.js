/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sz-white': '#FFFFFF',
        'sz-paper': '#FAFAF8',
        'sz-beige-light': '#EFE8DD',
        'sz-beige': '#D8CCB8',
        'sz-beige-warm': '#C9B89F',
        'sz-concrete-soft': '#B5B5B0',
        'sz-concrete': '#8E8E8A',
        'sz-concrete-dark': '#4A4A47',
        'sz-ink': '#2B2926',
        'sz-black': '#0A0A0A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '14px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'soft-xs': '0 1px 2px rgba(43,41,38,0.04)',
        'soft-sm': '0 4px 12px rgba(43,41,38,0.06)',
        'soft-md': '0 8px 28px rgba(43,41,38,0.08)',
        'soft-lg': '0 18px 48px rgba(43,41,38,0.10)',
        'soft-xl': '0 32px 80px rgba(43,41,38,0.12)',
      },
      backgroundImage: {
        'wash-morning': 'linear-gradient(180deg, #FAFAF8 0%, #EFE8DD 100%)',
        'wash-warmth': 'linear-gradient(180deg, #EFE8DD 0%, #D8CCB8 100%)',
        'wash-cocoon': 'radial-gradient(circle at 50% 30%, #EFE8DD, #D8CCB8 80%)',
        'wash-glow': 'radial-gradient(circle at 50% 100%, rgba(216,204,184,0.5), transparent)',
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'enter': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.1' }],
        'display': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 700ms cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 700ms cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
