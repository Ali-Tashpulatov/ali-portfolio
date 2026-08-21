/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'ink': '#0a0a0a',
        'ink-2': '#111111',
        'ink-3': '#141414',
        'surface': '#1a1a1a',
        'border': '#262626',
        'muted': '#2e2e2e',
        'silver': '#c8c4be',
        'ash': '#8a8680',
        'dim': '#4a4744',
        'cream': '#f0ede8',
        'off-white': '#e8e4df',
        'violet': '#9b8fd4',
        'violet-dim': '#6b5fa4',
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.35em',
      },
      fontSize: {
        'display-xl': 'clamp(5rem, 15vw, 14rem)',
        'display-lg': 'clamp(3.5rem, 10vw, 9rem)',
        'display-md': 'clamp(2.5rem, 7vw, 6rem)',
        'display-sm': 'clamp(2rem, 5vw, 4rem)',
      },
    },
  },
  plugins: [],
}
