/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── AURA LUMIÈRE light luxury palette ──────────────────────────────
        burgundy:  '#7B1E3A',  // accent: buttons, active states, small highlights
        cream:     '#FAF7F2',  // main page background
        ivory:     '#FFFFFF',  // card / panel backgrounds
        sand:      '#F0E9DD',  // secondary section background
        gold:      '#C9A961',  // accents, dividers, hover highlights (softer)
        charcoal:  '#2A2A2A',  // primary text
        muted:     '#8A8177',  // secondary / caption text (warm gray)
        softPink:  '#F4C2C2',  // product tag
        sageGreen: '#B8C4B0',  // product tag
        warmAmber: '#E8C87A',  // product tag
        dustyRose: '#D4A5A5',  // product tag
        skyBlue:   '#A8C8E0',  // product tag
        // ── legacy aliases so other pages don't break ──────────────────────
        champagne: '#FAF7F2',
        noir:      '#2A2A2A',
      },
      fontFamily: {
        serif:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:   ['"Inter"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        widest: '0.15em',
        luxury: '0.12em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A961 0%, #FAF7F2 50%, #C9A961 100%)',
      },
    },
  },
  plugins: [],
};
