/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9ed',
          100: '#faf1d0',
          200: '#f5e09e',
          300: '#efc965',
          400: '#e9b23a',
          500: '#d4960f',
          600: '#b8750a',
          700: '#92560b',
          800: '#784410',
          900: '#663911',
          950: '#3a1d05',
        },
        champagne: '#f7e7c6',
        noir: '#0d0d0d',
        cream: '#faf6f0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        luxury: '0.2em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4960f 0%, #f5e09e 50%, #d4960f 100%)',
      },
    },
  },
  plugins: [],
};
